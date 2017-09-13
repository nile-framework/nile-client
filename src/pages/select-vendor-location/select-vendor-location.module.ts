import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectVendorLocationPage } from './select-vendor-location';

@NgModule({
  declarations: [
    SelectVendorLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectVendorLocationPage),
  ],
})
export class SelectVendorLocationPageModule {}
