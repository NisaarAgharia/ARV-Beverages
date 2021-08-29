import { Component, OnInit } from '@angular/core';
import { signUpConfigValues, signInConfigValues } from './signupconfig';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signUpConfig;
  signInConfig;
  constructor(public spinnerLoader:LoadingController) { 
this.signUpConfig=signUpConfigValues;
this.signInConfig=signInConfigValues;
  }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.spinnerLoader.create({
      message: 'Authenticating',
      duration: 1500
    });
    return await loading.present();
  }   

}
