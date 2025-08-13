
from django.urls import re_path, path
from rest_framework_simplejwt.views import (
    TokenRefreshView
)
from .views import authUser, CustomTokenObtainPairView, LogoutView, UserHasPermission, registration, ChangePasswordView

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/me/', authUser, name='auth_user'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
    path('check-permission/', UserHasPermission.as_view(), name='check-permission'),
    path('register/', registration, name='registration'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
]