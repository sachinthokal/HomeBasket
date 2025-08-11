import { Component, OnInit } from '@angular/core';
import { Item } from '../../model/item.model';
import { CategoryService } from './category.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category implements OnInit {

  constructor(private myService: CategoryService) {
    // You can use myService here if needed
  }

  itemList: Item[] = [];

  items: Item[] = [];

  ngOnInit(): void {

    this.onload();
  }

  onload() {
    
    this.myService.getAllItems().subscribe((next)=> {this.itemList = next})
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
