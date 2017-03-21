import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { RestNote } from '../../models/rest-note';

import { HttpRestNotes } from '../../providers/http-rest-notes';
// import { YelpSearch } from '../../providers/yelp-api';
import { LocalJson } from '../../providers/local-json';

import { NoteDetailsPage } from '../note-details/note-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  errorMessage: string;
  notes: RestNote[];
  originalNotes: RestNote[];
  mode = 'Observable';
  // data: YelpSearch[]

  constructor(public navCtrl: NavController, public navParams: NavParams, private restnotes: HttpRestNotes, private localjson: LocalJson) {
    restnotes.load().subscribe(notes => {
      console.log("Notes are :", notes);
      this.notes = notes['results'];
      this.originalNotes = notes['results'];
    })
    restnotes
      .searchRestNotes('Coffee').subscribe(notes => {
       console.log("notes inside search: ", notes);
    })
  }
  addNote(name: string) {
    console.log("name is", name);
    if (!name) { return; }
    this.restnotes.create(name)
                     .subscribe(
                       note  => this.notes.push(note),
                       error =>  this.errorMessage = <any>error);
    this.navCtrl.push(NoteDetailsPage);
  }
  search(searchEvent) {
    let term = searchEvent.target.value
    // We will only perform the search if we have 3 or more characters
    if (term.trim() === '' || term.trim().length < 3) {
      // Load cached users
      this.notes = this.originalNotes;
    } else {
      // Get the searched notes from github
      this.restnotes.searchRestNotes(term).subscribe(notes => {console.log("Notes is ", notes );
        // this.notes = notes
      });
    }
  }


}
