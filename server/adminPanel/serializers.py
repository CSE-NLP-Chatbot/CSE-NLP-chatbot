from rest_framework import serializers
from database.models import Feedback
from database.models import KnowledgeBase
class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields =( 'user',
                  'feedback_id',
                  'feedback_details',
                  'feedback_type'
                  )
                  
class  KnowledgeBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model =  KnowledgeBase
        fields =( 'update_id',
                  'update_information',
                  'update_status',
                  'feedback'
                  )