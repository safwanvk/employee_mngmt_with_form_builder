from django import forms
from django.utils.translation import gettext_lazy as _
from django.conf import settings

class UserLoginForm(forms.Form):
	email = forms.CharField(label=_('Email'),max_length=250,widget=forms.TextInput(attrs={'class':'form-control','placeholder':'Email'}))
	password = forms.CharField(label=_('Password'),max_length=250,widget=forms.TextInput(attrs={'class':'form-control','placeholder':'Password'}))
	def __init__(self, *args, **kwargs):
		self.request = None
		if 'request' in kwargs:
			self.request = kwargs.pop('request', None)
		kwargs.setdefault('label_suffix', '')
		super(UserLoginForm, self).__init__(*args, **kwargs)