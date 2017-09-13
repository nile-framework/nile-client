import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-job-sites',
  templateUrl: 'job-sites.html',
})
export class JobSitesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }


  newJobSite() {
    this.navCtrl.setRoot('NewJobSitePage');
  }

}
