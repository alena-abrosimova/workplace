# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import OrderingFilter, SearchFilter

from workplace.api.project.filters import ProjectFilterSet
from workplace.api.project.serializers import ProjectSerializer
from workplace.models import Project


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = (OrderingFilter, DjangoFilterBackend, SearchFilter)
    filter_class = ProjectFilterSet
    search_fields = ('name',)
    ordering_fields = {'name': 'name'}

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
