
from django.urls import path
from .views import (Home, UserLoginView, AflDasboardView)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', Home.as_view(), name='home'),
    path('login/', UserLoginView.as_view(), name='login_url'),
    path('dashboard/', AflDasboardView.as_view(), name='dashboard'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)