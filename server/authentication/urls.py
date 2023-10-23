from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path
from . import views

urlpatterns = [   
    path("userRole/", views.get_user_role,name="userRole"),
    path("signup/", views.signup, name="signup"),
    path("activate/<uidb64>/<token>/", views.activate, name="activate"),
    path("login/", views.signin, name="login"),
    # path("signin/", views.signin, name="signin"),
    path("signout/", views.signout, name="signout"),
    path("editprofile/", views.editprofile, name="editprofile"),
    path("changepassword/", views.changepassword, name="changepassword"),
]
