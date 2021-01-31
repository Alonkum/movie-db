import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

const routes: Routes = [
  { path: '',  pathMatch: 'full', redirectTo: 'movies-list' },
  {
    path: 'movies-list',
    component: MoviesListComponent
  },
  {
    path: 'movies-list/:movie_id',
    component: MovieDetailsComponent,

  },
  { path: '**',  pathMatch: 'full', redirectTo: 'movies-list' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
