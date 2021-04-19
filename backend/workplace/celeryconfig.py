# -*- coding: utf-8 -*-
from __future__ import unicode_literals

broker_url = 'redis://localhost:6381/0'

result_backend = 'redis://localhost:6381/0'
beat_scheduler = 'django'
worker_max_tasks_per_child = 10

beat_max_loop_interval = 1.0
beat_sync_every = 1.0


# noinspection PyUnusedLocal
def on_failure(self, exc, task_id, args, kwargs, einfo):
    print('{0!r} failed: {1!r}'.format(task_id, exc))


task_annotations = {
    '*': {
        'rate_limit': '10/s',
        'on_failure': on_failure
    }
}

task_acks_late = True
