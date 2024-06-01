import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClothingDataService {
  private apiUrl = 'http://localhost:8080/api/v1/user/clothing-items';

  constructor(private http: HttpClient) { }

  getClothingItems(userId: string): Observable<any> {
    const url = `${this.apiUrl}?user-id=${userId}`;
    return this.http.get<any>(url);
  }

  updateFavoriteStatus(userId: string, itemId: string, isFavorite: boolean): Observable<any> {
    const url = `http://localhost:8080/api/v1/user/clothing-item?clothing-item-id=${itemId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userId}`
    });
    return this.http.put<any>(url, { isFavorite }, { headers });
  }
}
