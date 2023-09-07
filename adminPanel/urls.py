from django.urls import path
from .views import FeedbackView

urlpatterns = [
     path('adminDashboard/', FeedbackView.as_view()),
     # path('adminDashboard/<int:pk>', FeedbackView.as_view()),
     #path('adminDashboard/<str:feedback_type>/', FeedbackView.as_view()),
     #path('adminDashboard/<str:feedback_type>/<int:pk>', FeedbackView.as_view()),
]