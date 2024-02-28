import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RestaurantListService {
  constructor(private http: HttpClient) { }

  getRestaurantList(): Observable <any> {
   return this.http.get(`${environment.baseUrl}/mock/getFeed?api_key=${environment.apiKey}`);
  }
}
