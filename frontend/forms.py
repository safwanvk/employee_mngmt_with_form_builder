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

class AflAbstractUserForm(forms.Form):
	first_name = forms.CharField(max_length=20,label=_('First Name'))
	last_name = forms.CharField(max_length=20, label=_('Last Name'))
	email = forms.CharField(max_length=50, label=_('Email'))
	phone_number = forms.CharField(max_length=10, label=_('Phone Number'))

	def __init__(self, *args, **kwargs):
		# pp("AflAbstractUserForm---------------")
		# Get 'initial' argument if any	
		initial_arguments = kwargs.get('initial', None)
		if not hasattr(self,'request') or not self.request:
			if initial_arguments:
				self.request = initial_arguments.get('request',None)
			else:
				self.request = None

		super(AflAbstractUserForm, self).__init__(*args, **kwargs)
		self.fields['last_name'].label = _('Last Name')
		self.fields['email'].label = _('Email address')
		self.fields['phone_number'].label = _('Phone Number')

class UserCreationForm(AflAbstractUserForm):
	"""A form for creating new users. Includes all the required
	fields, plus a repeated password."""
	password = forms.CharField(label=_('Password'), widget=forms.TextInput(attrs={'class':'form-control','placeholder':_('Password')}))
	confirmpswd = forms.CharField(label=_('Password confirmation'), widget=forms.TextInput(attrs={'class':'form-control','placeholder':_('Password')}))

class SignUpForm(UserCreationForm):
	"""docstring for AddNewStaffForm"""

	def __init__(self, *args, **kwargs):
		super(SignUpForm, self).__init__(*args, **kwargs)


		if 'password' in self.fields:
			self.fields['password'].widget.attrs.update({
				'autocomplete': 'off',
				'disabled':True          #for preventing autocomplete some browser where above line not working such as Chrome
			})
		if 'confirmpswd' in self.fields:
			self.fields['confirmpswd'].widget.attrs.update({
				'autocomplete': 'off',
				'disabled':True			#for preventing autocomplete some browser where above line not working such as Chrome
			})
		self.fields['password'].label = _("Password")
		self.fields['confirmpswd'].label = _("Password confirmation")