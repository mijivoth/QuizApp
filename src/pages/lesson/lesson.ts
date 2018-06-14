import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ItemSliding, ToastController} from 'ionic-angular';
import * as firebase from 'firebase';
import {AlertController} from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SendNotificationProvider} from "../../providers/send-notification/send-notification";


@IonicPage()
@Component({
  selector: 'page-lesson',
  templateUrl: 'lesson.html',
})
export class LessonPage {

  /*
  * lectures from DB
  */
  public itemLectures: Array<any> = [];

  /*
  *  email and position of the current user from firebase
  **/
  private userPosition: string;
  private userEmail: string;

  private myLecture: boolean = true;
  private newLecture: any = [{
    name
  }];

  public lecture_name: any;

  public form: FormGroup;
  public hideForm: boolean = false;
  public baseURI: string = "http://localhost:8080/quizapp/";


  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              public send: SendNotificationProvider,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController,
              private http: HttpClient,
              public navParams: NavParams) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonPage');
    this.initPage();
  }

  ionViewDidEnter() {
    this.loadLectures();
  }


  loadLectures(): void {
    this.http
      .get('http://localhost:8080/quizapp/lecture_retrieve-data.php')
      .subscribe((data: any) => {
          console.dir(data);
          this.itemLectures = data;
        },
        (error: any) => {
          console.dir(error);
        });
  }


  initPage() {
    var user = firebase.auth().currentUser;
    console.log(user);

    if (user) {
      this.userPosition = user.displayName;
      this.userEmail = user.email;
    } else {
      console.log('No user is signed in.');
    }

  }

  insertEntry(lecture_name: any, instructor_email: any): void {
    let headers: any = new HttpHeaders({'Content-Type': 'application/json', ResponseType: 'json'}),
      options: any = {
        "key": 'insert',
        "lecture_name": lecture_name,
        "instructor_email": instructor_email,
      },
      url: any = this.baseURI + "lecture_manage-data.php";

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
          // If the request was successful notify the user
          //  this.hideForm = true;
          this.send.sendNotification(` ${lecture_name} is created`);
          console.log(data);
        },
        (error: any) => {

          this.send.sendNotification(error.message);

        });
  }

  deleteEntry(lecture_name: any): void {
    let headers: any = new HttpHeaders({'Content-Type': 'application/json', ResponseType: 'json'}),
      options: any = {"key": "delete", "lecture_name": this.lecture_name},
      url: any = this.baseURI + "lecture_manage-data.php";

    this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
          this.send.sendNotification(`Congratulations the lecture: ${lecture_name} was successfully deleted`);
          console.log(this.lecture_name);
          console.log(data);
        },
        (error: any) => {
          this.send.sendNotification('Something went wrong!');
          console.log(error.message);
        });
  }


  addLecture() {
    let prompt = this.alertCtrl.create({
      title: 'New Lecture',
      message: "Enter a name for this new Lecture you're so keen on adding",
      inputs: [
        {
          name: 'name',
          placeholder: 'new lecture'
        },
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
          text: 'Save',
          handler: data => {
            this.newLecture = data;
            if (this.newLecture.name === '' && this.newLecture.name === undefined) {
              this.send.sendNotification('Please, enter a new name for the lecture');
              console.log(this.newLecture.name);

            } else {
              console.log(this.newLecture.name);
              this.insertEntry(this.newLecture.name, this.userEmail);

            }


          }

        }
      ]
    });
    prompt.present();

  }

  /*
  * lead to play-mode
  **/
  viewEntry(item: ItemSliding, lectureName: any): void {
    item.close();
    this.navCtrl.push('ModulePage', {
      lectureName
    });
    console.log(lectureName);
  }

  /*
  * lead to edit-mode
  **/
  editEntry(item: ItemSliding, lectureName: any): void {
    item.close();
    this.navCtrl.push('ModulePage', {
      lectureName,
      data: this.myLecture

    });
    console.log(lectureName);
  }

  /*
  * delete a existing lecture with confirm-alert
  **/
  deleteLecture(item: ItemSliding, lectureName: any) {
    this.lecture_name = lectureName;
    item.close();

    let confirm = this.alertCtrl.create({
      title: 'Delete',
      message: 'Would you like to really delete this lecture? ',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.deleteEntry(this.lecture_name);
            console.log(lectureName);

          }
        }
      ]
    });
    confirm.present();

  }

  logout() {
    let confirm = this.alertCtrl.create({
      title: 'Logout',
      message: 'Would you like to really leave? ',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            firebase.auth().signOut().then(() => {
              console.log('log out');
            }).catch((error) => {
              console.log(error.message);
            });
          }
        }
      ]
    });
    confirm.present();

  }

  gotoProfile() {
    this.navCtrl.push('ProfilePage', {
      data: this.userPosition
    });
  }

}
