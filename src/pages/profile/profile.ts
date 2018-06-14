import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  private userEmail: string;
  private userPosition: string;
  private creationTime: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.initPage();
  }


  initPage() {
    var user = firebase.auth().currentUser;
    console.log(user);

    if (user) {
      this.userPosition = user.displayName;
      this.userEmail = user.email;

      this.creationTime = user.metadata.creationTime;
      // User is signed in.
    } else {
      // No user is signed in.
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
