import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams, Loading, AlertController,
  LoadingController, ModalController } from 'ionic-angular';

import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthProvider } from '../../providers/auth/auth';



@IonicPage()
@Component({
  selector: 'page-new-order',
  templateUrl: 'new-order.html',
})
export class NewOrderPage {

  form: FormGroup;

  showVendorLocation: boolean = false;
  showMaterials: boolean = false;
  showJobSite: boolean = false;

  pickupLocation: any;
  deliveryLocation: any;

  pickupLocationPicked: boolean = false;
  deliveryLocationPicked: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _fb: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private _afDb: AngularFireDatabase,
    private _auth: AuthProvider,
    private _afAuth: AngularFireAuth,
    private _modalCtrl: ModalController
  ) {
    this.buildForm();
  }

  ionViewDidLoad() {
  
  }

  buildForm() {
    this.form = this._fb.group({
      when: ['', Validators.required],
      time: [''],
      deliveryLocation: ['', Validators.required],
      materials: ['', Validators.required],
      pickupLocation: ['', Validators.required],
      // materials: ['', Validators.required] 
    });
    // watch the form and display more as the user fills out previous sections.
    this.form.valueChanges.subscribe( data => {
      if (this.form.controls['when'].valid) {
        this.showVendorLocation = true;
      }
      if (this.form.controls['pickupLocation'].valid) {
        this.showMaterials = true;
      }
      if (this.form.controls['materials'].valid) {
        this.showJobSite = true;
      }
    });
  }



  cancel() {
    let confirm = this.alertCtrl.create({
      title: 'Cancel this order?',
      message: 'Are you sure you want to cancel this order? The information you have entered so far will not be saved.',
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
            this.navCtrl.setRoot('HomePage');
          }
        }
      ]
    });
    confirm.present();
  }

  onSubmit() {
    let orderObject: any = {
      when: '',
      pickupLocation: '',
      deliveryLocation: ''
    }
    let form = this.form.value;
    // 1. reate the order object
    orderObject.when = {when: this.form.value.when, time: form.time}
    orderObject.pickupLocation = {isKnownVendor: false, locationId: this.pickupLocation.place_id, address: this.pickupLocation.address, notes: this.pickupLocation.notes, name: this.pickupLocation.name}
    orderObject.deliveryLocation = {locationId: this.deliveryLocation.place_id, address: this.deliveryLocation.address, notes: this.deliveryLocation.notes, name: this.deliveryLocation.name}  // TODO: add access code.
    // 2. Get ready to write the order to the database by first retrieving the companyPushId.
    this._auth.companyId.subscribe( companyPushId => {
      this._afDb.list(`orders/${companyPushId}`).push({
        creator: this._afAuth.auth.currentUser.uid,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        orderStatus: 'Processing',
        order: orderObject
      }).then( _ => {
        this.navCtrl.setRoot('HomePage');
      });
    });
  }

  editPickupLocation() {
    this.presentPickupLocationModal(this.pickupLocation);
  }


  editDeliveryLocation() {
    this.presentDeliveryLocation(this.deliveryLocation);
  }


  addPickupLocation() {
    this.presentPickupLocationModal();
  }
  

  addDeliveryLocation() {
    this.presentDeliveryLocation();
  }

  presentPickupLocationModal(data?: any) {
    // TODO: pass any data along.
    let newModal = this._modalCtrl.create('OrderPickupLocationPage', {data: data});
    newModal.onDidDismiss( data => {
      if (data) {
        console.log(data);
              // process the data from the modal.
      this.pickupLocation = data;
      this.form.controls['pickupLocation'].setValue(data.address);
      // don't show the add pickup location
      this.pickupLocationPicked = true; 

      this.showMaterials = true;
      }

    });
    newModal.present();
  }


  presentDeliveryLocation(data?: any) {
    let newModal = this._modalCtrl.create('OrderPickupLocationPage', {data: data});
    newModal.onDidDismiss( data => {
      if (data) {
        this.deliveryLocation = data;
        this.form.controls['deliveryLocation'].setValue(data.address);
        this.deliveryLocationPicked = true;

        // this.showMaterials = true;
      }
    });
    newModal.present();
  }

}
