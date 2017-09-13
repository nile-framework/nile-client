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

  jobsites$: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _auth: AuthProvider,
    private _afDb: AngularFireDatabase
  ) {
    this._auth.companyId.subscribe( companyId => {
      this.jobsites$ = this._afDb.list(`/jobSites/${companyId}`)
    })
  }

  ionViewDidLoad() {
    
  }

  
  jobsiteSelected(jobsite) {
    this.navCtrl.push('JobSitePage', {'jobsite': jobsite})
  }


  // add a new job site
  newJobSite() {
    this.navCtrl.setRoot('NewJobSitePage');
  }

}
