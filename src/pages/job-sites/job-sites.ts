import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-job-sites',
  templateUrl: 'job-sites.html',
})
export class JobSitesPage {

  jobSites$: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _auth: AuthProvider,
    private _afDb: AngularFireDatabase
  ) {
    this._auth.companyId.subscribe( companyId => {
      this.jobSites$ = this._afDb.list(`/jobSites/${companyId}`)
    })
    
  }

  ionViewDidLoad() {
    
  }

  
  jobsiteSelected(jobsite) {
    console.dir(jobsite);
    this.navCtrl.push('JobSite', jobsite)
  }


  // add a new job site
  newJobSite() {
    this.navCtrl.setRoot('NewJobSitePage');
  }

}
