import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  currentDateTime: string = '';
  item: any = { name: '', qty: 1, unit: '', category: '', purchased: false };


  itemsByCategory: Record<string, { name: string }[]> = {
    'Fruits & Vegetables': [],
    'Dairy & Eggs': [],
    'Oils, Spices & Condiments': [],
    'Household & Cleaning': []
  };

  constructor() { }

  ngOnInit() {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
  }

  updateDateTime() {
    const now = new Date();
    this.currentDateTime = now.toLocaleString();
  }

  addItem(){}
}