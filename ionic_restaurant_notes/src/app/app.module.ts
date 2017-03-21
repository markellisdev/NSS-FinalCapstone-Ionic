import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { NoteDetailsPage } from '../pages/note-details/note-details';

import { HttpRestNotes } from '../providers/http-rest-notes';
// import { YelpSearch } from '../providers/yelp-api';
import { LocalJson } from '../providers/local-json';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    NoteDetailsPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    NoteDetailsPage,
    TabsPage
  ],
  providers: [HttpRestNotes, LocalJson, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
