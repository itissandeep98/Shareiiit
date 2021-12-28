# from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from django.conf import settings


from rest_framework import authentication
from rest_framework import exceptions
from rest_framework import status

from django.contrib.auth import get_user_model

from requests.exceptions import ConnectionError

User = get_user_model()


import requests


class OSAAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        osa_token = request.headers.get("osa-token")
        userData = None

        try:
            # if VPN is connected this should be executed

            if osa_token is not None:
                # auto authenticate if token was found in cookies and sent in the request header

                response = requests.get(
                    settings.OSA_URLS["CURRENT_USER"],
                    headers={"Authorization": "JWT " + osa_token},
                )

                print(response.status_code)

                if not status.is_success(response.status_code):
                    raise exceptions.AuthenticationFailed(
                        _("Invalid osa token")
                    )

                userData = response.json()

            else:
                response = requests.post(
                    settings.OSA_URLS["TOKEN_AUTH"],
                    data={"username": username, "password": password},
                )

        except ConnectionError as e:
            # if VPN is not connected this should be executed
            # TODO: Remove this second auth. It is temporary.

            # print("exception", type(e))

            response = requests.post(
                settings.OSA_URLS["TOKEN_AUTH2"],
                data={"username": username, "password": password},
            )

        if status.is_success(response.status_code):
            print(response.json())
            # osa_token = response.json()["token"]

            # if not userData["is_verified"]:
            #     return None

            if userData is None:
                userData = response.json()["user"]

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
                # user.is_staff = True
                # user.is_superuser = True
                user.save()

            return (user, None)

        # if user is None:
        raise exceptions.AuthenticationFailed(_("Invalid username or password"))
