import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { RestNote } from '../../models/rest-note';

import { HttpRestNotes } from '../../providers/http-rest-notes'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  notes: RestNote[]

  constructor(public navCtrl: NavController, public navParams: NavParams, private restnotes: HttpRestNotes) {
    restnotes.load().subscribe(notes => {
      console.log("Notes are :", notes);
      this.notes = notes['results'];
    })
  }

}
