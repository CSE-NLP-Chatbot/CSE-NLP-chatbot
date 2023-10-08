#!/bin/bash
# exit on error
set -o errexit

pip install -r server/requirements.txt

python server/manage.py collectstatic --no-input
python server/manage.py migrate
