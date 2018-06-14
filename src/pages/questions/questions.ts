import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class QuestionsPage {

  public questions: Array<any> = [];

  public moduleNumber: any;
  public lectureName: any;

  public questionNumber:number = 0;


  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              public http: HttpClient) {
    this.moduleNumber = this.navParams.get('moduleNumber');
    this.lectureName = this.navParams.get('lectureName');

  }

  ionViewDidEnter(): void {
    this.loadQuestionsAndAnswers();
  }



  loadQuestionsAndAnswers(): void {
    this.http
      .get('http://localhost:8080/quizapp/question_retrieve-data.php', {
        params: {
          'key': 'questions',
          'lectureName': this.lectureName,
          'moduleNumber': this.moduleNumber,
          'questionNumber': ''
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



  addEntry(): void {
    this.navCtrl.push('AddQuestionsPage');
  }


  editEntry(questionContent: any): void {
    this.navCtrl.push('AddQuestionsPage', questionContent);
  }

  isDuplicate(questionNumber: number): boolean {

    if(this.questionNumber != questionNumber) {
       this.questionNumber = questionNumber;
      return true;
    }else{
      this.questionNumber = questionNumber;
      return false;
    }
  }


}

