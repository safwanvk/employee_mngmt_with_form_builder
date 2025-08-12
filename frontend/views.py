from django.utils.decorators import method_decorator
from django.shortcuts import redirect
from .decorators import render_method
from django.views import View
from django.utils.translation import gettext_lazy as _
from .forms import (UserLoginForm, SignUpForm)
from django.conf import settings

# Create your views here.

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
            context['breadcrumbs'].update({
                  1:{
                        'label':_('Profile'),
                        'url'  : 'profile_view'
                  }
            })
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