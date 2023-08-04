import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get weather data for a city', () => {
    const city = 'Berlin';
    const mockData = {
      name: 'Berlin',
      main: {
        temp: 20,
        humidity: 70
      },
      weather: [
        {
          description: 'Cloudy'
        }
      ]
    };

    service.getWeather(city).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e9a52710e7a3d2c9da91287969102a28&units=metric`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should get the weather icon URL', () => {
    const iconCode = '04n';
    const expectedUrl = 'http://openweathermap.org/img/w/04n.png';
    const url = service.getWeatherIconUrl(iconCode);
    expect(url).toBe(expectedUrl);
  });
});