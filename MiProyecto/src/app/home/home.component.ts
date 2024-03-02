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

  constructor(private http: HttpClient, private datosService: DatosService, private router: Router) { }

  ngOnInit(): void {
    this.datosService.getPopularMovies().subscribe((data: any) => {
      this.popularMovies = data.results.slice(0, 3);
    });

    this.getTopRatedMovies();

  }

  getTopRatedMovies() {
    this.http.get<any>('https://api.themoviedb.org/3/movie/top_rated?api_key=665eddc29536d1ffc4e5fdace47ae8c7')
      .subscribe(response => {
        this.topRatedMovies = response.results.slice(0, 15);
      });
  }

  detallePelicula(movieId: number) {
    this.router.navigate(['/film', movieId]);
  }

}

