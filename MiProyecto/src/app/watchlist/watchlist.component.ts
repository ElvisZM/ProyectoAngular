import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss'
})
export class WatchlistComponent implements OnInit{
  popularMovies: any[] = [];
  specificMovie= []

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  this.getPopularMovies();
}

getPopularMovies() {
  this.http.get<any>('https://api.themoviedb.org/3/movie/popular?api_key=665eddc29536d1ffc4e5fdace47ae8c7')
    .subscribe(response => {
      this.popularMovies = response.results.slice(0, 15);
    });
 }

 verDetalles(movieId: number) {
  this.http.get<any>('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=665eddc29536d1ffc4e5fdace47ae8c7')
    .subscribe(response => {
      const Id = response.id;
      const url = 'http://0.0.0.0:4200/film/'+movieId;
      window.open(url, '_blank');
    });
}
}
