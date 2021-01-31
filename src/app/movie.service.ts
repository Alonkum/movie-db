import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  API_KEY: string = '468c3155e3e041a97a5b2569eeadd879';
  REST_API: string = `https://api.themoviedb.org/3/search/movie`;

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient,
    ) { }


   // Get all objects
   GetMovies(searchString: string = "Rambo") {
    return this.httpClient.get(`${this.REST_API}?query=${searchString}&api_key=${this.API_KEY}`);
  }

  // Get single object
  GetMovieCredits(movie_id:any): Observable<any> {
    let API_URL = `${this.REST_API}/${movie_id}/credits?api_key=${this.API_KEY}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
