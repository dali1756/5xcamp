from django.contrib import admin
from django.urls import path
from . import views

app_name = "cores"

urlpatterns = [
    path("", views.index, name="index"),
    path("api/branches/<str:bank_code>/", views.get_branches, name="get_branches"),
    path("api/branch-detail/<str:branch_code>/", views.get_branch_detail, name="get_branch_detail"),
]
