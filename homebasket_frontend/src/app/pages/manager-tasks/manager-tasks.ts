import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-manager-tasks',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './manager-tasks.html',
  styleUrls: ['./manager-tasks.css']
})
export class ManagerTasks implements OnInit, AfterViewInit {
  private chart: Chart | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.loadChartData();
  }

  loadChartData() {
    this.http.get<any>('http://localhost:8000/analytics/items-per-day/')
      .subscribe((response) => {
        let data: any[] = [];

        // Handle if response is object or array
        if (Array.isArray(response)) {
          data = response;
        } else if (response && Array.isArray(response.results)) {
          data = response.results;
        } else {
          console.error('Unexpected API response format:', response);
          return;
        }

        const labels = data.map(d => d.day);
        const counts = data.map(d => d.count);

        const ctx = document.getElementById('impressionsClicksChart') as HTMLCanvasElement;
        if (!ctx) {
          console.error('Canvas element not found!');
          return;
        }

        // Destroy old chart if exists
        if (this.chart) {
          this.chart.destroy();
        }

        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Items Added Per Day',
              data: counts,
              backgroundColor: '#4e73df'
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: { beginAtZero: true }
            }
          }
        });
      });
  }

  tasks = [
    { id: 1, title: 'Prepare Sales Report', description: 'Monthly sales data compilation', status: 'Pending' },
    { id: 2, title: 'Team Meeting', description: 'Discuss next quarter goals', status: 'In Progress' },
    { id: 3, title: 'Client Follow-up', description: 'Update client on project status', status: 'Completed' }
  ];
}
