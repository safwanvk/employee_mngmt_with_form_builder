from django.conf import settings
# from afl_core.afl_common.models import SiteLogoUpload, QuickLinksMenus, QuickLinksUser
from django.core.cache import cache
# from .models import AflLanguages
# from afl_core.afl_user.user import afl_website_prefix
import os
# from afl_commerce.afl_commerce_methods.models import CommerceMethodConf
from django.utils.translation import get_language,get_language_info
from django.urls import reverse
import functools
# from afl_user.user import afl_website_prefix
from frontend.utilities import afl_reverse
from django.urls import reverse

@functools.lru_cache(maxsize=10)
def global_settings(request=None):
	context = {
		'settings': settings, 
	}
	context['SERVER_URL'] = settings.SERVER_URL
	context['dashboard_url'] = afl_reverse('dashboard',request)
	context['login_url'] = reverse('login_url')
	return context

# @functools.lru_cache(maxsize=10)
def theme(request):
	return_data = {}
	if hasattr(request, 'site_theme') and request.site_theme:
		return_data['SITE_THEME'] = request.site_theme
	return return_data
