from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.hashers import make_password, check_password
import json
from django.views.decorators.csrf import csrf_exempt
import requests

# Create your views here.
def home(req):
    return render(req, 'ReWear/home.html')

@csrf_exempt
def login(req):
    if req.method == "POST":
        try:
            data = json.loads(req.body)
            username = data.get("username")
            password = data.get("password")

            if not username or not password:
                return JsonResponse({"success": False, "message": "Both fields required"}, status=400)

            # Get user from Express
            res = requests.get(f"http://localhost:5000/api/users/search?name={username}")
            json_data = res.json()

            if not json_data["success"] or not json_data["data"]:
                return JsonResponse({"success": False, "message": "User not found"}, status=404)

            user = json_data["data"][0]
            hashed_password = user.get("UserPassword")

            if not hashed_password:
                return JsonResponse({"success": False, "message": "Password missing from DB"}, status=500)

            # Match entered password with hash
            if check_password(password, hashed_password):
                return JsonResponse({"success": True, "match": True})
            else:
                return JsonResponse({"success": True, "match": False, "message": "Incorrect password"})

        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=500)

    return render(req, 'ReWear/login.html')


def signup(req):
    if req.method == "POST":
        try:
            data = json.loads(req.body)

            # Hash the password before sending to Express
            raw_password = data.get("UserPassword")
            data["UserPassword"] = make_password(raw_password)

            # Add default profilePic if not present
            if "UserImage" not in data:
                data["UserImage"] = "default"

            # Forward to Express API
            response = requests.post("http://localhost:5000/api/users/", json=data)

            return JsonResponse(response.json(), status=response.status_code)

        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=500)

    return render(req, 'ReWear/signup.html')

def create(req):
    return render(req, 'ReWear/add_product.html')

def product(request, name):
    try:
        # GET product data from Express backend by name
        response = requests.get(f"http://localhost:5000/api/products?name={name}")
        if response.status_code != 200:
            return render(request, "ReWear/product_description.html", {"error": "Product not found"})

        product = response.json()

        # Convert the image string to a list if it's a string
        if isinstance(product.get("images"), str):
            product["images"] = json.loads(product["images"])

        # Convert string 'true'/'false' to boolean
        product["availability"] = product.get("availability", "").lower() == "true"

        return render(request, "ReWear/product_description.html", {"product": product})

    except Exception as e:
        return render(request, "ReWear/product_description.html", {"error": str(e)})

def user(req):
    return HttpResponse("<h1> User Dashboard </h1>")