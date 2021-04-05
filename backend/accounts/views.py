from rest_framework.response import Response
from rest_framework import generics, status, permissions, viewsets
from rest_framework.views import APIView

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from .serializers import UserSerializer
from .permissions import IsUser


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

    # def get_object(self):
    #     # username = self.kwargs["username"]
    #     username = self.request.query_params.get("username")
    #     obj = get_object_or_404(User, username=username)
    #     return obj

    def get_queryset(self):
        username = self.request.query_params.get("username")

        if username is not None:
            return User.objects.filter(username=username)
        else:
            return User.objects.all()


# class UserDetailsViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserDetailsSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         return User.objects.filter(username=self.request.user.username)


# class UserList(generics.ListAPIView):
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]

#     queryset = User.objects.all()
#     serializer_class = UserSerializer


# class UserDetail(generics.RetrieveAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer