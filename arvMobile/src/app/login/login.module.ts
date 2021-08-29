import { AuthServiceService } from './../service/auth-service.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AmplifyService, AmplifyAngularModule, AmplifyIonicModule } from 'aws-amplify-angular'
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,AmplifyAngularModule,
    AmplifyIonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage],
  providers: [AmplifyService,AuthServiceService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LoginPageModule {}
