import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  restaurants: any[] = [];
  skip: number = 0;
  limit: number = 10;

  constructor(private http: HttpClient) {
    this.loadData();
  }

  loadData() {
    const apiKey = 'bW9jay04ODc3NTU2NjExMjEyNGZmZmZmZmJ2';
    const url = 'https://smarty.kerzz.com:4004/api/mock/getFeed';
    const data = {
      skip: this.skip,
      limit: this.limit,
      latitude: 38.4484068, //koordinat
      longitude: 27.2109877 //koordinat
    };

    const headers = new HttpHeaders()
      .set('apiKey', apiKey)
      .set('Content-Type', 'application/json');

    this.http.post<any>(url, data, { headers }).subscribe(response => {
      console.log('Response:', response);
      this.restaurants = [...this.restaurants, ...response.response];
      this.skip += this.limit; // Skip değerini güncelle
    });
  }

  loadMore(event: { target: { complete: () => void; }; }) {
    this.loadData();

    event.target.complete();
  }
}



