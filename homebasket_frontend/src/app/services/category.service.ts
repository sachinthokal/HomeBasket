import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../model/item.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  forEach(arg0: (item: any) => void) {
    throw new Error('Method not implemented.');
  }

  private baseUrl = 'http://127.0.0.1:8000/dashboard/items/'; // Spring Boot backend URL

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseUrl);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.baseUrl, item);
  }

  deleteItem(id: number): Observable<any> {
    console.log('sent req to backend delete api')
    return this.http.delete(`${this.baseUrl}${id}/`)
  }
  updateItem(item: Item) {
    return this.http.put(`${this.baseUrl}${item.id}/`, item);
  }

}
