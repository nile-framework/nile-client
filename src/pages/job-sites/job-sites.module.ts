import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobSitesPage } from './job-sites';

@NgModule({
  declarations: [
    JobSitesPage,
  ],
  imports: [
    IonicPageModule.forChild(JobSitesPage),
  ],
})
export class JobSitesPageModule {}
