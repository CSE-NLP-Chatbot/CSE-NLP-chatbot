from rest_framework import serializers
from database.models import Feedback

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields =( 'user',
                  'feedback_details',
                  'feedback_type'
                  )
                  