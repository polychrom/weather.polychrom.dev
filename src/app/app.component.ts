import { ChangeDetectorRef, Component } from '@angular/core';
import { fromEvent } from 'rxjs';
import { ApiService } from './api.service';
import { HelperService } from './helper.service';
import { SharedService } from './shared.service';

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
  public locationList: any;
  private keyEnter = 13; // Enter
  public searchNote = '';
  public isSearchModalOpen = false;
  public alertTooFewChars = 'not enough chars';
  private currentLocationId: any;

  public search = this.helperService.isBrowser()
    ? <HTMLInputElement>document.getElementById('search')
    : undefined;

  constructor(
    public apiService: ApiService,
    public helperService: HelperService,
    public sharedService: SharedService,
    private cdr: ChangeDetectorRef
  ) {
    if (this.helperService.isBrowser()) {
      this.apiService.initLatestWeatherFromStorage();

      if (this.apiService.readLocationFromStorage()) {
        this.sharedService.searchModalState(false);
      } else {
        this.sharedService.searchModalState(true);
      }
    }
  }

  ngOnInit(): void {
    this.apiService.$unitTemperature.subscribe(() => {
      console.log('cdr triggered');
      this.cdr.detectChanges();
    });

    this.sharedService.$isSearchModalOpen.subscribe((res) => {
      console.log('app search modal', res);
      this.isSearchModalOpen = res;
    });

    if (this.helperService.isBrowser()) {
      fromEvent(window, 'keydown').subscribe((event: any) => {
        const search = <HTMLInputElement>document.getElementById('search');
        console.log('chars', search.value);

        if (event.keyCode === this.keyEnter && event.target.id === 'search') {
          if (search && search.value.length > 1) {
            this.searchLocation();
          } else {
            console.log('not enough chars');
            this.searchNote = this.alertTooFewChars;
          }
        }
      });
    }

    this.apiService.$searchLocationSuggestList.subscribe((res: any) => {
      console.log('data', res);
      this.locationList = res;
    });

    this.apiService.$weather.subscribe((data: any) => {
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

  searchLocation(): void {
    console.log('YYY search');
    //console.log('input', this.searchValue);
    const search = <HTMLInputElement>document.getElementById('search');
    if (search && search.value.length > 1) {
      this.apiService.searchRequest(search ? search.value : '');
    } else {
      this.searchNote = this.alertTooFewChars;
    }
  }

  searchWeather(idx: number): void {
    this.currentLocationId = idx;
    console.log('IDX', idx);
    const weatherLocation = this.locationList[idx];

    this.apiService.searchWeatherByLocation(
      weatherLocation.lat,
      weatherLocation.lon
    );
    console.log('pos', idx);
  }
}
