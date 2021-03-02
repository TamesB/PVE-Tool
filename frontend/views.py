from django.shortcuts import render
from pve import models 

# Create your views here.
def index(request):
    return render(request, 'frontend/index.html')