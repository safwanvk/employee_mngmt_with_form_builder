from django.conf import settings
from django.urls import reverse

def afl_prefix_checkindex():
    from django.conf import settings
    return_list = {}
    index = 2
    return return_list

def afl_website_prefix():
      from django.conf import settings
      if settings.SITE_PREFIX:
            return settings.SITE_PREFIX
      else:
            return 'v1/'

def afl_reverse(url_name, request, kwargs={}, args=None):
	
	
	from django.utils.text import slugify
	import copy
	copy_kwargs_dict = copy.deepcopy(kwargs)
	copy_args_list = copy.deepcopy(args)
	kwargs = {} #reset kwargs
	args = None #reset args
	prefix_index = afl_prefix_checkindex()
	if prefix_index: 
		if settings.USE_USERNAME:
			__cookie_name = settings.SUBDOMINE_COOKIE_NAME if hasattr(settings,'SUBDOMINE_COOKIE_NAME') else 'subdomine'
			username = request.COOKIES.get(__cookie_name,None) if request else settings.DUMMY_USERNAME
			if not username:
				username = request.user.username if request and request.user.is_authenticated else settings.DUMMY_USERNAME
			if copy_args_list:
				list_args = list(copy_args_list)
				list_args.insert(prefix_index['uname']-2,username)
				copy_args_list = tuple(list_args)
				copy_kwargs_dict = None
			else:
				copy_kwargs_dict['prefix'] = username
			

		if settings.USE_GEOPREFIX and get_geo_prefix(url_name):
			__geo_cookie_name = settings.GEO_COOKIE_NAME if hasattr(settings,'GEO_COOKIE_NAME') else 'geo_code'
			geo = request.COOKIES.get(__geo_cookie_name,None) if request else settings.DUMMY_GEO
			if not geo:
				if hasattr(request,'geo_code'):
					geo = request.geo_code
				else:
					geo = slugify(request.user.country_code) if request and request.user.is_authenticated and request.user.country_code else settings.DUMMY_GEO
			else:
				geo = slugify(geo)
			if copy_args_list:
				list_args = list(copy_args_list)
				list_args.insert(prefix_index['geo']-2,geo)
				copy_args_list = tuple(list_args)
				copy_kwargs_dict = None
			else:
				copy_kwargs_dict['geoprefix'] = geo
	
	return reverse(url_name,kwargs=copy_kwargs_dict,args=copy_args_list)