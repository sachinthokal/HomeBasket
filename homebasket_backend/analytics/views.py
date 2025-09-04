# analytics/views.py
from datetime import date
from datetime import timedelta
from django.db import connection
from django.views import View
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import connection
from django.http import JsonResponse
from rest_framework import status
from django.utils.timezone import now
from django.db import connection, transaction


class DashboardCountsAPI(APIView):
    def get(self, request):
        data = {}

        # Total Items
        with connection.cursor() as cursor:
            cursor.execute("SELECT COUNT(*) FROM dashboard_grocerylist;")  # 👈 change table name
            data["total_items"] = cursor.fetchone()[0]

        # Total Users
        with connection.cursor() as cursor:
            cursor.execute("SELECT COUNT(*) FROM accounts_user;")  # default Django user table
            data["total_users"] = cursor.fetchone()[0]

        # Total Unique Categories
            cursor.execute("SELECT COUNT(category) FROM dashboard_grocerylist;")
            data["total_categories"] = cursor.fetchone()[0]

        return Response(data)
    
    
class TodayDayNumberAPI(APIView):
    def get(self, request):
        today = date.today()
        day_number = today.day  # फक्त दिवस काढतो (1–31)

        return Response({
            "date": today.strftime("%d %b %Y"),
            "day_number": f"Day {day_number}"
        })
    
class TodayItemsCountView(View):
    def get(self, request):
        query = """
            SELECT COUNT(*) 
            FROM dashboard_grocerylist
            WHERE DATE(created_at) = %s;
        """
        today = date.today()
        with connection.cursor() as cursor:
            cursor.execute(query, [today])
            count = cursor.fetchone()[0]

        data = {
            "date": str(today),
            "total_items_added": count
        }
        return JsonResponse(data)

class TruncateTableAPI(APIView):
    def delete(self, request):
        with connection.cursor() as cursor:
            cursor.execute("TRUNCATE TABLE dashboard_grocerylist;")
        return Response({"message": "Table truncated successfully."}, status=status.HTTP_200_OK)

class ItemHistoryAPIView(APIView):

    def get(self, request):
        user_id = request.user.id
        if not user_id:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM grocerylist_backup WHERE user_id = %s", [user_id])
            rows = cursor.fetchall()
            columns = [col[0] for col in cursor.description]

            results = []
            for row in rows:
                row_dict = dict(zip(columns, row))
                if 'created_at' in row_dict and row_dict['created_at']:
                    row_dict['created_at'] = row_dict['created_at'].isoformat()
                results.append(row_dict)

        return Response(results, status=status.HTTP_200_OK)

class BackupAndDeleteOldItemsAPI(APIView):
    def delete(self, request):
        one_month_ago = now() - timedelta(days=30)

        try:
            with transaction.atomic():
                with connection.cursor() as cursor:
                    cursor.execute("""
                        INSERT INTO grocerylist_backup
                        SELECT * FROM dashboard_grocerylist
                        WHERE created_at < %s;
                    """, [one_month_ago])

                    cursor.execute("""
                        DELETE FROM dashboard_grocerylist
                        WHERE created_at < %s;
                    """, [one_month_ago])

            return Response(
                {"message": "Old items moved to backup table and deleted from main table."},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response({"error": str(e)}, status=500)