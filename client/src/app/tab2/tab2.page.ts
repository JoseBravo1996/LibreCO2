import { Component, ElementRef, ViewChild } from '@angular/core';



import { Chart, registerables } from 'chart.js';
import { Socket } from 'ngx-socket-io';

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
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [2021,2022,2023,2024],
        datasets: [
          {
            label: "Alta",
            data: [200, 300, 150, 450],
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
            min: 100,
            max: 1000,
          }
        }
      }
    })
  }


}
