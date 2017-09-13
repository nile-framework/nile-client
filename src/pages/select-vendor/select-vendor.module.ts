import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectVendorPage } from './select-vendor';

@NgModule({
  declarations: [
    SelectVendorPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectVendorPage),
  ],
})
export class SelectVendorPageModule {}
