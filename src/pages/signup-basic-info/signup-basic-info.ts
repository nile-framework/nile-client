import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { IonicPage, NavController, ToastController, Events, Loading, LoadingController, AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-signup-basic-info',
  templateUrl: 'signup-basic-info.html',
})
export class SignupBasicInfoPage {

  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private _fb: FormBuilder,
    private _events: Events,
    // private _storage: Storage
  ) {
    this.buildForm();
  }

  ionViewDidLoad() {
    
  }

  buildForm() {
    this.form = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.minLength(10)]
    });
  }

  onContinue() {
    let basicInfo = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      phoneNumber: this.form.value.phoneNumber
    }

    this.navCtrl.push('SignupCredentialsPage', {'basicInfo': basicInfo});
  }

}
