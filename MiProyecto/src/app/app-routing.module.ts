import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { FilmComponent } from './film/film.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'buscador', component: BuscadorComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'movie/:id', component: FilmComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
