FROM python:3.10-slim

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Expose port
EXPOSE 8000

# Run migrations + start Gunicorn
CMD ["sh", "-c", "python manage.py migrate && gunicorn homebasket.wsgi:application --bind 0.0.0.0:8000 --workers 3"]