import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
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
    notes: RestNote[] = [];

  constructor(public http: Http) {
    console.log('Hello HttpRestNotes Provider');
  }
  // Load all restaurant notes
  load(): Observable<RestNote[]> {
    return this.http.get(`${this.restaurantNotesApiUrl}/restaurant_notes`)
    .map(res => <RestNote[]>res.json())
    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  //Search for restaurant notes
  // takes in search parameter which is then passed to api url
  // ----- currently not working -----------
  searchRestNotes(searchParam: string): Observable<RestNote[]> {
    return this.http.get(`${this.restaurantNotesApiUrl}/restaurant_notes/?q=${searchParam}`)
      .map(res => <RestNote[]>(res.json().items))
  }
  // addNote(name: string) {
  // if (!name) { return; }
  // this.restnotes.create(name)
  //                  .subscribe(
  //                    hero  => this.heroes.push(hero),
  //                    error =>  this.errorMessage = <any>error);
  // }

  // This is used to create new Restaurant Note
  create(title: string, note_text:string, restaurant_id:string, favorite_dish:string, id: string): Observable<RestNote> {
    console.log("chicken in http-rest-notes", title);
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });

  return this.http.post(`${this.restaurantNotesApiUrl}/restaurant_notes/`, { title, note_text, restaurant_id, favorite_dish }, options)
                  .map(res => <RestNote[]>res.json())
                  .catch(this.handleError);
  }

  removeNote(id: string): Observable<RestNote[]> {
    console.log("id in remove note", id, `${this.restaurantNotesApiUrl}/deleteNote/${id}`);
    return this.http.get(`${this.restaurantNotesApiUrl}/deleteNote/${id}`)
    .map(res => <RestNote[]>res.json())
    .catch(this.handleError);
  }

  // This is used to update an existing Restaurant Note
  update(title, note_text, restaurant_id, favorite_dish): Observable<RestNote[]> {
    console.log("Inside the update function", title);
    let body = "key=update&title=" + title + "&note-text=" + note_text + "restaurant_id=" + restaurant_id + "favorite_dish=" + favorite_dish;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = `${this.restaurantNotesApiUrl}/restaurant_notes/`;

  return this.http.post(`${this.restaurantNotesApiUrl}/restaurant_notes/${body['id']}`, { body, options })
                  .map(res => <RestNote[]>res.json())
                  .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
    // .subscribe((data) =>
    // {
    //   //If the request is succesful, notify the user
    //   if(data.status === 200)
    //   {
    //     this.sendNotification('Congratulations, your note has been saved!');
    //   }
    //   // If unsuccessful, post this response.
    //   else
    //   {
    //     this.sendNotification('Something went wrong!');
    //   }
    // });
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
}
