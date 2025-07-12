from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.hashers import make_password, check_password
import json
from django.views.decorators.csrf import csrf_exempt
import requests

# Create your views here.
def home(req):
    return HttpResponse("<h1> Home </h1>")

def login(req):
    return render(req, 'ReWear/login.html')

def signup(req):
    if req.method == "POST":
        try:
            data = json.loads(req.body)

            # Hash the password before sending to Express
            raw_password = data.get("password")
            data["password"] = make_password(raw_password)

            # Add default profilePic if not present
            if "profilePic" not in data:
                data["profilePic"] = "default"

            # Forward to Express API
            response = requests.post("http://localhost:5000/api/users/signup", json=data)

            return JsonResponse(response.json(), status=response.status_code)

        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=500)

    return render(req, 'ReWear/signup.html')

def create(req):
    return HttpResponse("<h1> Create Listing </h1>")

def product(req):
    return render(req, 'ReWear/product_description.html')

def user(req):
    return HttpResponse("<h1> User Dashboard </h1>")