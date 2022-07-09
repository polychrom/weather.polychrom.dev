import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public $isSearchModalOpen = new BehaviorSubject<boolean>(false);

  constructor() {}

  searchModalState(state: boolean): void {
    this.$isSearchModalOpen.next(state);
    console.info('modal state', state);
  }
}
