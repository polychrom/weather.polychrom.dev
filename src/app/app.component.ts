import { ViewportScroller } from '@angular/common';
import { isNgTemplate } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'weather.polychrom.dev';
  projects: any;
  data: any;
  public weather: any;
  myTime: any;
  myCollection: any[] = [];
  public data$: any;
  public weatherList: any;
  public meta: any;
  public forecast: any;
  public dayArray: any = [];
  public currentWeather: any;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.apiService.getData$.subscribe((data: any) => {
      this.meta = data;
      this.forecast = data.list;
      this.currentWeather = data.list[0];
      console.log('forecast', this.forecast);
      console.log('current', this.currentWeather);
      console.log('meta', this.meta);

      console.log(this.forecast[0].dt);

      /*
      for (let i = 0; i < this.forecast.length; i++) {
        const date = new Date(this.forecast[i].dt * 1000);
        const day = date.getDate();
        console.log('day', day);
        this.dayArray.push(this.forecast[i]);

        console.log('entries', i, this.forecast[i]);

        console.log('from push', i, this.dayArray);
      }*/

      //this.days = data.list.map((item: any) => item.dt);
    });
  }
}
