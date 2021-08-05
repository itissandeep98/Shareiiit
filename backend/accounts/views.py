# from backend.accounts.authentications import ExampleAuthentication
from rest_framework.response import Response
from rest_framework import generics, status, permissions, viewsets
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

from django.conf import settings
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model

# from django.contrib.auth.models import User

import requests

from .serializers import UserSerializer, UserDetailsSerializer
from .permissions import IsUser
from .models import Profile


User = get_user_model()


class LoginView(APIView):
    def post(self, request):
        authenticate(request)
        user = request.user

        # We do not need to check if user is not None because authenticate() raises exception if invalid credentials.

        Token.objects.get_or_create(user=user)
        return Response({"token": user.auth_token.key})


class LogoutView(APIView):
    def post(self, request):
        print(request.user)

        try:
            request.user.auth_token.delete()
            return Response(
                {"message": "Logged out successfully."},
                status=status.HTTP_200_OK,
            )
        except AttributeError:
            return Response(
                {"error": "No user logged in."}, status=status.HTTP_200_OK
            )


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = None

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ["list", "retrieve"]:
            permission_classes = [permissions.IsAuthenticated]
        elif self.action in ["update", "partial_update"]:
            permission_classes = [IsUser]
        else:
            permission_classes = [permissions.AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        username = self.request.query_params.get("username")

        if username is not None:
            return User.objects.filter(username=username)
        else:
            return None


class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        obj = get_object_or_404(User, username=self.request.user.username)
        return obj

    def get_queryset(self):
        return User.objects.filter(username=self.request.user.username)

    def perform_update(self, serializer):
        username = self.request.data.get("username")
        first_name = self.request.data.get("first_name")
        last_name = self.request.data.get("last_name")

        data = {}

        if username is not None:
            data["username"] = username
        else:
            data["username"] = self.request.user.username

        if first_name is not None:
            data["first_name"] = first_name
        else:
            data["first_name"] = self.request.user.first_name

        if last_name is not None:
            data["last_name"] = last_name
        else:
            data["last_name"] = self.request.user.last_name

        response = requests.post(
            settings.OSA_EDIT_PROFILE_URL,
            headers={"Authorization": f"JWT {self.request.user.osa_token}"},
            json=data,
        )

        print(response.json())

        if status.is_success(response.status_code):
            serializer.save()


# class UserList(generics.ListAPIView):
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]

#     queryset = User.objects.all()
#     serializer_class = UserSerializer


# class UserDetail(generics.RetrieveAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer