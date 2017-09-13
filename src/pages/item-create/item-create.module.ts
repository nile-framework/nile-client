import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { ItemCreatePage } from './item-create';

@NgModule({
  declarations: [
    ItemCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ItemCreatePage),
    TranslateModule.forChild()
  ],
  exports: [
    ItemCreatePage
  ]
})
export class ItemCreatePageModule { }
