from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FormViewSet, FieldViewSet

router=DefaultRouter()
router.register('forms', FormViewSet, basename='forms')
router.register('fields', FieldViewSet, basename='fields')

urlpatterns = [
      path('', include(router.urls))
]