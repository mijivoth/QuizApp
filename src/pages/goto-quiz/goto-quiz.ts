import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ToastController} from "ionic-angular";
import {HttpClient} from "@angular/common/http"
import {SendNotificationProvider} from "../../providers/send-notification/send-notification";


@IonicPage()
@Component({
  selector: 'page-goto-quiz',
  templateUrl: 'goto-quiz.html',
})

export class GotoQuizPage {

  /*
   * questions and answers from DB
   */
  public questions: Array<any> = [];
  public answers: Array<any> = [];

  /*
   * values delivered from the previous page
   */
  public lectureName: any;
  public moduleName: any;
  public moduleNumber: any;

  /*
  * save and check each selected answers of users
  */
  public questionNumber = undefined;
  public answerNumber = [];
  public answerValue = [];
  public answerResult = [];

  public baseURI: string = "http://localhost:8080/quizapp/";


  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public send: SendNotificationProvider,
              public http: HttpClient,
              public navParams: NavParams) {
    this.lectureName = navParams.get('lectureName');
    this.moduleName = navParams.get('moduleName');
    this.moduleNumber = navParams.get('moduleNumber');

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad GotoQuizPage');

  }

  ionViewDidEnter() {
    this.loadQuestions();
    this.loadAnswers();
  }


  loadQuestions(): void {
    this.http
      .get(this.baseURI + 'playQuestions_retrieve-data.php', {
        params: {
          'key': 'questions',
          'lectureName': this.lectureName,
          'moduleNumber': this.moduleNumber

        }
      })
      .subscribe((data: any) => {
          console.dir(data);
          this.questions = data;
        },
        (error: any) => {
          console.dir(error);
        });
  }

  loadAnswers(): void {
    this.http
      .get(this.baseURI + '/playQuestions_retrieve-data.php', {
        params: {
          'key': 'answers',
          'lectureName': this.lectureName,
          'moduleNumber': this.moduleNumber

        }
      })
      .subscribe((data: any) => {
          console.dir(data);
          this.answers = data;
        },
        (error: any) => {
          console.dir(error);
        });
  }


  selectedAnswer(questionNumber: any, answerNumber: number, resultIs: boolean) {

    this.answerNumber[0] = 0;


    console.log(questionNumber, answerNumber, resultIs);

    if (this.questionNumber === undefined || this.questionNumber === questionNumber) {
      this.questionNumber = questionNumber;

      console.log('same question number')


      if (this.answerNumber[answerNumber] === undefined && this.answerValue[answerNumber] === undefined) {
        this.answerNumber[answerNumber] = answerNumber;
        console.log(this.answerNumber);
        this.answerValue[answerNumber] = true;
        this.answerResult[answerNumber] = resultIs;

      } else {
        for (var i = 1; i <= this.answerNumber.length; i++) {

          if (this.answerNumber[i] === answerNumber) {
            this.answerValue[i] = !this.answerValue[i];
            console.log("IN" + this.questionNumber, this.answerNumber[i], this.answerValue[i], this.answerResult[i]);

          } else {
            console.log('nothing happend');
          }
        }
      }
    }
    else {
      console.log('wrong access!');
    }
    console.log("OUT" + this.questionNumber, this.answerNumber[answerNumber], this.answerValue[answerNumber], resultIs);
    console.log(this.answerNumber.length, this.answerNumber);
    console.log(this.answerValue.length, this.answerValue);
    console.log(this.answerResult.length, this.answerResult);
  }

  checkAnswer(explanation) {
    console.log('checkAnswer');

    for (let i = 1; i <= this.answerValue.length; i++) {
      console.log(this.answerValue.length);
      console.log(this.answerValue[i], this.answerResult[i]);
      if (this.answerValue[i] === true) {
        if (this.answerResult[i] !== "true") {
          console.log('wrong answer!');
          return;
        } else {
          console.log('Great!');

        }
      }

    }

    console.log('Go to next!');

    this.send.showExplanation(explanation);

    this.questionNumber = undefined;

    while (this.answerNumber.length > 0) {
      this.answerNumber.pop();
      this.answerValue.pop();
      this.answerResult.pop();
    }
  }



}
