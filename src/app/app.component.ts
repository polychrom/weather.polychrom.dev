import { ViewportScroller } from '@angular/common';
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
  myWeather: any;
  myTime: any;
  myCollection: any[] = [];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private viewportScroller: ViewportScroller
  ) {}
}
