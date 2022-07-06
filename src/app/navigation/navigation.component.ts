import { Component, Inject, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { ApiService } from '../api.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  private isBrowser: boolean;

  public locations: any;
  public isNavigationActive = false;
  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    public apiService: ApiService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    console.log('platform', this.isBrowser);

    if (this.isBrowser) {
      this.locations = this.apiService.readLocationFromStorage();
    }

    if (this.isBrowser) {
      const click$ = fromEvent(window, 'click');
      click$.subscribe((event: any) => {
        let toggle = false;
        console.log('click', event.srcElement.id);
        if (event.srcElement.id !== 'navigation' && this.isNavigationActive) {
          //this.isNavigationActive = false;
          console.log('close modal');
        }
      });
    }
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
