from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()

class GroceryListBackup(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item_name = models.CharField(max_length=255)
    qty = models.IntegerField()
    unit = models.CharField(max_length=50)
    category = models.CharField(max_length=100)
    purchased = models.BooleanField(default=False)
    backup_date = models.DateTimeField(auto_now_add=True)

    created_at = models.DateTimeField(default=timezone.now)  # ✅ FIXED

    def __str__(self):
        return f"{self.item_name} ({self.user.username})"

    class Meta:
        db_table = "grocery_list_backup"  # ✅ custom table name