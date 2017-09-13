import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { NewOrderPage } from './new-order';

@NgModule({
  declarations: [
    NewOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(NewOrderPage),
    TranslateModule.forChild()
  ],
})
export class NewOrderPageModule {}
