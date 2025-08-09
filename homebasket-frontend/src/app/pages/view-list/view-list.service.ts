import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewListService {

  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
