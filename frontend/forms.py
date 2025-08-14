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


class ChangePasswordForm(forms.Form):
	old_password = forms.CharField(label=_('Old password'), widget=forms.TextInput(attrs={'class':'form-control','placeholder':_('Old password')}))
	new_password = forms.CharField(label=_('New password'), widget=forms.TextInput(attrs={'class':'form-control','placeholder':_('New password')}))
	confirmpswd = forms.CharField(label=_('Confirm new password'), widget=forms.TextInput(attrs={'class':'form-control','placeholder':_('Confirm new password')}))

	def __init__(self, *args, **kwargs):
		super(ChangePasswordForm, self).__init__(*args, **kwargs)


		if 'old_password' in self.fields:
			self.fields['old_password'].widget.attrs.update({
				'autocomplete': 'off',
				'disabled':True          #for preventing autocomplete some browser where above line not working such as Chrome
			})
		if 'new_password' in self.fields:
			self.fields['new_password'].widget.attrs.update({
				'autocomplete': 'off',
				'disabled':True          #for preventing autocomplete some browser where above line not working such as Chrome
			})
		if 'confirmpswd' in self.fields:
			self.fields['confirmpswd'].widget.attrs.update({
				'autocomplete': 'off',
				'disabled':True			#for preventing autocomplete some browser where above line not working such as Chrome
			})
		self.fields['old_password'].label = _("Old password")
		self.fields['new_password'].label = _("New password")
		self.fields['confirmpswd'].label = _("Confirm new password")

class AddNewForm(forms.Form):
	name = forms.CharField(label=_("Name"), required=True)

	def __init__(self, *args, **kwargs):
		self.request = None
		if 'request' in kwargs:
			self.request = kwargs.pop('request', None)
		super(AddNewForm, self).__init__(*args, **kwargs)
		instance = kwargs.get('instance',{})

class EditNewForm(forms.Form):
	label = forms.CharField(label=_("Label"), required=True)
	FIELD_TYPE_CHOICES =[
		('text','Text'),
		('number','Number'),
		('date','Date'),
		('password','Password'),
		('textarea','Textarea'),
		# ('select','Select'),
		('checkbox','Checkbox')
	]
	field_type = forms.ChoiceField(choices=FIELD_TYPE_CHOICES, label=_('Field type'), widget=forms.Select(), required=True)
	required = forms.BooleanField(label=_('Required'), required=False, initial=False)


	def __init__(self, *args, **kwargs):
		self.request = None
		if 'request' in kwargs:
			self.request = kwargs.pop('request', None)
		super(EditNewForm, self).__init__(*args, **kwargs)
		instance = kwargs.get('instance',{})

class AddEmployeeForm(forms.Form):
	form = forms.ChoiceField(
        choices=[
            ('', _('Please select'))
        ],
        label=_("Form"),
        widget=forms.Select(attrs={
            'class': 'form-control',
            'data-placeholder': _('Choose form'),
            'data-url': f'{settings.SERVER_URL}/api/v1/form-autocomplete/'
        })
    	)

	def __init__(self, *args, **kwargs):
		self.request = None
		if 'request' in kwargs:
			self.request = kwargs.pop('request', None)
		super(AddEmployeeForm, self).__init__(*args, **kwargs)
		instance = kwargs.get('instance',{})