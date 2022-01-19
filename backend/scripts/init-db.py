"""
Use this script to populate a new db, if ever needed.
"""


def run(*args):
    if "add-skills" in args:
        add_skills()

    if "add-categories" in args:
        add_categories()


def add_categories():
    from posts.models import Category

    for category in ["book", "group", "item", "skill", "other"]:
        Category.objects.create(name=category)


def add_skills():
    from django.db import IntegrityError, OperationalError
    import csv
    from posts.models import SkillList

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