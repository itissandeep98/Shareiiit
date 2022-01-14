# SECURITY WARNING: don't run with debug turned on in production!

import os

DEBUG = False

# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.mysql",
#         "NAME": "shareiiitd",
#         "USER": "root",
#         "PASSWORD": "password",
#         "HOST": "localhost",
#         "PORT": "3306",
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_USER_PASS'),
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}

# MEDIA_ROOT = os.path.join(BASE_DIR, "media")
# MEDIA_URL = "/media/"