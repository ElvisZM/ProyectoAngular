import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  searchTerm$ = new Subject<string>();
  peliculasApi: any[] = [];
  listaFiltrada: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  paginaBuscador(): boolean {
  return this.router.url === '/buscador';
}

  ngOnInit(): void {
    this.getPopularMovies();
    this.searchTerm$
      .subscribe(term => {
        this.listaFiltrada = this.peliculasApi.filter(pelicula =>
          pelicula.title.toLowerCase().includes(term.toLowerCase())
        );
      });
  }

  getPopularMovies(): void {
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
}
