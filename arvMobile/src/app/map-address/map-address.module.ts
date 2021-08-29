import { AgmCoreModule } from '@agm/core';
import { HereService } from './../here.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapAddressPage } from './map-address.page';

const routes: Routes = [
  {
    path: '',
    component: MapAddressPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyAzNeRtGK361U5B1unU7H76QaRLC5WMKP4'
    })
  ],
  providers:[HereService],
  declarations: [MapAddressPage]
})
export class MapAddressPageModule {}
