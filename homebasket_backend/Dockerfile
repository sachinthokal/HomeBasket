# Base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . /app/

# Optional: collect static files (if using Django static)
# RUN python manage.py collectstatic --noinput

# Expose port
EXPOSE 8000

# Run Gunicorn with multiple workers
CMD ["gunicorn", "homebasket.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]
