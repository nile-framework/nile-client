import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobSitePage } from './job-site';

@NgModule({
  declarations: [
    JobSitePage,
  ],
  imports: [
    IonicPageModule.forChild(JobSitePage),
  ],
})
export class JobSitePageModule {}
