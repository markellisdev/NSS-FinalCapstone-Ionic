import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { RestNote } from '../models/rest-note';


/*
  Generated class for the LocalJson provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocalJson {
  localJsonUrl = '../../config_secret.json'

  constructor(public http: Http) {
    console.log('Hello LocalJson Provider');
  }

  getdata() {
    return this.http.get(`${this.localJsonUrl}`)
    .map(res => <RestNote[]>res.json());
  }

}
