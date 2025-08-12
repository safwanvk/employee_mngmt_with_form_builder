from collections import OrderedDict

from rest_framework import status as RestStatus
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from math import ceil
from django.conf import settings

class APIBaseLimitOffsetPagination(LimitOffsetPagination):

    def get_paginated_response(self, data):
        page_number = ceil(self.offset / self.limit) + 1
        start_index = self.offset + 1
        end_index = self.offset + len(data)
        num_pages = ceil(self.count / self.limit)

        # Helper function to convert to https if necessary
      #   def convert_to_https(url):
      #       if url and settings. != 'localhost:5000':
      #           return url.replace('http', 'https')
      #       return url

        # First page URL
        first_url = None
        if page_number > 1:
            first_url = self.get_querystring(offset=0)

        # Last page URL
        last_url = None
        if page_number < num_pages:
            last_offset = (num_pages - 1) * self.limit
            last_url = self.get_querystring(offset=last_offset)

        # Make sure the URLs use https if required
        previous_link = self.get_previous_link()
        next_link = self.get_next_link()
        first_url = first_url
        last_url = last_url

        return Response(OrderedDict([
            ('status_code', RestStatus.HTTP_200_OK),
            ('errors', {}),
            ('data', {
                "results": data,
                "count": self.count,
                "previous": previous_link,
                "next": next_link,
                "first": first_url,
                "last": last_url,
                "page_obj": {
                    "number": page_number,
                    "start_index": start_index,
                    "end_index": end_index,
                    "paginator": {
                        "num_pages": num_pages
                    }
                }
            })
        ]), status=RestStatus.HTTP_200_OK)

    def get_querystring(self, offset=None):
        """
        Generate a URL with the given offset.
        """
        query_params = self.request.GET.copy()
        if offset is not None:
            query_params[self.offset_query_param] = offset
        else:
            query_params.pop(self.offset_query_param, None)
        return self.request.build_absolute_uri('?' + query_params.urlencode())

class StandardResultsSetPagination(APIBaseLimitOffsetPagination):
    default_limit = 20
    max_limit = 100