import { Component, OnInit } from '@angular/core';
import { Item } from '../../model/item.model';
import { CategoryService } from './category.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [ReactiveFormsModule, CommonModule ,RouterModule],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category implements OnInit {
  
  currentDateTime: string = '';
  sidebarOpen = false;
  itemList: Item[] = [];
  items: Item[] = [];

  constructor(private myService: CategoryService) {}


  ngOnInit(): void {

    this.onload();
  }

  onload() {
    
    this.myService.getAllItems().subscribe((next)=> {this.itemList = next})
  }
  
   toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    }

  onEdit(items: Item) {
    console.log('Edit clicked:', items);
    console.log(this.items);
  }

  deleteItemByIndex(index: number) {
    console.log('Request from view to delete', index);
    this.myService.deleteItem(index).subscribe((next) => { this.onload(); console.log(index, ' - Sent to DB API') })
  }

}
