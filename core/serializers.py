
from rest_framework import serializers
from .models import Form, Field, Employee

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

class EmployeeSerializer(serializers.ModelSerializer):
      form_name = serializers.CharField(source='form.name', read_only=True)
      class Meta:
            model = Employee
            fields = ['id','form','form_name','data','created_by','created_at','updated_at']
            read_only_fields = ['created_by','created_at','updated_at']