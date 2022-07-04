import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry, share, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private key = '8d0f1082222a6a8aea340e03502dafc0';
  private weatherEndpoint: string =
    'https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=8d0f1082222a6a8aea340e03502dafc0';
  //data: Observable<any> | undefined;
  public getData$: any;

  constructor(private http: HttpClient) {
    this.getData$ = this.http.get(this.weatherEndpoint).pipe(shareReplay(1));
  }
}
