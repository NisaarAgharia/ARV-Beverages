import { HomePageModule } from './home/home.module';
import { HTTPCallsService } from './service/httpcalls.service';
import { UserProfileService } from './service/user-profile.service';
import { InformationPageModule } from './information/information.module';
import { AccessProviderService } from './service/access-provider.service';
import { AuthServiceService } from './service/auth-service.service';
import { FormsModule } from '@angular/forms';

import { SalesHistoryPageModule } from './sales-history/sales-history.module';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

import { DeliveryBoyCardPageModule } from './delivery-boy-card/delivery-boy-card.module';
import { LocalityfinderPageModule } from './localityfinder/localityfinder.module';
import { MapAddressPageModule } from './map-address/map-address.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { OOPSPageModule } from './oops/oops.module';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { UserProfilePageModule } from './user-profile/user-profile.module';
import { StoreOwnerPageModule } from './store-owner/store-owner.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NearbystoresdataService } from './nearbystoresdata.service';
import { AddExpensePipe } from './add-expense.pipe';



@NgModule({
  declarations: [AppComponent, AddExpensePipe],
  entryComponents: [],
  imports: [ 
    FormsModule,AmplifyAngularModule,
    BrowserModule, IonicModule.forRoot(),AppRoutingModule,MapAddressPageModule,HttpClientModule,OOPSPageModule,LocalityfinderPageModule,DeliveryBoyCardPageModule,SalesHistoryPageModule,UserProfilePageModule,InformationPageModule,StoreOwnerPageModule,HomePageModule,
    AgmCoreModule.forRoot({
    apiKey: ''
  }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },HTTP,LocationAccuracy,AmplifyService,AuthServiceService,AccessProviderService,HTTPCallsService,NearbystoresdataService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
