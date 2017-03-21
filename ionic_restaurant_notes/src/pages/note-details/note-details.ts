import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms'

import { RestNote } from '../../models/rest-note';

import { HttpRestNotes } from '../../providers/http-rest-notes';

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
  note: RestNote;
  public form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private restNotes: HttpRestNotes, private restaurantNoteForm: FormBuilder)
  {
    this.form = restaurantNoteForm.group({
      'title': ['', Validators.required],
      'note_text': ['', Validators.minLength(10)],
      'restaurant_id': ['', Validators.minLength(10)],
      'favorite_dish': ['', Validators.minLength(10)]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoteDetailsPage');
  }

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
