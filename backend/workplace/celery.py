# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

import os

from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.local')


app = Celery(str('workplace'))
app.config_from_object('workplace.celeryconfig')


app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
