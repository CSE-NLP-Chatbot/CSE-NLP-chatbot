from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ChatTitleSerializer, ChatConversationSerializer, ChatRealTimeSerializer, UserFeedbackSerializer
from django.http.response import JsonResponse
from django.http.response import Http404
from rest_framework import status 
from  database.models import ChatHistory
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework.parsers import JSONParser
import re
import jwt
from users.models import CustomUser
from django.http import JsonResponse
import requests
from django.conf import settings
from chatbot import chain
import os
from dotenv import load_dotenv
from django.views.decorators.csrf import csrf_exempt
from .decorators import require_user_permission
from rest_framework.decorators import api_view
# import jwt


# Create your views here.

@csrf_exempt
# @require_user_permission
@api_view(['GET'])
def get_Token(request):
    token = request.COOKIES.get('jwt')
    return JsonResponse({"token": token}, status=200)

@csrf_exempt
@api_view(['GET'])
# @require_user_permission
def get_userID(request):
    if request.headers['Authorization']:
        token = request.headers['Authorization']
    else:
        return JsonResponse({"error": "You are not authorized to access this resource"}, status=401)
    
    if token:
        try:
            payload = jwt.decode(token, settings.SECRET_KEY_JWT, algorithms=['HS256'])
            user = CustomUser.objects.filter(email=payload['email']).first()
            if user:
                return JsonResponse({"user_id": user.user_ID, "user_type":user.user_type,}, status=200)
        except jwt.exceptions.DecodeError:
            return JsonResponse({"error": "You are not authorized to access this resource"}, status=401)
        except jwt.ExpiredSignatureError:
            return JsonResponse({"error": "You are not authorized to access this resource"}, status=401)
    return JsonResponse({"error": "You are not authorized to access this resource"}, status=401)    

# Getting conversation titles.
# @require_user_permission
@api_view(['GET'])
def get_conversation_title(request, user_ID ):
    if request.method=='GET': # can be removed.
        try:
            conversationTitle = ChatHistory.objects.filter(user_id=user_ID).values('conversation_title').distinct() #find matching user
            # data = conversationTitle.filter()
            serializer = ChatTitleSerializer(conversationTitle, many = True)
            return Response(serializer.data)
        except ChatHistory.DoesNotExist:
            # Return a 404 response if the ChatHistory does not exist
            return Response({"error": "ChatHistory Does Not Exist"},status=status.HTTP_404_NOT_FOUND)



    
# Retriving all past conversation for each user
# @require_user_permission
@api_view(['GET'])
def get_conversation_by_user_id(request,user_ID ):
    if request.method == 'GET':
        try:
            conversation = ChatHistory.objects.filter(user_id=user_ID)
            # data = conversationTitle.filter()
            serializer = ChatConversationSerializer(conversation,many=True)
            return Response(serializer.data)
        except ChatHistory.DoesNotExist:
            # Return a 404 response if the ChatHistory does not exist
            return Response({"error": "ChatHistory Does Not Exist"},status=status.HTTP_404_NOT_FOUND)
        
# the function to take response from AI bot. That takes question from user.
def response_by_bot(question):
    output = chain({"question": question}, return_only_outputs=True)
    answer = output['answer']
    return answer.strip('\n')

# Receiving questions from chatpage
# @require_user_permission
@api_view(['POST'])
def real_time_chat(request,user_ID):
    if request.method == 'POST':
        # data = JSONParser().parse(request)
        modified_data = request.data
        modified_data['user'] = user_ID
        modified_data['answer'] = response_by_bot(modified_data['question'])
        form = ChatRealTimeSerializer(data=modified_data)
        if form.is_valid():
            form.save()
            return Response(modified_data['answer'], status=status.HTTP_201_CREATED)
        else:
            return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response('Invalid HTTP method !.', status=status.HTTP_400_BAD_REQUEST)
    
# Receiving feedbacks from feedbackpage
# @require_user_permission
@api_view(['POST'])
def user_feedback(request,user_ID):
    if request.method == 'POST':
        # data = JSONParser().parse(request)
        modified_data = request.data
        modified_data['user'] = user_ID
        # modified_data['answer'] = response_by_bot(modified_data['question'])
        form = UserFeedbackSerializer(data=modified_data)
        if form.is_valid():
            form.save()
            return Response("Your feedback has been successfully submitted", status=status.HTTP_201_CREATED)
        else:
            return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response('Invalid HTTP method !.', status=status.HTTP_400_BAD_REQUEST)


# azure voice token generater to STT
# subscription key and region
subscription_key = os.getenv("SUBSCRIPTION_KEY")    # Azure subscription key
region = os.getenv("REGION")

# Secret key for signing the JWT
# secret_key = 'YOUR_SECRET_KEY'

# The token endpoint URL
token_url = f"https://{region}.api.cognitive.microsoft.com/sts/v1.0/issueToken"


def generate_azure_token(request):

    # Send a POST request to the Azure token URL to get the token
    headers = {
        'Ocp-Apim-Subscription-Key': subscription_key
    }
    response = requests.post(token_url, headers=headers)

    if response.status_code == 200:
        # Get the token from the response
        token = response.text

        # may add additional claims to the JWT if necesary
        jwt_payload = {}

        # Encode the token as a JWT 
        # encoded_token = jwt.encode(jwt_payload, secret_key, algorithm='HS256')

        return JsonResponse({'token': token})
    else:
        return JsonResponse({'error': 'Failed to generate Azure token'}, status=500)
