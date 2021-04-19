#!/usr/bin/env bash

sudo -u postgres psql -c "DROP DATABASE workplace;" || echo 'Database not exist'
sudo -u postgres psql -c "CREATE DATABASE workplace;"
sudo -u postgres psql -c "GRANT ALL ON DATABASE workplace TO workplace;"

python manage.py migrate
python manage.py loaddata workplace/fixtures/workplace

celery -A workplace worker --loglevel=info
