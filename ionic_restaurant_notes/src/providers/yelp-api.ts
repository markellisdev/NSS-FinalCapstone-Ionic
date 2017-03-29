// Was unable to get Yelps API functionality working within my app. May look into other possibilities, like Google or FourSquare

// import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import { Observable } from 'rxjs/Rx';
// import 'rxjs/add/operator/map';

// import { RestNote } from '../models/rest-note';

/*
  Generated class for the HttpRestNotes provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

// @Injectable()
// export class YelpSearch {
//     yelpApiUrl = 'https://api.yelp.com/v2/search';

    // params = {
    //   oauth_consumer_key: '',
    //   oauth_token: '',
    //   oauth_signature_method: 'HMAC-SHA1',
    //   oauth_signature: ''
    // }


  // constructor(public http: Http) {
  //   console.log('Hello YelpAPI Provider');
  // }
  // // Load all restaurant notes
  // load(): Observable<[]> {
  //   return this.http.get(`${this.restaurantNotesApiUrl}`, )
  //   .map(res => <RestNote[]>res.json());
  // }






// Possible model code to retrieve API info
//     // Load all github users
//   load(): Observable<User[]> {
//     return this.http.get(`${this.yelpApiUrl}/users`)
//       .map(res => <User[]>res.json());
//   }
//   // Get github user by providing login(username)
//   loadDetails(login: string): Observable<User> {
//     return this.http.get(`${this.yelpApiUrl}/users/${login}`)
//       .map(res => <User>(res.json()))
//   }
//   //Search for github users
//   // takes in search parameter which is then passed to api url
//   searchUsers(searchParam: string): Observable<User[]> {
//     return this.http.get(`${this.yelpApiUrl}/search/users?q=${searchParam}`)
//       .map(res => <User[]>(res.json().items))
//   }
// }

