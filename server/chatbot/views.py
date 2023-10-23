from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http.response import JsonResponse
from django.http.response import Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status 
from  database.models import Feedback
from  database.models import KnowledgeBase
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
# from . import chain


# @api_view(('POST',))
# @csrf_exempt
# def get_answer(request):
#     if request.method=='POST':
#         try:
#             question = request.data['question']
#             print(question)
#             output = chain({"question": question}, return_only_outputs=True)
#             answer = output['answer']
#             return Response({"answer": answer.strip('\n')}, status=200)
#         except Exception:
#             return Response({"error": "Something went wrong"}, status=404)

# Create your views here.
@api_view(('GET',))
def home(request):
    return Response({"message": "Welcome to the admin panel"}, status=200)