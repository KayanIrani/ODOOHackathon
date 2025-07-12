from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.hashers import make_password, check_password

# Create your views here.
def home(req):
    return HttpResponse("<h1> Home </h1>")

def login(req):
    return render(req, 'ReWear/login.html')

def signup(req):
    return render(req, 'ReWear/signup.html')

def create(req):
    return HttpResponse("<h1> My Products </h1>")

def product(req):
    return render(req, 'ReWear/product_description.html')

def user(req):
    return HttpResponse("<h1> User Dashboard </h1>")




