import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {routing} from './app.routes';
import { StartModule } from './start/start.module';
import { HeaderComponent } from './header/header.component';
import {ServicesModule} from './services/services.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { VideoDialogComponent } from './workout-runner/video-dialog/video-dialog.component';

export const firebaseConfig = {
  apiKey: "AIzaSyBHuAO7sGJenEZ7NchX0sNRvetQ4qbe0RA",
  authDomain: "workout-ankur.firebaseapp.com",
  databaseURL: "https://workout-ankur.firebaseio.com",
  projectId: "workout-ankur",
  storageBucket: "workout-ankur.appspot.com",
  messagingSenderId: "845352760769"
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VideoDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    ModalModule.forRoot(),
    BootstrapModalModule,
    StartModule,
    ServicesModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent],
  entryComponents:[VideoDialogComponent]
})

export class AppModule { }
