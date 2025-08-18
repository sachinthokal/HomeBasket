# base image
FROM python:3.11-slim

# working directory
WORKDIR /app

# dependencies
COPY homebasket_backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# copy project
COPY homebasket_backend/ .

# environment variables (जसे SECRET_KEY, DB host etc.)
ENV PYTHONUNBUFFERED=1

# परत येणारी command
CMD ["gunicorn", "homebasket.wsgi:application", "--bind", "0.0.0.0:8000"]