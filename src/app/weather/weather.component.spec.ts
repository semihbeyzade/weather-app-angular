import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WeatherComponent } from './weather.component';
import { WeatherService } from '../weather.service';
import { of } from 'rxjs';


describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let weatherService: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      imports: [HttpClientTestingModule],
      providers: [WeatherService], // We are providing the real WeatherService here (not the mock)
    });
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService); // Inject the real WeatherService

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get weather data for a city', fakeAsync(() => {
    const city = 'Berlin';
    const mockData = {
      name: 'Berlin',
      main: {
        temp: 20,
        humidity: 70,
        temp_min: 15,
        temp_max: 25,
      },
      weather: [
        {
          description: 'Cloudy',
          icon: '04n',
        },
      ],
    };

    // Mock the getWeather method of WeatherService to return the mockData
    spyOn(weatherService, 'getWeather').and.returnValue(of(mockData));

    // Trigger the getWeatherData method to make the service call
    component.getWeatherData();
    tick(); // Advance the fake timer to let the async operation complete

    // Now you can test the component properties based on the mockData
    expect(component.weatherData).toEqual(mockData);
    expect(component.minTemperature).toBe(mockData.main.temp_min);
    expect(component.maxTemperature).toBe(mockData.main.temp_max);
    expect(component.main).toBe(mockData.weather[0].description);
  }));

  it('should get the weather icon URL', () => {
    const iconCode = '04n';
    const expectedUrl = 'http://openweathermap.org/img/w/04n.png';

    // Mock the getWeatherIconUrl method of WeatherService to return the expectedUrl
    spyOn(weatherService, 'getWeatherIconUrl').and.returnValue(expectedUrl);

    // Trigger the getWeatherIconUrl method and test the result
    const url = component.getWeatherIconUrl();
    expect(url).toBe(expectedUrl);
  });
});