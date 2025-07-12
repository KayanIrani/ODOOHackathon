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

@csrf_exempt
def create(req):
    if req.method == "POST":
        try:
            # Extract data from form (not raw body)
            title = req.POST.get("Title")
            points = req.POST.get("Points")
            description = req.POST.get("Description")
            seller = req.POST.get("Seller")
            buyer = req.POST.get("Buyer", "")  # Allow optional
            image = req.POST.get("ProductImage")
            is_bought = req.POST.get("isBought") == "on"  # Checkbox returns "on"

            # Validate
            if not all([title, points, description, seller, image]):
                return JsonResponse({"success": False, "message": "All fields except buyer are required"}, status=400)

            # Prepare payload for Express
            payload = {
                "Title": title,
                "Points": int(points),
                "Description": description,
                "Seller": seller,
                "Buyer": buyer or "",
                "ProductImage": image,
                "isBought": is_bought
            }

            res = requests.post("http://localhost:5000/api/products/", json=payload)
            return JsonResponse(res.json(), status=res.status_code)

        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=500)

    return render(req, 'ReWear/add_product.html')


def product(request, name):
    try:
        # Convert hyphenated name back to original with spaces and title case
        actual_name = name.replace('-', ' ').title()

        # Use dummy data since there's no Express product backend
        dummy_product = {
            "name": actual_name,
            "price": "₹800",
            "availability": True,
            "description": "This is a placeholder hoodie used for demo purposes.",
            "images": [
                "https://muselot.in/cdn/shop/products/Unisex--Plain--Golden-Yellow--hoodies-Muselot_6d8a2a23-85d5-468b-9c12-31f3a556300b.jpg?v=1638652618",
                "https://muselot.in/cdn/shop/products/Unisex--Plain--Golden-Yellow--hoodies-Muselot_6d8a2a23-85d5-468b-9c12-31f3a556300b.jpg?v=1638652618"
            ]
        }

        return render(request, "ReWear/product_description.html", {"product": dummy_product})

    except Exception as e:
        return render(request, "ReWear/product_description.html", {"error": str(e)})

def user(req):
    return HttpResponse("<h1> User Dashboard </h1>")