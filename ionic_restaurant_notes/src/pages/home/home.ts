import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ItemSliding, List } from 'ionic-angular';

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
  @ViewChild(List) list:List;

  constructor(public navCtrl: NavController, public navParams: NavParams, private restnotes: HttpRestNotes, private localjson: LocalJson) {
    restnotes.load().subscribe(notes => {
      // console.log("Notes are :", notes);
      this.notes = notes['results'];
      this.originalNotes = notes['results'];
    })
  }

  addNote(name: string, note_text, restaurant_id, favorite_dish, id) {
    console.log("name is", name);
    if (!name) { return; }
    this.restnotes.create(name, note_text, restaurant_id, favorite_dish, id)
                     .subscribe(
                       note  => this.notes.push(note),
                       error =>  this.errorMessage = <any>error);
    this.navCtrl.push(NoteDetailsPage);
  }

  editNote(note, item){
    console.log("is note available in edit? ", note);
    if (!note) { return; }
    // This is how the note is pushed to the next page, via NavParams, learned from the following-----
    // https://www.joshmorony.com/passing-data-between-pages-in-ionic-2/

    this.navCtrl.push(NoteDetailsPage, note);
    item.close();
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
      this.notes = this.originalNotes;
    } else {
      console.log("else in search = ", this.notes[0]);
// Closer using this example      https://angular-2-training-book.rangle.io/handout/observables/observables_array_operations.html
        this.restnotes.load().subscribe((data) => {
          this.originalNotes = this.notes;
          this.notes =
            this.notes
              .filter((notedata) => {
                 console.log("Are notes lower case? ", notedata.id, term, notedata.title.toLowerCase(), "is equal to? ", term.toLowerCase());
                 return notedata.title.toLowerCase().match(term.toLowerCase()); //.match to see if a pattern exists ----> found here https://toddmotto.com/understanding-regular-expression-matching-with-test-match-exec-search-and-split/
              })
        })
      };
    }

  // This function does not seem to be working correctly yet. Needs work 2017Mar29
  reloadMe() {
    console.log("Is this actually reloading the page inside reloadMe function");
    location.reload()
  }

}
