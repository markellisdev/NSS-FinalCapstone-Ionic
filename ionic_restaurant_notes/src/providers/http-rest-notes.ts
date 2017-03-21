import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { RestNote } from '../models/rest-note';

/*
  Generated class for the HttpRestNotes provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpRestNotes {
  restaurantNotesApiUrl = 'http://localhost:8000'

  constructor(public http: Http) {
    console.log('Hello HttpRestNotes Provider');
  }
  // Load all restaurant notes
  load(): Observable<RestNote[]> {
    return this.http.get(`${this.restaurantNotesApiUrl}/restaurant_notes`)
    .map(res => <RestNote[]>res.json());
  }
    //Search for restaurant notes
  // takes in search parameter which is then passed to api url
  searchRestNotes(searchParam: string): Observable<RestNote[]> {
    return this.http.get(`${this.restaurantNotesApiUrl}/search/notes?q=${searchParam}`)
      .map(res => <RestNote[]>(res.json().items))
  }

}



// @Injectable()
// export class GithubUsers {
//     // githubApiUrl = 'https://api.github.com';
//     githubApiUrl = 'http://localhost:8000/';

//   constructor(public http: Http) {
//     console.log('Hello GithubUsers Provider');
//   }
//     // Load all github users
//   load(): Observable<User[]> {
//     return this.http.get(`${this.githubApiUrl}/users`)
//       .map(res => <User[]>res.json());
//   }
//   // Get github user by providing login(username)
//   loadDetails(login: string): Observable<User> {
//     return this.http.get(`${this.githubApiUrl}/users/${login}`)
//       .map(res => <User>(res.json()))
//   }
//   //Search for github users
//   // takes in search parameter which is then passed to api url
//   searchUsers(searchParam: string): Observable<User[]> {
//     return this.http.get(`${this.githubApiUrl}/search/users?q=${searchParam}`)
//       .map(res => <User[]>(res.json().items))
//   }
// }
