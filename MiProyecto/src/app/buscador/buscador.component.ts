import { Component, OnInit } from '@angular/core';
import { DatosService } from '../servicios/datos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
  providers: [DatosService]
})
export class BuscadorComponent implements OnInit {
  listaFiltrada: any[] = []; // Declara la propiedad listaFiltrada

  constructor(private _datosService: DatosService, private router: Router) {
    
  }

  ngOnInit(): void {
    console.log(this._datosService.getPopularMovies());
  }

  paginaBuscador(): boolean {
    return this.router.url === '/buscador';
  }
}
