web: python manage.py collectstatic --noinput;
web: gunicorn pve.wsgi
web: python manage.py runserver 0.0.0.0:$PORT;