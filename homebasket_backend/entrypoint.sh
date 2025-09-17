#!/bin/sh

echo "📦 Running Django migrations..."
python manage.py migrate --noinput

echo "📦 Collecting static files..."
python manage.py collectstatic --noinput

echo "🚀 Starting Gunicorn..."
gunicorn homebasket.wsgi:application --bind 0.0.0.0:8000