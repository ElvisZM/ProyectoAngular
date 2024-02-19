import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()

export class DatosService {
  constructor(private http: HttpClient) { }

  searchTerm$ = new Subject<string>();
  peliculasApi: any[] = [];
  listaFiltrada: any[] = [];


  this.searchTerm$
  .subscribe(term => {
    this.listaFiltrada = this.peliculasApi.filter(pelicula =>
      pelicula.title.toLowerCase().includes(term.toLowerCase())
    );
  });

  getPopularMovies(): Observable < any > {
    this.http.get<any>('https://api.themoviedb.org/3/movie/now_playing?api_key=665eddc29536d1ffc4e5fdace47ae8c7')
      .subscribe(response => {
        this.peliculasApi = response.results;
        this.listaFiltrada = this.peliculasApi;
      });
  }

onSearch(event: any): void {
  const term = event.target.value;
  this.searchTerm$.next(term);
}
};

