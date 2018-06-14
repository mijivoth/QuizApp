import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GotoQuizPage} from "../goto-quiz/goto-quiz";
import {SendNotificationProvider} from "../../providers/send-notification/send-notification";

@IonicPage()
@Component({
  selector: 'page-module',
  templateUrl: 'module.html',
})
export class ModulePage {

  public modules: Array<any> = [];

  public lectureName: string;
  public accesAllowed: boolean;
  private newModule: any = [{
    name
  }];

  public lastIndex: number;

  public baseURI: string = "http://localhost:8080/quizapp/";

  constructor(public navCtrl: NavController,
              public http: HttpClient,
              public alertCtrl: AlertController,
              public send: SendNotificationProvider,
              public navParams: NavParams) {
    this.lectureName = navParams.get('lectureName');
    this.accesAllowed = navParams.get('data');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModulePage');

  }

  ionViewDidEnter() {
    this.load();
  }

  load(): void {
    this.http
      .get('http://localhost:8080/quizapp/module_retrieve-data.php', {params: {'lectureName': this.lectureName}})
      .subscribe((data: any) => {
          console.dir(data);
          this.modules = data;
          this.lastIndex = this.modules.length; // to get the lastIndex of Module
        },
        (error: any) => {
          console.log(this.lectureName);
          console.dir(error);
        });
  }

  insertEntry(lecture_name: any, module_number: any, module_name): void {
    let headers: any = new HttpHeaders({'Content-Type': 'application/json', ResponseType: 'json'}),
      options: any = {
        "key": 'insert',
        "lecture_name": lecture_name,
        "module_number": module_number,
        "module_name": module_name
      },
      url: any = this.baseURI + "module_manage-data.php";

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
          // If the request was successful notify the user
          //  this.hideForm = true;
          this.send.sendNotification(` ${module_number}. ${module_name} is created`);
          console.log(data);
        },
        (error: any) => {

          this.send.sendNotification(error.message);

        });
  }



  editEntry(lectureName: any, moduleNumber: any, moduleName: any): void {
    this.navCtrl.push('QuestionsPage', {
      lectureName,
      moduleNumber,
      moduleName
    });
    console.log(lectureName, moduleNumber, moduleName);
  }


  play(lectureName: any, moduleNumber: any, moduleName: any) {
    this.navCtrl.push('GotoQuizPage', {
      lectureName,
      moduleNumber,
      moduleName
    });
  }

  addModule(moduleNumber){
    console.log(moduleNumber);
    let prompt = this.alertCtrl.create({
      title: 'New Module',
      message: "Enter a name for this new Module you're so keen on adding",
      inputs: [
        {
          name: 'name',
          placeholder: 'new module'
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
            this.newModule = data;
            if (this.newModule.name === '' && this.newModule.name === undefined) {
              this.send.sendNotification('Please, enter a new name for the lecture');
              console.log(this.newModule.name);

            } else {
              console.log(this.newModule.name);
              this.insertEntry(this.lectureName, moduleNumber, this.newModule.name);

            }


          }

        }
      ]
    });
    prompt.present();

  }


}
