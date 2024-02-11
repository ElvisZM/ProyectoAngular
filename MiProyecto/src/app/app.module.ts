import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RouterModule, Routes } from '@angular/router';
  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { FilmComponent } from './film/film.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BuscadorComponent,
    WatchlistComponent,
    FilmComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Agrega HttpClientModule aquí
    AppRoutingModule,
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
