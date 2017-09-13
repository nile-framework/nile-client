import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { NewJobSitePage } from './new-job-site';

@NgModule({
  declarations: [
    NewJobSitePage,
  ],
  imports: [
    IonicPageModule.forChild(NewJobSitePage),
    TranslateModule.forChild()
  ],
})
export class NewJobSitePageModule {}
