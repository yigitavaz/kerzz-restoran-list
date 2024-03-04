import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonInfiniteScrollCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  restaurants: any[] = [];
  latitude!: number;
  longitude!: number;
  skip: number = 0;
  limit: number = 10;

  constructor(private http: HttpClient) {
    this.loadCurrentLocation();
  }

  loadCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.loadData();
        },
        (error) => {
          console.error('Error getting location', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  loadData() {
    const apiKey = 'bW9jay04ODc3NTU2NjExMjEyNGZmZmZmZmJ2';
    const url = 'https://smarty.kerzz.com:4004/api/mock/getFeed';
    const data = {
      skip: this.skip,
      limit: this.limit,
      latitude: this.latitude,
      longitude: this.longitude
    };

    const headers = new HttpHeaders()
      .set('apiKey', apiKey)
      .set('Content-Type', 'application/json');

    this.http.post<any>(url, data, { headers }).subscribe(response => {
      const updatedRestaurants = response.response.map((restaurant: { location: { coordinates: any[]; }; }) => {
        const restaurantLat = restaurant.location.coordinates[1];
        const restaurantLon = restaurant.location.coordinates[0];
        const distance = this.calculateDistance(this.latitude, this.longitude, restaurantLat, restaurantLon);
        return { ...restaurant, distance: distance.toFixed(2) }; // Mesafeyi restoran objesine ekleyin
      });

      this.restaurants = [...this.restaurants, ...updatedRestaurants];
      this.skip += this.limit;
    });
  }

  loadMore(event: IonInfiniteScrollCustomEvent<void>) {
    this.loadData(); // Daha fazla veri yüklemek için loadData'yı tekrar çağırın

    event.target.complete(); // Yükleme işleminin tamamlandığını belirtin
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Dünya'nın yarıçapı km cinsinden
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Mesafe km cinsinden
    return distance;
  }
  
  deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }
}
