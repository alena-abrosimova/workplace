# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers

from workplace.api.direction.serializers import DirectionShortRelatedSerializer
from workplace.common.serializers import BaseRelatedSerializer
from workplace.models import ActivityType, Direction


class ActivityTypeSerializer(serializers.ModelSerializer):
    direction = DirectionShortRelatedSerializer(queryset=Direction.objects.all(), many=True, required=False,
                                                allow_null=True)

    class Meta:
        model = ActivityType
        exclude = ()


class ActivityTypeRelatedSerializer(BaseRelatedSerializer):
    class Meta:
        model_class = ActivityType
        model_serializer_class = ActivityTypeSerializer


class ActivityTypeShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityType
        fields = ('id', 'name')


class ActivityTypeShortRelatedSerializer(BaseRelatedSerializer):
    class Meta:
        model_class = ActivityType
        model_serializer_class = ActivityTypeShortSerializer
