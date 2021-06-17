from django.core import management

# from django.contrib.auth import get_user_model

from posts.models import Category, SkillType, SkillList

import os
import shutil

# User = get_user_model()


def run(*args):
    # remove("./db.sqlite3")
    # remove("./accounts/migrations/")
    # remove("./posts/migrations/")
    # remove("./messaging/migrations/")

    management.call_command("makemigrations", interactive=False)
    management.call_command("makemigrations", "accounts", interactive=False)
    management.call_command("makemigrations", "posts", interactive=False)
    management.call_command("makemigrations", "messaging", interactive=False)
    management.call_command("migrate", interactive=False)

    # user = User(
    #     username="admin",
    #     email="admin@dpa.com",
    #     is_superuser=True,
    #     is_active=True,
    #     is_staff=True,
    # )

    # user.set_password("admin")
    # user.save()

    for category in ["book", "group", "item", "skill", "other"]:
        Category.objects.create(name=category)

    for type in ["Technical", "Communication"]:
        SkillType.objects.create(name=type)

    for skill in ["Python", "R", "Java", "JavaScript", "C++", "HTML", "CSS"]:
        SkillList.objects.create(
            name=skill, type=SkillType.objects.get(name="Technical")
        )

    if "runserver" in args:
        management.call_command("runserver")


def remove(path):
    """param <path> could either be relative or absolute."""
    if os.path.isfile(path) or os.path.islink(path):
        os.remove(path)  # remove the file
    elif os.path.isdir(path):
        shutil.rmtree(path)  # remove dir and all contains
    else:
        print(("file {} is not a file or dir.".format(path)))