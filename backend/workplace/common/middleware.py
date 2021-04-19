# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from datetime import datetime
from django.contrib.auth.middleware import get_user
from django.utils.functional import SimpleLazyObject
from rest_framework.authentication import TokenAuthentication, get_authorization_header


def get_last_activity(session):
    try:
        return datetime.strptime(session['_session_security'],
                                 '%Y-%m-%dT%H:%M:%S.%f')
    except AttributeError:
        return datetime.now()


def set_last_activity(session):
    session['_session_security'] = datetime.now().strftime('%Y-%m-%dT%H:%M:%S.%f')


class AuthenticationMiddleware(object):

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request.user = SimpleLazyObject(lambda: self.__class__.get_token_user(request))
        return self.get_response(request)

    @staticmethod
    def get_token_user(request):
        user = get_user(request)
        if user.is_authenticated:
            return user

        token_authentication = TokenAuthentication()
        if get_authorization_header(request):
            try:
                user, _ = token_authentication.authenticate(request)
            except Exception:
                return user

        return user
