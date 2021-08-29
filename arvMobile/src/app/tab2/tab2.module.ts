import { CurrentLocationService } from './../service/current-location.service';
import { MapAddressPage } from './../map-address/map-address.page';

import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { AgmCoreModule } from '@agm/core';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyAzNeRtGK361U5B1unU7H76QaRLC5WMKP4'
    })
  ],
  declarations: [Tab2Page],
  providers:[Geolocation,NativeGeocoder,CurrentLocationService]

})
export class Tab2PageModule {}
