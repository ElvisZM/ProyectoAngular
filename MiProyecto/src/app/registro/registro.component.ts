import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface Registro {
  nombre: string;
  usuario: string;
  password1: string;
  password2: string;
  email: string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent implements OnInit{

  public miFormulario : FormGroup;
  public registros : Array<Registro> = []

  constructor(public fb:FormBuilder){
    this.miFormulario = this.fb.group({
      nombre: new FormControl('', Validators.required),
      usuario: new FormControl('', Validators.required),
      password1: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)

    });

  }

  ngOnInit() {}

  enviarDatos(){
    console.log(this.miFormulario.value)
    this.registros.push(this.miFormulario.value);
    this.miFormulario.reset();
  }

}

