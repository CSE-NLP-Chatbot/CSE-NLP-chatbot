from django.test import Client, TestCase
from django.urls import reverse, resolve
# from adminPanel.views import get_feedback_all, get_feedback, get_feedbacks_by_feedback_type
from database.models import Feedback
from users.models import CustomUser
import json

class TestUrls(TestCase):
    
    def setUp(self) -> None:
        self.client = Client()
        self.get_feedback = reverse('get-feedback', args=[1])
        self.get_feedback_all_url = reverse('get-feedback_all')
        self.get_feedbacks_by_feedback_type_url = reverse('get_feedbacks_by_feedback_type', args=['ACCURACY'])
        self.customUser = CustomUser.objects.create(
            first_name = 'Hansini',
            last_name = 'Karunarathne',
            user_type = 'undergraduate',
        )
        
        self.feedback = Feedback.objects.create(
            feedback_id = 1,
            feedback_type = 'ACCURACY',
            user = self.customUser,
            feedback_details = ''
        )
    
    def test_get_feedback_all(self):
        response = self.client.get(self.get_feedback_all_url)
        self.assertEquals(response.status_code, 200)
        
    def test_get_feedback(self):
        response = self.client.get(self.get_feedback)
        self.assertEquals(response.status_code, 200)
        
    def test_get_feedbacks_by_feedback_type(self):
        response = self.client.get(self.get_feedbacks_by_feedback_type_url)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.json()[0]['feedback_type'], 'ACCURACY')
        
    def test_empty_get_feedbacks_by_feedback_type(self):
        response = self.client.get(reverse('get_feedbacks_by_feedback_type', args=['PERFORMANCE']))
        self.assertEquals(response.json(), [])
        
    def test_get_feedback_type_feedback_id(self):
        response = self.client.get(reverse('get_feedback_type_feedback_id', args=[1,'ACCURACY']))
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.json()['feedback_type'], 'ACCURACY')
        self.assertEquals(response.json()['feedback_id'], 1)
        
    def test_delete_get_feedback(self):
        Feedback.objects.create(
            feedback_id = 2,
            feedback_type = 'PERFORMANCE',
            user = self.customUser,
            feedback_details = ''
        )
        response = self.client.delete(reverse('get-feedback', args=[2]))
        self.assertEquals(response.status_code, 204)
        
    def test_delete_get_feedback_no_data(self):
        response = self.client.delete(reverse('get-feedback', args=[3]))
        self.assertEquals(response.status_code, 404)
