import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _authProvider: AuthProvider
  ) {
    // this._authProvider.
  }

  ionViewDidLoad() {
    
  }

  startOrder() {
  this.navCtrl.setRoot('NewOrderPage');
  }

}
