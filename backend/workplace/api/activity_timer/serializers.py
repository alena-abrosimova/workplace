# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers

from workplace.common.serializers import BaseRelatedSerializer
from workplace.models import ActivityTimer


class ActivityTimerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityTimer
        exclude = ()


class ActivityTimerRelatedSerializer(BaseRelatedSerializer):
    class Meta:
        model_class = ActivityTimer
        model_serializer_class = ActivityTimerSerializer
