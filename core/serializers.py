
from rest_framework import serializers
from .models import Form, Field

class FieldSerializer(serializers.ModelSerializer):
      class Meta:
            model = Field
            fields = ['id','form','label','field_type','required','options','order']
            read_only_fields = ['form','order']

class FormSerializer(serializers.ModelSerializer):
      fields = FieldSerializer(many=True, read_only=True)
      created_by_name = serializers.ReadOnlyField(source='created_by.full_name')
      class Meta:
            model = Form
            fields = ['id','name','created_by','created_at','updated_at','fields', 'created_by_name']
            read_only_fields = ['created_by','created_at','updated_at']

      def create(self, validated_data):
            validated_data['created_by'] = self.context['request'].user
            return super().create(validated_data)