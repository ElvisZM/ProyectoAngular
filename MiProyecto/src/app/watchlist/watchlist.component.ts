import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatosService } from '../servicios/datos.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  idCuenta: string = '20862103';
  mywatchlist: any[] = [];

  constructor(private http: HttpClient, private router:Router, private datosService:DatosService) { }

  ngOnInit(): void {
    this.getMyWatchlist();
  }

  getMyWatchlist(){
    this.datosService.getMyWatchlist()
      .subscribe(
        respuesta => {
          this.mywatchlist = respuesta.results;
      
    },
    error => {
      console.log(error);
    }
  );
  }

  deleteFromWatchlist(movieId: number) {
    this.datosService.deleteFromWatchlist(movieId).subscribe(
      respuesta => {
        this.getMyWatchlist();
      },
      error => {
        console.error(error)
      }
    )
  }

  detallePelicula(movieId: number) {
    this.router.navigate(['/film', movieId]);
  }


}
