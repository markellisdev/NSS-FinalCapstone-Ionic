import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms'

import { RestNote } from '../../models/rest-note';

import { HttpRestNotes } from '../../providers/http-rest-notes';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

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

  // saveNote()
  // {
  //   this.note.title = this.form.controls["title"].value;
  //   this.note.note_text = this.form.controls["note_text"].value;
  //   this.note.restaurant_id = this.form.controls["restaurant_is"].value;
  //   this.note.favorite_dish = this.form.controls["favorite_dish"].value;
  //   console.log("Inside saveNote, this is the notes title", this.note.title);
  //   update(this.note.title, this.note.note_text, this.note.restaurant_id, this.note.favorite_dish);
  // }
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


  }

  //   addNote(name: string) {
  //   console.log("name is", name);
  //   if (!name) { return; }
  //   this.restNotes.create(name)
  //                    .subscribe(
  //                      note  => this.notes.push(note),
  //                      error =>  this.errorMessage = <any>error);
  //   this.navCtrl.push(NoteDetailsPage);
  // }

  //   addNote(name: string) {
  //   console.log("name is", name);
  //   if (!name) { return; }
  //   this.restnotes.create(name)
  //                    .subscribe(
  //                      note  => this.notes.push(note),
  //                      error =>  this.errorMessage = <any>error);
  //   this.navCtrl.push(NoteDetailsPage);
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoteDetailsPage');
  }


// CONTINUE_WORK HERE!!!!!------------------------

  // saveNote(name: string) {
  //   console.log(
  //     "title is: ", title,

  //     );
  //   if (!name) { return; }
  //   this.restnotes.create(name)
  //                    .subscribe(
  //                      note  => this.notes.push(note),
  //                      error =>  this.errorMessage = <any>error);
  //   this.navCtrl.push(HomePage);
  // }
// -------------------------------------------------------


  // ionViewWillLoad() {

  //   this.restaurantNoteForm = new FormGroup({
  //     username: new FormControl('', Validators.compose([
  //       Validators.maxLength(25),
  //       Validators.minLength(5),
  //       Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
  //       Validators.required
  //     ])),
  //     name: new FormControl('', Validators.required),
  //     lastname: new FormControl('', Validators.required),
  //     email: new FormControl('', Validators.compose([
  //       Validators.required,
  //       Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  //     ])),
  //     phone: new FormControl('', Validators.compose([
  //       Validators.pattern('^\\d+$'),
  //       Validators.required
  //     ])),
  //     gender: new FormControl('male', Validators.required),
  //     password: new FormControl('', Validators.compose([
  //       Validators.minLength(5),
  //       Validators.required,
  //       Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
  //     ])),
  //     confirmPassword: new FormControl('', Validators.required),
  //     agree: new FormControl(false, Validators.required)
  //   });

  //   this.sampleForm.valueChanges
  //     .debounceTime(400)
  //     .subscribe(data => this.onValueChanged(data));
  // }





}





// @Component({
//   selector: 'page-user-details',
//   templateUrl: 'user-details.html'
// })
// export class UserDetailsPage {
//     user: User;
//     login: string;

//   constructor(public navCtrl: NavController, public navParams: NavParams, private githubUsers: GithubUsers) {
//     this.login = navParams.get('login');
//     githubUsers.loadDetails(this.login).subscribe(user => {
//       this.user = user;
//     })
//   }

//   ionViewDidLoad() {
//     console.log('Hello UserDetails Page');
//   }

// }
