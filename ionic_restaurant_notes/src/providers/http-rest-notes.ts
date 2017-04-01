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
  // ----- currently not working 2017Mar30 ----------- 12:12pm getting this error "Cannot read property '0' of undefined"
  searchRestNotes(searchParam: string): Observable<RestNote[]> {
    return this.http.get(`${this.restaurantNotesApiUrl}/restaurant_notes`)
    .map(res => <RestNote[]>(res.json().items))
      // .filter(data => data[0].toLowerCase() === searchParam.toLowerCase(), console.log("data inside search", this.notes));
  }
 // Possibility to filter notes, although I think above will be better
 //  filterNotes(searchParam: string) {
 //    return this.notes.filter((note)) => {
 //      return note.title.toLowerCase().indexOf(searchParam.toLowerCase()) > -1
 //    }
 //  }

  // This is used to create new Restaurant Note
  create(title: string, note_text:string, restaurant_id:string, favorite_dish:string, id: string): Observable<RestNote> {
    console.log("chicken in http-rest-notes", title);
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });

  return this.http.post(`${this.restaurantNotesApiUrl}/restaurant_notes/`, { title, note_text, restaurant_id, favorite_dish }, options)
                  .map(res => <RestNote[]>res.json())
                  .catch(this.handleError);
  }

  // Used to remove an existing restaurant note
  removeNote(id: string): Observable<RestNote[]> {
    console.log("id in remove note", id, `${this.restaurantNotesApiUrl}/deleteNote/${id}`);
    return this.http.get(`${this.restaurantNotesApiUrl}/deleteNote/${id}`)
    .map(res => <RestNote[]>res.json())
    .catch(this.handleError);
  }

  // This is used to update an existing Restaurant Note
  update(title: string, note_text:string, restaurant_id:string, favorite_dish:string, id): Observable<RestNote[]> {
    console.log("Inside the update function", id);
    let body = "key=update&title=" + title + "&note-text=" + note_text + "restaurant_id=" + restaurant_id + "favorite_dish=" + favorite_dish + "id=" + id;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = `${this.restaurantNotesApiUrl}/restaurant_notes/`;

    console.log("body id correct? ", id);

  return this.http.put(`${this.restaurantNotesApiUrl}/restaurant_notes/${id}/`, { title, note_text, restaurant_id, favorite_dish, id }, options)
                  .map(res => <RestNote[]>res.json())
  }

}
