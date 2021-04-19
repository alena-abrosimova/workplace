# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets

from workplace.api.activity_timer_settings.serializers import ActivityTimerSettingsSerializer
from workplace.models import ActivityTimerSettings


class ActivityTimerSettingsViewSet(viewsets.ModelViewSet):
    queryset = ActivityTimerSettings.objects.all()
    serializer_class = ActivityTimerSettingsSerializer
