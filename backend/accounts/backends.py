# from django.conf import settings
# from django.contrib.auth.backends import BaseBackend
# from django.contrib.auth.hashers import check_password
# from django.contrib.auth.models import User

# import requests

# class OSABackend(BaseBackend):
#     """
#     Authenticate against the settings ADMIN_LOGIN and ADMIN_PASSWORD.

#     Use the login name and a hash of the password. For example:

#     ADMIN_LOGIN = 'admin'
#     ADMIN_PASSWORD = 'pbkdf2_sha256$30000$Vo0VlMnkR4Bk$qEvtdyZRWTcOsCnI/oQ7fVOu1XAURIZYoOZ3iq8Dr4M='
#     """

#     def authenticate(self, request, username=None, password=None):
#         data = {"username": username, "password": password}

#         response = requests.post('http://localhost:8001/token-auth/', data=data).json()
#         print(response.json())

#         if "token" in response:
#             try:
#                 user = User.objects.get(username=username)
#             except User.DoesNotExist:
#                 user = User(username=username)
#                 user.is_staff = True
#                 user.is_superuser = True
#                 user.save()
#             return user
#         return None

#     def get_user(self, user_id):
#         try:
#             return User.objects.get(pk=user_id)
#         except User.DoesNotExist:
#             return None