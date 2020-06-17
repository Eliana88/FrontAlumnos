import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  apiKey: string = 'e72ac9def4cf7db01eae245ccfa49b67';

  buenosAiresId: number = 3433955;

  URI: string = '';

  constructor(private httpClient: HttpClient) {
    this.URI = `https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&units=metric&lang=es&id=`;

   }

   getWeather (){
     return this.httpClient.get(`${this.URI}${this.buenosAiresId}`)

   }
   
}
