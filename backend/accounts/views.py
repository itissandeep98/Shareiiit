from rest_framework.response import Response
from rest_framework import generics, status, permissions
from rest_framework.views import APIView

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .serializers import UserSerializer


class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if user:
            return Response({"token": user.auth_token.key})
        else:
            return Response(
                {"error": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST
            )


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# class UserList(generics.ListAPIView):
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]

#     queryset = User.objects.all()
#     serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer