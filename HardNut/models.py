from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    pass


class Room(models.Model):
    room_creator = models.ForeignKey("User", on_delete = models.CASCADE)
    room_name = models.CharField(max_length = 50)
    room_created_date = models.DateTimeField(auto_now_add = True)


class Goal(models.Model):
    goal_creator = models.ForeignKey("User", on_delete = models.CASCADE)
    goal = models.CharField(max_length = 200)
    goal_created_date = models.DateField(auto_now_add = True)
    goal_end_date = models.DateField(max_length = 200)
    goal_achieved = models.BooleanField(default = False)
    goal_reward = models.CharField(max_length = 100, default = None)