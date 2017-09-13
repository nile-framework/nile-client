import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupForkPage } from './signup-fork';

@NgModule({
  declarations: [
    SignupForkPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupForkPage),
  ],
})
export class SignupForkPageModule {}
