import { Pipe, PipeTransform } from '@angular/core';
import { ApiService } from './api.service';

enum Unit {
  metric = 'metric',
  standard = 'standard',
  imperial = 'imperial',
}

@Pipe({
  name: 'tempUnit',
  pure: false,
})
export class TempUnitPipe implements PipeTransform {
  constructor(private apiService: ApiService) {}

  transform(value: unknown, ...args: unknown[]): unknown {
    let currentUnit: string = '';
    this.apiService.$unitTemperature.subscribe((res) => {
      currentUnit = res;
    });

    switch (currentUnit) {
      case Unit.standard:
        return 'K';
      case Unit.metric:
        return '°C';
      case Unit.imperial:
        return 'F';
      default:
        return Unit.imperial;
    }
  }
}
