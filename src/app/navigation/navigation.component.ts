import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public locations;
  public isNavigationActive = false;
  constructor(public apiService: ApiService) {
    this.locations = this.apiService.readLocationFromStorage();
  }

  ngOnInit(): void {
    console.log('nav read loc', this.locations);
  }

  openNavigation(): void {
    this.isNavigationActive = true;
  }

  closeNavigation(): void {
    this.isNavigationActive = false;
  }
}
