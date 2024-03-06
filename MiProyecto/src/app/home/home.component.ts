import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { DatosService } from '../servicios/datos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {
  popularMovies: any[] = [];
  topRatedMovies: any[] = [];

  constructor(private datosService: DatosService, private router: Router) { }

  ngOnInit(): void {
    this.datosService.getPopularMovies().subscribe((data: any) => {
      this.popularMovies = data.results.slice(0, 3);
    });

    this.datosService.getTopRatedMovies().subscribe((data: any) => {
      this.topRatedMovies = data.results.slice(0,15);
    });

  }

  detallePelicula(movieId: number) {
    this.router.navigate(['/film', movieId]);
  }

}

