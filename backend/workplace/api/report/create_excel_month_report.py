import xlsxwriter
from django.db.models import Sum

from workplace.common.utils import get_date_list, convert_minutes_to_hour, get_string_date, \
    get_report_full_path, get_string_dates


def get_workbook(user_id, string_date, report_id):
    full_path = get_report_full_path(user_id, report_id, string_date, 'xlsx')
    return xlsxwriter.Workbook(full_path)


def get_cell_format(workbook):
    cell_format = workbook.add_format()
    cell_format.set_font_size(11)
    cell_format.set_align('center')
    cell_format.set_align('vcenter')
    cell_format.set_font('Calibri')
    cell_format.set_text_wrap(True)
    cell_format.set_border()
    return cell_format


def get_header_cell_format(workbook, bold, color):
    cell_format = get_cell_format(workbook)
    cell_format.set_bg_color(color)
    cell_format.set_bold(bold)
    return cell_format


def get_total_duration(activities):
    total_duration = activities.aggregate(Sum('duration')).get('duration__sum')
    return convert_minutes_to_hour(total_duration)


def fill_header(worksheet, header_cell_format, project_col, dir_col, type_col):
    worksheet.set_default_row(25)
    worksheet.set_column(0, 0, 3)
    worksheet.set_column(project_col, type_col, 25)
    worksheet.write(1, 0, '№', header_cell_format)
    worksheet.write(1, project_col, 'Проект', header_cell_format)
    worksheet.write(1, dir_col, 'Направление', header_cell_format)
    worksheet.write(1, type_col, 'Вид работы', header_cell_format)


def fill_month_report_worksheet(workbook, cell_format, string_date, date_list, items, activities):
    day_count = len(date_list)
    total_duration = get_total_duration(activities)
    # форматы ячеек общих, для выходных дней и итоговых сводок
    header_cell_format = get_header_cell_format(workbook, False, '#b8def5')
    weekend_cell_format = get_header_cell_format(workbook, False, '#fdbdba')
    total_cell_format = get_header_cell_format(workbook, True, '#b8def5')
    weekend_total_cell_format = get_header_cell_format(workbook, True, '#fdbdba')
    # заполняем шапку
    worksheet = workbook.add_worksheet('Отчёт за месяц')
    fill_header(worksheet, header_cell_format, 1, 2, 3)
    worksheet.set_column(4, day_count + 3, 3)
    worksheet.set_column(day_count + 4, day_count + 4, 7)
    worksheet.merge_range(0, 0, 0, 4 + day_count, 'Отчёт о работе за %s' % string_date, cell_format)

    # заполняем шапку для дней + шаблон для сводки по дням
    total_day_duration = []
    for day_index, date_item in enumerate(date_list):
        total_day_duration.append({'total': float(), 'weekend': date_item.get('weekend')})
        if date_item.get('weekend'):
            worksheet.write(1, 4 + day_index, date_item.get('day'), weekend_cell_format)
        else:
            worksheet.write(1, 4 + day_index, date_item.get('day'), header_cell_format)
    worksheet.write(1, day_count + 4, 'Итого', total_cell_format)
    start_row = 2
    # заполняем колонку проекта, если в проекте несколько направлений - объединяем строки
    for project_index, project in enumerate(items):
        rows = project.get('rows') - 1
        project_name = project.get('project')
        if rows > 0:
            worksheet.merge_range(start_row, 0, start_row + rows, 0, project_index, cell_format)
            worksheet.merge_range(start_row, 1, start_row + rows, 1, project_name, cell_format)
        else:
            worksheet.write(start_row, 0, project_index, cell_format)
            worksheet.write(start_row, 1, project_name, cell_format)

        dir_start_row = start_row
        # заполняем колонку направления, если в направлении несколько видов работ - объединяем строки
        for direction in project.get('directions', []):
            dir_rows = direction.get('rows') - 1
            dir_name = direction.get('direction')
            if dir_rows > 0:
                worksheet.merge_range(dir_start_row, 2, dir_start_row + dir_rows, 2, dir_name, cell_format)
            else:
                worksheet.write(dir_start_row, 2, dir_name, cell_format)
            type_start_row = dir_start_row
            # заполняем колонку вида работы
            for activity_type in direction.get('types', []):
                type_name = activity_type.get('type')
                worksheet.write(type_start_row, 3, type_name, cell_format)
                activity_days = activity_type.get('days', [])
                month_duration = float(0)

                # заполняем строку с временем активности по дням и заполняем список общей свобдки по дням
                # и за месяц по активности
                for activity_index, activity_day in enumerate(activity_days):
                    duration = float(activity_day.get('duration', 0))
                    day_index = activity_index + 4
                    if activity_day.get('weekend'):
                        day_format = weekend_cell_format
                    else:
                        day_format = cell_format
                    if duration == float(0):
                        worksheet.write(type_start_row, day_index, '', day_format)
                    else:
                        month_duration += duration
                        total = total_day_duration[activity_index]
                        total.update(total=(total.get('total') + duration))
                        worksheet.write(type_start_row, day_index,  round(duration, 1), day_format)
                worksheet.write(type_start_row, len(activity_days) + 4, round(month_duration, 2), total_cell_format)
                type_start_row += 1
            dir_start_row += dir_rows + 1
        start_row += rows + 1
    # заполняем сводку по всем активностям за день
    for day_index, date_item in enumerate(date_list):
        total = total_day_duration[day_index].get('total')
        if total == float(0):
            total = 0

        if date_item.get('weekend'):
            worksheet.write(start_row, day_index + 4,  round(total, 1), weekend_total_cell_format)
        else:
            worksheet.write(start_row, day_index + 4,  round(total, 1), total_cell_format)
    # заполняем сводку по всему месяцу
    worksheet.merge_range(start_row, 0, start_row, 3, 'Итого:', total_cell_format)
    worksheet.write(start_row, day_count + 4, round(total_duration, 2), total_cell_format)
    # заполняем сводку по переработке за месяц
    over_duration = float(0)
    weekend_over_duration = float(0)
    start_row += 1
    for total in total_day_duration:
        if total.get('weekend'):
            weekend_over_duration += total.get('total')
        elif total.get('weekend') is not True and total.get('total') > float(8):
            over_duration += total.get('total') - float(8)

    worksheet.merge_range(start_row, 0, start_row, 3, 'Переработка в рабочие дни:', total_cell_format)
    worksheet.merge_range(start_row, 4, start_row, 5, round(over_duration, 2), total_cell_format)
    start_row += 1

    worksheet.merge_range(start_row, 0, start_row, 3, 'Переработка в выходные дни:', total_cell_format)
    worksheet.merge_range(start_row, 4, start_row, 5, round(weekend_over_duration, 2), total_cell_format)
    start_row += 1
    work_duration = total_duration - over_duration - weekend_over_duration
    worksheet.merge_range(start_row, 0, start_row, 3, 'Рабочие часы без учёта переработки:', total_cell_format)
    worksheet.merge_range(start_row, 4, start_row, 5, round(work_duration, 2), total_cell_format)


def get_dictionary_name(dictionary, label):
    if dictionary and dictionary.name:
        return dictionary.name
    else:
        return 'Без %s' % label


def get_activity_duration(start_hour, start_minute, end_hour, end_minute):
    hours = end_hour - start_hour
    if start_minute > end_minute:
        hours -= 1
        minutes = 60 + end_minute - start_minute
    else:
        minutes = end_minute - start_minute
    return '%s:%s' % ("{0:0>2}".format(hours), "{0:0>2}".format(minutes))


def fill_day_report_worksheet(workbook, cell_format, activities, date):
    string_date = get_string_date(date.get('date'), '%d %B %Y')
    worksheet = workbook.add_worksheet(str(date.get('day')))
    worksheet.merge_range(0, 0, 0, 7, string_date, cell_format)
    header_cell_format = get_header_cell_format(workbook, True, '#b8def5')
    dict_cell_format = get_header_cell_format(workbook, False, '#b8def5')
    total_cell_format = get_header_cell_format(workbook, False, '#fcc79b')
    time_cell_format = get_header_cell_format(workbook, False, '#fff9ae')
    fill_header(worksheet, header_cell_format, 4, 5, 6)
    worksheet.set_column(1, 3, 7)
    worksheet.write(1, 1, 'С', header_cell_format)
    worksheet.write(1, 2, 'По', header_cell_format)
    worksheet.write(1, 3, 'Время', header_cell_format)
    worksheet.set_column(7, 7, 80)
    worksheet.write(1, 7, 'Описание', header_cell_format)
    row_index = 2
    for idx, activity in enumerate(activities):
        activity_duration = get_activity_duration(activity.startHour, activity.startMinute,
                                                  activity.endHour, activity.endMinute)
        worksheet.write(row_index, 0, idx + 1, cell_format)
        worksheet.write(row_index, 1, activity.start, time_cell_format)
        worksheet.write(row_index, 2, activity.end, time_cell_format)
        worksheet.write(row_index, 3, activity_duration, total_cell_format)
        worksheet.write(row_index, 4, get_dictionary_name(activity.project, 'проекта'), dict_cell_format)
        worksheet.write(row_index, 5, get_dictionary_name(activity.direction, 'направления'), dict_cell_format)
        worksheet.write(row_index, 6, get_dictionary_name(activity.type, 'вида работы'), dict_cell_format)
        worksheet.write(row_index, 7, activity.description, cell_format)
        row_index += 1
    duration = convert_minutes_to_hour(activities.aggregate(Sum('duration')).get('duration__sum'))
    worksheet.merge_range(row_index, 0, row_index, 2, 'Итого:', total_cell_format)
    worksheet.write(row_index, 3, round(duration, 1), total_cell_format)


def create_excel_month_report(activities, items, start, end, user_id, report_id):
    date_list = get_date_list(start, end)
    string_date = get_string_dates(start, end)
    workbook = get_workbook(user_id, string_date, report_id)
    cell_format = get_cell_format(workbook)
    for date in date_list:
        day_activities = activities.filter(activityDate=date.get('date')).order_by('start').all()
        fill_day_report_worksheet(workbook, cell_format, day_activities, date)
    fill_month_report_worksheet(workbook, cell_format, string_date, date_list, items, activities)
    workbook.close()
    return workbook.filename
