import { Component, OnInit } from '@angular/core';
import { Item } from '../../model/item.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-category',
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    RouterModule
  ],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category implements OnInit {

  currentDateTime: string = '';
  sidebarOpen = false;
  itemList: Item[] = [];
  items: Item[] = [];

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
    this.itemService.getAllItems().subscribe((data) => { this.Dairy_Beverages_Bakery = (data.filter(data => data.category == 'Dairy, Beverages & Bakery'))});
    this.itemService.getAllItems().subscribe((data) => { this.Fruits_Vegetables= (data.filter(data => data.category == 'Fruits & Vegetables')) });
    this.itemService.getAllItems().subscribe((data) => { this.Household_Cleaning= (data.filter(data => data.category == 'Household & Cleaning')) });
     this.itemService.getAllItems().subscribe((data) => { this.Miscellaneous= (data.filter(data => data.category == 'Miscellaneous')) })
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  autoSave(item: Item) {
  this.itemService.updateItem(item).subscribe(next => { console.log('Auto saved successfully')});
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

}
