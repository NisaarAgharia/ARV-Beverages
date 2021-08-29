import { NavController, Events } from '@ionic/angular';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  signedIn: boolean = false;
  constructor(public router: Router, public events: Events,public nav:NavController) {
    this.events.subscribe('data:AuthState', async (data) => {
      if (data.loggedIn){
        this.signedIn = true;
       // console.log("USer singed in");
        this.nav.navigateForward('/HomePage');
      } else {
        this.signedIn =false;
      //  console.log("USer Not  singed");
        this.nav.navigateForward('/pws');
      }
    })
  }
  canActivate() {
    return this.signedIn;
  }
}
