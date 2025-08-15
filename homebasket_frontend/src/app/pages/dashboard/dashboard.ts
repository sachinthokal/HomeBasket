import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Item } from '../../model/item.model';
import { ItemService } from '../../services/item.service';
import { RouterModule } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { AuthGuard } from '../../guards/auth-guard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  categories = ['Grocery', 'Fruits & Vegetables', 'Dairy, Beverages & Bakery', 'Household & Cleaning','Miscellaneous'];
  units = ['KG', 'Gram', 'Litre', 'Ml','Qty', 'Pieces', 'Packs', 'Dozens', 'Bottles', 'Cans'];
  itemForm!: FormGroup;
  itemList: Item[] = [];
  isLoggedIn = false;
 

  constructor(private fb: FormBuilder, private itemService: ItemService) {}

  ngOnInit(): void {
    this.isLoggedIn = true;

    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      qty: [1, [Validators.required, Validators.min(1)]],
      unit: ['KG', Validators.required],
      category: ['', Validators.required],
    });

    this.onload();
  }

  onload() {
    this.itemService.getAllItems().subscribe(items => this.itemList = items);
  }

  addItem() {
    if (this.itemForm.valid) {
      const newItem: Item = {
        ...this.itemForm.value,
        created_at: new Date().toISOString() // automatically set
      };

      this.itemService.addItem(newItem).subscribe({
        next: (savedItem) => {
          this.itemList.push(savedItem || newItem);
          this.itemForm.reset({ qty: 1, unit: 'KG' });

          // Show Toast
          const toastEl = document.getElementById('successToast');
          if (toastEl) {
            const toast = new bootstrap.Toast(toastEl);
            toast.show();
          }
          this.onload();
        },
        error: (err) => console.error("Error saving item:", err)
      });
    }
  }
}
