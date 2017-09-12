import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public events: Events
  ) {
  }

  logout() {
    this.authProvider.logout().then( _ => {
      this.navCtrl.setRoot('LandingPage').then( _ => {
        this.events.publish('menu:disable');
      });
    });
  }

}
