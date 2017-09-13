import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { IonicPage, NavController, NavParams, ViewController, Loading, LoadingController } from 'ionic-angular';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-order-delivery-location',
  templateUrl: 'order-delivery-location.html',
})
export class OrderDeliveryLocationPage implements OnInit {

  public loading: Loading;
  
  // form
  form: FormGroup;

  autocompleteItems: any;
  autocomplete: any;
  acService:any;
  placesService: any;

  address:any = {
    place: '',
    set: false,
  };
  map: any;
  markers = [];
  placedetails: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private _loadingCtrl: LoadingController,
    private _fb: FormBuilder)
  {

  }

  ionViewDidLoad() {
    
  }

  ngOnInit() {
    // this.acService = new google.maps.places.AutocompleteService();        
    // this.autocompleteItems = [];
    // this.autocomplete = {
    //     query: ''
    // };

    // this.initMap();
    // this.initPlacedetails();

    // let data = this.navParams.get('data');
    // if (data) {
    //   console.log('temp is true');
    //   this.address.place = data.address;
    //   // get details
    //   this.getPlaceDetail(data.place_id);
  
    //   // dismiss the list and set the value of the search bar
    //   this.autocompleteItems = [];
    // } else {
    //   // console.log('temps is false');
    // }
  }

  buildForm() {

  }

  chooseItem(item: any) {
  //   this.loading = this._loadingCtrl.create();
  //   this.loading.present();
  //   this.address.place = item.description;
  //   // get details
  //   this.getPlaceDetail(item.place_id);

  //   this.autocomplete.query = '';

  //   // dismiss the list and set the value of the search bar
  //   this.autocompleteItems = [];
  // }

  // private reset() {
  //   this.initPlacedetails();
  //   this.address.place = '';
  //   this.address.set = false;
}

}
