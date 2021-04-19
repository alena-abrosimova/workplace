# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers

from workplace.common.serializers import BaseRelatedSerializer
from workplace.models import ActivityTimerSettings


class ActivityTimerSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityTimerSettings
        exclude = ()


class ActivityTimerSettingsRelatedSerializer(BaseRelatedSerializer):
    class Meta:
        model_class = ActivityTimerSettings
        model_serializer_class = ActivityTimerSettingsSerializer
