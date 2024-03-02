import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroService } from '../servicios/registro.service';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent{

  nombre: string ="";
  email: string ="";
  usuario: string ="";
  telefono: string = "";
  password1: string ="";
  password2: string ="";
  domicilio: string ="";
  rol: string ="";

  constructor(private router: Router,
              private registroService: RegistroService,
              private LoginService: LoginService)
    {};

  registrarFormulario() {
    const dataSignUp = {
      first_name: this.nombre,
      email: this.email,
      username: this.usuario,
      telefono: this.telefono,
      password1: this.password1,
      password2: this.password2,
      domicilio: this.domicilio,
      rol: 4,
    };

    this.registroService.registroUsuario(dataSignUp)
      .subscribe(
        response => {
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);
        }
      );
  }

}
