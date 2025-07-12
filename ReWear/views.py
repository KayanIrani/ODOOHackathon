from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def home(req):
    return HttpResponse("<h1> Home </h1>")

def login(req):
    return HttpResponse("<h1> Home </h1>")

def signup(req):
    return HttpResponse("<h1> Signup </h1>")

def create(req):
    return HttpResponse("<h1> Create Listing </h1>")

def product(req):
    return HttpResponse("<h1> My Products </h1>")

def user(req):
    return HttpResponse("<h1> User Dashboard </h1>")




