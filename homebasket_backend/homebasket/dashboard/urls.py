from django.urls import path
from . import views

urlpatterns = [
    path('items/', views.ItemCreateAPIView.as_view(), name='items_list'),

]
