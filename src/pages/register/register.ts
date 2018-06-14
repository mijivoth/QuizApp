import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {


  public form: FormGroup;

  public userSurname: string = '';
  public userName: string = '';
  public userEmail: string = '';
  public userPassword: string = '';
  public passwordCompare: string = '';
  public userPosition: string = '';

  public hideForm: boolean = false;

  public baseURI: string = "http://localhost:8080/quizapp/";


  constructor(public navCtrl: NavController,
              public http: HttpClient,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController,
              public navParams: NavParams) {

    this.form = this.formBuilder.group({
      "surname": ["", Validators.required],
      "name": ["", Validators.required],
      "email": ["", Validators.required],
      "password": ["", Validators.required],
      "position": ["", Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  ionViewWillEnter(){
    this.resetFields();
  }

  insertEntry(surname: string, name: string, email: string, position: any): void {
    let headers: any = new HttpHeaders({'Content-Type': 'application/json', ResponseType:'json'}),
      options: any = {
        "key": 'insert',
        "surname": surname,
        "name": name,
        "email": email,
        "position": position
      },

      url: any = this.baseURI + "register_manage-data.php";

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
          // If the request was successful notify the user
          this.hideForm = true;
          this.sendNotification(`Welcome ${name}! You're successfully signed up!`);
        },
        (error: any) => {

          this.sendNotification(error.message);

        });
  }



  sendNotification(message: string): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }


  signUp() {
    firebase.auth().createUserWithEmailAndPassword(this.userEmail, this.userPassword)
      .then((result) => {
        console.log(result);
        var user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: this.userPosition,
          photoURL: ''
        }).then(() => {
          console.log('Successfully signed up');

        }).catch((error) => {
          console.log(error.message);
        });
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });

  }

  passwordRight() {
    if (this.userPassword === this.passwordCompare) {
      this.signUp();
    }
    else {
      let toast = this.toastCtrl.create({
        message: 'password is incorrect',
        duration: 3000
      });
      toast.present();

    }
  }

  saveEntry(): void {
    let surname: string = this.form.controls["surname"].value,
      name: string = this.form.controls["name"].value,
      email: string = this.form.controls["email"].value,
      position: any = this.form.controls["position"].value;

    this.insertEntry(surname, name, email, position);
  }


  resetFields(): void {
    this.userSurname = "";
    this.userName = "";
    this.userEmail = "";
    this.userPassword = "";
    this.userPosition = "";

  }

}
