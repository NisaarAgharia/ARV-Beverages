import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PwsOrderPage } from './pws-order.page';

const routes: Routes = [
  {
    path: '',
    component: PwsOrderPage
  }
];

@NgModule({
  imports: [
    CommonModule,ReactiveFormsModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: ''
    }),
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PwsOrderPage]
})
export class PwsOrderPageModule {}
