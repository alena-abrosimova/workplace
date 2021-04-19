# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django_filters.rest_framework import FilterSet

from workplace.models import ActivityTimerSettings


class ActivityTimerSettingsFilterSet(FilterSet):
    class Meta:
        model = ActivityTimerSettings
        exclude = ()
