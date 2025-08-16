from rest_framework.views import APIView  # type: ignore
from rest_framework.response import Response  # type: ignore
from rest_framework import status  # type: ignore
from django.db import connection
from django.utils import timezone


class ItemCreateAPIView(APIView):

    def get(self, request):
        user_id = request.user.id
        if not user_id:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM dashboard_grocerylist WHERE user_id = %s", [user_id])
            rows = cursor.fetchall()
            columns = [col[0] for col in cursor.description]

            results = []
            for row in rows:
                row_dict = dict(zip(columns, row))
                if 'created_at' in row_dict and row_dict['created_at']:
                    row_dict['created_at'] = row_dict['created_at'].isoformat()
                results.append(row_dict)

        return Response(results, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        name = data.get('name')
        qty = data.get('qty')
        unit = data.get('unit')
        category = data.get('category')
        created_at = timezone.now()
        user_id = request.user.id

        if not user_id:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

        if not name or qty is None or not category:
            return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

        with connection.cursor() as cursor:
            try:
                cursor.execute("""
                    INSERT INTO dashboard_grocerylist (name, qty, unit, category, user_id, created_at)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """, [name, qty, unit, category, user_id, created_at])
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'message': 'Item inserted successfully'}, status=status.HTTP_201_CREATED)


class ItemDeleteView(APIView):
    def delete(self, request, pk, format=None):
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM dashboard_grocerylist WHERE id = %s", [pk])
            row = cursor.fetchone()
            if not row:
                return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)

            try:
                cursor.execute("DELETE FROM dashboard_grocerylist WHERE id = %s", [pk])
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'message': 'Item deleted'}, status=status.HTTP_204_NO_CONTENT)
