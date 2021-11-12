import { Component, ElementRef, ViewChild } from '@angular/core';


import { comedorData, ambienteYPFData, tiempo } from '../../assets/prueba.js';
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
  @ViewChild('barCanvasRealTime') public barCanvasRealTime: ElementRef;
  barChart: any;
  barChartRealTime:any;

  ppmList: string[] = [];
  tiempoList: number[] = [];

  constructor(private socket: Socket) {

    Chart.register(...registerables);
    this.socket.connect();

    this.socket.fromEvent('temp').subscribe((data: string) => {
      this.barChartRealTime.data.datasets[0].data.push(data);
      this.barChartRealTime.data.labels.push(this.barChartRealTime.data.datasets[0].data.length);
      this.barChartRealTime.update();
    });

  }

  ionViewWillEnter() {
    this.barCartMethod();
    this.barCartRealTimeMethod();
  }

  barCartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: tiempo,
        datasets: [
          {
            label: "Comedor",
            data: comedorData,
            borderColor: '#FF0000',
            backgroundColor: '#FF0000',
          },
          {
            label: "YPF Exterior",
            data: ambienteYPFData,
            borderColor: '#49FF00',
            backgroundColor: '#49FF00',
          },
          {
            label: "Otros",
            data: [500],
            borderColor: '#FF00FF',
            backgroundColor: '#FF00FF',

          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Analisis Previos'
          }
        },
        scales: {
          y: {
            min: 100,
            max: 3000,
          }
        }
      }
    })
  }

  barCartRealTimeMethod() {
    this.barChartRealTime = new Chart(this.barCanvasRealTime.nativeElement, {
      type: 'line',
      data: {
        labels: tiempo,
        datasets: [
          {
            label: "Real",
            data: this.ppmList,
            borderColor: '#FBFF00',
            backgroundColor: '#FBFF00',

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
            max: 3000,
          }
        }
      }
    })
  }


}
