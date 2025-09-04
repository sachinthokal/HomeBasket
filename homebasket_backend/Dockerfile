# Base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project code
COPY . .

# Collect static files (important for Django in production)
RUN python manage.py collectstatic --noinput

# Expose Django port
EXPOSE 8000

# Run Django with Gunicorn (production-ready)
CMD ["gunicorn", "myproject.wsgi:application", "--bind", "0.0.0.0:8000", "--workers=1"]