# from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from django.conf import settings


from rest_framework import authentication
from rest_framework import exceptions
from rest_framework import status

from django.contrib.auth import get_user_model

User = get_user_model()


import requests


class OSAAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        # if username == None or password == None:
        #     return None

        response = requests.post(
            settings.OSA_URLS["TOKEN_AUTH"],
            data={"username": username, "password": password},
        )

        if status.is_success(response.status_code):
            print(response.json())
            # osa_token = response.json()["token"]
            userData = response.json()["user"]

            # if not userData["is_verified"]:
            #     return None

            username_osa = userData["username_osa"]
            username_retreived = userData["username"]
            first_name = userData["first_name"]
            last_name = userData["last_name"]

            try:
                user = User.objects.get(username_osa=username_osa)
                user.first_name = first_name
                user.last_name = last_name
                # user.email = username_retreived
                user.username = username_retreived
                # user.osa_token = osa_token
                user.save()
            except User.DoesNotExist:
                user = User()
                user.first_name = first_name
                user.last_name = last_name
                # user.email = username_retreived
                user.username = username_retreived
                user.username_osa = username_osa
                # user.osa_token = osa_token
                user.is_staff = True
                user.is_superuser = True
                user.save()

            # print(user.osa_token)
            return (user, None)

        # if user is None:
        raise exceptions.AuthenticationFailed(_("Invalid username/password."))
