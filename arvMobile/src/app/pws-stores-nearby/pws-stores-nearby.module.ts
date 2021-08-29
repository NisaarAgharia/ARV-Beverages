import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PwsStoresNearbyPage } from './pws-stores-nearby.page';

const routes: Routes = [
  {
    path: '',
    component: PwsStoresNearbyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PwsStoresNearbyPage]
})
export class PwsStoresNearbyPageModule {}
