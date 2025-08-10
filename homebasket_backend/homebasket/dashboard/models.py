from django.db import models

# Create your models here.
class Item(models.Model):
    CATEGORY_CHOICES = [
        ('Fruits & Vegetables', 'Fruits & Vegetables'),
        ('Dairy & Eggs', 'Dairy & Eggs'),
        ('Oils, Spices & Condiments', 'Oils, Spices & Condiments'),
        ('Household & Cleaning', 'Household & Cleaning'),
    ]

    name = models.CharField(max_length=100)
    qty = models.PositiveIntegerField(default=1)
    unit = models.CharField(max_length=50, blank=True)  # e.g., kg, pcs
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)

    def __str__(self):
        return f"{self.name} ({self.qty} {self.unit}) - {self.category}"
