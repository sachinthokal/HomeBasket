from django.urls import path
from .views import DashboardCountsAPI, TodayDayNumberAPI, TodayItemsCountView

urlpatterns = [
     path('total-items/', DashboardCountsAPI.as_view(), name='dashboard-counts'),
     path('today-day/', TodayDayNumberAPI.as_view(), name='today-day'),
     path('items-per-day/', TodayItemsCountView.as_view(), name='TodayItemsCountView'),
     
]
