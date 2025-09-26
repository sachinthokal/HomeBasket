import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Item } from '../../model/item.model';
import { ItemService } from '../../services/item.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-history',
  imports: [DatePipe, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class History implements OnInit {

  itemForm!: FormGroup;
  itemList: Item[] = [];
  isLoggedIn = false;

  Grocery: Item[] = [];
  Fruits_Vegetables: Item[] = [];
  Dairy_Beverages_Bakery: Item[] = [];
  Household_Cleaning: Item[] = [];
  Miscellaneous: Item[] = [];


  constructor(private fb: FormBuilder, private itemService: ItemService) { }

  ngOnInit(): void {
    this.isLoggedIn = true;

    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      qty: [1, [Validators.required, Validators.min(1)]],
      unit: ['KG', Validators.required],
      category: ['', Validators.required],
    });

    this.itemService.getItemsHistory().subscribe(items => this.itemList = items);


    if (this.itemForm.valid) {
      // Current UTC timestamp
      const createdAtUTC = new Date().toISOString(); // UTC for backend

      // Convert UTC to IST for frontend display
      const createdAtIST = new Date(createdAtUTC).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: false // 24-hour format
      });

      const newItem: Item = {
        ...this.itemForm.value,
        created_at: createdAtUTC, // send UTC to backend
        localTime: createdAtIST   // display IST locally
      };
    }
  }


  deleteAll() {
    this.itemService.deleteAllItemsFromHistory().subscribe({
      next: (res: any) => {
        // Show success message using AlertifyJS
        alertify.success(res.message || 'No items to delete.');
        this.ngOnInit();
        // Clear local arrays
        this.Grocery = [];
        this.Fruits_Vegetables = [];
        this.Dairy_Beverages_Bakery = [];
        this.Household_Cleaning = [];
        this.Miscellaneous = [];
      },
      error: (err) => {
        // Show error message using AlertifyJS
        alertify.error('Something went wrong!');
        console.error(err);
      }
    });
  }
}
