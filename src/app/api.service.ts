import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, retry, share, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private city = '';
  private key = '8d0f1082222a6a8aea340e03502dafc0';
  private weatherEndpoint: string =
    'https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=8d0f1082222a6a8aea340e03502dafc0';
  public getData$: any;

  public $searchLocationSuggestList = new Subject();
  public $weather = new Subject();

  private locationList: any = [];

  //private requestCity = `http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=5&appid=8d0f1082222a6a8aea340e03502dafc0`;

  constructor(private http: HttpClient) {
    this.getData$ = this.http.get(this.weatherEndpoint).pipe(shareReplay(1));
  }

  searchWeatherByLocation(lat: number, lon: number): void {
    this.http
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8d0f1082222a6a8aea340e03502dafc0`
      )
      .subscribe((res: any) => {
        this.$weather.next(res);
        console.log('weather', res);
        this.saveLocationToStorage(res);
      });
  }

  searchRequest(city: string) {
    this.http
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=8d0f1082222a6a8aea340e03502dafc0`
      )
      .subscribe((res: any) => this.$searchLocationSuggestList.next(res));
  }

  saveLocationToStorage(res: any): void {
    const location = {
      city: res.city.name,
      lat: res.city.coord.lat,
      lon: res.city.coord.lon,
    };

    this.locationList.push(location);

    // structure [{},{},{}]
    localStorage.setItem('location', JSON.stringify(this.locationList));

    console.log('save', res);
    console.log('save', res.city.coord.lat);
    console.log('save', res.city.coord.lon);
    console.log('save', res.city.name);
  }
  readLocationFromStorage(): any {
    if (localStorage['location']) {
      return JSON.parse(localStorage['location']);
    }
  }
}
