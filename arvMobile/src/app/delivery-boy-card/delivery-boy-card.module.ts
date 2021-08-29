import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeliveryBoyCardPage } from './delivery-boy-card.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryBoyCardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeliveryBoyCardPage]
})
export class DeliveryBoyCardPageModule {}
