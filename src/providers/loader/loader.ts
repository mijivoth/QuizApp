import {Injectable} from '@angular/core';
import {LoadingController} from "ionic-angular";


@Injectable()
export class LoaderProvider {

  private loading: any;

  constructor( public loadingCtrl: LoadingController) {

  }

  show() {

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();

  }

  hide() {
    this.loading.dismiss();
  }
}


