"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 3.1.7.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "p%p6+%oqzwg(ozz2&_pc159p69gu744*a8t88p(tgn!sdwz76e"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework.authtoken",
    "accounts.apps.AccountsConfig",
    "posts.apps.PostsConfig",
    "messaging.apps.MessagingConfig",
    "corsheaders",
    "django_filters",
    "django_extensions",
    "django_cleanup.apps.CleanupConfig",
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.TokenAuthentication",
        "accounts.authentications.OSAAuthentication",
        # "rest_framework.authentication.SessionAuthentication",
    ),
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 12,
}

# AUTHENTICATION_BACKENDS = ["accounts.backends.OSABackend"]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
    "https://gupta-anmol.github.io",
    "https://shareiiitd.tk",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "gS0Pqz0IyZ",
        "USER": "gS0Pqz0IyZ",
        "PASSWORD": "pDOmB3ACT7",
        "HOST": "remotemysql.com",
        "PORT": "3306",
    }
    # "default": {
    #     "ENGINE": "django.db.backends.sqlite3",
    #     "NAME": BASE_DIR / "db.sqlite3",
    # }
}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Asia/Kolkata"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/


STATIC_URL = "/static/"

import django_heroku

django_heroku.settings(locals())

# PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
# STATIC_ROOT = os.path.join(PROJECT_DIR, "static")

OSA_DOMAIN = "http://auth.osa.iiitd.edu.in"

OSA_URLS = {
    "TOKEN_AUTH": OSA_DOMAIN + "/token-auth/",
    "TOKEN_AUTH2": "https://osa-iiitd.herokuapp.com" + "/token-auth/",
    "CURRENT_USER": OSA_DOMAIN + "/core/current_user/",
    "RESET_PASSOWRD": OSA_DOMAIN + "/core/reset_password/",
    "VERIFY_EMAIL": OSA_DOMAIN + "/core/verify_email/",
    "RESEND_EMAIL": OSA_DOMAIN + "/core/resend_email/",
    "CHANGE_PASSWORD": OSA_DOMAIN + "/core/change_password/",
    "EDIT_PROFILE": OSA_DOMAIN + "/core/edit_profile/",
}

# OSA_AUTHENTICATION_URL = "https://osa-iiitd.herokuapp.com/token-auth/"
# OSA_CURRENT_USER_URL = "https://osa-iiitd.herokuapp.com/core/current_user/"
# OSA_RESET_PASSWORD_URL = "https://osa-iiitd.herokuapp.com/core/reset_password/"
# OSA_VERIFY_EMAIL_URL = "https://osa-iiitd.herokuapp.com/core/current_user/"
# OSA_CURRENT_USER_URL = "https://osa-iiitd.herokuapp.com/core/current_user/"
# OSA_EDIT_PROFILE_URL = "https://osa-iiitd.herokuapp.com/core/edit_profile/"

AUTH_USER_MODEL = "accounts.User"

MEDIA_ROOT = os.path.join(BASE_DIR, "media")
MEDIA_URL = "/media/"