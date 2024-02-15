import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrl: './film.component.scss'
})
export class FilmComponent implements OnInit {
  movieId: number = 0;
  movieDetails: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.movieId = +params.get("id")!;
      console.log(params)
      this.getMovieDetails(this.movieId);
    });
  }

  getMovieDetails(id: number) {
    this.http.get<any>('https://api.themoviedb.org/3/movie/' + id + '?api_key=665eddc29536d1ffc4e5fdace47ae8c7')
      .subscribe(response => {
        this.movieDetails = response;
      });
  }

}
