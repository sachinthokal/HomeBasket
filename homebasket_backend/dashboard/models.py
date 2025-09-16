from django.utils import timezone
from django.db import models
from django.contrib.auth import get_user_model

# Django चा User model fetch करा
User = get_user_model()

class GroceryList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="grocery_items")
    item_name = models.CharField(max_length=255)
    qty = models.IntegerField()
    unit = models.CharField(max_length=50)
    category = models.CharField(max_length=100)
    purchased = models.BooleanField(default=False)
    # add created_at with default
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name
    class Meta:
        db_table = "grocery_list"  # ✅ custom table name