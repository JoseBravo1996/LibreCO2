import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Data {
  movies: string;
}


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public data: Data;
  public columns: any;
  public rows: any;

  constructor( private http: HttpClient
  ) {
    this.columns = [
      { name: 'concentracion' },
      { name: 'Efecto' },
    ];

    this.http.get<Data>('../../assets/movies.json')
      .subscribe((res) => {
        this.rows = res.movies;
      });
  }
}
