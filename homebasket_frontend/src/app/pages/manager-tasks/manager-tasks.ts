import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ItemService } from '../../services/item.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manager-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-tasks.html',
  styleUrls: ['./manager-tasks.css']
})
export class ManagerTasks implements OnInit {

  totalItems: any;
  totalUsers: any;
  totalCategories: any;

  day: any;
  count: any;



  constructor(private http: HttpClient, private itemService: ItemService) { }


  ngOnInit(): void {
    this.loadDashboardCounts();
    this.loadTodayInfo();
    this.loadTodayItems();
  }

  loadDashboardCounts() {
    this.itemService.getDashboardCounts().subscribe({
      next: (res) => { this.totalItems = res.total_items, this.totalUsers = res.total_users, this.totalCategories = res.total_categories },
      error: (err) => console.error('Error loading dashboard counts', err)
    });
  }

  loadTodayInfo() {
    this.itemService.getTodayDayNumber().subscribe({
      next: (res) => this.day = res.day_number,
      error: (err) => console.error('Error loading today info', err)
    });
  }

  loadTodayItems() {
    this.itemService.getTodayItemsCount().subscribe({
      next: (res) => this.count = res.total_items_added,
      error: (err) => console.error('Error loading today items', err)
    });
  }

  downloadItemsPDF() {
    console.log("Clicked")

    this.itemService.getAllItems().subscribe({
      next: (items) => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Grocery Items List', 14, 20);

        const tableColumn = ["Item", "Quantity", "Unit", "Category", "Created At"];
        const tableRows: any[] = [];

        items.forEach(item => {
          const row = [
            item.name,
            item.qty,
            item.unit,
            item.category,
            item.created_at ? item.created_at.split('T')[0] : ''
          ];
          tableRows.push(row);
        });

        // ✅ Correct autoTable usage
        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY: 30
        });

        doc.save('grocery_items.pdf');
      },
      error: (err) => console.error('Failed to get items', err)
    });
  }

  alertConfirmation() {
    Swal.fire({
      title: 'OLD ITEMS BE GONE!',
      text: 'IF IT’S OLDER THAN 30 DAYS, IT’S OFFICIALLY VINTAGE… AND DELETED.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'YES, PROCEED',
      cancelButtonText: 'NO, CANCEL',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.itemService.truncateTable().subscribe({
          next: () => Swal.fire('Done', 'OLD ITEMS BACKED UP AND DELETED.', 'success'),
          error: () => Swal.fire('Error', 'SOMETHING WENT WRONG!', 'error')
        });
      }
    });
  }




}
