# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.routers import DefaultRouter

from workplace.api.user.user import *


router = DefaultRouter()
router.register(r'user', UserViewSet)
urlpatterns = router.urls
