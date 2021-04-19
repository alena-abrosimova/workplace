# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db.models import Sum
from django.http import JsonResponse, HttpResponse
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from workplace.api.report.create_doc_month_report import create_docx_month_report
from workplace.api.report.create_excel_month_report import create_excel_month_report
from workplace.api.report.filters import ReportFilterSet
from workplace.api.report.serializers import ReportSerializer
from workplace.celery import app as celery_app
from workplace.common.utils import get_date_list, convert_minutes_to_hour, rfc5987_content_disposition, \
    get_name_file_field
from workplace.models import Report, Activity


def get_days(types, start, end, activity_type):
    day_list = get_date_list(start, end)
    items = []
    for day in day_list:
        minutes = 0
        if types.filter(activityDate=day.get('date'), type=activity_type).first():
            minutes = types.filter(activityDate=day.get('date'), type=activity_type).first().get('minutes')
        item = {
            'day': day.get('day'),
            'weekend': day.get('weekend'),
            'duration': convert_minutes_to_hour(minutes)
        }
        items.append(item)
    return items


def get_types(types, start, end, is_excel):
    items = []
    for activity_type in types:
        item = {
            'type': activity_type.get('type__name')
        }

        if is_excel:
            item.update(days=get_days(types, start, end, activity_type.get('type', None)))
        else:
            item.update(duration=convert_minutes_to_hour(activity_type.get('minutes')))

        if item.get('type') is None:
            item.update(type='Без вида работы')
        items.append(item)
    return items


def get_directions(directions, start, end, is_excel):
    items = []
    for direction in directions:
        types = directions.filter(direction=direction.get('direction', None)) \
            .values('type', 'type__name').annotate(minutes=Sum('duration')).order_by('type__name')
        item = {
            'direction': direction.get('direction__name'),
            'types': get_types(types, start, end, is_excel),
            'rows': types.count()
        }
        if not is_excel:
            item.update(duration=direction.get('minutes'))

        if item.get('direction') is None:
            item.update(direction='Без направления')
        items.append(item)
    return items


def get_rows_for_project(directions):
    rows = 0

    for direction in directions:
        rows += direction.get('rows', 1)

    return rows


def get_items_for_report(activities, start, end, is_excel):
    projects = activities \
        .values('project', 'project__name').annotate(minutes=Sum('duration'))
    items = []
    for project in projects:
        directions = activities.filter(project=project.get('project', None)) \
            .values('direction', 'direction__name').annotate(minutes=Sum('duration')).order_by('direction__name')
        item = {
            'project': project.get('project__name'),
            'directions': get_directions(directions, start, end, is_excel),
            'rows': 1
        }
        item.update(rows=get_rows_for_project(item.get('directions', [])))
        if item.get('project') is None:
            item.update(project='Без проекта')
        items.append(item)
    return items


def create_excel_report(activities, start, end, user_id, report_id):
    items = get_items_for_report(activities, start, end, True)
    return create_excel_month_report(activities, items, start, end, user_id, report_id)


def create_doc_report(activities, start, end, user_id, report_id):
    items = get_items_for_report(activities, start, end, False)
    return create_docx_month_report(items, start, end, user_id, report_id)


@celery_app.task
def create_report(user_id, report_id, report_type, start, end):
    report = Report.objects.get(id=report_id)
    try:
        activities = Activity.objects.filter(user_id=user_id, activityDate__gte=start, activityDate__lte=end) \
            .order_by('project__name')
        if report_type == 0:
            link = create_excel_report(activities, start, end, user_id, report_id)
        else:
            link = create_doc_report(activities, start, end, user_id, report_id)
        report.state = Report.STATE_COMPLETE
        report.link = link
        report.generated = start
        report.save()
    except Exception as e:
        report.state = Report.STATE_ERROR
        report.save()
        print(e)


class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    filter_class = ReportFilterSet

    @action(methods=['GET'], url_path='download', detail=True)
    def download(self, request, pk):
        report = Report.objects.filter(pk=pk).first()
        if not report:
            return Response(data={'messages': ['Объекта с данным первичным ключом не существует']},
                            status=status.HTTP_404_NOT_FOUND)
        response = HttpResponse(report.link, content_type='application/octet-stream')
        response['Content-Disposition'] = rfc5987_content_disposition(get_name_file_field(report.link))
        return response

    @action(methods=['POST'], url_path='generate', detail=False)
    def generate_report(self, request):
        user_id = request.user.id
        report_type = request.data.get('type')
        start = request.data.get('start')
        end = request.data.get('end')
        label = request.data.get('label')
        report = Report.objects.create(user_id=user_id, type=report_type, label=label, state=Report.STATE_IN_PROCESS,
                                       link='', started=start, ended=end)

        create_report.delay(user_id, report.id, report_type, start, end)

        return JsonResponse({'ok': True, 'id': report.id})
