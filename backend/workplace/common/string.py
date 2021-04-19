# -*- coding: utf-8 -*-
import unicodedata
from django.utils.http import urlquote


# Преобразование CamelCase в snake_case
def snake_case(string):
    result = ''.join(map(lambda x: '_' + x.lower() if x.upper() == x else x, string))
    return result[1:] if result and result[0] == '_' else result


def rfc5987_content_disposition(file_name):
    ascii_name = unicodedata.normalize('NFKD', file_name).encode('ascii', 'ignore').decode()
    header = 'attachment; filename="{}"'.format(ascii_name)
    if ascii_name != file_name:
        quoted_name = urlquote(file_name)
        header += '; filename*=UTF-8\'\'{}'.format(quoted_name)

    return header
