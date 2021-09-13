import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {
  private baseApiPath = "https://api.themoviedb.org/3";
  constructor(public http: HttpClient) {
    console.log('Hello MovieProvider Provider');
  }

  getLatestMovies(page = 1){
    return this.http.get(this.baseApiPath + `/movie/popular?page=${page}&api_key=35d3088942a6d1ea81d459205330f558&language=pt-BR`);
  }

  getMovieDetails(filmeId){
    return this.http.get(this.baseApiPath + `/movie/${filmeId}?api_key=35d3088942a6d1ea81d459205330f558&language=pt-BR`);
  }

}
