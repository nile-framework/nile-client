import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

import { AuthProvider } from '../../providers/auth/auth';



@IonicPage()
@Component({
  selector: 'page-new-order',
  templateUrl: 'new-order.html',
})
export class NewOrderPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _fb: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private _afDb: AngularFireDatabase,
    private _auth: AuthProvider
  ) {
  }

  ionViewDidLoad() {
    
  }



  cancel() {
    let confirm = this.alertCtrl.create({
      title: 'Cancel this order?',
      message: 'Are you sure you want to cancel this order? The information you have entered so far will not be saved.',
      buttons: [
        {
          text: 'Nevermind',
          handler: () => {
            // do nothing.
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            this.navCtrl.setRoot('HomePage');
          }
        }
      ]
    });
    confirm.present();
  }

}
