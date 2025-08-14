
from django.urls import path
from .views import (Home, UserLoginView, AflDasboardView, ProfileView, Signup, ChangePassword, AddForm, ManageForm, AflManageFormsEdit,
                    ManageEmployee,AddEmployee, AflManageEmployeeEdit)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', Home.as_view(), name='home'),
    path('login/', UserLoginView.as_view(), name='login_url'),
    path('dashboard/', AflDasboardView.as_view(), name='dashboard'),
    path('profile/view/', ProfileView.as_view(), name="profile_view"),
    path('signup/', Signup.as_view(), name='signup'),
    path('change-password/', ChangePassword.as_view(), name='change_password'),
    path('manage-form/', ManageForm.as_view(), name='manage_form'),
    path('add-form/', AddForm.as_view(), name='add_form'),
    path('manage-form/edit/', AflManageFormsEdit.as_view(), name="manage_form-edit"),
    path('manage-employee/', ManageEmployee.as_view(), name='manage_employee'),
    path('add-new-employee/', AddEmployee.as_view(), name='add_employee'),
    path('manage-employee/edit/', AflManageEmployeeEdit.as_view(), name="manage_employee-edit"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)