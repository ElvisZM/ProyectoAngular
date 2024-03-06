import { Component, OnInit } from '@angular/core';
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
  check: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private datosService: DatosService) { }

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
    this.checkInMyWatchlist();
  }

  addToMyWatchlist(movieId: number){
    this.datosService.movieDetail(movieId).subscribe(
      respuesta => {
        const movie = respuesta;
        this.datosService.addWatchlist(movieId).subscribe(
          respuesta => {
            this.check = true;
            alert(`${movie.title} se ha añadido a su watchlist`)
          },
          error => {
            console.error(error);
          }
        )
      }
    )    
  }

  detallePelicula(movieId: number) {
    this.router.navigate(['/film', movieId]);
  }

  checkInMyWatchlist(){
    this.route.paramMap.subscribe(params => {
      const idMovie = +params.get('id')!;
      this.datosService.getMyWatchlist()
        .subscribe(
          respuesta => {
            var mywatchlist = respuesta.results;
            for (let movie_watchlist of mywatchlist) {
              if(idMovie == movie_watchlist.id){
                this.check = true
                return;
              }
            }
          },
          error => {
            console.error(error);
          }
        )
    },
    error => {
      console.error(error)
    })
  }

  deleteFromWatchlist(movieId: number) {
    this.datosService.movieDetail(movieId).subscribe(
      respuesta => {
        const movie = respuesta;
        this.datosService.deleteFromWatchlist(movieId).subscribe(
          respuesta => {
            this.check = false
            alert(`${movie.title} se ha eliminado de su watchlist`)
          },
          error => {
            console.error(error)
          }
        )
      },
      error => {
        console.error(error)
      }
    )
  }
}
