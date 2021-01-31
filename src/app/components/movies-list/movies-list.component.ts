import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Movie } from 'src/app/movie';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  movies: Movie[];
  searchControl = new FormControl();
  searchCtrlSubscription: Subscription;
  searchString;
  path = '';
  constructor(
    private service: MovieService,
    private router: Router,
    private route: ActivatedRoute,
    protected location: Location,
    private spinner: NgxSpinnerService
  ) {

   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.searchMovies(queryParams.query);
      this.searchString = queryParams.query;
      this.searchControl.patchValue(queryParams.query);
     });
    this.searchCtrlSubscription = this.searchControl.valueChanges
      .pipe(debounceTime(1000)).subscribe(newSearchString => {

        if (newSearchString?.length > 2 && newSearchString !== this.searchString) {
          this.searchMovies(newSearchString);

          this.router.navigate(
          [],
          {
            relativeTo: this.route,
            queryParams: { query: newSearchString },
            queryParamsHandling: 'merge', // remove to replace all query params by provided
            });


        }
    });


  }

  searchMovies(searchString: string) {
    this.spinner.show();
          this.service.GetMovies(searchString).subscribe(res => {
            this.movies = res['results'];
            this.spinner.hide();
          });
  }

  ngOnDestroy(): void {
    this.searchCtrlSubscription.unsubscribe();
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }

  navigateToMovie(movie: Movie) {
    const navigationExtras: NavigationExtras = {
      state: { movie }
    }
    this.router.navigate([`/movies-list/${movie.id}`], navigationExtras)
  }

  getUrl() {
    this.path =  window.location.href;
  }

}
