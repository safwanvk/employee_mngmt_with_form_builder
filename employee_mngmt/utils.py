from rest_framework.views import set_rollback
from django.utils.functional import lazy
from calendar import timegm
from datetime import datetime
from django.utils.functional import lazy
from rest_framework import status as status
from django.utils.translation import gettext_lazy as _
from rest_framework import exceptions as RestExceptions
from rest_framework.response import Response
from django.conf import settings
from django.shortcuts import render
import re
# from afl_core.afl_common.utilities import SiteCommon,afl_round
# from afl_core.afl_currency.models import AflMultiCurrenciesChoosen
from django.http import Http404
from django.core.exceptions import PermissionDenied
from . import exceptions as ApiExceptions
# from afl_commerce.afl_products.models import AflProduct,AbstractProductAttributeValue
# from afl_commerce.afl_product_types.models import DatabaseUtilities
# from django.contrib.auth.models import AnonymousUser
# from .models import AflApiMultiSystemUserManager
# from afl_core.afl_common.utilities import db_table_exist
# from afl_extras.afl_log.models import LoggerDatabaseUtilities
# from afl_extras.afl_log.models import AbstractAflApiAccessLogs,AbstractAflApiErrorLogs
# import logging
# api_error_log = logging.getLogger('db_api_error')
# api_access_log = logging.getLogger('db_api_access')
import json
from django.core.cache import cache
from django.utils.functional import Promise
from django.utils.encoding import force_str
from django.core.serializers.json import DjangoJSONEncoder
# from .models import AflAPIAdminUsers
# from afl_commerce.afl_products.models import AbstractProductImages
import base64
import os
from rest_framework.settings import api_settings
import requests
# from afl_core.afl_user.models import AflUser,AflUserDetails



ERROR_CLASSES = {
	"rest_framework.exceptions.AuthenticationFailed":"AuthenticationFailed",
	"rest_framework.exceptions.NotAuthenticated":"NotAuthenticated",
	"rest_framework.exceptions.PermissionDenied":"PermissionDenied",
	"rest_framework.exceptions.NotFound":"NotFound",
	"rest_framework.exceptions.MethodNotAllowed":"MethodNotAllowed",
	"rest_framework.exceptions.NotAcceptable":"NotAcceptable",
	"rest_framework.exceptions.UnsupportedMediaType":"UnsupportedMediaType",
	"rest_framework.exceptions.Throttled":"Throttled",
	"rest_framework.exceptions.ParseError":"ParseError",
	"rest_framework.exceptions.ValidationError":"ValidationError",
	"rest_framework.exceptions.APIException":"InternalServerError",
}

def afl_exception_handler(exc, context):
	"""
	Returns the response that should be used for any given exception.

	By default we handle the REST framework `APIException`, and also
	Django's built-in `Http404` and `PermissionDenied` exceptions.

	Any unhandled exceptions may return `None`, which will cause a 500 error
	to be raised.
	"""
	if isinstance(exc, Http404):
		exc = ApiExceptions.NotFound()
	elif isinstance(exc, PermissionDenied):
		exc = ApiExceptions.PermissionDenied()

	if isinstance(exc, RestExceptions.APIException):
		if hasattr(exc,'__class__') and hasattr(exc.__class__,'__module__') and hasattr(exc.__class__,'__name__') and not isinstance(exc,RestExceptions.ValidationError):
			cls_name = exc.__class__.__module__+"."+exc.__class__.__name__
			if cls_name in ERROR_CLASSES:
				class_ = getattr(ApiExceptions, ERROR_CLASSES[cls_name])
				if class_:
					exc = class_(exc)

		headers = {}
		if getattr(exc, 'auth_header', None):
			headers['WWW-Authenticate'] = exc.auth_header
		if getattr(exc, 'wait', None):
			headers['Retry-After'] = '%d' % exc.wait

		if isinstance(exc.detail, (list, dict)):
			data = exc.detail
		else:
			data = {'detail': exc.detail}

		set_rollback()
		return Response(data, status=exc.status_code, headers=headers),exc

	return None

def custom_exception_handler(exc, context):
	# Call REST framework's default exception handler first, 
	# to get the standard error response.
	response,exc = afl_exception_handler(exc, context)
	# Now update response data with custom data.
	if response is not None:
		if isinstance(exc,RestExceptions.ValidationError):
			details = []
			if isinstance(response.data,list):
				for idx, data in enumerate(response.data):
					list_data = {}
					for key, value in data.items():
						list_data[idx] = []
						list_data[idx].append({'attribute': key, 'message': value})
					details.append(list_data)
			else:
				for key, value in response.data.items():
					error = {'attribute': key, 'message': value}
					details.append(error)
			exc.detail = details
			if not hasattr(exc,"default_error_type"):
				exc.default_error_type = "Validation Error"
		
		if not hasattr(exc,"default_error_type"):
			exc.default_error_type = 'Server Error'
				
		res = {
			"status_code":exc.status_code,
			"errors":{
				"type":exc.default_error_type,
				"detail":exc.detail
			}
		}
		response.data = res
	return response

# def make_utc(dt):
# 	if settings.USE_TZ and is_naive(dt):
# 		return make_aware(dt, timezone=utc)

# 	return dt

# def aware_utcnow():
#     return make_utc(datetime.utcnow())

def datetime_to_epoch(dt):
    return timegm(dt.utctimetuple())

def datetime_from_epoch(ts):
    return make_utc(datetime.utcfromtimestamp(ts))

def format_lazy(s, *args, **kwargs):
    return s.format(*args, **kwargs)

format_lazy = lazy(format_lazy, str)

def apiError(apiexception):
	'''
		Error formatter for non ApiView errors
	'''
	return {
		"status_code":apiexception.status_code,
		"errors":{
			"type":apiexception.default_error_type,
			"detail":apiexception.detail
		}
	}

def isApiRequest(request):
	'''
		Checking API URL format you can change here to change teh common api url format
	'''
	return request.META['PATH_INFO'].startswith("/"+settings.API_ENDPOINT_PREFIX)

def apiReturnSuccess(status_code=status.HTTP_200_OK,data=None):
	'''
		Return api success response as rest Response object
	'''
	return Response(apiSuccess(status_code,data),status=status_code)

def apiSuccess(status_code=status.HTTP_200_OK,data=None):
	'''
		API success reponse formatter
	'''
	return {
		"status_code":status_code,
		"errors":{},
		"data": ({} if data is None else data)
	}

def axesAttemptReponse(request):
	if hasattr(request,'api_axes_permenent_block') or hasattr(request,'api_axes_temporary_block'):
		if hasattr(request,'api_axes_permenent_block') and request.api_axes_permenent_block:
			response = render('afl_external_access/access-denied-permenent.html')
		else:
			response = render('afl_external_access/access-denied.html')

		response.status_code = 401
		return response
	return None

def multireplace(string, replacements, ignore_case=False):
    """
    Given a string and a replacement map, it returns the replaced string.
    :param str string: string to execute replacements on
    :param dict replacements: replacement dictionary {value to find: value to replace}
    :param bool ignore_case: whether the match should be case insensitive
    :rtype: str
    """
    # If case insensitive, we need to normalize the old string so that later a replacement
    # can be found. For instance with {"HEY": "lol"} we should match and find a replacement for "hey",
    # "HEY", "hEy", etc.
    if ignore_case:
        def normalize_old(s):
            return s.lower()

        re_mode = re.IGNORECASE

    else:
        def normalize_old(s):
            return s

        re_mode = 0

    replacements = {normalize_old(key): val for key, val in replacements.items()}
    
    # Place longer ones first to keep shorter substrings from matching where the longer ones should take place
    # For instance given the replacements {'ab': 'AB', 'abc': 'ABC'} against the string 'hey abc', it should produce
    # 'hey ABC' and not 'hey ABc'
    rep_sorted = sorted(replacements, key=len, reverse=True)
    rep_escaped = map(re.escape, rep_sorted)
    
    # Create a big OR regex that matches any of the substrings to replace
    pattern = re.compile("|".join(rep_escaped), re_mode)
    
    # For each match, look up the new string in the replacements, being the key the normalized old string
    return pattern.sub(lambda match: replacements[normalize_old(match.group(0))], string)


def check_both_list_are_qual(list1, list2):

	# If lengths of array are not
	# equal means array are not equal
	if (len(list1) != len(list2)):
		return False

	return True if (set(list1) == set(list2)) else False

from pprint import pprint as pp
from inspect import getmembers
from types import FunctionType

def pp_attributes(obj):
	disallowed_names = {
		name for name, value in getmembers(type(obj)) 
			if isinstance(value, FunctionType)
	}
	return {
		name: getattr(obj, name) for name in dir(obj)
			if name[0] != '_' and name not in disallowed_names and hasattr(obj, name)
	}

def pp_obj(obj):
	pp(pp_attributes(obj))

# def get_user(request):
# 	data = request.query_params
# 	is_api_admin = AflAPIAdminUsers.objects.filter(user=request.user).first()
# 	# if request.user == AnonymousUser():
# 	# 	if 'uid' in data and data['uid'] != '':
# 	# 		user = AflApiMultiSystemUserManager.objects.filter(unique_id=data['uid']).first()
# 	# 		if user:
# 	# 			return user.uid
# 	# 		else:
# 	# 			raise ApiExceptions.RequestFailed(_("Invalid user id"))
# 	# 	else:
# 	# 		raise ApiExceptions.RequestFailed(_("User id is required."))
# 	# else:
# 	if request.user.is_admin or is_api_admin:
# 		if 'uid' in data and data['uid'] != '':
# 			user = AflApiMultiSystemUserManager.objects.filter(unique_id=data['uid']).first()
# 			if user:
# 				return user.uid
# 			else:
# 				raise ApiExceptions.RequestFailed(_("Invalid user id"),error_type="Invalid User")
			
# 	return request.user

# def date_formate(request,date):
# 	userdetails = AflUserDetails.objects.filter(uid=request.user).first()
# 	if userdetails and userdetails.extra:
# 		if 'tz' in userdetails.extra:
# 			import pytz
# 			my_timestamp = date
# 			new_timezone = pytz.timezone(userdetails.extra['tz'])
# 			new_timezone_timestamp = my_timestamp.astimezone(new_timezone)
# 			return new_timezone_timestamp.strftime("%d %b %Y, %I:%M %p")
# 	return date.strftime("%d %b %Y, %I:%M %p")

def db_get_tables(connection,tb):
	'''
		filter tables using keyword and db connection.
		Return list of table names.
	'''
	from django.db import connections
	db_cursor = connections[connection].cursor()
	check_exists_query = "SELECT relname FROM pg_class WHERE relname LIKE %s and relkind = 'r';"
	db_cursor.execute(check_exists_query, [tb+"%"])
	row = [item[0] for item in db_cursor.fetchall()]
	return row

# def getApiAccessLogger(request):
# 	'''
# 		Return Access logger Model based on API APP
# 	'''
# 	date_iso = datetime.now().isocalendar()
# 	if hasattr(request,"api_app"):
# 		tb_log_access = '{}{}_{}_{}'.format("api_access_log_",request.api_app.pk,date_iso[1],date_iso[0])
# 		util = LoggerDatabaseUtilities()
# 		if not db_table_exist('logger',tb_log_access):
# 			util.create_table_with_dynamic_model_class(tb_log_access, AbstractAflApiAccessLogs)

# 		LoadTB = util.get_dynamic_model_class(tb_log_access, AbstractAflApiAccessLogs)
# 		return LoadTB

# 	return None

class AflLazyEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, Promise):
            return force_str(obj)
        return super(AflLazyEncoder, self).default(obj)

# def getApiErrorLogger(request):
# 	'''
# 		Return Error logger Model based on API APP
# 	'''
# 	date_iso = datetime.now().isocalendar()
# 	if hasattr(request,"api_app"):
# 		tb_log_error = '{}{}_{}_{}'.format("api_error_log_",request.api_app.pk,date_iso[1],date_iso[0])	 
# 		util = LoggerDatabaseUtilities()
# 		if not db_table_exist('logger',tb_log_error):
# 			util.create_table_with_dynamic_model_class(tb_log_error, AbstractAflApiErrorLogs)

# 		LoadTB = util.get_dynamic_model_class(tb_log_error, AbstractAflApiErrorLogs)
# 		return LoadTB

# 	return None

# def api_get_log_config():
# 	'''
# 		Get API log config from cache
# 	'''
# 	api_log_config = cache.get('get_api_log_config')
# 	if not api_log_config:
# 		api_log_config = SiteCommon().get_variables(['api_log_request_data','api_log_response_data'])
# 		if "api_log_request_data" not in api_log_config:
# 			api_log_config["api_log_request_data"] = False
# 		if "api_log_response_data" not in api_log_config:
# 			api_log_config["api_log_response_data"] = False
# 		cache.set('get_api_log_config', api_log_config, 24*60*2)
# 	return api_log_config

def api_set_log_config(config = None):
	'''
		Set API log config to cache
	'''
	cache.set('get_api_log_config', config, 24*60*2)

def get_remote_data(url, params):

	response = requests.request("GET", url, headers=(params["header"] if "header" in params else {}), data=(params["body"] if "body" in params else {}), files=(params["files"] if "files" in params else []),timeout=settings.API_REQUEST_TIMOUT)
	print("here",response.__dict__)
	if response.status_code == 200:
		try:			
			return response.json()
		except Exception as er:
			pass
			# apiErrorLog(None,er,'remote_request')

	return None


# def apiAccessLog(request,response):
#     '''
#         Add log to API Access Log
#     '''
#     logger_model = getApiAccessLogger(request)
#     request_data = {}
#     allowed_methods = ["GET","POST","DELETE","PUT"]
#     if request.method in allowed_methods:
#         if request.method == "DELETE":
#             request_data = json.dumps(dict(getattr(request, "GET")),cls=AflLazyEncoder)
#         else:
#             request_data = json.dumps(dict(getattr(request, request.method)),cls=AflLazyEncoder)

#     response_data = {}
#     if hasattr(response,'data'):
#         response_data = json.dumps(dict(response.data),cls=AflLazyEncoder)

#     app = request.api_app if hasattr(request,"api_app") else None
#     user = None
#     if not isinstance(request.user,AnonymousUser):
#         user = request.user.pk
#     log_data = {
#         'app':app,
#         'ip': get_client_ip_address(request),
#         'host': request.META['HOSTNAME'] if 'HOSTNAME' in request.META else '',
#         'method':request.method,
#         'status':response.status_code,
#         'path': request.get_full_path(),
#         'request_data': request_data,
#         'response_data': response_data,
#         'log_model':logger_model,
#         'user':user
#     }
#     api_access_logger = logging.LoggerAdapter(api_access_log, log_data)
#     api_access_logger.info(log_data)

# def apiErrorLog(request,ex,method=None):
#     '''
#         Add log to API Error Log
#     '''
#     try:
#         fname = ex.__traceback__.tb_frame.f_code.co_filename
#         view = ""
#         if hasattr(ex.__traceback__.tb_frame.f_locals["self"],'get_view_name'):
#             view = ex.__traceback__.tb_frame.f_locals["self"].get_view_name()
#         func_name = ex.__traceback__.tb_frame.f_code.co_name
#         line_num = ex.__traceback__.tb_lineno
#         ip = '127.0.0.1'
#         method = (method if method else '')
#         host = path = ''
#         user = logger_model = app = None
#         request_data = {}
#         if request:
#             ip = get_client_ip_address(request)
#             host = request.META['HOSTNAME'] if 'HOSTNAME' in request.META else ''
#             method = request.method
#             path = request.get_full_path()
#             logger_model = getApiErrorLogger(request)
#             allowed_methods = ["GET","POST","DELETE","PUT"]
#             if request.method in allowed_methods:
#                 if request.method == "DELETE":
#                     request_data = json.dumps(dict(getattr(request, "GET")),cls=AflLazyEncoder)
#                 else:
#                     request_data = json.dumps(dict(getattr(request, request.method)),cls=AflLazyEncoder)
#             app = request.api_app if hasattr(request,"api_app") else None
#             if not isinstance(request.user,AnonymousUser):
#                 user = request.user.pk
#         log_data = {
#             'ip': ip,
#             'host': host,
#             'method':method,
#             'path': path,
#             'request_data': request_data,
#             'log_model':logger_model,
#             'app':app,
#             'er_path':fname,
#             'er_view':view,
#             'er_func':func_name,
#             'er_line_num':line_num,
#             'user':user
#         }
#         api_error_logger = logging.LoggerAdapter(api_error_log, log_data)
#         api_error_logger.error(ex)
#     except Exception as e:
#         print('api_error_log_adding_error', e)
#         pass	

def get_client_ip(request):
	try:
		xff = request.META.get('HTTP_X_FORWARDED_FOR')
		remote_addr = request.META.get('REMOTE_ADDR')
		num_proxies = api_settings.NUM_PROXIES
		if num_proxies is not None:
			if num_proxies == 0 or xff is None:
				return remote_addr
			addrs = xff.split(',')
			client_addr = addrs[-min(num_proxies, len(addrs))]
			return client_addr.strip()

		return ''.join(xff.split()) if xff else remote_addr

	except Exception as e:
		pass
	return "127.0.0.1"


# API Create order client ip issue fix function.
def get_client_remote_address(request):
	ip_address="127.0.0.1"
	try:
		xff = request.META.get('HTTP_X_FORWARDED_FOR')
		addrs = xff.split(',')
		ip_address = addrs[0]
	except Exception as e:
		remote_addr = request.META.get('REMOTE_ADDR')
		if  remote_addr:
			ip_address= remote_addr
	return ip_address
