import { Component, OnInit } from '@angular/core';
import { ViewListService } from './view-list.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-list.html',
  styleUrl: './view-list.css'
})
export class ViewList implements OnInit {

  products: any[] = [];
  message = "";
   // date/time
  currentDate = new Date();

  constructor(private productService: ViewListService ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error loading products', err);
      }
    });
  }

}
