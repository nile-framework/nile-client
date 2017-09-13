import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';

declare var goolge: any;



@IonicPage()
@Component({
  selector: 'page-new-job-site',
  templateUrl: 'new-job-site.html',
})
export class NewJobSitePage implements OnInit {

  autocompleteItems: any;
  autocomplete: any;
  acService: google.maps.places.AutocompleteService;
  placesService: any;
  map: any;

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

  ngOnInit() {
    this.acService = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    }
  }


  chooseItem(item: any) {
    // process item
    // 1. Hide the searchbar and display the job site creation form.
    this.itemSelected = true;
    // 2. 
  }

  updateSearch() {
    if (this.autocomplete.query === '') {
      this.autocompleteItems = [];
      return;
    }

    let self = this;
    let config = {
      // types: ['']
      input: this.autocomplete.query,
      componentRestrictions: { country: 'US'}
    }
    this.acService.getPlacePredictions(config, (predections, status) => {
      self.autocompleteItems = [];
      predections.forEach( predection => {
        self.autocompleteItems.push(predection);
      });
    });
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

  private getPlaceDetails(place_id: string): void {
    var self = this;
    var request = {
      place_id: place_id
    }

    this.placesService = new google.maps.places.PlacesService(this.map);
    this.placesService.getPlaceDetails(request, callback);
    function callback(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // set address and name
        self.form.controls['name'].setValue(place.name);
        self.form.controls['address'].setValue(place.address);
      } else {
        // hmmmm
      }
    }
  }

}
