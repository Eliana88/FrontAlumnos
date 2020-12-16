import { Component, OnInit } from '@angular/core';
import { ClimaService } from './clima.service';
import { merge } from 'rxjs';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent implements OnInit {

  clima: any;

  constructor(private climaService: ClimaService ) { }

  ngOnInit(): void {
    this.climaService.getWeather().subscribe(
      res => {
        this.clima = res
      },
      err => console.log(err)
    );



  }

}
