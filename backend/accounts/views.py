from rest_framework.response import Response
from rest_framework import generics, status, permissions, viewsets
from rest_framework.views import APIView

from django.contrib.auth import authenticate
from django.contrib.auth.models import User

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


class LogoutView(APIView):
    def post(self, request):
        print(request.user)

        try:
            request.user.auth_token.delete()
            return Response(
                {"message": "Logged out successfully."}, status=status.HTTP_200_OK
            )
        except AttributeError:
            return Response({"error": "No user logged in."}, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# class UserList(generics.ListAPIView):
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]

#     queryset = User.objects.all()
#     serializer_class = UserSerializer


# class UserDetail(generics.RetrieveAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer