import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DatosService } from '../servicios/datos.service';


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

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private datosService: DatosService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idMovie = +params.get('id')!;
      this.datosService.movieDetail(idMovie).subscribe(
        respuesta => {
          this.movie = respuesta;
          this.castMovie = respuesta.credits.cast;
          this.reviewsMovie = respuesta.reviews.results;
          this.recommendationsMovie = respuesta.recommendations.results;
        },
        error => {
          console.error ('Error fetching movies:', error )
        }
      );
    });
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

      const respuesta = await fetch('https://api.themoviedb.org/3/account/20862103/watchlist', options);
      alert(`¡${this.movie.title} ha sido añadida a su watchlist!`);
    } catch (error) {
      console.error('Error fetching movie:', error)
    }
  }

  detallePelicula(movieId: number) {
    this.router.navigate(['/film', movieId]);
  }

}
