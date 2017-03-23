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
  addNote(name: string, note_text, restaurant_id, favorite_dish) {
    console.log("name is", name);
    if (!name) { return; }
    this.restnotes.create(name, note_text, restaurant_id, favorite_dish)
                     .subscribe(
                       note  => this.notes.push(note),
                       error =>  this.errorMessage = <any>error);
    this.navCtrl.push(NoteDetailsPage);
  }

  editNote(note){
    if (!note) { return; }
    // this.restnotes.create(title, note_text, restaurant_id, favorite_dish)
    //                  .subscribe(
    //                    note  => this.notes.push(note),
    //                    error =>  this.errorMessage = <any>error);
    this.navCtrl.push(NoteDetailsPage, {
      id: note.id,
      title: note.title,
      note_text: note.note_text,
      restaurant_id: note.restaurant_id,
      favorite_dish: note.favorite_dish
    });
  }

  goToDetails() {
  this.navCtrl.push(NoteDetailsPage);
  }

  deleteNote(note) {
    console.log("delete note", note.id);
    this.restnotes.removeNote(note.id).subscribe(data => {
      console.log("notes in delete", data, this.notes)
      for (let deletenote in this.notes) {
        console.log("note", this.notes[deletenote].id, note.id)
        if (note.id == this.notes[deletenote].id) {
          this.notes.splice(+deletenote, 1)
        }
      }
  });
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
