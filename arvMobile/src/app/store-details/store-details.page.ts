import { HTTPCallsService } from './../service/httpcalls.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';



@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.page.html',
  styleUrls: ['./store-details.page.scss'],
})
export class StoreDetailsPage  {
  isLoading:boolean=false;
 
  searchTerm: string = '';
  items: any;
  Locality:string="";
  LocalityArray="";
  StoreArray:any[]=[];
  FilterArray:any[]=[];
  httparray:any[]=[];
  City:string="";
  fecthingData:JSON;
  groupedContacts = [];
  isfilter:boolean;
  Cities:string[] = [
    'Pune',
    'Nagpur',
    'Mumbai',

  ]
  searchControl: FormControl;
  constructor(private http:HTTPCallsService,public spinnerLoader:LoadingController, public navgation:NavController){
    this.searchControl = new FormControl();
  }

  CitySelect(value:string){
    var city = [
      {
          "City":value,
      }
  ];
        
   this.isLoading=true;
var url="https://2toxyzy893.execute-api.ap-south-1.amazonaws.com/pre-production/locality-on-thebasic-of-city-prod";
    this.http.PostData(url,city).subscribe(Response => {
      this.fecthingData=Response;// data received by server
      this.LocalityArray=this.fecthingData['body'];
      this.isLoading=false;
    });

  
    
  }
  ionViewDidLoad(){
    this.isfilter=false;
  }
  getAllStores(Locality:string)
  {
    this.isLoading=true;
   var url="https://38wemxpor2.execute-api.ap-south-1.amazonaws.com/pre-production/store-on-the-basic-of-locality-prod";
    var locality={
      "Locality":Locality,
    };
  
    this.http.PostData(url,locality).subscribe(Response => {
      this.fecthingData=Response;// data received by server
      this.StoreArray=this.fecthingData['body']['Items'];
     //console.log(this.StoreArray);
     this.isLoading=false;
    });
  }

 
  StoreSelected(store:any)
  {
var storeString=JSON.stringify(store);
this.navgation.navigateForward(`store-profile/${storeString}`);
  }



console(Locality:any)
{
  this.getAllStores(Locality);
 
}


back()
{
  this.navgation.goBack();
}
setFilteredItems() {
  this.isfilter=true;
  this.FilterArray = this.filterItems(this.searchTerm);
  

}

filterItems(searchTerm){
  return this.StoreArray.filter((item) => {
      return item['Name'].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;  
  });     

}

cancelFilter(){
  this.isfilter=false;
}

}

interface StoreData{

  DataStatus:string,
  Order_Status:string,
  City:string,
  lng:string,
  PhoneNumber:string,
  address:string,
  State:string,
  id:string,
  lat:string ,
  Pincode:string,
  Locality:string,
  Name:string
    
}