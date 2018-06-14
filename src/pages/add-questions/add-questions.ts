import {Component, ChangeDetectionStrategy} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SendNotificationProvider} from "../../providers/send-notification/send-notification";

@IonicPage()
@Component({
  selector: 'page-add-questions',
  templateUrl: 'add-questions.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddQuestionsPage {

  public form: FormGroup;

  public items: Array<any> = [];

  public question: any = {
    number: '',
    content: '',
    explanation: '',
    degreeOfDifficulty: '',
    degreeOfImportance: '',
    module: '',
    lecture: ''
  };

  public answers: any = {

    number: '',
    content: '',
    result: '',
    questionNumber:''

  };


  public isEdited: boolean = false;

  public hideForm: boolean = false;

  public pageTitle: string;


  /**
   * @name recordID
   * @type {String}
   * @public
   * @description     Property to store the recordID for when an existing entry is being edited
   */
  public recordID: any = null;

  private baseURI: string = "http://localhost:8080/quizapp/";


  // Initialise module classes
  constructor(public navCtrl: NavController,
              public http: HttpClient,
              public navParam: NavParams,
              public send: SendNotificationProvider,
              public fb: FormBuilder,
              public toastCtrl: ToastController) {

    // Create form builder validation rules
    this.form = fb.group({
      "questionContent": ["", Validators.required],
      // "answerResult"                    : ["", Validators.required],
      "answerContent": ["", Validators.required],
      "explanation": ["", Validators.required],
      // "degreeOfDifficulty"               : ["", Validators.required],
      // "degreeOfImportance"               : ["", Validators.required]
    });
  }


  ionViewWillEnter(): void {
    this.resetFields();

    if (this.navParam.get("record")) {
      this.items = this.navParam.get("record");
      console.log(this.items);
      this.isEdited = true;
      this.selectEntry(this.navParam.get("record"));
      this.pageTitle = 'Edit Question';
    }
    else {
      this.isEdited = false;
      this.pageTitle = 'Create Question';
    }

  }


  /**
   * Assign the navigation retrieved data to properties
   * used as models on the page's HTML form
   *
   * @public
   * @method selectEntry
   * @param item    {any}      Navigation data
   * @return {None}
   */
  selectEntry(item: any): void {
    this.question.number = item.question_number;
    this.question.content = item.question_content;
    this.question.explanation = item.explanation;
    this.question.degreeOfDifficulty = item.degreeOfDifficulty;
    this.question.degreeOfImportance = item.degreeOfImportance;
    this.question.module = item.which_module;
    this.question.lecture = item.which_lecture;
    this.answers.number = item.answer_number;
    this.answers.content = item.answer_content;
    this.answers.result = item.result;
    this.answers.questionNumber = item.which_question;


  }


  /**
   * Save a new record that has been added to the page's HTML form
   * Use angular's http post method to submit the record data
   *
   * @public
   * @method createEntry
   * @param name      {String}      Name value from form field
   * @param description  {String}      Description value from form field
   * @return {None}
   */
  createEntry(name: string, description: string): void {
    let headers: any = new HttpHeaders({'Content-Type': 'application/json'}),
      options: any = {"key": "create", "name": name, "description": description},
      url: any = this.baseURI + "manage-data.php";

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
          // If the request was successful notify the user
          this.hideForm = true;
          this.send.sendNotification(`Congratulations the technology: ${name} was successfully added`);
        },
        (error: any) => {
          this.send.sendNotification('Something went wrong!');
        });
  }


  /**
   * Update an existing record that has been edited in the page's HTML form
   * Use angular's http post method to submit the record data
   * to our remote PHP script
   *
   * @public
   * @method updateEntry
   * @param name      {String}      Name value from form field
   * @param description  {String}      Description value from form field
   * @return {None}
   */
  updateEntry(name: string, description: string): void {
    let headers: any = new HttpHeaders({'Content-Type': 'application/json'}),
      options: any = {"key": "update", "name": name, "description": description, "recordID": this.recordID},
      url: any = this.baseURI + "manage-data.php";

    this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data => {
          // If the request was successful notify the user
          this.hideForm = true;
          console.log(url);
          console.log(JSON.stringify(options));
          console.log(headers);
          this.send.sendNotification(`Congratulations the technology: ${name} was successfully updated`);
        },
        (error: any) => {
          this.send.sendNotification('Something went wrong!');
        });
  }

  /**
   * Remove an existing record that has been selected in the page's HTML form
   * Use angular's http post method to submit the record data
   * to our remote PHP script
   *
   * @public
   * @method deleteEntry
   * @return {None}
   */
  deleteEntry(): void {
    let name: string = this.form.controls["name"].value,
      headers: any = new HttpHeaders({'Content-Type': 'application/json'}),
      options: any = {"key": "delete", "recordID": this.recordID},
      url: any = this.baseURI + "manage-data.php";

    this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data => {
          this.hideForm = true;
          this.send.sendNotification(`Congratulations the technology: ${name} was successfully deleted`);
        },
        (error: any) => {
          this.send.sendNotification('Something went wrong!');
        });
  }


  /**
   * Handle data submitted from the page's HTML form
   * Determine whether we are adding a new record or amending an
   * existing record
   *
   * @public
   * @method saveEntry
   * @return {None}
   */
  saveEntry(): void {
    let name: string = this.form.controls["name"].value,
      description: string = this.form.controls["description"].value;

    if (this.isEdited) {
      this.updateEntry(name, description);
    }
    else {
      this.createEntry(name, description);
    }
  }


  /**
   * Clear values in the page's HTML form fields
   *
   * @public
   * @method resetFields
   * @return {None}
   */
  resetFields(): void {
    this.question.content = "";
    //this.answer.answer_content        = "";
  }


}

