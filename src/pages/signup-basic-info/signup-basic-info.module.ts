import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupBasicInfoPage } from './signup-basic-info';

@NgModule({
  declarations: [
    SignupBasicInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupBasicInfoPage),
  ],
})
export class SignupBasicInfoPageModule {}
