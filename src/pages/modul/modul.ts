import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the ModulPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modul',
  templateUrl: 'modul.html',
})
export class ModulPage {

  private moduls = [
    {
      index : 1
    },
    {
      index : 2
    }

  ];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModulPage');
  }
  edit() {
    let modal = this.modalCtrl.create('EditPage');
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }

}
