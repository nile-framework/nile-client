import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderPickupLocationPage } from './order-pickup-location';

@NgModule({
  declarations: [
    OrderPickupLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderPickupLocationPage),
  ],
})
export class OrderPickupLocationPageModule {}
