import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-new-job-site',
  templateUrl: 'new-job-site.html',
})
export class NewJobSitePage {

  form: FormGroup;

  itemSelected: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _fb: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
    )
  {
    this.buildForm();
  }

  ionViewDidLoad() {
    
  }

  buildForm() {
    this.form = this._fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      accessCode: [''],
      notes: ['']
    });
  }



  cancel() {
    let confirm = this.alertCtrl.create({
      title: 'Cancel this job-site?',
      message: 'Are you sure you want to cancel creating this job site? None of the information you may have filled out will be saved.',
      buttons: [
        {
          text: 'Nevermind',
          handler: () => {
            // do nothing.
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            this.navCtrl.setRoot('JobSitesPage');
          }
        }
      ]
    });
    confirm.present();
  }

}
