import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewJobSitePage } from './new-job-site';

@NgModule({
  declarations: [
    NewJobSitePage,
  ],
  imports: [
    IonicPageModule.forChild(NewJobSitePage),
  ],
})
export class NewJobSitePageModule {}
