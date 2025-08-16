from django.urls import path
from .views import LoginAPIView, LogoutView, ProfileView, RegisterView
from rest_framework_simplejwt.views import TokenRefreshView # type: ignore

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', ProfileView.as_view(), name='profile'),
]
