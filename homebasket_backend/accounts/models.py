from django.db import models
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


# Custom User model (तुझ्या auth_user टेबलसाठी)
class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(null=True, blank=True)
    is_superuser = models.BooleanField(default=False)
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    whatsapp_number = models.CharField(max_length=11)
    email = models.EmailField(max_length=254)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    def set_password(self, raw_password):
        """Password hash करून save करण्यासाठी"""
        self.password = make_password(raw_password)
        self.save(update_fields=["password"])

    def __str__(self):
        return self.username