import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { SignupCredentialsPage } from './signup-credentials';

@NgModule({
  declarations: [
    SignupCredentialsPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupCredentialsPage),
    TranslateModule.forChild()
  ],
})
export class SignupCredentialsPageModule {}
