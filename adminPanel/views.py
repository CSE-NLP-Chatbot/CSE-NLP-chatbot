from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import FeedbackSerializer
from django.http.response import JsonResponse
from django.http.response import Http404
from rest_framework import status 
from  database.models import Feedback
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer


# Create your views here.
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
def get_feedback_all(request):
    data = Feedback.objects.all()
    serializer = FeedbackSerializer(data, many=True)
    return Response(serializer.data)   

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
 
