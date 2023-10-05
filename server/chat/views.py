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


# Create your views here.
# Getting conversation titles.


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
    return "Welcome"

# Receiving questions from chatpage
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
