import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { IonicPage, NavController, ToastController, Events, Loading, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase/app';

import { AuthProvider } from '../../providers/auth/auth';
// import { User } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  form: FormGroup;

  public loading: Loading;

  // Our translated text strings
  private loginErrorString: string;
  private loginSuccessMessage: string;

  constructor(
    public navCtrl: NavController,
    // public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private _authProvider: AuthProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private _fb: FormBuilder,
    private _events: Events,
    private _storage: Storage
  ) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
    this.translateService.get('Successfully signed in').subscribe( value => {
      this.loginSuccessMessage = value;
    })

    this.buildForm();
  }

  ionViewDidLoad() {
    this._storage.get('loginEmail').then( val => {
      if (val) {
        this.form.controls['email'].setValue(val);
      }
    });
  }

  buildForm() {
    this.form = this._fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  // Attempt to login in through our User service
  doLogin() {
    this._authProvider.loginWithEmail(
      this.form.value.email, this.form.value.password
    ).then( user => {
      this.loading.dismiss().then( _ => {
        this.navCtrl.setRoot('TabsPage');
        this._events.publish('menu:enable');
      });
      // firebase.database().ref(`users/${user.uid}/waitingPage`).once('value').then( snapshot => {
      //   // extract the value
      //   this.loading.dismiss().then( _ => {
      //     let value = snapshot.val();
      //     if (value === true) {
      //       this.navCtrl.setRoot('WaitingPage');
      //     } else {
      //       this.navCtrl.setRoot('TabsPage').then( _ => {
      //         this._events.publish('menu:enable');
      //         this.signInSuccessToast();
      //         this._storage.set('loginEmail', this.form.value.email);
      //       });
      //     }
      //   })
      // });
    }, error => {
      this.loading.dismiss().then( _ => {
        let alert = this.alertCtrl.create({
          title: error.name,
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();
      });
    });
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    // this.user.login(this.account).subscribe((resp) => {
    //   this.navCtrl.push(MainPage);
    // }, (err) => {
    //   this.navCtrl.push(MainPage);
    //   // Unable to log in
    //   let toast = this.toastCtrl.create({
    //     message: this.loginErrorString,
    //     duration: 3000,
    //     position: 'top'
    //   });
    //   toast.present();
    // });
  }

  doForgotPassword() {
    
  }


  // sign in success toast
  signInSuccessToast(): void {
    let toast = this.toastCtrl.create({
      message: this.loginSuccessMessage,
      duration: 2500,
      position: 'middle'
    });
    toast.present();
  }
}
