from django import template

register = template.Library()

@register.inclusion_tag('frontend/spinner.html')
def spinner(**kwargs):
  return {'data': kwargs}

from django.utils.safestring import mark_safe
from django.utils.encoding import force_str
from django.utils.html import escape
from django.utils.translation import get_language
from django.conf import settings
from django.core.cache import cache
from html import unescape
from frontend.utilities import afl_reverse


@register.simple_tag
def I18n_advanced_label_tag(field,**kwargs):
		
	classes = []
	label_after =""
	lable_before =""
	label = force_str(escape(field.label))
	get_lng = get_language()

	try:
		languges_list = cache.get('get_languges_list_CACHED')
		if not languges_list:
			__get_languages = dict(getattr(settings,'LANGUAGES',[]))
		else:
			__get_languages = dict(languges_list)
	except Exception as e:
		__get_languages = {}

	if label != 'False':
		if hasattr(field.field, 'locales'):
			
			for i,lngcode in enumerate(field.field.locales):
				lngname = __get_languages.get(lngcode,lngcode)
				if lngcode and get_lng and lngcode == get_lng:
					# label_after += force_str(' <span class ="multilang-%s label-multi-lang active">(<strong>%s</strong>)</span>'%(lngcode,lngcode))
					star_text =''
					if field.field.default_required or ('default_required' in kwargs and kwargs['default_required']):
						star_text =  force_str(' <span>*</span>')
					label_after += f' <span class ="multilang-{lngcode} label-multi-lang active">({lngname}){star_text}</span>'
				else :
					label_after += force_str(' <span class ="multilang-%s label-multi-lang hide">(%s)</span>'%(lngcode,lngname))
				pass
		""" Return form field label html marked to fill by `*` """
		
		attrs = {}
		
		if field.field.required or ('required' in kwargs and kwargs['required']):
			classes.append(u'required')
			label_after += force_str(' <span>*</span>')
		
	
		classes.append(kwargs.pop("class",''))
		if classes:
			attrs['class'] = u' '.join(classes)
		
		contents = lable_before+label+label_after
		
		#return mark_safe(unescape(field.label_tag(contents=contents, attrs=attrs)))
		return mark_safe(unescape(field.label_tag(contents=contents, attrs=attrs)))
	return ''

@register.inclusion_tag('frontend/empty-data.html')
def empty_data(data = None):
  return {'data': data}

@register.simple_tag
def breadcrumb_url(value=None, request=None):
	if value and request:
		if isinstance(value,str) or isinstance(value,dict):
			if isinstance(value,dict):
				name   = value.get('name',None)
				params = value.get('params',{})
				return afl_reverse(name,request,params)
			else:
				return afl_reverse(value,request)
	return ''

@register.inclusion_tag('frontend/breadcrumb_new.html')
def breadcrumb(breadcrumbs = None, request=None, label=None, mainlabel=None):
	return {'breadcrumbs': breadcrumbs,'request':request,'label':label,'mainlabel':mainlabel}