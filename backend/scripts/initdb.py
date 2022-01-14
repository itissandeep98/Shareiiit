def run(*args):
    if "add-skills" in args:
        add_skills()

    if "add-categories" in args:
        from posts.models import Category

        for category in ["book", "group", "item", "skill", "other"]:
            Category.objects.create(name=category)


def add_skills():
    from django.db import IntegrityError
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

            # if langid.classify(skill)[0] == "en":
            try:
                SkillList.objects.create(name=skill)
            except IntegrityError as e:
                pass

            x = count % 100

            # if x == 0:
            #     print(skill, count)
