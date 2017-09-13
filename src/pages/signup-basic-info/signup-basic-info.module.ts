import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { SignupBasicInfoPage } from './signup-basic-info';

@NgModule({
  declarations: [
    SignupBasicInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupBasicInfoPage),
    TranslateModule.forChild()
  ],
})
export class SignupBasicInfoPageModule {}
