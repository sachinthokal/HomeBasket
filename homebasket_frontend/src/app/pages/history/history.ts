import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Item } from '../../model/item.model';
import { ItemService } from '../../services/item.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-history',
  imports: [DatePipe,ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class History implements OnInit {

  itemForm!: FormGroup;
  itemList: Item[] = [];
  isLoggedIn = false;


  constructor(private fb: FormBuilder, private itemService: ItemService) { }

  ngOnInit(): void {
    this.isLoggedIn = true;

    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      qty: [1, [Validators.required, Validators.min(1)]],
      unit: ['KG', Validators.required],
      category: ['', Validators.required],
    });

    this.itemService.getAllItems().subscribe(items => this.itemList = items);

    
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
  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.itemList);
    const workbook = { Sheets: { 'Items List': worksheet }, SheetNames: ['Items List'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'items_list.xlsx');
  }


}
