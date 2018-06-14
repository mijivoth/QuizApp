import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {MyApp} from './app.component';
import {LoaderProvider} from '../providers/loader/loader';
import { SendNotificationProvider } from '../providers/send-notification/send-notification';


@NgModule({
  declarations: [
    MyApp

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoaderProvider,
    HttpClient,
    SendNotificationProvider
  ]
})
export class AppModule {
}
