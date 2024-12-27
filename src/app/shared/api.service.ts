import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestaurentData } from '../restaurent-dash/restaurent.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'http://localhost:5001/restaurants';

  constructor(private http: HttpClient) {}

  // Correct Observable return type
  addRestaurent(data: RestaurentData): Observable<{ message: string, insertedId: string }> {
    return this.http.post<{ message: string, insertedId: string }>(this.baseUrl, data);
  }

  updateRestaurant(id: string, data: RestaurentData): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.baseUrl}/${id}`, data);
  }

  deleteRestaurant(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }

  getRestaurent(): Observable<RestaurentData[]> {
    return this.http.get<RestaurentData[]>(this.baseUrl);
  }
}
