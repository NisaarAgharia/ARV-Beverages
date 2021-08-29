import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AmplifyService } from 'aws-amplify-angular';
import { AuthServiceService } from './service/auth-service.service';
import { Component } from '@angular/core';
import { Platform, NavController, LoadingController, Events } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  signUpConfig;
  authState: any;
  // including AuthGuardService here so that it's available to listen to auth events
  authService: AuthServiceService
  amplifyService: AmplifyService

  constructor(public events:Events,private locationAccuracy: LocationAccuracy,
    private platform: Platform,
    public guard: AuthServiceService,
    public amplify: AmplifyService,public navigation:NavController,public spinnerLoader:LoadingController
  ) {
    this.initializeApp();
this.presentLoadingLogin().then();
    this.authState = {loggedIn: false};
    this.authService = guard;
    this.amplifyService = amplify;
    this.amplifyService.authStateChange$
    .subscribe(authState => {
      this.authState.loggedIn = authState.state === 'signedIn';
      this.events.publish('data:AuthState', this.authState)
    });

    

  }
  async presentLoadingLogin() {
    const loading = await this.spinnerLoader.create({
      message: 'Welcome to ARV',
      duration: 1000
    });
    return await loading.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
//this.enableLocation();

    });
  }

  // enableLocation()
  // {
  //   console.log("enable location")
  // this.locationAccuracy.canRequest().then((canRequest: boolean) => {
  // if(canRequest) {
  // // the accuracy option will be ignored by iOS
  // console.log("insisde if");
  // this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
  // () => alert('Request successful'),
  // error => alert('Error requesting location permissions'+JSON.stringify(error))
  // );
  // }
  
  // });
  // }
}
