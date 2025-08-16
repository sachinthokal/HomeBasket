from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from accounts.models import User


# GroceryList model (grocerylist टेबलसाठी)
class GroceryList(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    qty = models.IntegerField()
    unit = models.CharField(max_length=10)
    category = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="groceries")
    created_at = models.DateTimeField(auto_now_add=True)  # 👈 हे add कर


    class Meta:
        db_table = "dashboard_grocerylist"   # appname_modelname वापरलं तर raw query जुळेल


    def __str__(self):
        return f"{self.name} ({self.qty} {self.unit})"
