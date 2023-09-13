from django.shortcuts import render
from django.http import HttpResponse
from django.contrib import messages
from rest_framework.response import Response
from django.http.response import JsonResponse
from django.contrib.auth.hashers import check_password
from django.http.response import Http404
from django.core.mail import EmailMessage, send_mail
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import force_bytes, force_str
from rest_framework.decorators import api_view, renderer_classes
from django.contrib.auth import authenticate, login, logout
from users.models import CustomUser
from backend import settings
from . tokens import generate_token


# Create your views here.


@api_view(("POST",))
def signup(request):
    if request.method == "POST":
        first_name = request.POST.get("firstname")
        last_name = request.POST.get("lastname")
        email = request.POST.get("email")
        password1 = request.POST.get("password1")
        password2 = request.POST.get("password2")
        user_type = request.POST.get("user_type")

        if CustomUser.objects.filter(email=email).exists():
            return JsonResponse("Email Already Registered!!", safe=False)

        if password1 != password2:
            return JsonResponse("Passwords didn't matched!!", safe=False)

        myuser = CustomUser.objects.create_user(email, password1)
        myuser.first_name = first_name
        myuser.last_name = last_name
        myuser.user_type = user_type
        myuser.is_active = False
        myuser.save()
    
        # Email Address Confirmation Email
        current_site = get_current_site(request)
        email_subject = "Confirm your Email @ CSE ChatBot Login!!"
        message2 = render_to_string('email_confirmation.html',{
            'name': myuser.first_name,
            'domain': current_site.domain,
            'uid': urlsafe_base64_encode(force_bytes(myuser.user_ID)),
            'token': generate_token.make_token(myuser)
        })
        email = EmailMessage(
        email_subject,
        message2,
        settings.EMAIL_HOST_USER,
        [myuser.email],
        )
        email.fail_silently = True
        email.send()
        return JsonResponse(
            "Your Account has been created succesfully!! Please check your email to confirm your email address in order to activate your account.",
            safe=False,
        )

def custom_authenticate(email=None, password=None):
    try:
        user = CustomUser.objects.get(email=email)
        if check_password(password, user.password):
            if user.is_active:
                return user
            return "NA"
        return None
    except CustomUser.DoesNotExist:
        return None
    
def activate(request,uidb64,token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        myuser = CustomUser.objects.get(user_ID=uid)
    except (TypeError,ValueError,OverflowError,CustomUser.DoesNotExist):
        myuser = None

    if myuser is not None and generate_token.check_token(myuser,token):
        myuser.is_active = True
        myuser.save()
        login(request,myuser)
        return JsonResponse("Your Account has been activated!!", safe =False,)
     
    else:
        return render(request,'activation_failed.html')


@api_view(("POST",))
def signin(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password1 = request.POST.get("password1")

        user = custom_authenticate(email=email, password=password1)
        if user == 'NA':
            return Response({"error": "User account is not activated."},status=401)
        if user is not None:
            login(request, user)
            return JsonResponse("Logged In Sucessfully!!", safe=False)
        else:
           return Response({"error": "Bad Credintials"},status=404)


@api_view(("GET",))
def signout(request):
    if request.method == "GET":
        logout(request)
        return JsonResponse("Logged Out Sucessfully!!", safe=False)
