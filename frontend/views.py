from django.utils.decorators import method_decorator
from django.shortcuts import redirect
from .decorators import render_method
from django.views import View
from django.utils.translation import gettext_lazy as _
from .forms import (UserLoginForm)
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

            if not request.user.is_authenticated:
                  return redirect('login_url')

            # Dashboard Widget visibility settings
            self.context['settings'] = settings
            context = {'template' : self.template_name, 'context':self.context, 'return_type' : 'template_response'}
            return context