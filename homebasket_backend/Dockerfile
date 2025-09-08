# Stage 1: Base image
FROM python:3.12-slim

# Set workdir
WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy backend code
COPY . .

# Expose port
EXPOSE 8000

# Start server
CMD ["gunicorn", "homebasket.wsgi:application", "--bind", "0.0.0.0:8000"]