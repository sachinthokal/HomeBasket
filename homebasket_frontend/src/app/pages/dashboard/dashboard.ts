import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Item } from '../../model/item.model';
import { ItemService } from './item.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  categories = [
    'Grocery',
    'Fruits & Vegetables',
    'Dairy, Beverages & Bakery',
    'Oils, Spices & Condiments',
    'Household & Cleaning'
  ];

  units = ['KG', 'Gram', 'Litre'];

  itemForm!: FormGroup;

  itemList: Item[] = [];

  items: Item[] = [];

  currentDateTime: string = '';

  sidebarOpen = false;
    
  constructor(private fb: FormBuilder, private itemService: ItemService) { }

  ngOnInit(): void {

    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      qty: [1, [Validators.required, Validators.min(1)]],
      unit: ['KG', Validators.required],
      category: ['', Validators.required]

    });
    this.onload();

    this.updateDateTime();
    setInterval(() => {
      this.updateDateTime();
    }, 1000);

  }

   toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    }

  updateDateTime() {
    this.currentDateTime = new Date().toLocaleString('en-IN', {      
      day: 'numeric',
      year: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  onload() {
    this.itemService.getAllItems().subscribe(
      (next) => { this.itemList = next; console.log("DB Loadded Successfully"); },
      (err) => { console.log("DB Loadded Failed"); }
    );
    console.log('ngOnInit() - form build :', this.itemForm);
  }

  addItem() {
    if (this.itemForm.valid) {
      const newItem: Item = {
        ...this.itemForm.value,
        created_at: new Date().toISOString()
      };
      console.log('addItem() - Item Added:', newItem);
      if (newItem.name) {
        this.itemList.push(newItem);
        this.itemForm.reset({ qty: 1, unit: 'KG' });
        console.log('addItem() - Item Push in List:', this.itemList);
      }

    }
  }

}