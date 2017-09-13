import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderDeliveryLocationPage } from './order-delivery-location';

@NgModule({
  declarations: [
    OrderDeliveryLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderDeliveryLocationPage),
  ],
})
export class OrderDeliveryLocationPageModule {}
