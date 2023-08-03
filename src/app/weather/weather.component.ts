import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  city: string = 'Berlin';
  weatherData: any = null;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeatherData();
  }

  getWeatherData() {
    this.weatherService.getWeather(this.city).subscribe(
      {
        next: (data) => {
          this.weatherData = data;
        },
        error: (error) => {
          console.error(error);
        }
      }
    );
  }

  getWeather() {
    this.getWeatherData();
  }
}