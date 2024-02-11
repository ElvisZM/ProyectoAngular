import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {
  popularMovies: any[] = [];
  topRatedMovies: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getPopularMovies();
    this.getTopRatedMovies();
  }

  getPopularMovies() {
    this.http.get<any>('https://api.themoviedb.org/3/movie/popular?api_key=665eddc29536d1ffc4e5fdace47ae8c7')
      .subscribe(response => {
        console.log(response); // Verifica la respuesta de la API
        this.popularMovies = response.results.slice(0, 3);
        console.log(this.popularMovies); // Verifica los datos de las películas populares
      });
  }

  getTopRatedMovies() {
    this.http.get<any>('https://api.themoviedb.org/3/movie/top_rated?api_key=665eddc29536d1ffc4e5fdace47ae8c7')
      .subscribe(response => {
        console.log(response); // Verifica la respuesta de la API
        this.topRatedMovies = response.results;
        console.log(this.topRatedMovies); // Verifica los datos de las películas mejor valoradas
      });
  }

}

