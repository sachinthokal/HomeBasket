from datetime import date, timedelta
from django.views import View
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.timezone import now
from django.http import JsonResponse
from django.db import transaction
from accounts.models import User
from analytics.models import GroceryListBackup
from dashboard.models import GroceryList


class DashboardCountsAPI(APIView):
    def get(self, request):
        data = {
            "total_items": GroceryList.objects.count(),
            "total_users": User.objects.count(),
            "total_categories": GroceryList.objects.values("category").distinct().count(),
        }
        return Response(data)


class TodayDayNumberAPI(APIView):
    def get(self, request):
        today = date.today()
        return Response({
            "date": today.strftime("%d %b %Y"),
            "day_number": f"Day {today.day}"
        })


class TodayItemsCountView(View):
    def get(self, request):
        today = date.today()
        count = GroceryList.objects.filter(created_at__date=today).count()
        data = {"date": str(today), "total_items_added": count}
        return JsonResponse(data)


class TruncateTableAPI(APIView):
    def delete(self, request):
        GroceryList.objects.all().delete()
        return Response({"message": "Table cleared successfully."}, status=status.HTTP_200_OK)


class ItemHistoryAPIView(APIView):
    def get(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

        items = GroceryListBackup.objects.filter(user=user).order_by("-created_at")
        results = [
            {
                "id": item.id,
                "name": item.name,
                "qty": str(item.qty),
                "unit": item.unit,
                "category": item.category,
                "purchased": item.purchased,
                "created_at": item.created_at.isoformat(),
            }
            for item in items
        ]
        return Response(results, status=status.HTTP_200_OK)


class BackupAndDeleteOldItemsAPI(APIView):
    def delete(self, request):
        one_month_ago = now() - timedelta(days=30)
        try:
            with transaction.atomic():
                old_items = GroceryList.objects.filter(created_at__lt=one_month_ago)

                # backup तयार करणे
                backups = [
                    GroceryListBackup(
                        name=item.name,
                        qty=item.qty,
                        unit=item.unit,
                        category=item.category,
                        purchased=item.purchased,
                        created_at=item.created_at,
                        user=item.user,
                    )
                    for item in old_items
                ]
                GroceryListBackup.objects.bulk_create(backups)

                # delete करणे
                old_items.delete()

            return Response(
                {"message": "Old items moved to backup table and deleted from main table."},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
