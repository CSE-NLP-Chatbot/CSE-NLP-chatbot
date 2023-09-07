from django.urls import path
from . import views
# from .views import FeedbackView

urlpatterns = [
  
     path('adminDashboard/<str:feedback_type>/', views.get_feedbacks_by_feedback_type, name='get_feedbacks_by_feedback_type'),
     path('adminDashboard/<int:feedback_id>/<str:feedback_type>', views.get_feedback_type_feedback_id, name='get_feedback_type_feedback_id'),
     path('adminDashboard/<int:feedback_id>', views.get_feedback, name='get-feedback'),
     path('adminDashboard/', views.get_feedback_all, name='get-feedback_all'), 

     # path('adminDashboard/<int:pk>', FeedbackView.as_view()),
     #path('adminDashboard/<str:feedback_type>/', FeedbackView.as_view()),
     #path('adminDashboard/<str:feedback_type>/<int:pk>', FeedbackView.as_view()),
]