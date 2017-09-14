import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public authorized;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _authProvider: AuthProvider
  ) {
    this._authProvider.authState.subscribe( authState => {
      if ( authState === true){
        this.authorized = true;
      } else {
        this.authorized = false;
      }
    })
    
    this._authProvider.comPosition.subscribe( comPosition => {
      if (comPosition === 'owner') {
        this._authProvider.authState.subscribe( authState => {
          if (authState === 'initialSetup') {
            // we display a form for the company owner to fill out with basic info for the company.
          }
        })
      } else if (comPosition === 'employee') {

      }
    })
  }

  ionViewDidLoad() {
    
  }

  startOrder() {
  this.navCtrl.setRoot('NewOrderPage');
  }

}
