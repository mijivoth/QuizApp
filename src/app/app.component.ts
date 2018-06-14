import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

// Initialize firebase
var config = {
  apiKey: "AIzaSyBDJDFuQWpuceiplF9Uw0Xl6VO1lHD9nL8",
  authDomain: "quizforstudents-ae5c6.firebaseapp.com",
  databaseURL: "https://quizforstudents-ae5c6.firebaseio.com",
  projectId: "quizforstudents-ae5c6",
  storageBucket: "quizforstudents-ae5c6.appspot.com",
  messagingSenderId: "829071061244"
};

@Component({
  templateUrl: 'app.html',
})


export class MyApp {
  rootPage: 'HomePage' | 'LessonPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.rootPage = 'LessonPage';
      } else {
        this.rootPage = 'HomePage';
      }
    });

  }

}

