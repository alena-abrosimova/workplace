# -*- coding: utf-8 -*-
import inspect
import os
import sys

from django.core.management import BaseCommand
from django.db import models

from workplace.apps import WorkplaceConfig
from workplace.common.string import snake_case

APPLICATION_NAME = WorkplaceConfig.name
PROJECT_PATH = '/'.join([os.path.abspath(os.path.dirname(__name__)), APPLICATION_NAME])

IGNORE = ['AbstractUser']

FILES = [
    # Сериализатор для модели
    {
        'path': 'serializers/{snake}.py',
        'data': [
            '# -*- coding: utf-8 -*-',
            'from __future__ import unicode_literals',
            '',
            'from rest_framework import serializers',
            '',
            'from {app}.common.serializers import BaseRelatedSerializer',
            'from {app}.models import {camel}',
            '', '',
            'class {camel}Serializer(serializers.ModelSerializer):',
            '    class Meta:',
            '        model = {camel}',
            '        exclude = ()',
            '', '',
            'class {camel}RelatedSerializer(BaseRelatedSerializer):',
            '    class Meta:',
            '        model_class = {camel}',
            '        model_serializer_class = {camel}Serializer',
            '',
        ]
    },
    # __init__.py в API
    {
        'path': 'api/{snake}/__init__.py',
        'data': [],
    },
    # Файл с функционалом API
    {
        'path': 'api/{snake}/{snake}.py',
        'data': [
            '# -*- coding: utf-8 -*-',
            'from __future__ import unicode_literals',
            '',
            'from django_filters.rest_framework import FilterSet',
            'from rest_framework import generics',
            '',
            'from {app}.models import {camel}',
            'from {app}.serializers.{snake} import {camel}Serializer',
            '', '',
            'class {camel}Filter(FilterSet):',
            '    class Meta:',
            '        model = {camel}',
            '        exclude = ()',
            '', '',
            'class {camel}List(generics.ListCreateAPIView):',
            '    queryset = {camel}.objects.all()',
            '    serializer_class = {camel}Serializer',
            '    filter_class = {camel}Filter',
            '', '',
            'class {camel}Detail(generics.RetrieveUpdateDestroyAPIView):',
            '    queryset = {camel}.objects.all()',
            '    serializer_class = {camel}Serializer',
            '',
        ],
    },
    # Файл с urls к API
    {
        'path': 'api/{snake}/urls.py',
        'data': [
            '# -*- coding: utf-8 -*-',
            'from __future__ import unicode_literals',
            '',
            'from django.conf.urls import url',
            '',
            'from {app}.api.{snake}.{snake} import *',
            '', '',
            'urlpatterns = [',
            "    url(r'(?P<pk>[0-9]+)/$', {camel}Detail.as_view()),",
            "    url(r'$', {camel}List.as_view()),",
            ']', '',
        ],
    }
]


def create_file(file_info, camel):
    format_string = {'camel': camel,
                     'snake': snake_case(camel),
                     'app': APPLICATION_NAME}
    # Получаем полный путь к файлу
    full_path = '/'.join([PROJECT_PATH, file_info['path']])
    full_path = full_path.format(**format_string)
    # Создаём все вложенные директории, если их нет
    dir_name = os.path.dirname(full_path)
    if not os.path.exists(dir_name):
        os.makedirs(dir_name)
    if os.path.exists(full_path):
        return
    with open(full_path, 'w') as f:
        data = '\n'.join(file_info['data'])
        f.write(data.format(**format_string))
    print('[created] %s' % full_path)


class Command(BaseCommand):
    def handle(self, *args, **options):
        admin = []
        urlpatterns = [
            "url(r'^login/', views.obtain_auth_token)",
        ]
        for camel, obj in inspect.getmembers(sys.modules['%s.models' % APPLICATION_NAME]):
            # Пропускаем не модели
            if not isinstance(obj, models.base.ModelBase) or camel in IGNORE:
                continue
            for file_info in FILES:
                create_file(file_info, camel)
            snake = snake_case(camel)
            minus = snake.replace('_', '-')
            urlpatterns += [
                "url(r'^{minus}/', include(('{app}.api.{snake}.urls', 'workplace'), namespace='{snake}'))".format(
                    minus=minus, snake=snake, app=APPLICATION_NAME)
            ]
            admin += [camel]
        with open('/'.join([PROJECT_PATH, 'api/urls.py']), 'w') as f:
            header = [
                '# -*- coding: utf-8 -*-',
                'from __future__ import unicode_literals',
                '',
                'from django.conf.urls import url, include',
                'from rest_framework.authtoken import views',
                '', '',
            ]
            f.write('\n'.join(header))
            f.write('urlpatterns = [\n%s\n]\n' % '\n'.join('    %s,' % _ for _ in urlpatterns))
        with open('/'.join([PROJECT_PATH, 'admin.py']), 'w') as f:
            header = [
                '# -*- coding: utf-8 -*-',
                'from __future__ import unicode_literals',
                '',
                'from django.contrib import admin',
                'from workplace.models import *',
                '', '',
            ]
            f.write('\n'.join(header))
            f.write(''.join(['admin.site.register(%s)\n' % x for x in admin]))
