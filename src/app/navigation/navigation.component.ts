import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { ApiService } from '../api.service';
import { HelperService } from '../helper.service';
import { SharedService } from '../shared.service';

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
    public helperService: HelperService,
    public sharedService: SharedService
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

  openSearchModal(): void {
    this.sharedService.searchModalState(true);
  }
}
