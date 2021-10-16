from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.forms import ModelForm
from django.core.paginator import Paginator
from .models import User, Room, Goal
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django import forms

# Create your views here.
def index(request):
    return render(request, "education/index.html")
    # Do some animations


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "education/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "education/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "education/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "education/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "education/register.html")


def all_rooms(request):
    user = request.user
    rooms = Room.objects.order_by("-room_created_date").filter(room_creator = user)
    return render(request, "education/all_rooms.html", {
        "rooms" : rooms
    })


def create_room(request):
    if request.method == "POST":
        room = request.POST['room']
        new_room = Room(room_creator = request.user, room_name = room)
        new_room.save()
        return HttpResponseRedirect(reverse("all_rooms"))


def study(request, room_id):
        room = Room.objects.get(id=room_id)
        return render(request, "education/study_room.html", {
            "room" : room
        })


def goals(request):
    user = User.objects.get(username = request.user.username)

    if request.method == "POST":
        goal = request.POST['goal']
        end = request.POST["end_goal"]
        reward = request.POST["reward_goal"]

        new_goal = Goal(goal_creator = user, goal_end_date = end, goal = goal, goal_reward = reward)
        new_goal.save()

        return HttpResponseRedirect(reverse("goals"))

    else:
        goals = Goal.objects.order_by("-goal_created_date").filter(goal_creator = user)
        return render(request, "education/goals.html", {
            "goals" : goals
        })


@login_required
@csrf_exempt
def goal_change_status(request):
    if request.method =="POST":
        goal_id = request.POST.get("id")
        is_achieved = request.POST.get("is_achieved")

        try:
            goal = Goal.objects.get(id=goal_id)

            if is_achieved == "no":

                goal.goal_achieved = False
                is_achieved = "yes"

            elif is_achieved == "yes":
                goal.goal_achieved = True
                is_achieved = "no"

            goal.save()

            return JsonResponse({"is_achieved":is_achieved,  "status": 201})
        except:
            return JsonResponse({'error': "Shit Happened not found", "status": 404})
    return JsonResponse({}, status=400)



def goal_analysis(request):
    user=request.user
    goals_completed = Goal.objects.filter(goal_creator = user, goal_achieved =True)
    goals_inprogress = Goal.objects.filter(goal_creator = user, goal_achieved = False)
    goals_total = Goal.objects.filter(goal_creator = user)


    return render(request, "education/analysis.html", {
        "goals_completed" : goals_completed,
        "goals_inprogress" : goals_inprogress,
        "goals_total" : goals_total
    })


@login_required
@csrf_exempt
def goal_delete(request):
    if request.method == "POST":
        goal_id = request.POST.get("id")
        try:
            goal = Goal.objects.get(id=goal_id)
            goal.delete()
            return JsonResponse({"status": 201})
        except:
            return JsonResponse({'error': "Shit Happened not found", "status": 404})
    return JsonResponse({}, status=400)



@login_required
@csrf_exempt
def edit_goal(request):
    if request.method == "POST":
        goal_id = request.POST.get('id')
        goal_rewards = request.POST.get('goal_rewards')
        goal_name = request.POST.get('goal_name')
        goal_end_date = request.POST.get('goal_end_date')
        try:
            goal = Goal.objects.get(id=goal_id)
            goal.goal = goal_name.strip()
            goal.goal_end_date = goal_end_date.strip()
            goal.goal_reward = goal_rewards.strip()
            goal.save()
            return JsonResponse({}, status=201)
        except:
            return JsonResponse({}, status=404)

    return JsonResponse({}, status=400)


@login_required
@csrf_exempt
def room_delete(request):
    if request.method == "POST":
        room_id = request.POST.get("id")
        try:
            room = Room.objects.get(id=room_id)
            room.delete()
            return JsonResponse({"status": 201})
        except:
            return JsonResponse({'error': "Shit Happened not found", "status": 404})
    return JsonResponse({}, status=400)


@login_required
@csrf_exempt
def edit_room(request):
    if request.method == "POST":
        room_id = request.POST.get('id')
        room_name = request.POST.get('room_name')

        try:
            room = Room.objects.get(id=room_id)
            room.room_name = room_name.strip()
            room.save()
            return JsonResponse({}, status=201)
        except:
            return JsonResponse({}, status=404)

    return JsonResponse({}, status=400)
from django.shortcuts import render

# Create your views here.
