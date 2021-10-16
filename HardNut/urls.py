from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("all_rooms", views.all_rooms, name="all_rooms"),
    path("create_room", views.create_room, name="create_room"),
    path("study/<str:room_id>", views.study, name="study"),
    path("goals", views.goals, name="goals"),
    path("goal_change_status/", views.goal_change_status, name="goal_name_status"),
    path("goal_analysis", views.goal_analysis, name="goal_analysis"),
    path("goal_delete/", views.goal_delete, name = "goal_delete"),
    path("edit_goal/", views.edit_goal),
    path("room_delete/", views.room_delete),
    path("edit_room/", views.edit_room),
]