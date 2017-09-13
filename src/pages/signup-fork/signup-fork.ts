import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';

import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-signup-fork',
  templateUrl: 'signup-fork.html',
})
export class SignupForkPage {

  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {

  }

  companyInvite() {
    let prompt = this.alertCtrl.create({
      title: 'Enter access code',
      message: "Enter the access code your company gave you!",
      inputs: [
        {
          name: 'code',
          placeholder: 'enter access code'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            let value = data.code;
            this.verifyCode(value);
          }
        }
      ]
    });
    prompt.present();
  }

  registerCompany() {
    this.navCtrl.push('')
  }

  // fetch the data and determine if the access code is correct
  verifyCode(code: string) {    
    this.checkAccessCode(code).then( snapshot => {
      this.loading.dismiss().then( _ => {
        if (snapshot.val() === null) {
          // incorrect access code
          let alert = this.alertCtrl.create({
            title: 'Incorrect Access Code!',
            subTitle: "Try entering the access code again.",
            buttons: ['OK']
          });
          alert.present();
        }
        console.log('snapshot is : ' + snapshot);
        console.dir(snapshot)
        console.log('snapshot value is : ' + snapshot.val());
      })
    }, error => {
      this.loading.dismiss().then( _ => {
        let alert = this.alertCtrl.create({
          title: error.name,
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();
      })
    })

    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  // TODO: move this function to a service
  checkAccessCode(code: string): firebase.Promise<any> {
    // check the access code node
    return firebase.database().ref(`companyAccessCode/${code}`).once('value');
    
  }

  displayAccessCodeAlert(previousCode?: string) {

  }
}
