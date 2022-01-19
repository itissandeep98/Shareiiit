# from backend.accounts.authentications import ExampleAuthentication
from rest_framework.response import Response
from rest_framework import generics, status, permissions, viewsets
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model


from .serializers import UserSerializer, OSADetailsSerializer, ProfileSerializer
from .permissions import IsUser
from .models import Profile


User = get_user_model()


class LoginView(APIView):
    """
    View to login using OSA credentials. User is authenticated using OSA backend and a token is generated for the user from our backend for all future requests.
    """

    def post(self, request):
        authenticate(request)
        user = request.user
        # We do not need to check if user is not None because authenticate() raises exception if invalid credentials.

        Token.objects.get_or_create(user=user)
        return Response({"token": user.auth_token.key})


class LogoutView(APIView):
    """
    Delete the user's token with our backend.
    """

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
    lookup_field = "username"
    lookup_value_regex = "[\w@.]+"

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


class OSADetailsView(generics.RetrieveAPIView):
    """
    View to get details that are retrieved from the OSA backend at the time of login.
    """

    queryset = User.objects.all()
    serializer_class = OSADetailsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        user = get_object_or_404(User, username=self.request.user.username)

        return user

    def get_queryset(self):
        return User.objects.filter(username=self.request.user.username)


class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        obj = get_object_or_404(Profile, user=self.request.user)
        return obj