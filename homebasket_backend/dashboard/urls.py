from django.urls import path
from . import views

urlpatterns = [
    path('items/', views.ItemCreateAPIView.as_view(), name='items-list-create'),
    path('items/<int:pk>/', views.ItemDeleteView.as_view(), name='item-delete'),
    path("update-purchase/<int:pk>/", views.UpdatePurchaseStatusAPI.as_view(), name="update_purchase"),
]
