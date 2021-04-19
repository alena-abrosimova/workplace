# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import OrderingFilter, SearchFilter

from workplace.api.direction.filters import DirectionFilterSet
from workplace.api.direction.serializers import DirectionSerializer
from workplace.models import Direction


class DirectionViewSet(viewsets.ModelViewSet):
    queryset = Direction.objects.all()
    serializer_class = DirectionSerializer
    filter_backends = (OrderingFilter, DjangoFilterBackend, SearchFilter)
    filter_class = DirectionFilterSet
    search_fields = ('name', )
    ordering_fields = {'name': 'name'}

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
