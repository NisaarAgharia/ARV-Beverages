import { UserProfileService } from './../service/user-profile.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage{
Users:any[]=[];
  constructor(public navigation:NavController,public userprof:UserProfileService) {
this.createUSerProfObj();

   } 
  back(){
    this.navigation.goBack();
  }

  Usertype(usertype:any){
   // console.log(usertype);
  }


  createUSerProfObj()
  {
    this.Users=this.userprof.UserProfile;
}
}