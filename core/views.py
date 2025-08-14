from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Max
from .models import Form, Field, Employee
from .serializers import FormSerializer, FieldSerializer, EmployeeSerializer
from employee_mngmt.paginations import StandardResultsSetPagination
from dal import autocomplete
from django.db.models import Q

# Create your views here.

class FormViewSet(viewsets.ModelViewSet):
      permission_classes=[IsAuthenticated]
      serializer_class = FormSerializer
      pagination_class = StandardResultsSetPagination

      def get_queryset(self):
            return Form.objects.filter(created_by=self.request.user).order_by('-id')

      @action(detail=True, methods=['get'])
      def fields(self, request, pk=None):
            form = self.get_object()
            return Response(FieldSerializer(form.fields.all(), many=True).data)

      @action(detail=True, methods=['post'])
      def add_field(self, request, pk=None):
            form = self.get_object()
            max_order = form.fields.aggregate(m=Max('order'))['m'] or 0
            f = Field.objects.create(
                  form=form,
                  label=request.data.get('label',''),
                  field_type=request.data.get('field_type','text'),
                  required=bool(request.data.get('required', False)),
                  options=request.data.get('options')
            )
            f.order = max_order + 1
            f.save(update_fields=['order'])
            return Response(FieldSerializer(f).data, status=status.HTTP_201_CREATED)

      @action(detail=True, methods=['put'])
      def reorder(self, request, pk=None):
            form = self.get_object()
            data = request.data
            if not isinstance(data, list):
                  return Response({'detail':'Expected list of {id, order}.'}, status=400)
            for item in data:
                  try:
                        fid = int(item['id']); 
                        ordv = int(item['order'])
                        f = form.fields.get(id=fid)
                        f.order = ordv
                        f.save(update_fields=['order'])
                  except Exception:
                        continue
            return Response({'detail':'Reordered.'})

class FieldViewSet(viewsets.ModelViewSet):
      permission_classes=[IsAuthenticated]
      serializer_class = FieldSerializer
      def get_queryset(self):
            return Field.objects.filter(form__created_by=self.request.user).order_by('order')

class EmployeeViewSet(viewsets.ModelViewSet):
      permission_classes=[IsAuthenticated]
      serializer_class = EmployeeSerializer
      pagination_class = StandardResultsSetPagination

      def get_queryset(self):
            qs = Employee.objects.filter(created_by=self.request.user).order_by('-id')
            form_id = self.request.query_params.get('form')
            if form_id:
                  qs = qs.filter(form_id=form_id)
            # Build filters from arbitrary query params (exact match, case-insensitive)
            ignore = {'form','page','page_size','ordering'}
            filters = {k: v for k, v in self.request.query_params.items() if k not in ignore}
            if filters:
                  ids = []
                  for e in qs:
                        data = e.data or {}
                        ok = True
                        for k, v in filters.items():
                              if str(data.get(k, '')).lower() != str(v).lower():
                                    ok = False; break
                  if ok: ids.append(e.id)
                  qs = qs.filter(id__in=ids)
            return qs

      def perform_create(self, serializer):
            serializer.save(created_by=self.request.user)

class FormAutocomplete(autocomplete.Select2QuerySetView):
      def get_queryset(self):
            qs = None

            if self.q:
                  qs = Form.objects.filter(
                        Q(name__icontains=self.q)
                  ).values(
                        'name',
                        'id'
                  ).distinct()
            else:
                  qs = Form.objects.all().order_by('name')[:20].values('name', 'id')
            return qs

      def get_result_label(self, result):
            return result.get('name')

      def get_result_value(self, result):
            return result.get('id')