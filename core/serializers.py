
from rest_framework import serializers
from .models import Form, Field, Employee
import employee_mngmt.exceptions as ApiExceptions
from rest_framework import exceptions as ApiCoreExceptions

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
      fields_arr = FieldSerializer(many=True, read_only=True, source='form.fields')
      class Meta:
            model = Employee
            fields = ['id','form','form_name','data','created_by','created_at','updated_at', 'fields_arr']
            read_only_fields = ['created_by','created_at','updated_at']

class EmployeeDeleteSerializer(serializers.Serializer):
      def validate(self, attrs):
            try:
                  request = self.context['request']
                  data = request.data
                  if data.getlist('bulk_id', None) is not None:
                        pass
                  else:
                        raise ApiExceptions.ValidationError({'bulk_id': 'Id is not found.'})
                  return {}
            except Exception as e:
                  if isinstance(e, ApiCoreExceptions.APIException):
                        raise
                  else:
                        print(e)
                        # apiErrorLog(self.request, e)
                        raise ApiExceptions.InternalServerError()
      def save(self):
            try:
                  request = self.context['request']
                  data = request.data
                  if data.get('bulk_id', None) is not None:
                        selected_ids = data.getlist('bulk_id', None)
                        try:
                              Employee.objects.filter(id__in=selected_ids).delete()
                              result = {'id': selected_ids}
                        except Exception as e:
                              print(e)
                              raise ApiExceptions.InternalServerError()
                        return result
                  else:
                        raise ApiExceptions.ValidationError({'bulk_id': 'Id is not found.'})
            except Exception as e:
                  print(e)
                  if isinstance(e, ApiCoreExceptions.APIException):
                        raise
                  else:
                        # apiErrorLog(self.request, e)
                        raise ApiExceptions.InternalServerError()