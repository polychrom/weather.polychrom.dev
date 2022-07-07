import { Component, Inject, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { ApiService } from '../api.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public locations: any;
  public isNavigationActive = false;
  constructor(
    public apiService: ApiService,
    public helperService: HelperService
  ) {
    console.log('platform browser?', this.helperService.isBrowser());

    if (this.helperService.isBrowser()) {
      this.locations = this.apiService.readLocationFromStorage();
    }

    if (this.helperService.isBrowser()) {
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
    if (this.helperService.isBrowser()) {
      console.log('nav read loc', this.locations);
    } else {
      console.log('server, cannot read loc');
    }
  }

  openNavigation(): void {
    this.isNavigationActive = true;
  }

  closeNavigation(): void {
    this.isNavigationActive = false;
  }
}
