import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-profile',
  templateUrl: './store-profile.page.html',
  styleUrls: ['./store-profile.page.scss'],
})
export class StoreProfilePage implements OnInit {

  ShopData:any;
  JSONOBJ:JSON;
  lat:any;
  lng:any;
  StoreName:string;
  StorePhoneNumber:number;
  address :string="";
  StoreID:string="";
  City: string=""
DataStatus:string="";
Locality: string="";
Order_Status: string="";
Pincode:string= ""
zoom: number = 17;
OrderUnits:number;
  
  constructor(public activatedRoute:ActivatedRoute) {
    this.ShopData = this.activatedRoute.snapshot.paramMap.get('ShopId');
 this.JSONOBJ=JSON.parse(this.ShopData);

  }
  ngOnInit() {
  }
  ionViewWillEnter(){
    this.StoreName=this.JSONOBJ["Name"];
    this.StorePhoneNumber=this.JSONOBJ["PhoneNumber"];
    this.address=this.JSONOBJ["address"];
    this.StoreID=this.JSONOBJ["id"];
    this.Locality=this.JSONOBJ["Locality"];
   console.log("json Obj"+ this.JSONOBJ);
  }

}
