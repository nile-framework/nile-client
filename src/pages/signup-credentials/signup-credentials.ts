import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { IonicPage, NavController, NavParams, ToastController, Events, Loading, LoadingController, AlertController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-signup-credentials',
  templateUrl: 'signup-credentials.html',
})
export class SignupCredentialsPage {

  form: FormGroup;
  public loading: Loading;

  basicInfo: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private _fb: FormBuilder,
    private _events: Events,
    private _afAuth: AngularFireAuth,
    private _afDb: AngularFireDatabase,
    private _authProvider: AuthProvider
  ) {
    this.buildForm();

    // access the information the user filled out from the previous page and save it for when the user clicks
    // submit on this page.
    this.basicInfo = this.navParams.get('basicInfo');
  }

  ionViewDidLoad() {
    
  }
  // Construct the form that contains the users login credentails.
  buildForm() {
    this.form = this._fb.group({
      email: ['', Validators.email],
      password: ['', Validators.minLength(6)],
      verifyPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.value.password === this.form.value.verifyPassword) {
      // passwords match, lets continue
      this._authProvider.signUpWithEmail(
        this.form.value.email,
        this.form.value.password,
        this.basicInfo.phoneNumber,
        this.basicInfo.firstName,
        this.basicInfo.lastName
      ).then( user => {
        this.loading.dismiss().then( _ => {
          // this.navCtrl.setRoot('TabsPage').then( _ => {
            // activate the correct side navigation menu.
            this._events.publish('');
            // display a success message to the user.
            let toast = this.toastCtrl.create({
              message: 'Account successfully created',
              duration: 3000,
              position: 'middle'
            });
            toast.present();
            // we need to move this to a better location or change the process somehow (possibly cloud functions)
            this._afDb.list(`/companies`).push({
              owner: {
                [this._afAuth.auth.currentUser.uid]: true
              },
              authState: 'initialSetup'
            }).then( snapshot => {
              this._afDb.object(`users/${this._afAuth.auth.currentUser.uid}`).update({
                company: {
                  id: snapshot.key,
                  position: 'owner',
                  authorized: false
                }
              })
              console.log('snapshot is ' + snapshot);
              console.dir(snapshot);
            })
          });
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
    } else {
      // passwords don't match
      this.loading.dismiss().then( _ => {
        let toast = this.toastCtrl.create({
          message: 'Passwords did not match.',
          duration: 2500,
          position: 'middle'
        });
        toast.present();
      })
    }

    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

}