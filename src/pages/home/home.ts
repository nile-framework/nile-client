import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';

// import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public loading: Loading;

  // TODO: we should make a user interface
  user: any;

  initialInfoForm: FormGroup;
  initialInfoFormSubmitted: boolean = false;
  public authorized;

  // if the users initial company information hasn't been submitted yet, display a form asking for the information.
  displayInitialCompanyForm: boolean = false;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private _authProvider: AuthProvider,
    private _fb: FormBuilder,
    private _afAuth: AngularFireAuth,
    private _afDb: AngularFireDatabase
  ) {
    this._authProvider.authState.subscribe( authState => {
      if ( authState === true){
        this.authorized = true;
      } else {
        this.authorized = false;
      }
    });
    
    this._authProvider.user.subscribe( user => {
      this.user = user;
      console.log('user is ' + user);
      console.dir(user);
    })
    
    this._authProvider.comPosition.subscribe( comPosition => {
      if (comPosition === 'owner') {
        this._authProvider.authState.subscribe( authState => {
          if (authState === 'initialSetup') {
            // we display a form for the company owner to fill out with basic info for the company.
            this.buildInitialInfoForm();
            this.displayInitialCompanyForm = true;
          }
        })
      } else if (comPosition === 'employee') {

      }
    })
  }

  ionViewDidLoad() {
    
  }

  buildInitialInfoForm() {
    this.initialInfoForm = this._fb.group({
      name: ['', Validators.required],
      email: [this.user.email, Validators.email],
      phoneNumber: [this.user.phoneNumber, Validators.minLength(10)],
      deliveriesPerWeek: ['', Validators.required]
    })
    

    
  }

  startOrder() {
  this.navCtrl.setRoot('NewOrderPage');
  }

  onSubmitInitialInfoForm() {
    this._afDb.object(`companies/${this.user.company.id}`).update({
      name: this.initialInfoForm.value.name,
      email: this.initialInfoForm.value.email,
      phoneNumber: this.initialInfoForm.value.phoneNumber,
      estimatedDeliveryPerWeek: this.initialInfoForm.value.deliveriesPerWeek
    }).then( snapshot => {
      this.loading.dismiss();
      this.initialInfoFormSubmitted = true;
    })

    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

}
