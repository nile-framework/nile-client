import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-job-site',
  templateUrl: 'job-site.html',
})
export class JobSitePage {

  jobsite: any;

  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _fb: FormBuilder,
    public toastCtrl: ToastController
  ) {
    this.jobsite = this.navParams.get('jobsite');

    this.buildForm();
  }

  ionViewDidLoad() {
    
  }

  buildForm(): void {
    this.form = this._fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      notes: [''],
      accessCode: ['']
    });

    this.form.controls['name'].setValue(this.jobsite.name);
    this.form.controls['address'].setValue(this.jobsite.address);
    this.form.controls['notes'].setValue(this.jobsite.notes);
    this.form.controls['accessCode'].setValue(this.jobsite.accessCode);

    //now disable the form
    this.form.disable();
  }

  startOrder() {
    // start a new order with this job site as the destination.
    // TODO:
    let toast = this.toastCtrl.create({
      message: 'This functionality is almost there. Esentailly when the user clicks this button they will be starting a new order but with the delivery location already set to this job site.',
      duration: 5000,
      position: 'middle'
    });
    toast.present();
  }

}
