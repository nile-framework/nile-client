import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditJobSitePage } from './edit-job-site';

@NgModule({
  declarations: [
    EditJobSitePage,
  ],
  imports: [
    IonicPageModule.forChild(EditJobSitePage),
  ],
})
export class EditJobSitePageModule {}
