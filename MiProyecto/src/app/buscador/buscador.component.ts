import { Component, OnInit } from '@angular/core';
import { DatosService } from '../servicios/datos.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
  providers: [DatosService]
})
export class BuscadorComponent implements OnInit {
  resultadoFiltro: any[] = [];

  constructor(private datosService: DatosService) {}

  ngOnInit(): void {
    const palabraBusqueda = this.datosService.palabraBusqueda;

    this.getMovies(palabraBusqueda)
  }

  getMovies(query: string): void{
    this.datosService.getMovies(query).subscribe(data => {
      this.resultadoFiltro = data.results;
      console.log(this.resultadoFiltro);
  }, error => {
    console.error(error);
  });
  }
}
