import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../../app/model/item.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  forEach(arg0: (item: any) => void) {
    throw new Error('Method not implemented.');
  }

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

   getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}dashboard/items/`);
  }

   getItemsHistory(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}analytics/history-table/`);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.baseUrl}dashboard/items/`, item);
  }

  deleteItem(id: number): Observable<any> {
    console.log('sent req to backend delete api')
    return this.http.delete(`${this.baseUrl}dashboard/items/${id}/`)
  }
  updateItem(item: Item) {
    return this.http.put(`${this.baseUrl}dashboard/items/${item.id}/`, item);
  }

   // Total counts (items, users, categories)
  getDashboardCounts(): Observable<any> {
    return this.http.get(`${this.baseUrl}analytics/total-items/`); // Django URL
  }

  // Today's day number
  getTodayDayNumber(): Observable<any> {
    return this.http.get(`${this.baseUrl}analytics/today-day/`);
  }

  // Today's items added
  getTodayItemsCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}analytics/items-per-day/`);
  }

  // truncateTable from DB
  truncateTable(): Observable<any> {
    return this.http.delete(`${this.baseUrl}analytics/truncate-table/`);
  }


}
