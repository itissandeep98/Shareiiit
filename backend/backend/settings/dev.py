# SECURITY WARNING: don't run with debug turned on in production!

import os
from pathlib import Path

DEBUG = True
BASE_DIR = Path(__file__).resolve().parent.parent.parent


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    # "default": {
    #     "ENGINE": "django.db.backends.mysql",
    #     "NAME": "gS0Pqz0IyZ",
    #     "USER": "gS0Pqz0IyZ",
    #     "PASSWORD": "pDOmB3ACT7",
    #     "HOST": "remotemysql.com",
    #     "PORT": "3306",
    # }
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# MEDIA_ROOT = os.path.join(BASE_DIR, "media")
# MEDIA_URL = "/media/"
