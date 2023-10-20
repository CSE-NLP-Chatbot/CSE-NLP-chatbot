from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import FeedbackSerializer
from .serializers import KnowledgeBaseSerializer
from django.http.response import JsonResponse
from django.http.response import Http404
from rest_framework import status 
from  database.models import Feedback
from  database.models import KnowledgeBase
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
import jwt,datetime
from users.models import CustomUser
from backend import settings
from .decorators import require_admin_permission


# Create your views here.
@require_admin_permission
@api_view(("GET",))
def modaBanula(request):
    token=request.COOKIES.get('jwt')
    try:
        payload = jwt.decode(token, settings.SECRET_KEY_JWT, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
            return JsonResponse('Unauthenticated!')
    user =  CustomUser.objects.filter(email=payload['email']).first()
    return JsonResponse(user.email, safe=False) 

@require_admin_permission
@api_view(('GET','DELETE'))
def get_feedback(request, feedback_id):
    if request.method=='GET':
        try:
            feedback = Feedback.objects.get(feedback_id=feedback_id)
            serializer = FeedbackSerializer(feedback)
            return Response(serializer.data)
        except Feedback.DoesNotExist:
            # Return a 404 response if the feedback does not exist
            return Response({"error": "Feedback Does Not Exist"},status=404)
        
    elif request.method=='DELETE':
        try:
            feedback = Feedback.objects.get(feedback_id=feedback_id)
            feedback.delete()
            return Response({"message": "Feedback deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Feedback.DoesNotExist:
            # Return a 404 response if the feedback does not exist
            return Response({"error": "Feedback Does Not Exist"},status=404)  

         
@api_view(('GET',))
@require_admin_permission
def get_feedback_all(request):
    data = Feedback.objects.all()
    serializer = FeedbackSerializer(data, many=True)
    return Response(serializer.data)   

@require_admin_permission
@api_view(('GET','DELETE'))
def get_feedbacks_by_feedback_type(request,feedback_type):
    if request.method=='GET':
        try:
            feedbacks = Feedback.objects.filter(feedback_type=feedback_type)
            serializer = FeedbackSerializer(feedbacks, many=True)
            return Response(serializer.data)
        except Feedback.DoesNotExist:
            # Return a 404 response if the feedback does not exist
            return Response({"error": "Feedback Does Not Exist"},status=status.HTTP_404_NOT_FOUND)
    
    elif request.method=='DELETE':
        try:
            feedbacks = Feedback.objects.filter(feedback_type=feedback_type)
            feedbacks.delete()
            return Response({"message": f"All feedbacks of type {feedback_type} deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Feedback.DoesNotExist:
            # Return a 404 response if no feedbacks of the specified type exist
            return Response({"error": "Feedbacks Do Not Exist for the Specified Type"}, status=status.HTTP_404_NOT_FOUND)

@require_admin_permission    
@api_view(('GET','DELETE'))
def get_feedback_type_feedback_id(request,feedback_id,feedback_type):
    if request.method=='GET':
        try:
            feedbacks = Feedback.objects.filter(feedback_type=feedback_type)
            data = feedbacks.filter(feedback_id=feedback_id).first()
            serializer = FeedbackSerializer(data)
            return Response(serializer.data)
        except Feedback.DoesNotExist:
            # Return a 404 response if the feedback does not exist
            return Response({"error": "Feedback Does Not Exist"},status=status.HTTP_404_NOT_FOUND)
        
    if request.method=='DELETE':
        try:
            feedbacks = Feedback.objects.filter(feedback_type=feedback_type)
            data = feedbacks.filter(feedback_id=feedback_id).first()
            data.delete()
            return Response({"message": f"A feedback of type {feedback_type} deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Feedback.DoesNotExist:
            # Return a 404 response if the feedback does not exist
            return Response({"error": "Feedback Does Not Exist for the Specified Type id"},status=status.HTTP_404_NOT_FOUND)

@require_admin_permission
@api_view(('POST',))
def update_knowledgebase(request):
     if request.method=='POST':
        data = request.data
        serializer = KnowledgeBaseSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Update Information Added Successfully",safe=False)
        return JsonResponse("Failed to Add Update Information",safe=False)

@require_admin_permission          
@api_view(('GET',))
def get_knowledgebase_info_all(request):
    data = KnowledgeBase.objects.all()
    serializer = KnowledgeBaseSerializer(data, many=True)
    return Response(serializer.data)   

@require_admin_permission
@api_view(('GET','DELETE'))
def get_knowledgebase_info(request, update_id):
    if request.method=='GET':
        try:
            update_info = KnowledgeBase.objects.get(update_id=update_id)
            serializer = KnowledgeBaseSerializer(update_info)
            return Response(serializer.data)
        except KnowledgeBase.DoesNotExist:
            # Return a 404 response if the feedback does not exist
            return Response({"error": "Information Does Not Exist"},status=404)
        
    elif request.method=='DELETE':
        try:
            update_info = KnowledgeBase.objects.get(update_id=update_id)
            update_info.delete()
            return Response({"message": "information deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Feedback.DoesNotExist:
            # Return a 404 response if the feedback does not exist
            return Response({"error": "Information Does Not Exist"},status=404)
        
@require_admin_permission
@api_view(('POST',))
def save_file(request):
    data = request.FILES.get('file')
    with open(f"D:\Code Playground\SEP\chatbot\server\KnowledgeBaseFiles\{data}"  , 'w') as fi:
        for chunk in data.chunks():
            fi.write(chunk.decode('utf-8'))  # Assuming the file is text-based
    return Response({"message": "Successfully recieved"}, status=200)
            