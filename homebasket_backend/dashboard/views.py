from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from .models import GroceryList


class ItemCreateAPIView(APIView):

    def get(self, request):
        user = request.user
        if not user or not user.is_authenticated:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

        items = GroceryList.objects.filter(user=user).order_by("-created_at")
        results = []

        for item in items:
            results.append({
                "id": item.id,
                "item_name": item.item_name,
                "qty": str(item.qty),
                "unit": item.unit,
                "category": item.category,
                "purchased": item.purchased,
                # remove microseconds for frontend display
                "created_at": item.created_at.replace(microsecond=0).isoformat(),
            })

        return Response(results, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        if not user or not user.is_authenticated:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

        data = request.data
        item_name = data.get("name")
        qty = data.get("qty")
        unit = data.get("unit")
        category = data.get("category")

        if not item_name or qty is None or not category:
            return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # truncate microseconds when saving
            GroceryList.objects.create(
                item_name=item_name,
                qty=qty,
                unit=unit,
                category=category,
                user=user,
                created_at=timezone.now().replace(microsecond=0)
            )
            return Response({'message': 'Item inserted successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ItemDeleteView(APIView):
    def delete(self, request, pk, format=None):
        try:
            item = GroceryList.objects.get(pk=pk)
        except GroceryList.DoesNotExist:
            return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)

        item.delete()
        return Response({'message': 'Item deleted'}, status=status.HTTP_204_NO_CONTENT)


class UpdatePurchaseStatusAPI(APIView):
    def post(self, request, pk):
        purchased = request.data.get("purchased", False)

        try:
            item = GroceryList.objects.get(pk=pk)
            item.purchased = purchased
            item.save()
            return Response({"success": True, "purchased": item.purchased}, status=status.HTTP_200_OK)
        except GroceryList.DoesNotExist:
            return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
