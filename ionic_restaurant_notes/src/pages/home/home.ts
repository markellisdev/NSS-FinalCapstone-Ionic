import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';


import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public http: Http) {
      console.log("This is the home page ");
  }

  ionViewDidLoad(){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let body = {
      message: "Do you hear me?"
    };

    this.http.post('http://localhost:8000/restaurant_notes/', JSON.stringify(body), {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        console.log("This is the data ", data);
      });
  }
}
