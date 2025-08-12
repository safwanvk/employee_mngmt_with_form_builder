from rest_framework import serializers
from .models import User
class UserProfileSerializer(serializers.ModelSerializer):

      class Meta:
            model = User
            fields = ['pk', 'email',
                        'phone_number', 'createdAt', 'title', 'full_name', 'first_name', 'last_name']

      def __init__(self, *args, **kwargs):
            super().__init__(*args, **kwargs)