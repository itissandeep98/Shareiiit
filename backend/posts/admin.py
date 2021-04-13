from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Post)
admin.site.register(Book)
admin.site.register(Group)
admin.site.register(Category)
admin.site.register(Choice)
admin.site.register(Vote)
admin.site.register(SkillList)
admin.site.register(Skill)
admin.site.register(Message)

# admin.site.register(Book)