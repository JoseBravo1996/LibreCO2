import { Component, ElementRef, ViewChild } from '@angular/core';


import { comedorData, comedorTiempo } from '../../assets/prueba.js';
import { Chart, registerables } from 'chart.js';
import { Socket } from 'ngx-socket-io';
import { of } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild('barCanvas') public barCanvas: ElementRef;
  ppmList: string[] = [];
  barChart: any;

  constructor(private socket: Socket) {
    this.socket.connect();

    this.socket.fromEvent('temp').subscribe((data: string) => {
      this.ppmList.push(data);
    });

    Chart.register(...registerables);
  }

  ionViewWillEnter() {
    this.barCartMethod();
  }

  barCartMethod() {
    let datos = of(comedorData);
    datos.subscribe(resp => console.log(resp));
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: comedorTiempo,
        datasets: [
          {
            label: "Comedor",
            data: comedorData,
            borderColor: '#FF0000',
            backgroundColor: '#FF0000',

          },
          {
            label: "Media",
            data: [100, 150, 250, 300],
            borderColor: '#FBFF00',
            backgroundColor: '#FBFF00',

          },
          {
            label: "Baja",
            data: [200, 100, 150, 180],
            borderColor: '#49FF00',
            backgroundColor: '#49FF00',
          },
          {
            label: "Sin Resultados",
            data: [100, 150, 250, 300],
            borderColor: '#9D9D9D',
            backgroundColor: '#9D9D9D',
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Analisis en tiempo real'
          }
        },
        scales: {
          y: {
            min: 1500,
            max: 3000,
          }
        }
      }
    })
  }


}
