import { Router } from '@angular/router';
import { Events, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../service/user-profile.service';

@Component({
  selector: 'app-store-owner',
  templateUrl: './store-owner.page.html',
  styleUrls: ['./store-owner.page.scss'],
})
export class StoreOwnerPage {
  Userprofile:any[];
  StoreID:string="";
  OrderUnits:number;
  order = 
  {
      "StoreID":this.StoreID,
      "Units":this.OrderUnits
  };
  constructor(public router: Router, public events: Events,public nav:NavController,public userprof:UserProfileService) {
    this.Userprofile=this.userprof.UserProfile;
    console.log(this.Userprofile);
  }

 Usertype(user:any){
  console.log(user);

 }

 PlaceOrder(user:any)
 {
  console.log(user);
 }
ionViewWillEnter(){
}


back(){
  this.nav.goBack();
}
}
