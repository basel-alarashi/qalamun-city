from django.contrib import admin
from .models import *
from django.contrib.auth.models import Group

admin.site.unregister(Group)

admin.site.register(Sport)

admin.site.register(Participant)
