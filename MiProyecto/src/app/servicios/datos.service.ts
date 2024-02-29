import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DatosService {
  palabraBusqueda: string = '';

  constructor(private http: HttpClient) { }

  getPopularMovies() {
    return this.http.get(`https://api.themoviedb.org/3/movie/popular?api_key=665eddc29536d1ffc4e5fdace47ae8c7`);
  }

  getFilm(movie_id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=665eddc29536d1ffc4e5fdace47ae8c7`);
  }

  setPalabraBuscada(termino: string) {
    this.palabraBusqueda = termino;
  }

  getPalabraBuscada() {
    return this.palabraBusqueda;
  }

  getMovies(query: string): Observable<any> {
    const options = {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjVlZGRjMjk1MzZkMWZmYzRlNWZkYWNlNDdhZThjNyIsInN1YiI6IjY1OGFiMzFiYjdiNjlkMDk2MjZkZTczOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rufsppd2z4JY3JZaxJZDpC3FBWVswXCeqYoRkFl09ss'
      }
    }

    return this.http.get<any>(`https://api.themoviedb.org/3/search/movie?query=${query}`, options)
  }


}
