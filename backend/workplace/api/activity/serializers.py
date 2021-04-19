# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers

from workplace.api.activity_type.serializers import ActivityTypeShortRelatedSerializer
from workplace.api.direction.serializers import DirectionShortRelatedSerializer
from workplace.api.project.serializers import ProjectShortRelatedSerializer
from workplace.common.serializers import BaseRelatedSerializer
from workplace.models import Activity, Project, Direction, ActivityType


class ActivitySerializer(serializers.ModelSerializer):
    project = ProjectShortRelatedSerializer(queryset=Project.objects.all(), many=False, required=False, allow_null=True)
    direction = DirectionShortRelatedSerializer(queryset=Direction.objects.all(), many=False, required=False,
                                                allow_null=True)
    type = ActivityTypeShortRelatedSerializer(queryset=ActivityType.objects.all(), many=False, required=False,
                                              allow_null=True)

    class Meta:
        model = Activity
        exclude = ()


class ActivityRelatedSerializer(BaseRelatedSerializer):
    class Meta:
        model_class = Activity
        model_serializer_class = ActivitySerializer
