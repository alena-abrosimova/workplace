# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers

from workplace.common.serializers import BaseRelatedSerializer
from workplace.models import Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        exclude = ()


class ProjectRelatedSerializer(BaseRelatedSerializer):
    class Meta:
        model_class = Project
        model_serializer_class = ProjectSerializer


class ProjectShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'name')


class ProjectShortRelatedSerializer(BaseRelatedSerializer):
    class Meta:
        model_class = Project
        model_serializer_class = ProjectShortSerializer