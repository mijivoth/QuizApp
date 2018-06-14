import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  
  private profile = {
    question: '',
    antwort1: '',
    antwort2: '',
    schwierigkeitsgrad: '',
    ergebnis1: '',
    ergebnis2: '',
    erstellt: ''
  }  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }
  close(){
    this.viewCtrl.dismiss();
  }
  save(){
    this.viewCtrl.dismiss(this.profile);
  }

}
