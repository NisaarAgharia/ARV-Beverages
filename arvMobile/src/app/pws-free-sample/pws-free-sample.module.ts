import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PwsFreeSamplePage } from './pws-free-sample.page';

const routes: Routes = [
  {
    path: '',
    component: PwsFreeSamplePage
  }
];

@NgModule({
  imports: [
    CommonModule,ReactiveFormsModule,
    FormsModule, AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: ''
    }),
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PwsFreeSamplePage]
})
export class PwsFreeSamplePageModule {}
