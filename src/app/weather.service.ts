import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey: string = 'e9a52710e7a3d2c9da91287969102a28';
  private defaultCity: string = 'Berlin';

  constructor(private http: HttpClient) { }

  getWeather(city: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }

  getDefaultWeatherData() {
    return this.getWeather(this.defaultCity);
  }

  getWeatherIconUrl(iconCode: string): string {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  }
}