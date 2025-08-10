from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
from .models import Item

class ItemCreateAPIView(APIView):
    
    def get(self, request):
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM groceryList")
            rows = cursor.fetchall()
            columns = [col[0] for col in cursor.description]
            results = [dict(zip(columns, row)) for row in rows]
        return Response(results)


    def post(self, request):
        data = request.data
        name = data.get('name')
        qty = data.get('qty')
        unit = data.get('unit')
        category = data.get('category')

        if not name or qty is None or not category:
            return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

        with connection.cursor() as cursor:
            try:
                cursor.execute("""
                    INSERT INTO groceryList (name, qty, unit, category)
                    VALUES (%s, %s, %s, %s)
                """, [name, qty, unit, category])
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'message': 'Item inserted successfully'}, status=status.HTTP_201_CREATED)

class ItemDeleteView(APIView):
    def delete(self, request, pk, format=None):
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM groceryList WHERE id = %s", [pk])
            row = cursor.fetchone()
            if not row:
                return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)
            try:
                cursor.execute("DELETE FROM groceryList WHERE id = %s", [pk])
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({'message': 'Item deleted'}, status=status.HTTP_204_NO_CONTENT)