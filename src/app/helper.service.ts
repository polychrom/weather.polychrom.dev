import { Inject, Injectable } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  //private isBrowser: boolean;
  //private isServer: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {}

  isBrowser(): boolean {
    return isPlatformBrowser(PLATFORM_ID);
  }

  isServer(): boolean {
    return isPlatformServer(PLATFORM_ID);
  }
}
