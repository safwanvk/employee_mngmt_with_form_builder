from django.utils.decorators import method_decorator
from django.shortcuts import redirect
from .decorators import render_method
from django.views import View
from django.utils.translation import gettext_lazy as _
from .forms import (UserLoginForm, SignUpForm, ChangePasswordForm, AddNewForm, EditNewForm, AddEmployeeForm)
from django.conf import settings
from .utilities import afl_reverse
import copy

# Create your views here.
@method_decorator(render_method(), name='dispatch')
class Home(View):

	def get(self, request, *args, **kwargs):
		return redirect('login_url')

@method_decorator(render_method(), name='dispatch')
class UserLoginView(View):
	template = 'frontend/login.html'

	def get(self, request, *args, **kwargs):
            render_context = {}
            if request.user.is_authenticated:
                  return redirect('dashboard')
            form = UserLoginForm(request=request)
            context = {
                  'form': form,
                  'next': request.GET.get('next'),
                  'title' : _("Login"),
            }
            render_context['context'] = context
            render_context['return_type'] = 'template_response'
            render_context['template'] = self.template
            return render_context


@method_decorator(render_method(), name='dispatch')
class AflDasboardView(View):
	template_name = 'frontend/user/dashboard.html'
	context = {}
	def get(self, request, *args, **kwargs):
            render_context = {}
            self.context = {}

            # Dashboard Widget visibility settings
            self.context['settings'] = settings
            context = {'template' : self.template_name, 'context':self.context, 'return_type' : 'template_response'}
            return context

@method_decorator(render_method(), name='dispatch')
class ProfileView(View):
      template = 'frontend/user/profile-view.html'

      def prepare_breadcrumbs(self,request,context):

            context['label'] = _('Profile Info')
            return context

      def get(self, request, *args, **kwargs):
            context = {}
            general_fields = [
                  {
                        'key': 'email',
                        'text': _('Email'),
                  },
                  {
                        'key': 'phone_number',
                        'text': _('Phone Number'),
                  },
                  {
                        'key': 'full_name',
                        'text': _('Full Name'),
                  }
            ]
            context['general_fields'] = general_fields
            context['theme_group'] = 'backoffice'
            context['breadcrumbs'] = {
                        0: {
                              'icon': "bi bi-house",
                              'url' : 'dashboard'
                  },

                        }
            context = self.prepare_breadcrumbs(request,context)
            render_context = {}
            render_context['context'] = context
            render_context['return_type'] = 'template_response'
            render_context['template'] = self.template
            return render_context

@method_decorator(render_method(), name='dispatch')
class Signup(View):
	template = 'frontend/user/signup.html'
	def get(self, request, *args, **kwargs):
		context = {}
		initial = {}
		initial['request'] = request
		form = SignUpForm(initial=initial)
		form.id = "register-form"
		context['form'] = form
		context['theme_group'] = 'backoffice'
		render_context = {}
		render_context['context'] = context
		render_context['return_type'] = 'template_response'
		render_context['template'] = self.template
		return render_context

@method_decorator(render_method(), name='dispatch')
class ChangePassword(View):
	template = 'frontend/user/change-password.html'
	def get(self, request, *args, **kwargs):
		context = {}
		initial = {}
		initial['request'] = request
		form = ChangePasswordForm(initial=initial)
		form.id = "register-form"
		context['form'] = form
		context['theme_group'] = 'backoffice'
		render_context = {}
		render_context['context'] = context
		render_context['return_type'] = 'template_response'
		render_context['template'] = self.template
		return render_context

@method_decorator(render_method(), name='dispatch')
class ChangePassword(View):
      template = 'frontend/user/change-password.html'

      def prepare_breadcrumbs(self,request,context):
            context['label'] = _('Change Password')
            return context

      def get(self, request, *args, **kwargs):
            context = {}
            initial = {}
            initial['request'] = request
            form = ChangePasswordForm(initial=initial)
            context = {}

            button =[
                  {'type':"submit",'label':_("Save changes"),'name':"personal_details",'class':"btn btn-brand",},
                  {'type':"reset",'label':_("Cancel"),'class':"btn btn-secondary",},
            ]
            form.buttons = button
            context['form'] = form

            context['theme_group'] = 'backoffice'
            context['profile_view'] = afl_reverse('profile_view', request)
            context['breadcrumbs'] = {
                        0: {
                                    'icon': "bi bi-house",
                                    'url' : 'dashboard'
                              },

                        }
            context = self.prepare_breadcrumbs(request,context)
            render_context = {}
            render_context['context'] = context
            render_context['return_type'] = 'template_response'
            render_context['template'] = self.template
            return render_context

@method_decorator(render_method(), name='dispatch')
class ManageForm(View):
	template_name = 'frontend/builder/manage-form.html'

	def get(self, request, *args, **kwargs):
		context = self.get_context_data(request,*args, **kwargs)
		context['page_object'] = context
		context['theme_group'] = 'backoffice'
		render_context = {}
		render_context['context'] = context
		render_context['return_type'] = 'template_response'
		render_context['template'] = self.template_name
		return render_context

	def get_context_data(self,request, *args, **kwargs):
		headers = {
			'pk': _("Form id"),
			'name': _('Name'),
			'created_by': _('Created By'),
			'created_at' : _("Created At"),
		}
		context = {}

		context['table_values'] = {}
		context['table_title']    = {'title' : _("Manage Forms"), 'icon' : '<i class="la la-form text-primary"></i>'}


		bulk_actions = {}
		context['bulk_actions'] = bulk_actions
		filters = {}
		context['filter'] = filters
		headers['actions'] = _("Actions")
		context['edit_any_user'] = True
		context['is_staff'] = 'false'
		context['header_btn'] 		= {'url' : 'add_form', 'label': _('Add Form'), 'class': 'bi bi-plus mr-1', 'withOutSlider': True}
		# 	context['is_staff'] = 'true'

		# if not settings.DEBUG:
		# 	del headers['pk']

		context['users_role'] = 'staff'
		context['show_username'] = True
		context['not_sortable'] = ['id', 'name','created_by','created_at','actions']

		page_filter = {}
		# page_filter['username'] = {'label' : _('Name'), 'type' : 'autocomplete','autocomplete_url':'user-dowline-autocomplete'}

		# context['page_filter'] = page_filter
		context['page_filter_btn'] = _('Find')
		context['page_reset_btn'] = _('Reset')

		context['headers'] = headers
		context['paginations'] = range(10)
		context['label'] = _("Manage Forms")
		context['action_url'] = "bulk_processing"
		context['breadcrumbs'] = {
                            0: {
                                'icon': "bi bi-house",
                                'url' : 'dashboard'
                            },
                        }
		return context

@method_decorator(render_method(), name='dispatch')
class AddForm(View):
      template = 'frontend/builder/add-form.html'

      def prepare_breadcrumbs(self,request,context,role):
            is_redirect = request.GET.get('redirect',False)
            if not is_redirect:
                  if role:
                        is_redirect = True
            previous = False
            if is_redirect:
                  previous = request.GET.get('from',None)
                  if not previous:
                        if role == "form":
                              previous = 'manage_form'

            if previous and not previous == None:
                  if previous == 'manage_form':
                        context['label'] = _('Add Form')
                        context['breadcrumbs'].update({
                              1:{
                                    'label':_('Manage Forms'),
                                    'url'  : 'manage_form'
                              }
                        })
            return context

      def get(self, request, *args, **kwargs):
            context = {}
            initial = {}
            initial['request'] = request
            form = AddNewForm(initial=initial)
            context = {}

            button =[
                  {'type':"submit",'label':_("Save changes"),'name':"personal_details",'class':"btn btn-brand",},
                  {'type':"reset",'label':_("Cancel"),'class':"btn btn-secondary",},
            ]
            form.buttons = button
            context['form'] = form

            role = request.GET.get('role', "form")
            context['theme_group'] = 'backoffice'
            context['manage_form'] = afl_reverse('manage_form', request)
            context['breadcrumbs'] = {
                        0: {
                                    'icon': "bi bi-house",
                                    'url' : 'dashboard'
                              },

                        }
            context = self.prepare_breadcrumbs(request,context,role)
            render_context = {}
            render_context['context'] = context
            render_context['return_type'] = 'template_response'
            render_context['template'] = self.template
            return render_context

@method_decorator(render_method(), name='dispatch')
class AflManageFormsEdit(View):
	template = 'frontend/builder/manage_form_edit.html'

	def prepare_breadcrumbs(self,request,context,role):
		is_redirect = request.GET.get('redirect',False)
		if not is_redirect:
			if role:
				is_redirect = True
		previous = False
		if is_redirect:
			previous = request.GET.get('from',None)
			if not previous:
				if role == "form":
					previous = 'manage_form'

		if previous and not previous == None:
			if previous == 'manage_form':
				context['label'] = _('Edit Form Info')
				context['breadcrumbs'].update({
					1:{
						'label':_('Manage Forms'),
						'url'  : 'manage_form'
					}
				})
		return context

	def get(self, request, *args, **kwargs):
		form_kwargs = {
		}
		request_instance = copy.copy(request)
		form = EditNewForm(request=request_instance,**form_kwargs)
		context = {}

		button =[
			{'type':"submit",'label':_("Save changes"),'name':"personal_details",'class':"btn btn-brand",},
			{'type':"reset",'label':_("Cancel"),'class':"btn btn-secondary",},
		]
		form.buttons = button
		context['form'] = form

		role = request.GET.get('role', "form")
		context['role'] = role
		form_id = request.GET.get('form_id', None)
		context['form_id'] = form_id
		context['theme_group'] = 'backoffice'
		context['manage_complaints'] = afl_reverse('manage_form', request)
		# context['label'] = _('Edit Member Account Info')
		context['breadcrumbs'] = {
				0: {
                                'icon': "bi bi-house",
                                'url' : 'dashboard'
                            },

				}
		context = self.prepare_breadcrumbs(request,context,role)
		render_context = {}
		render_context['context'] = context
		render_context['return_type'] = 'template_response'
		render_context['template'] = self.template
		return render_context

@method_decorator(render_method(), name='dispatch')
class ManageEmployee(View):
	template_name = 'frontend/employee/manage-employee.html'

	def get(self, request, *args, **kwargs):
		context = self.get_context_data(request,*args, **kwargs)
		context['page_object'] = context
		context['theme_group'] = 'backoffice'
		render_context = {}
		render_context['context'] = context
		render_context['return_type'] = 'template_response'
		render_context['template'] = self.template_name
		return render_context

	def get_context_data(self,request, *args, **kwargs):
		headers = {
			'pk': _("Employee id"),
			'form': _('Form Name'),
			'created_by': _('Created By'),
			'created_at' : _("Created At"),
		}
		context = {}

		context['table_values'] = {}
		context['table_title']    = {'title' : _("Manage Employees"), 'icon' : '<i class="la la-form text-primary"></i>'}


		bulk_actions = {}
		context['bulk_actions'] = bulk_actions
		filters = {}
		context['filter'] = filters
		headers['actions'] = _("Actions")
		context['edit_any_user'] = True
		context['is_staff'] = 'false'
		context['header_btn'] 		= {'url' : 'add_employee', 'label': _('Add Employee'), 'class': 'bi bi-plus mr-1', 'withOutSlider': True}
		# 	context['is_staff'] = 'true'

		# if not settings.DEBUG:
		# 	del headers['pk']

		context['users_role'] = 'staff'
		context['show_username'] = True
		context['not_sortable'] = ['id', 'name','created_by','created_at','actions']

		page_filter = {}
		# page_filter['username'] = {'label' : _('Name'), 'type' : 'autocomplete','autocomplete_url':'user-dowline-autocomplete'}

		# context['page_filter'] = page_filter
		context['page_filter_btn'] = _('Find')
		context['page_reset_btn'] = _('Reset')

		context['headers'] = headers
		context['paginations'] = range(10)
		context['label'] = _("Manage Employees")
		context['action_url'] = "bulk_processing"
		context['breadcrumbs'] = {
                            0: {
                                'icon': "bi bi-house",
                                'url' : 'dashboard'
                            },
                        }
		return context

@method_decorator(render_method(), name='dispatch')
class AddEmployee(View):
      template = 'frontend/employee/add-employee.html'

      def prepare_breadcrumbs(self,request,context,role):
            is_redirect = request.GET.get('redirect',False)
            if not is_redirect:
                  if role:
                        is_redirect = True
            previous = False
            if is_redirect:
                  previous = request.GET.get('from',None)
                  if not previous:
                        if role == "employee":
                              previous = 'manage_employee'

            if previous and not previous == None:
                  if previous == 'manage_employee':
                        context['label'] = _('Add Employee')
                        context['breadcrumbs'].update({
                              1:{
                                    'label':_('Manage Employees'),
                                    'url'  : 'manage_employee'
                              }
                        })
            return context

      def get(self, request, *args, **kwargs):
            context = {}
            initial = {}
            initial['request'] = request
            form = AddEmployeeForm(initial=initial)
            context = {}

            button =[
                  {'type':"submit",'label':_("Save changes"),'name':"personal_details",'class':"btn btn-brand",},
                  {'type':"reset",'label':_("Cancel"),'class':"btn btn-secondary",},
            ]
            form.buttons = button
            context['form'] = form

            role = request.GET.get('role', "employee")
            context['theme_group'] = 'backoffice'
            context['manage_employee'] = afl_reverse('manage_employee', request)
            context['breadcrumbs'] = {
                        0: {
                                    'icon': "bi bi-house",
                                    'url' : 'dashboard'
                              },

                        }
            context = self.prepare_breadcrumbs(request,context,role)
            render_context = {}
            render_context['context'] = context
            render_context['return_type'] = 'template_response'
            render_context['template'] = self.template
            return render_context

@method_decorator(render_method(), name='dispatch')
class AflManageEmployeeEdit(View):
	template = 'frontend/employee/manage_employee_edit.html'

	def prepare_breadcrumbs(self,request,context,role):
		is_redirect = request.GET.get('redirect',False)
		if not is_redirect:
			if role:
				is_redirect = True
		previous = False
		if is_redirect:
			previous = request.GET.get('from',None)
			if not previous:
				if role == "employee":
					previous = 'manage_employee'

		if previous and not previous == None:
			if previous == 'manage_employee':
				context['label'] = _('Edit Employee Info')
				context['breadcrumbs'].update({
					1:{
						'label':_('Manage Employees'),
						'url'  : 'manage_employee'
					}
				})
		return context

	def get(self, request, *args, **kwargs):
		form_kwargs = {
		}
		request_instance = copy.copy(request)
		form = AddEmployeeForm(request=request_instance,**form_kwargs)
		context = {}

		button =[
			{'type':"submit",'label':_("Save changes"),'name':"personal_details",'class':"btn btn-brand",},
			{'type':"reset",'label':_("Cancel"),'class':"btn btn-secondary",},
		]
		form.buttons = button
		context['form'] = form

		role = request.GET.get('role', "employee")
		context['role'] = role
		employee_id = request.GET.get('employee_id', None)
		context['employee_id'] = employee_id
		context['theme_group'] = 'backoffice'
		context['manage_employee'] = afl_reverse('manage_employee', request)
		# context['label'] = _('Edit Member Account Info')
		context['breadcrumbs'] = {
				0: {
                                'icon': "bi bi-house",
                                'url' : 'dashboard'
                            },

				}
		context = self.prepare_breadcrumbs(request,context,role)
		render_context = {}
		render_context['context'] = context
		render_context['return_type'] = 'template_response'
		render_context['template'] = self.template
		return render_context