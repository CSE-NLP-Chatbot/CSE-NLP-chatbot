from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import FeedbackSerializer
from django.http.response import JsonResponse
from django.http.response import Http404
from  database.models import Feedback
# Create your views here.

class FeedbackView(APIView):

    def get_feedback(self,pk):
        print(pk)
        try:
            feedback=Feedback.objects.get(feedback_id=pk)
            return feedback
        except:
            raise JsonResponse("Feedback Does Not Exit", safe=False)
    def get_feedback_by_type(self,feedback_type):
        try:
            feedbacks = Feedback.objects.filter(feedback_type=feedback_type)
            return feedbacks
        except:
             raise JsonResponse("Feedbacks Does Not Exit", safe=False) 
          
    def get(self,request,pk=None):
        selected_pk=request.GET.get('pk')
        # print(selected_pk)
        feedback_type = request.GET.get('feedback_type')
        # print("inside get = ",request.query_params)
        # feedback_type= request.query_params.get('feedback_type')
        # selected_pk = request.query_params.get('pk')
        if pk:
            data = self.get_feedback(pk)
            serializer = FeedbackSerializer(data)
        elif (feedback_type):
            data=self.get_feedback_by_type(feedback_type=feedback_type)
            if selected_pk:
                data = data.filter(pk=selected_pk).first()
            if selected_pk and not data:
                raise JsonResponse("Feedback Does Not Exist for the Specified Type", safe=False)
            
            serializer = FeedbackSerializer(data)
        else:
            data = Feedback.objects.all()
            serializer = FeedbackSerializer(data, many=True)
        return Response(serializer.data)