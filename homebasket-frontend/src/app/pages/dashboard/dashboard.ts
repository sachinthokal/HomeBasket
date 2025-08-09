import { Component } from '@angular/core';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

type CategoryName = 'groceries' | 'fruits' | 'dairy' | 'beverages' | 'household';

interface Item {
  name: string;
  qty: number;
  unit?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, TitleCasePipe],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {
  // date/time
  currentDate = new Date();

  // categories for tab header (key must match type CategoryName)
  categoryList: { key: CategoryName; label: string }[] = [
    { key: 'fruits', label: 'Fruits & Vegetables' },
    { key: 'dairy', label: 'Dairy & Bakery' },
    { key: 'beverages', label: 'Beverages' },
     { key: 'groceries', label: 'Groceries' },
    { key: 'household', label: 'Household & Cleaning' },
  ];

  // typed categories store
  categories: Record<CategoryName, Item[]> = {
    beverages: [],
    fruits: [],
    dairy: [],
    groceries: [],
    household: []   
  };

  // UI state
  selectedCategory: CategoryName = 'groceries';

  // new item model
  newItemName = '';
  newItemQty = 1;
  newItemUnit = 'KG';
  newItemCategory: CategoryName = 'groceries';

  constructor() {
    // update date/time every second
    setInterval(() => (this.currentDate = new Date()), 1000);
  }

  // switch active tab
  switchCategory(cat: CategoryName) {
    this.selectedCategory = cat;
  }

  // items for currently selected category
  getItemsForSelected(): Item[] {
    return this.categories[this.selectedCategory];
  }

  // increment quantity (single step)
  incrementQty(item: Item) {
    item.qty = Number((item.qty + 1).toFixed(2));
  }

  // handle manual edit from input (pass Event)
  editQty(item: Item, event: Event) {
    const input = event.target as HTMLInputElement;
    const v = input.valueAsNumber;
    if (!isNaN(v) && v >= 0) {
      item.qty = v;
    }
  }

  // add new item to selected/newItemCategory
  addItem() {
    const name = this.newItemName.trim();
    if (!name || !(this.newItemQty > 0)) return;

    this.categories[this.newItemCategory].push({
      name,
      qty: Number(this.newItemQty),
      unit: this.newItemUnit
    });

    // reset form
    this.newItemName = '';
    this.newItemQty = 1;
    this.newItemUnit = 'KG';
    this.newItemCategory = this.selectedCategory;
  }

  // optional remove item
  removeItem(item: Item) {
    const arr = this.categories[this.selectedCategory];
    const idx = arr.indexOf(item);
    if (idx > -1) arr.splice(idx, 1);
  }
}
