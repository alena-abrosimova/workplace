# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from datetime import datetime

import pytz
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.response import Response

from workplace.api.activity.views import calculate_params
from workplace.api.activity_timer.filters import ActivityTimerFilterSet
from workplace.api.activity_timer.serializers import ActivityTimerSerializer
from workplace.models import ActivityTimer, Activity, ActivityTimerSettings


class ActivityTimerViewSet(viewsets.ModelViewSet):
    queryset = ActivityTimer.objects.all()
    serializer_class = ActivityTimerSerializer
    filter_backends = (OrderingFilter, DjangoFilterBackend, SearchFilter)
    filter_class = ActivityTimerFilterSet

    def create(self, request, *args, **kwargs):
        activity_date = datetime.strptime(request.data.get('activityDate'), '%Y-%m-%dT%H:%M:%S.%f')
        activity = Activity.objects.filter(user=request.user, activityDate=activity_date.date(),
                                           end__gt=activity_date.time(), start__lte=activity_date.time()).first()
        if activity:
            messages = 'Время начала таймера пересекает время активности (%s - %s)' % (activity.start, activity.end)
            return Response(data={'Предупреждение': [messages]}, status=status.HTTP_400_BAD_REQUEST)
        else:
            response = super(ActivityTimerViewSet, self).create(request, *args, **kwargs)
            return response

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        state = self.request.data.get('state')
        timer = serializer.save()
        timezone.activate(pytz.timezone("Europe/Moscow"))
        current_tz = timezone.get_current_timezone()
        local_created = current_tz.normalize(timer.activityDate.astimezone(current_tz))
        if state == ActivityTimer.STATE_COMPLETE:
            timer.completed = timezone.now().date()
            start_hours = local_created.hour
            start_minutes = local_created.minute
            end_hours = datetime.now().hour
            end_minutes = datetime.now().minute
            if timer.completed != local_created.date():
                ended = ActivityTimerSettings.objects.get(id=1).ended
                end_hours = ended.hour
                end_minutes = ended.minute
            activity = dict(
                user=self.request.user,
                description=timer.description,
                start='%s:%s' % ("{0:0>2}".format(start_hours), "{0:0>2}".format(start_minutes)),
                end='%s:%s' % ("{0:0>2}".format(end_hours), "{0:0>2}".format(end_minutes)),
                activityDate=local_created.date()
            )
            activity.update(calculate_params(activity))
            Activity.objects.create(**activity)
            timer.save()
