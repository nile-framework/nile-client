import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { IonicPage, NavController, NavParams, ViewController, Loading, LoadingController } from 'ionic-angular';

declare var google: any;


@IonicPage()
@Component({
  selector: 'page-order-pickup-location',
  templateUrl: 'order-pickup-location.html',
})
export class OrderPickupLocationPage implements OnInit {

  public loading: Loading;

  // form
  pickupLocationForm: FormGroup;

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
    private _fb: FormBuilder) {
      this.buildPickupLocationForm();
  }


  ngOnInit() {
    this.acService = new google.maps.places.AutocompleteService();        
    this.autocompleteItems = [];
    this.autocomplete = {
        query: ''
    };

    this.initMap();
    this.initPlacedetails();

    let data = this.navParams.get('data');
    if (data) {
      console.log('temp is true');
      this.address.place = data.address;
      // get details
      this.getPlaceDetail(data.place_id);
  
      // dismiss the list and set the value of the search bar
      this.autocompleteItems = [];
    } else {
      // console.log('temps is false');
    }
  }

  buildPickupLocationForm() {
    this.pickupLocationForm = this._fb.group({
      address: ['', Validators.required],
      notes: ['']
    });
  }

  onSubmit() {
    if (this.pickupLocationForm.invalid) {

    } else {
      if (!this.pickupLocationForm.controls['notes'].pristine) {
        this.placedetails.notes = this.pickupLocationForm.value.notes;

        // now dismiss this Modal with the appropriate information.
        this.viewCtrl.dismiss(this.placedetails);
      } else {
        this.viewCtrl.dismiss(this.placedetails);
      }
    }
  }



  cancel() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
    this.loading = this._loadingCtrl.create();
    this.loading.present();
    this.address.place = item.description;
    // get details
    this.getPlaceDetail(item.place_id);

    this.autocomplete.query = '';

    // dismiss the list and set the value of the search bar
    this.autocompleteItems = [];
  }

  private reset() {
    this.initPlacedetails();
    this.address.place = '';
    this.address.set = false;
}


  updateSearch() {
    // console.log('modal > updateSearch');
    if (this.autocomplete.query == '') {
        this.autocompleteItems = [];
        return;
    }
    let self = this;
    let config = { 
        types:  [], // other types available in the API: 'establishment', 'regions', and 'cities'
        input: this.autocomplete.query, 
        componentRestrictions: { country: 'US' } 
    }
    this.acService.getPlacePredictions(config, function (predictions, status) {
        // console.log('modal > getPlacePredictions > status > ', status);
        self.autocompleteItems = [];            
        predictions.forEach(function (prediction) {              
            self.autocompleteItems.push(prediction);
        });
    });
  }

  private getPlaceDetail(place_id:string):void {
    var self = this;
    var request = {
        placeId: place_id
    };
    this.placesService = new google.maps.places.PlacesService(this.map);
    this.placesService.getDetails(request, callback);
    function callback(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
          // console.log('page > getPlaceDetail > place > ', place);
          // set full address
          self.placedetails.address = place.formatted_address;
          self.placedetails.place_id = place_id;
          self.placedetails.name = place.name;
          // self.placedetails.name = place.name;
          // self.placedetails.lat = place.geometry.location.lat();
          // self.placedetails.lng = place.geometry.location.lng();
          // for (var i = 0; i < place.address_components.length; i++) {
          //   let addressType = place.address_components[i].types[0];
          //   let values = {
          //     short_name: place.address_components[i]['short_name'],
          //     long_name: place.address_components[i]['long_name']
          //   }
          //   // if(self.placedetails.components[addressType]) {
          //   //   self.placedetails.components[addressType].set = true;
          //   //   self.placedetails.components[addressType].short = place.address_components[i]['short_name'];
          //   //   self.placedetails.components[addressType].long = place.address_components[i]['long_name'];
          //   // }                                     
          // }                  
          // set place in map
          self.map.setCenter(place.geometry.location);
          self.createMapMarker(place);
          // populate
          self.address.set = true;
          console.log('page > getPlaceDetail > details > ', self.placedetails);

          // update the pickup location form.
          self.pickupLocationForm.controls['address'].setValue(place.formatted_address);
          self.loading.dismiss();
      }else{
          console.log('page > getPlaceDetail > status > ', status);
          self.loading.dismiss();
      }
    }
  }

  private initMap() {
    var point = {lat: 32.873028, lng: -96.936286}; 
    let divMap = (<HTMLInputElement>document.getElementById('map'));
    this.map = new google.maps.Map(divMap, {
        center: point,
        zoom: 15,
        disableDefaultUI: true,
        draggable: false,
        // draggable: true,
        zoomControl: true
    });
  }

  private createMapMarker(place:any):void {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: this.map,
      position: placeLoc
    });    
    this.markers.push(marker);
  }


  private initPlacedetails() {
    this.placedetails = {
      address: '',
      notes: '',
      place_id: ''
      // lat: '',
      // lng: '',
      // components: {
      //   route: { set: false, short:'', long:'' },                           // calle 
      //   street_number: { set: false, short:'', long:'' },                   // numero
      //   sublocality_level_1: { set: false, short:'', long:'' },             // barrio
      //   locality: { set: false, short:'', long:'' },                        // localidad, ciudad
      //   administrative_area_level_2: { set: false, short:'', long:'' },     // zona/comuna/partido 
      //   administrative_area_level_1: { set: false, short:'', long:'' },     // estado/provincia 
      //   country: { set: false, short:'', long:'' },                         // pais
      //   postal_code: { set: false, short:'', long:'' },                     // codigo postal
      //   postal_code_suffix: { set: false, short:'', long:'' },              // codigo postal - sufijo
      // }    
    };        
  }  


}
