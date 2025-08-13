
from django.urls import path
from .views import (Home, UserLoginView, AflDasboardView, ProfileView, Signup, ChangePassword)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', Home.as_view(), name='home'),
    path('login/', UserLoginView.as_view(), name='login_url'),
    path('dashboard/', AflDasboardView.as_view(), name='dashboard'),
    path('profile/view/', ProfileView.as_view(), name="profile_view"),
    path('signup/', Signup.as_view(), name='signup'),
    path('change-password/', ChangePassword.as_view(), name='change_password'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)