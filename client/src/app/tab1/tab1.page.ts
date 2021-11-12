import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private ppm: any = '';
  private today: Date = new Date;
  private weatherData: any;
  public apiKey: string = "a311238c71288f35f6f298a865286288";
  public ciudad: string = "Quilmes";

  constructor(private socket: Socket) {
    this.socket.connect();

    this.socket.fromEvent('temp').subscribe(data => {
      this.ppm = data;
    });

    this.getWeatherData();
  }

  getWeatherData(){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.ciudad}&appid=${this.apiKey}`)
    .then(response => response.json())
    .then(data => { this.setWeatherData(data)});
  }

  setWeatherData(data){
    this.weatherData = data;
    let sunsetTime = new Date(this.weatherData.sys.sunset * 1000);
    this.weatherData.sunset_time = sunsetTime.toLocaleDateString();
    let currentDate = new Date();
    this.weatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.weatherData.temp_celcius = (this.weatherData.main.temp - 273.15).toFixed(0);
    this.weatherData.temp_min = (this.weatherData.main.temp_min - 273.15).toFixed(0);
    this.weatherData.temp_max = (this.weatherData.main.temp_max - 273.15).toFixed(0);
    this.weatherData.temp_feels_like = (this.weatherData.main.feels_like - 273.15).toFixed(0);
  }
}
