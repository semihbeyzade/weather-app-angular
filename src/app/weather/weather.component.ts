import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  city: string="Berlin";
  weatherData: any = null;
  minTemperature: number = 0;
  maxTemperature: number = 0;
  main: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeatherData();
  }

  getWeatherData() {
    this.weatherService.getWeather(this.city).subscribe(
      {
        next: (data) => {
          this.weatherData = data;
          this.minTemperature = data.main.temp_min;
          this.maxTemperature = data.main.temp_max;
          this.main = this.weatherData.weather[0].main;
          
        },
        error: (error) => {
          console.error(error);
        }
      }
    );
  }

  convertToCelsius(tempKelvin: number): number {
    return Math.round(tempKelvin);
  }

  roundToTemp(temp: number): number {
    return Math.round(temp);
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    });
  }

  getWeatherIconUrl(): string {
    if (this.weatherData && this.weatherData.weather && this.weatherData.weather.length > 0) {
      return this.weatherService.getWeatherIconUrl(this.weatherData.weather[0].icon);
    }
    return ''; 
  }

  getWeather() {
    this.getWeatherData();
  }
}