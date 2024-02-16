import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular17';
  searchTerm$ = new Subject<string>()!;
  peliculasApi: any [] = [];

  private listaPeliculas = this.peliculasApi
  listaFiltrada: any

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.listaFiltrada = this.listaPeliculas;
    this.filtrarLista();
  }

  filtrarLista(): void {
    this.searchTerm$.subscribe(term => {
      this.listaFiltrada = this.listaPeliculas
        .filter(item => item.toLowerCase().indexOf(term.toLowerCase())
          >= 0);
    });
  }


  getPopularMovies() {
    this.http.get<any>('https://api.themoviedb.org/3/movie/popular?api_key=665eddc29536d1ffc4e5fdace47ae8c7')
      .subscribe(response => {
        this.peliculasApi = response.results.title;
      });
  }

}


