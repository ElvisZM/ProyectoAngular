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
        this.popularMovies = response.results.slice(0, 3);
      });
  }

  getTopRatedMovies() {
    this.http.get<any>('https://api.themoviedb.org/3/movie/top_rated?api_key=665eddc29536d1ffc4e5fdace47ae8c7')
      .subscribe(response => {
        this.topRatedMovies = response.results.slice(0, 15);
      });
  }

}

