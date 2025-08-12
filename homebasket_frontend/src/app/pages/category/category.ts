import { Component, OnInit } from '@angular/core';
import { Item } from '../../model/item.model';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category implements OnInit {

  currentDateTime: string = '';
  sidebarOpen = false;
  itemList: Item[] = [];
  items: Item[] = [];


  Grocery: Item[] = [];
  Fruits_Vegetables: Item[] = [];
  Dairy_Beverages_Bakery: Item[] = [];
  Household_Cleaning: Item[] = [];

  units = ['KG', 'Gram', 'Litre', 'Ml', 'Pieces', 'Packs', 'Dozens', 'Bottles', 'Cans'];

  constructor(private myService: CategoryService) { }


  ngOnInit(): void {

    this.onload();
  }

  onload() {

    //this.myService.getAllItems().subscribe((next)=> {this.itemList = next})

    this.myService.getAllItems().subscribe((data) => { this.Grocery = (data.filter(data => data.category == 'Grocery')) });
    this.myService.getAllItems().subscribe((data) => { this.Dairy_Beverages_Bakery = (data.filter(data => data.category == 'Dairy, Beverages & Bakery'))});
    this.myService.getAllItems().subscribe((data) => { this.Fruits_Vegetables= (data.filter(data => data.category == 'Fruits & Vegetables')) });
    this.myService.getAllItems().subscribe((data) => { this.Household_Cleaning= (data.filter(data => data.category == 'Household & Cleaning')) })
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  autoSave(item: Item) {
  this.myService.updateItem(item).subscribe(next => { console.log('Auto saved successfully')});
  console.log(item);
}

  deleteItemByIndex(index: number) {
    console.log('Request from view to delete', index);
    this.myService.deleteItem(index).subscribe((next) => { this.onload(); console.log(index, ' - Sent to DB API') })
  }

}
