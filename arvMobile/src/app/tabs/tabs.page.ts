import { HTTPCallsService } from "./../service/httpcalls.service";
import { AccessProviderService } from "./../service/access-provider.service";
import { LocationAccuracy } from "@ionic-native/location-accuracy/ngx";
import { NavController, LoadingController, Events } from "@ionic/angular";
import { Component } from "@angular/core";
import { AmplifyService } from "aws-amplify-angular";
import { UserProfileService } from "../service/user-profile.service";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"]
})
export class TabsPage {
  UserType: string[] = [];
  UserProfile: any[] = [];
  FuncAccess: any[];

  constructor(
    public userprof: UserProfileService,
    public spinnerLoader: LoadingController,
    public navgation: NavController,
    public amplifyService: AmplifyService,
    private Access: AccessProviderService,
    private httpcalls: HTTPCallsService
  ) {
    this.amplifyService = amplifyService;
    this.presentLoadingLogin().then();
  }

  ionViewWillEnter() {
    this.callforuserdata();
  }
  Refresh() {
    this.refersh().then();
    this.callforuserdata();
  }

  Redirect(funct: any) {
    this.navgation.navigateForward("/" + funct.Function);
  }
  callforuserdata() {
    var results;
    this.amplifyService
      .auth()
      .currentAuthenticatedUser()
      .then(user => {
        var url =
          "https://bj2obbryz7.execute-api.ap-south-1.amazonaws.com/pre-production/get-user-type-prod";
        var subID = user.attributes["sub"];
        var datasub = {
          sub: subID
        };
        //http call via service and http module
        results = this.httpcalls.PostData(url, datasub);
        results.subscribe(response => {
          this.UserProfile = response.body;
          // console.log(this.UserProfile); // recieved user profile object
          this.userprof.populateUserProfile(this.UserProfile); //populate user profile object for app to use
          this.Access.getaccess(this.UserProfile).then(response => {
            this.FuncAccess = response;
          });
        });
      });
  }

  async presentLoadingLogin() {
    const loading = await this.spinnerLoader.create({
      message: "Logging you in",
      duration: 1000
    });
    return await loading.present();
  }

  async refersh() {
    const loading = await this.spinnerLoader.create({
      message: "refresh",
      duration: 1500
    });
    return await loading.present();
  }

  signout() {
    this.UserType = [];
    this.FuncAccess = [];
    this.userprof.deleteUserProfile();
    this.amplifyService
      .auth()
      .signOut()
      .then(user => {
        //console.log("logout");
        this.navgation.navigateForward("/pws");
      });
  }

  goToUserProfile() {
    this.navgation.navigateForward("/user-profile");
  }
  goToInfoPage() {
    this.navgation.navigateForward("/information");
  }
}
