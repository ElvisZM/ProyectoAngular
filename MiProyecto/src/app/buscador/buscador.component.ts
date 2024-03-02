import { Component } from '@angular/core';
import { DatosService } from '../servicios/datos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})

export class BuscadorComponent {
  resultadoFiltro: any[] = [];
  palabraBusqueda!: string;

  constructor(private datosService: DatosService, private router: Router) {}

  ngOnInit(): void {
    this.palabraBusqueda = this.datosService.getPalabraBuscada();
    console.log("mi palabra esta abajo");
    console.log(this.palabraBusqueda);

    this.getMovies(this.palabraBusqueda)
  }

  ngDoCheck() {
    if(this.palabraBusqueda != this.datosService.palabraBusqueda){
      this.palabraBusqueda = this.datosService.palabraBusqueda;
      this.getMovies(this.palabraBusqueda);
      console.log(this.palabraBusqueda);

    }
  }

  getMovies(query: string): void{
    this.datosService.getMovies(query).subscribe(data => {
      this.resultadoFiltro = data.results;
  }, error => {
    console.error(error);
  });
  }


  detallePelicula(movieId: number) {
    this.router.navigate(['/film', movieId]);
  }
}
