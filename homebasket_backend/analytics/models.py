from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class GroceryListBackup(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="grocery_backups")
    item_name = models.CharField(max_length=255)
    qty = models.IntegerField()
    unit = models.CharField(max_length=50)
    category = models.CharField(max_length=100)
    purchased = models.BooleanField(default=False)
    backup_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.item_name} (backup)"
