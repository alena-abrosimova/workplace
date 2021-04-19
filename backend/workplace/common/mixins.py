# -*- coding: utf-8 -*-
from __future__ import unicode_literals


class MultiSerializerViewSetMixin(object):

    def get_serializer_class(self):

        try:
            return self.serializer_action_classes[self.action]
        except (KeyError, AttributeError):
            return super(MultiSerializerViewSetMixin, self).get_serializer_class()

    def get_queryset(self):
        try:
            return self.queryset_action[self.action]
        except (KeyError, AttributeError):
            return super(MultiSerializerViewSetMixin, self).get_queryset()

    def filter_queryset(self, queryset, default=False):
        for backend in list(self.filter_backends):
            try:
                queryset = backend().filter_queryset(self.request, queryset, self, default=default)
            except TypeError:
                queryset = backend().filter_queryset(self.request, queryset, self)

        return queryset
