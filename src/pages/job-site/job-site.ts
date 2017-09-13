import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-job-site',
  templateUrl: 'job-site.html',
})
export class JobSitePage {

  jobsite: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    
  }

  ionViewDidLoad() {
    console.log(this.navParams.get('jobsite'));
  }

}
