import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Item } from '../../model/item.model';
import { ItemService } from './item.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  currentDateTime: string = '';

  item: Item = {
    id: 0,
    name: '',
    qty: 0,
    unit: '',
    category: '',
  };

  categories = ['Grocery','Fruits & Vegetables', 'Dairy, Beverages & Bakery', 'Oils, Spices & Condiments', 'Household & Cleaning'];
  groupedItems: { [key: string]: Item[] } = {};
  maxRows: number = 0;



  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
    this.loadItems();
  }

  updateDateTime() {
    const now = new Date();
    this.currentDateTime = now.toLocaleString();
  }

  addItem() {
    this.itemService.addItem(this.item).subscribe({
      next: (response) => {
        console.log('Item added', response);
        this.item = { id: 0, name: '', qty: 1, unit: '', category: '' }; // reset form
        this.loadItems();
      },
      error: (error) => {
        console.error('Error adding item', error);
      }
    });

  }

  loadItems() {
    this.itemService.getAllItems().subscribe(data => {
      this.groupedItems = {};
      this.maxRows = 0;

      this.categories.forEach(category => {
        this.groupedItems[category] = data.filter(item => item.category === category);
        if (this.groupedItems[category].length > this.maxRows) {
          this.maxRows = this.groupedItems[category].length;
        }
      });
    });
  }

}