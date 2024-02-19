import { Component, OnInit } from '@angular/core';
import { DatosService } from '../servicios/datos.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.scss',
  providers: [ DatosService ]
})
export class BuscadorComponent implements OnInit{

  constructor(private _datosService: DatosService) { 
  }

  ngOnInit(): void {
    console.log(this._datosService.getPopularMovies());
  }

}
