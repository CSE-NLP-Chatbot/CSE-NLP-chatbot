from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path
from . import views

urlpatterns = [
    path("signup/", views.signup, name="signup"),
    path("activate/<uidb64>/<token>/", views.activate, name="activate"),
    path("login/", views.signin, name="login"),
    path("signout/", views.signout, name="signout"),
    path("editprofile/", views.editprofile, name="editprofile"),
    path("changepassword/", views.changepassword, name="changepassword"),
    path("secret/", views.secret, name="secret"),
    
]
