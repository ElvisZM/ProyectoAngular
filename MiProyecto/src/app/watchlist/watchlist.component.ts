import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  idCuenta: string = '20862103';
  mywatchlist: any[] = [];

  constructor(private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.fetchMyWatchlist();
  }

  async fetchMyWatchlist(): Promise<void> {
    try {
      const options = {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjVlZGRjMjk1MzZkMWZmYzRlNWZkYWNlNDdhZThjNyIsInN1YiI6IjY1OGFiMzFiYjdiNjlkMDk2MjZkZTczOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rufsppd2z4JY3JZaxJZDpC3FBWVswXCeqYoRkFl09ss'
        }
      };

      const respuesta = await this.http.get<any>('https://api.themoviedb.org/3/account/' + this.idCuenta + '/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc', options).toPromise();
      this.mywatchlist = respuesta.results;
    } catch (error) {
      console.error('Error fetching movie:', error)
    }
  }

  async deleteFromWatchlist(movieId: number): Promise<void> {
    try {
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjVlZGRjMjk1MzZkMWZmYzRlNWZkYWNlNDdhZThjNyIsInN1YiI6IjY1OGFiMzFiYjdiNjlkMDk2MjZkZTczOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rufsppd2z4JY3JZaxJZDpC3FBWVswXCeqYoRkFl09ss'
        },
        body: JSON.stringify({ media_type: 'movie', media_id: movieId, watchlist: false })
      };

      const respuesta = await fetch(`https://api.themoviedb.org/3/account/${this.idCuenta}/watchlist`, options);
      if (respuesta.ok) {
        await this.fetchMyWatchlist();
      } else {
        alert('No se pudo eliminar la película de tu watchlist');
      }
    } catch (error) {
      console.error('Error fetching movie:', error)
    }
  }

  detallePelicula(movieId: number) {
    this.router.navigate(['/film', movieId]);
  }


}
