from django.urls import path
from .views import BackupAndDeleteOldItemsAPI, DashboardCountsAPI,DeleteAllItemsFromHistoryAPI,ItemHistoryAPIView, TodayDayNumberAPI, TodayItemsCountView, TruncateTableAPI

urlpatterns = [
     path('total-items/', DashboardCountsAPI.as_view(), name='dashboard-counts'),
     path('today-day/', TodayDayNumberAPI.as_view(), name='today-day'),
     path('items-per-day/', TodayItemsCountView.as_view(), name='TodayItemsCountView'),
     path('truncate-table/', BackupAndDeleteOldItemsAPI.as_view(), name='TruncateTableAPI'),
     path('history-table/', ItemHistoryAPIView.as_view(), name='ItemHistoryAPIView'),
     path('delete-all-from-history/', DeleteAllItemsFromHistoryAPI.as_view(), name='DeleteAllItemsFromHistoryAPI'),
]
