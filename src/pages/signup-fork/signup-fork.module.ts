import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { SignupForkPage } from './signup-fork';

@NgModule({
  declarations: [
    SignupForkPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupForkPage),
    TranslateModule.forChild()
  ],
})
export class SignupForkPageModule {}
