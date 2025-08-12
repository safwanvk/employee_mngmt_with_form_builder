from django.shortcuts import render
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import (
    TokenObtainPairView
)
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserProfileSerializer, RegisterSerializer
from django.http import JsonResponse
from rest_framework import status
from django.contrib.auth import login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from employee_mngmt.utils import apiSuccess
from django.utils.translation import ngettext  as _
from rest_framework.exceptions import APIException
import employee_mngmt.exceptions as ApiExceptions

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

class LogoutView(APIView):
      permission_classes = (IsAuthenticated,)
      authentication_classes = [JWTAuthentication]

      def post(self, request):
            refresh_token = request.data.get("refresh_token")
            if not refresh_token:
                  return Response({"detail": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

            try:
                  token = RefreshToken(refresh_token)
                  token.blacklist()
            except TokenError as e:
                  return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
            logout(request)
            return Response(status=status.HTTP_205_RESET_CONTENT)

class UserHasPermission(APIView):
      """
                  User permission view
      """
      permission_classes = [IsAuthenticated]
      authentication_classes = [JWTAuthentication]
      def post(self, request, *args, **kwargs):
            try:
                  resp = {}
                  req_data = request.data
                  codenames = req_data.get('codenames', [])
                  for codename in codenames:
                        has_permission = request.user.has_perm(codename)
                        print(has_permission)
                        resp[codename] = has_permission
            except Exception as e:
                  print(e)
                  # apiErrorLog(request,e)
                  raise ApiExceptions.InternalServerError(detail=_("User permission checking is failed."))

            return Response(apiSuccess(data=resp), status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def registration(request):
      if request.method == "POST":
            try:
                  serializer = RegisterSerializer(data=request.data)
                  if not serializer.is_valid():
                        raise APIException(serializer.errors , status.HTTP_400_BAD_REQUEST)
                  serializer.save()
                  return Response({'detail':'Registration success.'}, status.HTTP_201_CREATED)
            except Exception as e:
                  print(e)