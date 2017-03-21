import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { RestNote } from '../../models/rest-note';

import { HttpRestNotes } from '../../providers/http-rest-notes';
// import { YelpSearch } from '../../providers/yelp-api';
import { LocalJson } from '../../providers/local-json';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  notes: RestNote[]
  // data: YelpSearch[]

  constructor(public navCtrl: NavController, public navParams: NavParams, private restnotes: HttpRestNotes, private localjson: LocalJson) {
    restnotes.load().subscribe(notes => {
      console.log("Notes are :", notes);
      this.notes = notes['results'];
    })
    restnotes
      .searchRestNotes('Indian').subscribe(notes => {
       console.log("notes inside search: ", notes);
    })
  }


}
