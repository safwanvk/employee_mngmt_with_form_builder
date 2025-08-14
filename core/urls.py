from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from .views import FormViewSet, FieldViewSet, EmployeeViewSet, FormAutocomplete

router=DefaultRouter()
router.register('forms', FormViewSet, basename='forms')
router.register('fields', FieldViewSet, basename='fields')
router.register('employees', EmployeeViewSet, basename='employees')

urlpatterns = [
      path('', include(router.urls)),
      re_path(r'^form-autocomplete/$',FormAutocomplete.as_view(),name='form-autocomplete'),
]