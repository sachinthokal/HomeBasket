import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../../model/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  forEach(arg0: (item: any) => void) {
    throw new Error('Method not implemented.');
  }

  private baseUrl = 'http://127.0.0.1:8000/dashboard/items/'; // Spring Boot backend URL

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseUrl);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.baseUrl, item);
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}/`);
  }

}
