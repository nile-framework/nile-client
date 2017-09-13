import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupCredentialsPage } from './signup-credentials';

@NgModule({
  declarations: [
    SignupCredentialsPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupCredentialsPage),
  ],
})
export class SignupCredentialsPageModule {}
