# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import OrderingFilter, SearchFilter

from workplace.api.activity_type.filters import ActivityTypeFilterSet
from workplace.api.activity_type.serializers import ActivityTypeSerializer
from workplace.models import ActivityType


class ActivityTypeViewSet(viewsets.ModelViewSet):
    queryset = ActivityType.objects.all()
    serializer_class = ActivityTypeSerializer
    filter_backends = (OrderingFilter, DjangoFilterBackend, SearchFilter)
    filter_class = ActivityTypeFilterSet
    search_fields = ('name',)
    ordering_fields = {'name': 'name'}

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
