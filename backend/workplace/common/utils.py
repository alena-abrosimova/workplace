import os
import unicodedata
from datetime import datetime, timedelta

from django.utils.http import urlquote

from workplace.models import User


def get_string_dates(start, end):
    start_date = datetime.strptime(start, '%Y-%m-%d')
    end_date = datetime.strptime(end, '%Y-%m-%d')
    str_format = '%d.%m.%Y'
    return '%s - %s' % (start_date.strftime(str_format), end_date.strftime(str_format))


def get_string_date(date, date_format):
    return date.strftime(date_format)


def get_date_list(start, end):
    start_day = datetime.strptime(start, '%Y-%m-%d')
    end_day = datetime.strptime(end, '%Y-%m-%d')
    date_list = []
    new_date = start_day
    for index in range(start_day.day, end_day.day + 1):
        date_list.append({'day': new_date.day, 'date': new_date.date(), 'weekend': new_date.weekday() > 4})
        new_date = new_date + timedelta(days=1)
    return date_list


def convert_minutes_to_hour(duration):
    if duration:
        duration = int(duration)
        hours = float(duration / 60)
        return hours
    else:
        return 0


def rfc5987_content_disposition(file_name):
    ascii_name = unicodedata.normalize('NFKD', file_name).encode('ascii', 'ignore').decode()
    header = 'attachment; filename="{}"'.format(ascii_name)
    if ascii_name != file_name:
        quoted_name = urlquote(file_name)
        header += '; filename*=UTF-8\'\'{}'.format(quoted_name)

    return header


def get_name_file_field(field):
    if field and field.path:
        return os.path.basename(field.path)
    return 'Без имени'


def get_report_full_path(user_id, report_id, string_date, file_format):
    user = User.objects.get(id=user_id)
    [last_name, first_name] = [user.last_name, user.first_name]
    document_name = '%s %s - отчет за %s.%s' % (last_name, first_name, string_date, file_format)
    document_path = os.path.join('media', 'workplace', 'reports', str(report_id))
    if not os.path.isdir(document_path):
        os.makedirs(document_path)
    full_path = os.path.join(document_path, document_name)
    return full_path
