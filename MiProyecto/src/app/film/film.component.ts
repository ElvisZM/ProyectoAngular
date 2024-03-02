import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {
  movie: any;
  castMovie: any[] = [];
  reviewsMovie: any[] = [];
  recommendationsMovie: any[] = [];
  trailerUrl: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idMovie = +params.get('id')!;
      this.movieDetail(idMovie);
    });
  }

  async movieDetail(idMovie: number): Promise<void>{
    try {
      const respuesta = await this.http.get<any>('https://api.themoviedb.org/3/movie/' + idMovie + '?api_key=665eddc29536d1ffc4e5fdace47ae8c7&append_to_response=credits,reviews,videos,recommendations').toPromise();
      this.movie = respuesta;
      this.castMovie = respuesta.credits.cast;
      this.reviewsMovie = respuesta.reviews.results;
      this.recommendationsMovie = respuesta.recommendations.results;

    } catch (error) {
      console.error('Error fetching movie:', error)
    }
  }

  async addWatchlist(): Promise<void> {
    try {
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjVlZGRjMjk1MzZkMWZmYzRlNWZkYWNlNDdhZThjNyIsInN1YiI6IjY1OGFiMzFiYjdiNjlkMDk2MjZkZTczOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rufsppd2z4JY3JZaxJZDpC3FBWVswXCeqYoRkFl09ss'
        },
        body: JSON.stringify({ media_type: 'movie', media_id: this.movie.id, watchlist: true })
      };

      const respuesta = fetch('https://api.themoviedb.org/3/account/20862103/watchlist', options);
      alert(`¡${this.movie.title} ha sido añadida a su watchlist!`);
    } catch (error) {
      console.error('Error fetching movie:', error)
    }
  }


  detallePelicula(movieId: number) {
    this.router.navigate(['/film', movieId]);
  }


}
