import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-manager-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-tasks.html',
  styleUrls: ['./manager-tasks.css']
})
export class ManagerTasks implements OnInit {
  private chart: Chart | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  // component.ts
sendWhatsApp() {
  
}
  
}
