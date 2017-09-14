import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  initialInfoForm: FormGroup;
  public authorized;

  // if the users initial company information hasn't been submitted yet, display a form asking for the information.
  displayInitialCompanyForm: boolean = false;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _authProvider: AuthProvider,
    private _fb: FormBuilder,
    private _afAuth: AngularFireAuth
  ) {
    this._authProvider.authState.subscribe( authState => {
      if ( authState === true){
        this.authorized = true;
      } else {
        this.authorized = false;
      }
    });
    
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
      email: ['', Validators.email],
      phoneNumber: ['', Validators.minLength(10)],
      deliveriesPerWeek: ['', Validators.required]
    })

    
  }

  startOrder() {
  this.navCtrl.setRoot('NewOrderPage');
  }

  onSubmitInitialInfoForm() {
    
  }

}
