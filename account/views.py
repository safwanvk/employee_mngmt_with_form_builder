from django.shortcuts import render
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import (
    TokenObtainPairView
)
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import UserProfileSerializer
from django.http import JsonResponse
from rest_framework import status
from django.contrib.auth import login

# Create your views here.
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
      def validate(self, attrs):
            data = super().validate(attrs)
            return data

class CustomTokenObtainPairView(TokenObtainPairView):
      serializer_class = CustomTokenObtainPairSerializer

      def post(self, request, *args, **kwargs):
            response = super().post(request, *args, **kwargs)

            # Get user from serializer
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.user

            # Login the user (session-based)
            login(request, user)

            return response

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
@authentication_classes([JWTAuthentication])
def authUser(request):
      if request.method == "GET":
            user = request.user
            userserializer = UserProfileSerializer(user)
            return JsonResponse(userserializer.data, status=status.HTTP_200_OK)