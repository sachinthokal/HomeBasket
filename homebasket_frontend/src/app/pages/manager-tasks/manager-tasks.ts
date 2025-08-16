import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Item } from '../../model/item.model';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-manager-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-tasks.html',
  styleUrls: ['./manager-tasks.css']
})
export class ManagerTasks implements OnInit {

itemList: Item[] = [];

  constructor(private http: HttpClient, private itemService: ItemService) {}

  ngOnInit() {
    
    console.log(this.itemService.getAllItems().subscribe(items => this.itemList = items))
  }

 exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.itemList);
    const workbook = { Sheets: { 'Items List': worksheet }, SheetNames: ['Grocery List'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'items_list.xlsx');
  }
  resetGrocery(){

  }

  sendList(){
    
  }
  
}
