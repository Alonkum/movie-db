import { MovieService } from 'src/app/movie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Movie } from './../../movie';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie;
  constructor(private router: Router,
    private location: Location,
    private service: MovieService,
    private route: ActivatedRoute) {
      this.movie = this.router.getCurrentNavigation().extras.state.movie
     }

  ngOnInit(): void {


    // this.service.GetMovieCredits( this.route.snapshot.params.movie_id ).subscribe( movie => this.movie = movie)
  }



  goBack() {
    this.location.back();
  }

}
