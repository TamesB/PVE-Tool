web: python manage.py collectstatic --noinput;
web: gunicorn app.wsgi
web: python manage.py runserver 0.0.0.0:$PORT;