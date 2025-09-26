import { Component, OnInit } from '@angular/core';
import { Item } from '../../model/item.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ItemService } from '../../services/item.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-category',
  imports: [ ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category implements OnInit {

  currentDateTime: string = '';
  sidebarOpen = false;
  itemList: Item[] = [];
  items: Item[] = [];
  CURRENT = new Date();

  isLoggedIn: boolean = true;


  Grocery: Item[] = [];
  Fruits_Vegetables: Item[] = [];
  Dairy_Beverages_Bakery: Item[] = [];
  Household_Cleaning: Item[] = [];
  Miscellaneous: Item[] = [];

  units = ['KG', 'Gram', 'Litre', 'Ml', 'Pieces', 'Packs', 'Dozens', 'Bottles', 'Cans'];

  constructor(private itemService: ItemService, private router: Router) { }


  ngOnInit(): void {

    this.onload();
  }

  onload() {

    //this.itemService.getAllItems().subscribe((next)=> {this.itemList = next})

    this.itemService.getAllItems().subscribe((data) => { this.Grocery = (data.filter(data => data.category == 'Grocery')) });
    this.itemService.getAllItems().subscribe((data) => { this.Dairy_Beverages_Bakery = (data.filter(data => data.category == 'Dairy, Beverages & Bakery')) });
    this.itemService.getAllItems().subscribe((data) => { this.Fruits_Vegetables = (data.filter(data => data.category == 'Fruits & Vegetables')) });
    this.itemService.getAllItems().subscribe((data) => { this.Household_Cleaning = (data.filter(data => data.category == 'Household & Cleaning')) });
    this.itemService.getAllItems().subscribe((data) => { this.Miscellaneous = (data.filter(data => data.category == 'Miscellaneous')) });

  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  autoSave(item: Item) {
    this.itemService.updateItem(item).subscribe(next => { console.log('Auto saved successfully') });
    console.log(item);
  }

  deleteItemByIndex(index: number) {
    console.log('Request from view to delete', index);
    this.itemService.deleteItem(index).subscribe((next) => { this.onload(); console.log(index, ' - Sent to DB API') })
  }

  logout() {
    console.log("Logout CLicked")
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    localStorage.removeItem('activeProfile');
    this.router.navigate(['/login']);
  }

  togglePurchased(item: any) {

    this.itemService.togglePurchased(item)
  }

markAllPurchased() {
  this.itemService.purchaseAllItems().subscribe({
    next: (res: any) => {
      // alert(res.message);
      alertify.success(res.message);

      // Update UI
      this.Grocery.forEach(item => item.purchased = true);
      this.Fruits_Vegetables.forEach(item => item.purchased = true);
      this.Dairy_Beverages_Bakery.forEach(item => item.purchased = true);
      this.Household_Cleaning.forEach(item => item.purchased = true);
      this.Miscellaneous.forEach(item => item.purchased = true);
    },
    error: (err) => {
      console.error("Failed to mark all items purchased", err);
      // alert('Something went wrong!');
      alertify.error('Something went wrong!');
    }
  });
}
allItemsPurchased(): boolean {
  return [...this.Grocery, ...this.Fruits_Vegetables, ...this.Dairy_Beverages_Bakery, ...this.Household_Cleaning, ...this.Miscellaneous]
    .every(item => item.purchased);
}


resetAllPurchased() {
  this.itemService.resetAllItems().subscribe({
    next: (res: any) => {
      alertify.success(res.message);

      // Reset purchased status in local arrays
      this.Grocery.forEach(item => item.purchased = false);
      this.Fruits_Vegetables.forEach(item => item.purchased = false);
      this.Dairy_Beverages_Bakery.forEach(item => item.purchased = false);
      this.Household_Cleaning.forEach(item => item.purchased = false);
      this.Miscellaneous.forEach(item => item.purchased = false);
    },
    error: (err) => {
      console.error("Failed to reset all items", err);
      alertify.error('Something went wrong!');
    }
  });
}
anyItemsPurchased(): boolean {
  return [...this.Grocery, ...this.Fruits_Vegetables, ...this.Dairy_Beverages_Bakery, ...this.Household_Cleaning, ...this.Miscellaneous]
    .some(item => item.purchased);
}

deleteAll() {
  if (!confirm("Are you sure you want to delete all items?")) return;

  this.itemService.deleteAllItems().subscribe({
    next: (res: any) => {
      alertify.success(res.message);

      // Clear local arrays
      this.Grocery = [];
      this.Fruits_Vegetables = [];
      this.Dairy_Beverages_Bakery = [];
      this.Household_Cleaning = [];
      this.Miscellaneous = [];
    },
    error: (err) => {
      console.error("Failed to delete all items", err);
      alertify.error('Something went wrong!');
    }
  });
}

}
