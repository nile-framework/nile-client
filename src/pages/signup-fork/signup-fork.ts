import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading,
  LoadingController, ToastController } from 'ionic-angular';

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
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
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
    this.fetchAccessCode(code).then( snapshot => {
      this.loading.dismiss().then( _ => {
        if (snapshot.val() === null) {
          // incorrect access code
          let prompt = this.alertCtrl.create({
            title: 'Incorrect access code!',
            message: "Please reenter the access code.",
            inputs: [
              {
                name: 'code',
                value: code,
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
        } else {
         if (snapshot.val() === true) {
          // display toast saying code was correct, allow user to sign up.
          let toast = this.toastCtrl.create({
            message: 'Success!',
            duration: 2500,
            position: 'middle'
          });
          toast.present().then( _ => {
            // now navigate to the employee sign up.
          });
         }
        }
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
  fetchAccessCode(code: string): firebase.Promise<any> {
    // check the access code node
    return firebase.database().ref(`companyAccessCode/${code}`).once('value');
    
  }


}
