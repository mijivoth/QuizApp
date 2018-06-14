import {ToastController} from "ionic-angular";
import { Injectable } from '@angular/core';

/*
  Generated class for the SendNotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SendNotificationProvider {

  constructor(public toastCtrl: ToastController) {
    console.log('Hello SendNotificationProvider Provider');
  }

  sendNotification(message: string): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }

  showExplanation(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }



}
