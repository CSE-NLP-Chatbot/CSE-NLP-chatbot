from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from rest_framework.response import Response
from rest_framework import status
from django.http.response import JsonResponse
from django.contrib.auth.hashers import check_password
from django.http.response import Http404
from django.core.mail import EmailMessage,EmailMultiAlternatives
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import force_bytes, force_str
from rest_framework.decorators import api_view, renderer_classes
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from users.models import CustomUser
from backend import settings
from . tokens import generate_token
import jwt,datetime
from django.utils.html import strip_tags
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication



# Create your views here.


@api_view(("POST",))
@csrf_exempt
def signup(request):
    print("iop")
    if request.method == "POST":
        username = request.data.get("username")
        email = request.data.get("email")
        password1 = request.data.get("pword")
        password2 = request.data.get("confirmPword")
        device = request.data.get("device")
       

        if CustomUser.objects.filter(email=email).exists():
            return JsonResponse("Email Already Registered", safe=False)

        if password1 != password2:
            return JsonResponse("Passwords didn't matched", safe=False)
        
        if len(password1) < 8:
            return JsonResponse("Password is too short", safe=False)
        
        myuser = CustomUser.objects.create_user(email, password1)
        myuser.username = username
        myuser.is_active = False
        if device == "mobile":
            myuser.is_active = True
            myuser.save()
        else:
            myuser.save()
            print('Insignup',request.user.is_authenticated)
            # Email Address Confirmation Email
            current_site = get_current_site(request)
            email_subject = "Confirm your CSE ChatBot account!!"
            message2 = render_to_string('email_template.html',{
                'name': myuser.username,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(myuser.user_ID)),
                'token': generate_token.make_token(myuser)
            })
            email = EmailMultiAlternatives(
            email_subject,
            strip_tags(message2),
            settings.EMAIL_HOST_USER,
            [myuser.email],
            )
            email.attach_alternative(message2,'text/html')
            email.fail_silently = True
            email.send()
        return JsonResponse(
            "Your Account has been created succesfully",
            safe=False,
        )
    
@api_view(["GET"])
def get_user_role(request):
    if request.user.is_authenticated:
        user_role = request.user.user_type
        return Response({"user_type": user_role}, status=status.HTTP_200_OK)
    else:
        return Response({"detail": "User is not authenticated."}, status=status.HTTP_401_UNAUTHORIZED)
    
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
        print('Inactivate1',request.user.is_authenticated)
        login(request,myuser)
        print('Inactivate2',request.user.is_authenticated)
        return render(request,'activated_successfully.html')
     
    else:
        return render(request,'activation_failed.html')


@api_view(("POST",))
@csrf_exempt
def signin(request):
    print("klf3")
    if request.method == "POST":
        email = request.data.get("email")
        password1 = request.data.get("password")
        print("klf")
        user = custom_authenticate(email=email, password=password1)
        print("kl")
        if user == 'NA':
            return JsonResponse({"error": "User account is not activated."},safe=False)
        if user is not None:
            
            login(request, user)
            payload={
            'email':email,
            'password':password1,
            'exp':datetime.datetime.utcnow()+datetime.timedelta(minutes=60),
            'iat':datetime.datetime.utcnow()
            }
            token=jwt.encode(payload,settings.SECRET_KEY_JWT,algorithm='HS256')
            if user.login_times == 0:
                user.login_times +=1
                res=Response()
                res.data={ 
                'message':'First Login, Logged in Successfully!!',
                'email':user.email
            }
            else:
                user.login_times +=1
                user.save()
                res=Response()
                res.data={ 
                'message':'Logged in Successfully!!',
                'email':user.email}
           
            res.set_cookie(key='jwt',value=token,httponly=True) 
            return res
            
            
        else:
           return JsonResponse({"error": "Bad Credintials"},safe=False)


@api_view(("GET",))
@csrf_exempt
def signout(request):
    if request.method == "GET":
        response=Response()
        response.delete_cookie('jwt')
        response.data={
            'message':'Logged out Successfully!!'
        }
        logout(request)
        return response
    
    
@api_view(("PUT",))
def editprofile(request):
    if request.method == "PUT":
        firstname = request.data.get("firstname")
        lastname = request.data.get("lastname")
        role = request.data.get("role")
        aboutu = request.data.get("aboutu")
        email = request.data.get("email")
        avatar = request.data.get("avatar")
        
        user = CustomUser.objects.get(email=email)
        print(email)
        
        user.first_name=firstname 
        user.last_name=lastname
        user.user_type=role
        user.about_you=aboutu
        user.profile_pic=avatar

        print( type(user.profile_pic))
       
        user.save()

        return JsonResponse("Information saved Sucessfully!!", safe=False)


@api_view(("PUT",))
def changepassword(request):
    if request.method == "PUT":
        currentPassword = request.data.get("currentPassword")
        newPassword = request.data.get("newPassword")
        confirmNewPassword = request.data.get("confirmNewPassword")
        email = request.data.get("email")

        if newPassword != confirmNewPassword:
            return JsonResponse("Passwords didn't matched", safe=False)
        
        if len(newPassword) < 8:
            return JsonResponse("Password is too short", safe=False)
        
        user = custom_authenticate(email=email, password=currentPassword)

        if user is not None:
            user.set_password(newPassword)
            user.save()
            return JsonResponse("password changed successfully", safe=False)

        else:
           return JsonResponse("Bad Credintials",safe=False)
                             
        

        
