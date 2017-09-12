import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(public navCtrl: NavController) {
  }

  signIn(){
    this.navCtrl.push('LoginPage');
  }

  signUp() {
    this.navCtrl.push('SignupPage');
  }

}
