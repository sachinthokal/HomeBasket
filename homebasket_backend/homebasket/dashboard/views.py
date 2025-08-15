from rest_framework.views import APIView  # type: ignore
from rest_framework.response import Response  # type: ignore
from rest_framework import status  # type: ignore
from django.db import connection
from datetime import datetime
from django.utils import timezone



class ItemCreateAPIView(APIView):

    def get(self, request):
        user_id = request.user.id
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM groceryList WHERE user_id = %s", [user_id])
            rows = cursor.fetchall()
            columns = [col[0] for col in cursor.description]

            # convert created_at to ISO string
            results = []
            for row in rows:
                row_dict = dict(zip(columns, row))
                if 'created_at' in row_dict and row_dict['created_at']:
                    row_dict['created_at'] = row_dict['created_at'].isoformat()
                results.append(row_dict)

        return Response(results)

    def post(self, request):
        data = request.data
        name = data.get('name')
        qty = data.get('qty')
        unit = data.get('unit')
        category = data.get('category')

        # auto-generate created_at
        created_at = timezone.now()  # UTC-aware datetime 
        

        # user_id from JWT authenticated user
        user_id = request.user.id  

        if not name or qty is None or not category:
            return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

        with connection.cursor() as cursor:
            try:
                cursor.execute("""
                    INSERT INTO groceryList (name, qty, unit, category, user_id, created_at)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """, [name, qty, unit, category, user_id, created_at])
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