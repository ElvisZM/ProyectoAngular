import { Component } from '@angular/core';
import { Empleado } from './empleado';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.scss'
})
export class EmpleadoComponent {
  public title = "Bienvenido Empleado";
  public empleado:Empleado;

  constructor(){
      this.empleado = new Empleado("Pedro",47, "Gerente", true);
  }
  ngOnInit(){
      console.log(this.empleado);
  }
}
