import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import * as firebase from 'firebase';
import {LoaderProvider} from "../../providers/loader/loader";
import {HttpClient} from "@angular/common/http";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private account: any = {
    email: '',
    password: ''
  }


  constructor(public navCtrl: NavController,
              private loader: LoaderProvider,
              private toastCtrl: ToastController,
              private http: HttpClient,
              private alertCtrl: AlertController,
              public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }


  gotoRegister() {
    this.navCtrl.push('RegisterPage');
  }

  resetPassword() {

    let alert = this.alertCtrl.create({
      title: 'Reset Password',
      message: 'enter your email address',
      inputs: [
        {
          name: 'email',
          placeholder: '',
          type: 'email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            var auth = firebase.auth();
            var emailAddress = data.email;

            auth.sendPasswordResetEmail(emailAddress).then(() => {
              let toast = this.toastCtrl.create({
                message: 'email is sent successfully',
                duration: 3000
              });
              toast.present();
            }).catch((error) => {
              // An error happened.
            });

          }
        }
      ]
    });
    alert.present();

  }

  login() {
    this.loader.show();

    firebase.auth().signInWithEmailAndPassword(this.account.email, this.account.password)
      .then((result) => {
        console.log(result);

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        let toast = this.toastCtrl.create({
          message: errorMessage,
          duration: 3000
        });
        toast.present();
      }).catch((error) => {
      // An error happened.
    })

    this.loader.hide();
  }
}
