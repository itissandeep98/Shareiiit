"""
Use this script to populate a new db, if ever needed.
"""
from django.db import IntegrityError, OperationalError
import csv
from posts.models import SkillList

def run(*args):
    if "add-skills" in args:
        add_skills()

    elif "add-categories" in args:
        add_categories()

    elif "set-popular-skills" in args:
        set_popular_skills()

    else:
        add_categories()
        set_popular_skills()
        add_skills()


def add_categories():
    from posts.models import Category

    for category in ["book", "group", "item", "skill", "other"]:
        Category.objects.create(name=category)


def add_skills():
    

    with open("skills.csv") as f:
        reader = csv.reader(f)
        count = 0

        for row in reader:
            count += 1
            skill = row[0]

            # if count < 30600:
            #     continue

            try:
                SkillList.objects.create(label=skill)
            except OperationalError as e:
                print(e)
            except IntegrityError as e:
                pass

            # x = count % 100

            # if x == 0:
            #     print(skill, count)


def set_popular_skills():
    """
    Function to initialize some random skills as the popular skills in a new db by increasing their frequency
    """

    popular_skills = [
        "Python",
        "Machine Learning",
        "React.js",
        "Android Development",
        "Natural Language Processing",
        "Gardening",
        "Football",
        "Computer Vision",
        "Singing",
        "Data Mining",
        "Public Speaking",
    ]

    for sk in popular_skills:
        obj = SkillList.objects.get(label=sk)
        obj.frequency += 1
        obj.save()