import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms'

import { RestNote } from '../../models/rest-note';

import { HttpRestNotes } from '../../providers/http-rest-notes';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// from scotch.io angular-2-http-requests-with-observables tut
import { EmitterService } from '../../emitter.service';

/*
  Generated class for the NoteDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-note-details',
  templateUrl: 'note-details.html'
})
export class NoteDetailsPage {
  notes: RestNote[] = [];
  public form: FormGroup;
  private restaurantNotesApiUrl = 'http://localhost:8000';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private restNotes: HttpRestNotes, private restaurantNoteForm: FormBuilder)
  {
    this.form = restaurantNoteForm.group({
      'title': ['', Validators.required],
      'note_text': ['', Validators.minLength(10)],
      'restaurant_id': ['', Validators.minLength(10)],
      'favorite_dish': ['', Validators.minLength(6)]
    })
  }

  // ---------------------------------------------------

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


  // ----------------------------------------------

  saveNote(fullNote) {
    console.log("Inside the update function", fullNote);
    let body = "key=update&title=" + fullNote.title + "&note_text=" + fullNote.note_text + "restaurant_id=" + fullNote.restaurant_id + "favorite_dish=" + fullNote.favorite_dish;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = `${this.restaurantNotesApiUrl}/restaurant_notes/`;

    this.restNotes.create(fullNote.title, fullNote.note_text, fullNote.restaurant_id, fullNote.favorite_dish)
      .subscribe(
         note  => this.notes.push(note));

    this.navCtrl.pop(NoteDetailsPage);

  }

  // editNote() {
  //   // Emit edit event
  //   EmitterService.get(this.editId).emit(this.note)
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoteDetailsPage');
  }

}
