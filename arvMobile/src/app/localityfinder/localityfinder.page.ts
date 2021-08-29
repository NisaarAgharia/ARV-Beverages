import { NearbystoresdataService } from './../nearbystoresdata.service';
import { HTTPCallsService } from './../service/httpcalls.service';
import { LoadingController, NavController } from '@ionic/angular';

import { Component, OnInit } from '@angular/core';



 var geocoder;
declare var google;


@Component({
  selector: 'app-localityfinder',
  templateUrl: './localityfinder.page.html',
  styleUrls: ['./localityfinder.page.scss'],
})

export class LocalityfinderPage  {
  isLoading:boolean=false;
  locationArea:{lat: 0, lng: 0,Area:"Not Populated Yet"};
  Locality:string="";
  LocalityArray="";
  StoreArray:any[]=[];
  httparray:any[]=[];
  City:string="";
  fecthingData:JSON;
  CitySelected:string="";
  LocalitySelected:string="";
  groupedContacts = [];
  JSONLatLng:JSON;
  Cities:string[] = [
    'Pune',
    'Nagpur',
    'Mumbai',
    

  ]
  
  constructor(private http:HTTPCallsService,public spinnerLoader:LoadingController, public navgation:NavController,public NearbystoresdataService:NearbystoresdataService) { 
   
  }

  CitySelect(value:string){
    var city = [{"City":value}];
    this.CitySelected=value;
   this.isLoading=true;

   var url="https://2toxyzy893.execute-api.ap-south-1.amazonaws.com/pre-production/locality-on-thebasic-of-city-prod";
    this.http.PostData(url,city).subscribe(Response => {
      this.fecthingData=Response;// data received by server
      this.LocalityArray=this.fecthingData['body'];
      this.isLoading=false;
    }); 
  }

  



  getLocation(Locality: any)
   {
   this.isLoading=true;
    this.LocalitySelected=Locality+','+this.CitySelected;
    this.NearbystoresdataService.geocodeAddress(this.LocalitySelected)
    .subscribe((location) => {
    
        this.NearbystoresdataService.StoreData(JSON.stringify(location));
        this.navgation.navigateForward('/nearby-stores');  
        this.isLoading=false;
      }      
    );     
   
  }
  

    back(){
      this.navgation.goBack();
    }
  
  

}
