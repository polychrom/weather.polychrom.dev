import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, retry, share, shareReplay } from 'rxjs/operators';

interface ICity {
  name: string;
  lat: number;
  lon: number;
  unit: string;
}

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

  public $unitTemperature = new BehaviorSubject<string>('standard');

  public unit = '';

  private locationList: any = [];

  //private requestCity = `http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=5&appid=8d0f1082222a6a8aea340e03502dafc0`;

  constructor(private http: HttpClient, private router: Router) {
    this.getData$ = this.http.get(this.weatherEndpoint).pipe(shareReplay(1));
  }

  setTemperatureUnit(unit: string): void {
    this.$unitTemperature.next(unit);
    console.log('XXX', unit);
  }

  initLatestWeatherFromStorage(): void {
    let _loc = localStorage.getItem('location');
    if (_loc && _loc.length > 0) {
      const _locations = JSON.parse(_loc);
      const latestWeatherLocation = _locations[_locations.length - 1];

      this.searchWeatherByLocation(
        latestWeatherLocation.lat,
        latestWeatherLocation.lon
      );
    }
  }

  searchWeatherByLocation(lat: number, lon: number): void {
    this.$unitTemperature.subscribe((res: any) => {
      this.unit = res;
      console.log('unit subject', res);
    });

    this.http
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${this.unit}&appid=8d0f1082222a6a8aea340e03502dafc0`
      )
      .subscribe((res: any) => {
        this.$weather.next(res);
        console.log('weather', res);
        this.saveLocationToStorage(res);

        /*
        this.router.navigate(['/city'], {
          queryParams: <ICity>{
            name: res.city.name,
            lat: res.city.coord.lat,
            lon: res.city.coord.lon,
            unit: 'standard',
          },
        });*/
      });
  }

  searchRequest(city: string) {
    this.http
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=8d0f1082222a6a8aea340e03502dafc0`
      )
      .subscribe((res: any) => this.$searchLocationSuggestList.next(res));
  }

  saveLocationToStorage(res: any): void {
    console.log('SAVE STORAGE CALLED');

    // read saved locations from storage
    let tmp = localStorage.getItem('location');
    if (tmp) {
      let rewrite = JSON.parse(tmp);
      rewrite.map((item: any) => (item.isActiveLocation = false));

      this.locationList = rewrite;
      console.log('locationList', this.locationList);
    }

    // Object to store latest location
    const location = {
      isActiveLocation: true,
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
    if (localStorage.getItem('location')) {
      return JSON.parse(localStorage['location']);
    } else {
      return null;
    }
  }

  getActiveLocationFromStorage(): any {
    const _locations: string | null = localStorage.getItem('location');
    return _locations ? JSON.parse(_locations) : null;
  }
}
