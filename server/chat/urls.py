from django.urls import path
from . import views
# from .views import FeedbackView

urlpatterns = [
     # expose urls in chat application by Yubee.
     path('chat/<int:user_ID>/titles/', views.get_conversation_title, name='get_conversation_title'),
     path('chat/<int:user_ID>/return_conversation/', views.get_conversation_by_user_id, name='get_conversation_by_user_id'),
     path('chat/<int:user_ID>/real_time/', views.real_time_chat, name='real_time_chat'),
     path('user_feedback/<int:user_ID>/submit_feedback/', views.user_feedback, name='user_feedback'),
]