import { Injectable } from '@angular/core';
import { State } from '../models/state';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  private state: State[] = [
    {
      "name": "Normal",
      "value": 8940000
    },
    {
      "name": "Alta",
      "value": 5000000
    },
    {
      "name": "Media",
      "value": 7200000
    },
      {
      "name": "Sin resultado",
      "value": 6200000
    }
  ];

  get stateData() {
    return this.state;
  }
  
}
