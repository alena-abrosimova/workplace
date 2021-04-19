# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import pytz
from django.db.models import Q
from django.utils import timezone
from datetime import timedelta, datetime

from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import action

from workplace.api.activity.filters import ActivityFilterSet
from workplace.api.activity.serializers import ActivitySerializer
from workplace.models import Activity, ActivityTimer


def get_hour_and_minutes(time_string):
    return list(map(int, time_string.split(':')))


def get_duration(start_hour, end_hour, start_minutes, end_minutes):
    hours = end_hour - start_hour
    minutes = end_minutes - start_minutes
    return hours * 60 + minutes


def calculate_params(request_data):
    data = dict()
    start = request_data.get('start', None)
    end = request_data.get('end', None)
    [start_hour, start_minutes] = get_hour_and_minutes(start)
    [end_hour, end_minutes] = get_hour_and_minutes(end)
    duration = get_duration(start_hour, end_hour, start_minutes, end_minutes)
    if duration >= 20:
        height = '%spx' % duration
    else:
        height = '20px'
    data.update(dict(
        startHour=start_hour, startMinute=start_minutes, duration=duration,
        endHour=end_hour, endMinute=end_minutes, height=height
    ))

    return data


def get_week_activity_list(activities, date_list):
    week_activity_list = list()
    for date_item in date_list:
        day_activities = activities.filter(activityDate=date_item).all().order_by('start')
        week_activity_list.append({
            'day': date_list.index(date_item),
            'activities': ActivitySerializer(day_activities, many=True).data
        })
    return week_activity_list


def get_date_list(monday):
    date_list = list()
    for index in range(7):
        new_date = datetime.strptime(monday, '%Y-%m-%d') + timedelta(days=index)
        date_list.append(new_date.date())
    return date_list


def get_validation_response(previous_activity, next_activity, timer):
    timer_message = None
    if timer:
        timezone.activate(pytz.timezone("Europe/Moscow"))
        current_tz = timezone.get_current_timezone()
        local = current_tz.normalize(timer.activityDate.astimezone(current_tz))
        timer_message = '%s:%s' % ("{0:0>2}".format(local.hour), "{0:0>2}".format(local.minute))
    return {
        'start': previous_activity.end if previous_activity else None,
        'end': next_activity.start if next_activity else None,
        'timer': timer_message
    }


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    filter_class = ActivityFilterSet

    def perform_create(self, serializer):
        data = dict(user=self.request.user)
        data.update(calculate_params(self.request.data))
        serializer.save(**data)

    def perform_update(self, serializer):
        self.perform_create(serializer)

    @action(methods=['GET'], url_path='week', detail=False)
    def get_week_activity(self, request):
        user = request.query_params.get('user')
        monday = request.query_params.get('monday')
        sunday = request.query_params.get('sunday')
        activities = Activity.objects.filter(user=user, activityDate__gte=monday, activityDate__lte=sunday)
        date_list = get_date_list(monday)
        week_activity_list = get_week_activity_list(activities, date_list)
        return JsonResponse({'results': week_activity_list})

    @action(methods=['POST'], url_path='month', detail=False)
    def get_month_activity(self, request):
        month_activity_list = list()
        user = request.data.get('user')
        start = request.data.get('start')
        end = request.data.get('end')
        week_list = request.data.get('weekList')
        activities = Activity.objects.filter(user=user, activityDate__gte=start, activityDate__lte=end)
        for week in week_list:
            month_activity_list.append({
                'week': week_list.index(week),
                'days': get_week_activity_list(activities, week)
            })

        return JsonResponse({'results': month_activity_list})

    @action(methods=['POST'], url_path='validate', detail=False)
    def validate_activity(self, request):
        user = request.user
        activity_date = request.data.get('activityDate')
        start = request.data.get('start')
        end = request.data.get('end')
        activity_id = request.data.get('id', None)
        activities = Activity.objects.filter(user=user, activityDate=activity_date).exclude(id=activity_id)
        previous_activity = activities.filter(end__gt=start, start__lte=start).first()
        next_activity = activities.filter(start__lt=end, end__gte=end).first()
        timers = ActivityTimer.objects.filter(user=user, activityDate__date=activity_date, state=ActivityTimer.STATE_IN_PROCESS)
        timer = timers.filter(Q(activityDate__time__lte=start)
                              | (Q(activityDate__time__gte=start)
                              & Q(activityDate__time__lte=end))).first()
        if previous_activity or next_activity or timer:
            response = get_validation_response(previous_activity, next_activity, timer)
        else:
            response = {"ok": True}
        return JsonResponse(response)
