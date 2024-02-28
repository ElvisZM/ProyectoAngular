import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosService } from './servicios/datos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatosService]
})
export class AppComponent implements OnInit {
  listaFiltrada: any[] = []; // Inicializa listaFiltrada como un arreglo vacío

  constructor(private _datosService: DatosService, private router: Router) { }

  ngOnInit(): void {
    // Llama al método paginaBuscador para obtener el valor booleano
    const esPaginaBuscador = this.paginaBuscador();
    console.log('Es página buscador:', esPaginaBuscador);

    this._datosService.watchSearchTerm();
    this._datosService.getPopularMovies().subscribe(() => {
      console.log('Películas populares cargadas:', this._datosService.peliculasApi);
    });
  }

  // Agrega el método paginaBuscador para verificar la URL actual
  paginaBuscador(): boolean {
    return this.router.url === '/buscador';
  }
}
