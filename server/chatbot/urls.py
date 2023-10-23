from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    # path('getAnswer/', views.get_answer, name='get_answer'),
]
