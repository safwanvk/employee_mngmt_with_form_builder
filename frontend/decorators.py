import functools
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.template.response import TemplateResponse
from functools import wraps

class render_method():
	''' 
	Wrap view functions to render python native and custom

	@method_decorator(render_method(), name='dispatch')
	class TestmyResponse(View):
		def get(self, request, *args, **kwargs):
			# for TemplateResponse
			context = {'context':context_data, 'return_type' : 'template_response', 'template': template_name}
			# for JsonResponse
			context = {'context':context_data, 'return_type' : 'json_response'}
			# for HttpResponse
			context = {'context':context_data, 'return_type' : 'http_response'}
			# for HttpResponseRedirect
			context = {'redirect_url':url, 'return_type' : 'redirect_response'}

	'''
	def __init__(self, **kwargs):
		self.kwargs = kwargs
	
	def __call__(self, f):
		@functools.wraps(f)
		def wrapper(*args, **kwargs):
			return self._render(f, *args, **kwargs)
		return wrapper
	
	def _render(self, f, *args, **kwargs):
            request = args[0]
            data = f(*args, **kwargs)
            from django.core.handlers.wsgi import WSGIRequest
            if data and 'context' in data:
                  if request and hasattr(request, 'api_flag') and request.api_flag == True:
                        return data['context']
                  elif data and 'return_type' in data and data['return_type']:
                        if data['return_type'] == 'template_response' and 'template' in data:
                              return TemplateResponse(request,data['template'], data['context'])
                        elif data['return_type'] == 'http_response':
                              if 'content_type' in data:
                                    return HttpResponse(data['context'], content_type=data['content_type'])
                              return HttpResponse(data['context'])
                        elif data['return_type'] == 'json_response':
                              safe = True   
                              if 'safe' in data:
                                    safe = data['safe']
                              return JsonResponse(data['context'], safe=safe)
                        elif data['return_type'] == 'redirect_response':
                              return data['context']
            elif data and 'return_type' in data and data['return_type'] == 'redirect_response' and 'redirect_url' in data:
                  return HttpResponseRedirect(data['redirect_url'])
            elif data and isinstance(request,WSGIRequest) and request and 'context' in data:
                  return JsonResponse(data['context'])
            return data