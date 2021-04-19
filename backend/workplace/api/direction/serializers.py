# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers

from workplace.api.project.serializers import ProjectShortRelatedSerializer
from workplace.common.serializers import BaseRelatedSerializer
from workplace.models import Direction, Project


class DirectionSerializer(serializers.ModelSerializer):
    project = ProjectShortRelatedSerializer(queryset=Project.objects.all(), many=False, required=False, allow_null=True)

    class Meta:
        model = Direction
        exclude = ()


class DirectionRelatedSerializer(BaseRelatedSerializer):
    class Meta:
        model_class = Direction
        model_serializer_class = DirectionSerializer


class DirectionShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direction
        fields = ('id', 'name')


class DirectionShortRelatedSerializer(BaseRelatedSerializer):
    class Meta:
        model_class = Direction
        model_serializer_class = DirectionShortSerializer