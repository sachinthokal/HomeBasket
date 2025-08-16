# analytics/views.py
from datetime import date
from datetime import timedelta
from django.db.models import Count
from django.db import connection
from django.views import View
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import connection
from django.http import JsonResponse

class DashboardCountsAPI(APIView):
    def get(self, request):
        data = {}

        # Total Items
        with connection.cursor() as cursor:
            cursor.execute("SELECT COUNT(*) FROM grocerylist;")  # 👈 change table name
            data["total_items"] = cursor.fetchone()[0]

        # Total Users
        with connection.cursor() as cursor:
            cursor.execute("SELECT COUNT(*) FROM auth_user;")  # default Django user table
            data["total_users"] = cursor.fetchone()[0]

        # Total Unique Categories
            cursor.execute("SELECT COUNT(DISTINCT category) FROM grocerylist;")
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
            FROM grocerylist
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
        return JsonResponse([data], safe=False)