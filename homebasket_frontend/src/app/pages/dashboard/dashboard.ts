import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Item } from '../../model/item.model';
import { ItemService } from '../../services/item.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {


  categories = [
    'Grocery',
    'Fruits & Vegetables',
    'Dairy, Beverages & Bakery',
    'Household & Cleaning'
  ];

  units = ['KG', 'Gram', 'Litre', 'Ml', 'Pieces', 'Packs', 'Dozens', 'Bottles', 'Cans'];

  itemForm!: FormGroup;

  itemList: Item[] = [];

  items: Item[] = [];

  currentDateTime: string = '';
  isLoggedIn:boolean = false;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {

    this.isLoggedIn = true;
    
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      qty: [1, [Validators.required, Validators.min(1)]],
      unit: ['KG', Validators.required],
      category: ['', Validators.required]

    });
    this.onload();
  }


  onload() {
    this.itemService.getAllItems().subscribe(
      (next) => { this.itemList = next; console.log("DB Loadded Successfully"); }
    );


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
        this.itemService.addItem(newItem).subscribe((next) => { console.log("Data sent to the Backend API") });
        this.itemForm.reset({ qty: 1, unit: 'KG' });
        console.log('addItem() - Item Push in List:', this.itemList);
        this.onload();
        console.log('DB loadded');
      }

    }
  }

}