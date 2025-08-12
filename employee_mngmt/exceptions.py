import math

import django
from django.conf import settings
from django.http import JsonResponse
from django.utils.encoding import force_str
from django.utils.translation import gettext_lazy as _
from django.utils.translation import ngettext
from django.views import defaults as djangoDefaults
from rest_framework import exceptions, status


class DetailDictMixin:

	def __init__(self, detail=None, error_type=None, code=None):
		"""
		Builds a detail dictionary for the error to give more information to API
		users.
		"""
		detail_dict = {"message":self.default_detail}

		if isinstance(detail, dict):
			detail_dict = detail
		elif detail is not None:
			detail_dict['message'] = detail


		if error_type is not None:
			self.default_error_type = error_type
		
		if code is not None:
			self.status_code = code

		super().__init__([detail_dict])

class InternalServerError(DetailDictMixin,exceptions.APIException):
    	default_error_type = 'Server Error'

class ValidationError(exceptions.ValidationError):
	default_error_type = 'Validation Error'
	default_detail = _("The supplied values are not valid. Please check and try again.")

class ParseError(DetailDictMixin,exceptions.ParseError):
	default_error_type = "Parse Error"

class AuthenticationFailed(DetailDictMixin,exceptions.AuthenticationFailed):
	default_error_type = "Authentication Error"

class NotAuthenticated(DetailDictMixin,exceptions.NotAuthenticated):
	default_error_type = "Not Authenticated"

class PermissionDenied(DetailDictMixin,exceptions.PermissionDenied):
	default_error_type = "Permission Denied"

class NotFound(DetailDictMixin,exceptions.NotFound):
	default_detail = _('The requested resource not found.')
	default_error_type = "Not Found"

class MethodNotAllowed(exceptions.MethodNotAllowed):
	default_error_type = "Method Not Allowed"

	def __init__(self, method, detail=None, code=None):
		if detail is None:
			detail = [{"message":force_str(self.default_detail).format(method=method)}]
		super(MethodNotAllowed, self).__init__(method, detail, code)

class NotAcceptable(DetailDictMixin,exceptions.NotAcceptable):
    	default_error_type = 'Not Acceptable'

class UnsupportedMediaType(exceptions.UnsupportedMediaType):
	default_error_type = 'Unsupported Media Type'

	def __init__(self, media_type, detail=None, code=None):
		if detail is None:
			detail = [{"message":force_str(self.default_detail).format(media_type=media_type)}]
		super(UnsupportedMediaType, self).__init__(media_type, detail, code)

class Throttled(exceptions.APIException):

	status_code = status.HTTP_429_TOO_MANY_REQUESTS
	default_detail = _('Request was throttled.')
	extra_detail_singular = _('Expected available in {wait} second.')
	extra_detail_plural = _('Expected available in {wait} seconds.')
	default_code = 'throttled'
	default_error_type = 'Throttled'

	def __init__(self, wait=None, detail=None, code=None):
		if isinstance(detail,django.utils.functional.Promise):
			detail = str(detail)
		if detail is None:
			detail = force_str(self.default_detail)
		if wait is not None:
			wait = math.ceil(wait)
			detail = [{"message":' '.join((
                detail,self.get_throttle_wait(wait)
                ))}]
		else:
			detail = [{"message":detail}]
		self.wait = wait
		super(Throttled, self).__init__(detail, code)
	
	def get_throttle_wait(self,wait):
		return force_str(ngettext(self.extra_detail_singular.format(wait=wait),self.extra_detail_plural.format(wait=wait),wait))
							
class ThrottledByMinute(Throttled):
	
	def get_throttle_wait(self,wait):
		m, s = divmod(wait, 60)
		if m:
			self.extra_detail_singular = _('Expected available in {min} minutes.')
			self.extra_detail_plural = _('Expected available in {min} minutes and {sec} seconds.')
			return force_str(self.extra_detail_plural.format(min=m,sec=s) if s else self.extra_detail_singular.format(min=m))
		else:
			return super(ThrottledByMinute, self).get_throttle_wait(wait)

class ThrottledByHour(ThrottledByMinute):
	
	def get_throttle_wait(self,wait):
		m, s = divmod(wait, 60)
		h, m = divmod(m, 60)
		if h:
			self.extra_detail_singular = _( 'Expected available in {hour} hours.')
			self.extra_detail_plural = _('Expected available in {hour} hours {min} minutes and {sec} seconds.')
			return force_str(self.extra_detail_plural.format(hour=h,min=m,sec=s) if m else self.extra_detail_singular.format(hour=h))
		else:
			return super(ThrottledByHour, self).get_throttle_wait(wait)


class SecurityError(DetailDictMixin,exceptions.PermissionDenied):
	default_error_type = "Access Denied"

class AxesLockout(AuthenticationFailed):
	pass

class RequestFailed(AuthenticationFailed):
	default_error_type = "Request Failed"
	default_detail = _('Couldn\'t validate the request.')

class InvalidToken(AuthenticationFailed):
	status_code = status.HTTP_401_UNAUTHORIZED
	default_detail = _('Token is invalid or expired')
	default_code = 'token_not_valid'
	default_error_type = "Invalid Token"

class InvalidSSOToken(AuthenticationFailed):
	status_code = status.HTTP_401_UNAUTHORIZED
	default_detail = _('Invalid SSO Token')
	default_code = 'token_not_valid'
	default_error_type = "Invalid SSO Token"

class TokenError(Exception):
    pass

class TokenBlacklistedError(Exception):
    pass

class TokenSettingsError(Exception):
    pass

class TokenBackendError(Exception):
    pass

class AxesError(Exception):
    pass

def server_error(request, *args, **kwargs):
	"""
	Generic 500 error handler.
	"""
	path = str(request.path)
	if path.startswith("/"+settings.API_ENDPOINT_PREFIX):
		data = {
			"status_code":status.HTTP_500_INTERNAL_SERVER_ERROR,
			"errors":{
				"type":"Server Error",
				"detail":[
					{
						"message":_("Servers are not working as expected. The request is probably valid but needs to be requested again later.")
					}
				]
			}
		}
		return JsonResponse(data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
	else:
		return djangoDefaults.server_error(request)

def bad_request(request, exception, *args, **kwargs):
	"""
	Generic 400 error handler.
	"""
	path = str(request.path)
	if path.startswith("/"+settings.API_ENDPOINT_PREFIX):
		data = {
			"status_code":status.HTTP_400_BAD_REQUEST,
			"errors":{
				"type":"Bad Request",
				"detail":[
					{
						"message":_("Invalid input. Please check the data and try again.")
					}
				]
			}
		}
		return JsonResponse(data, status=status.HTTP_400_BAD_REQUEST)
	else:
		return djangoDefaults.bad_request(request, exception)

def page_not_found(request, exception=None):
	"""
	Generic 404 error handler.
	"""
	path = str(request.path)
	if path.startswith("/"+settings.API_ENDPOINT_PREFIX):
		data = {
			"status_code":status.HTTP_404_NOT_FOUND,
			"errors":{
				"type":"Page Not Found",
				"detail":[
					{
						"message":_("The requested resource not found.")
					}
				]
			}
		}
		return JsonResponse(data, status=status.HTTP_404_NOT_FOUND)
	else:
		return djangoDefaults.page_not_found(request, exception)
		
	
def permission_denied(request, exception=None):
	"""
	Generic 403 error handler.
	"""
	path = str(request.path)
	if path.startswith("/"+settings.API_ENDPOINT_PREFIX):
		data = {
			"status_code":status.HTTP_403_FORBIDDEN,
			"errors":{
				"type":"Permission Denied",
				"detail":[
					{
						"message":_("OOPS! You are not authorized.")
					}
				]
			}
		}
		return JsonResponse(data, status=status.HTTP_403_FORBIDDEN)
	else:
		return djangoDefaults.permission_denied(request, exception)


'''
Exceptions for Non ApiViews
'''

class CoreExceptionDictMixin:

	def __init__(self, detail=None, error_type=None, code=None):
		"""
		Builds a detail dictionary for the error to give more information to API
		users.
		"""
		self.detail = {"message":self.default_detail}

		if isinstance(detail, dict):
			self.detail = detail
		elif detail is not None:
			self.detail['message'] = detail

		if error_type is not None:
			self.default_error_type = error_type

		if code is not None:
			self.status_code = code
		self.detail = [self.detail]

		super().__init__()
	

class BadRequest(CoreExceptionDictMixin,Exception):	
	status_code = status.HTTP_400_BAD_REQUEST
	default_detail = _('Malformed request.')
	default_error_type = "Bad Request"

class InvalidAppToken(CoreExceptionDictMixin,Exception):
	status_code = status.HTTP_400_BAD_REQUEST
	default_detail = _("The supplied APIKEY is invalid.")
	default_error_type = "Invalid APIKEY"

class InternalError(CoreExceptionDictMixin,Exception):
	status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
	default_detail = _("Something went wrong. Couldn't process the request.")
	default_error_type = 'Server Error'


