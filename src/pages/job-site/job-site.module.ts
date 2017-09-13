import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { JobSitePage } from './job-site';

@NgModule({
  declarations: [
    JobSitePage,
  ],
  imports: [
    IonicPageModule.forChild(JobSitePage),
    TranslateModule.forChild()
  ],
})
export class JobSitePageModule {}
