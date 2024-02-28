import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DatosService {
  searchTerm$ = new Subject<string>();
  peliculasApi: any[] = [];
  listaFiltrada: any[] = [];

  constructor(private http: HttpClient) {}

  getPopularMovies(): Observable<any> {
    return this.http.get<any>('https://api.themoviedb.org/3/movie/now_playing?api_key=665eddc29536d1ffc4e5fdace47ae8c7')
      .pipe(
        map(response => {
          this.peliculasApi = response.results;
          this.listaFiltrada = this.peliculasApi;
          return response;
        })
      );
  }

  watchSearchTerm() {
    this.searchTerm$.subscribe(term => {
      this.listaFiltrada = this.peliculasApi.filter(pelicula =>
        pelicula.title.toLowerCase().includes(term.toLowerCase())
      );
    });
  }
}
