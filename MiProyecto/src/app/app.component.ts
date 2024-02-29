import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosService } from './servicios/datos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatosService]
})
export class AppComponent {
  palabraBusqueda: string = '';

  constructor(private datosService: DatosService, private router: Router) { }

  buscar(){
    this.datosService.setPalabraBuscada(this.palabraBusqueda);
    this.router.navigate(['/buscador']);
  }

}
