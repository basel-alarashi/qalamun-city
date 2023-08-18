from django.db import models
from django.contrib.auth.models import User


class Sport(models.Model):
    name = models.CharField(max_length=127)
    fee = models.CharField(max_length=63)
    image = models.ImageField(null=True, blank=True, upload_to='images/')

    def __str__(self):
        return self.name


class Participant(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)
    sport = models.ManyToManyField(
        to=Sport,
        related_name='participant',
        blank=True
    )
    phone = models.CharField(max_length=63)
    length = models.IntegerField()
    weight = models.IntegerField()
    sexuality = models.CharField(max_length=20)
    sick = models.BooleanField(default=False)
    joined_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username
