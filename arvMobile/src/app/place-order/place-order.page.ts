import { HTTPCallsService } from './../service/httpcalls.service';
import { LoadingController, AlertController, ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { OOPSPage } from '../oops/oops.page';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.page.html',
  styleUrls: ['./place-order.page.scss'],
})
export class PlaceOrderPage {
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

  constructor(public activatedRoute:ActivatedRoute,public spinnerLoader:LoadingController,private http:HTTPCallsService,public alertCtrl: AlertController,
    public navigation:NavController) {
    this.ShopData = this.activatedRoute.snapshot.paramMap.get('myid');
 this.JSONOBJ=JSON.parse(this.ShopData);
 this.lat=parseFloat(this.JSONOBJ["lat"]);
 this.lng=parseFloat(this.JSONOBJ["lng"]);
// console.log(this.ShopData);

   }

   ionViewWillEnter(){
     this.presentLoading().then();
    this.StoreName=this.JSONOBJ["Name"];
    this.StorePhoneNumber=this.JSONOBJ["PhoneNumber"];
    this.address=this.JSONOBJ["address"];
    this.StoreID=this.JSONOBJ["id"];
    this.Locality=this.JSONOBJ["Locality"];
   }

   async ConfirmOrder()
   {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Order ?',
      subHeader: 'Store : '+this.StoreName,
      message: 'Quantity : '+this.OrderUnits+'  Units',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          //  console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
        //    console.log('Confirm Okay');
            this.SubmitOrder();
          }
        }
      ]
    });
  
    await alert.present();
   }

SubmitOrder()
{
  this.presentLoading1().then();
  var order = 
    {
        "StoreID":this.StoreID,
        "Units":this.OrderUnits
    };

    
  var url = "https://4jjn6eu0p9.execute-api.ap-south-1.amazonaws.com/pre-production/add-order-prod";
  //call http req.
 this.http.PostData(url,order)
 .subscribe(data => {
   var dataJson=data; // data received by server
var orderID=dataJson['body']
 

  var responsecode=dataJson['responsecode'];
  if (responsecode==200){
       //succes scenario
      
       this.UpdateStatus(orderID);
    }
   if(responsecode==300){
     //error scenario
     this.presentAlertERROR();
   }
 });


}
 
UpdateStatus(orderNumber:string)
{
  var status="PEN";
  var OrderStatus={
    "Status": status,
    "OrderNumber":orderNumber,
    "Store_ID":this.StoreID
  };
 var url = "https://e65pogo3k8.execute-api.ap-south-1.amazonaws.com/pre-production/update-order-status-prod";
  this.http.PostData(url,OrderStatus)
  .subscribe(data => {
    var dataJson=data;
    var responsecode=dataJson['responsecode'];
    if (responsecode==200){
         //succes scenario
      this.presentAlertsuccess();
      
      }
     if(responsecode==300){
       //error scenario
       this.presentAlertERROR();
     }
  });
}
   async presentLoading() {
    const loading = await this.spinnerLoader.create({
      message: 'Opening Store Details?',
      duration: 1500
    });
    return await loading.present();
  }
  
  async presentLoading1() {
    const loading = await this.spinnerLoader.create({
      message: 'Order being Processed',
      duration: 3000
    });
    return await loading.present();
  }

  async presentAlertERROR() {
    const alert = await this.alertCtrl.create({
      header: 'Add Order FAILED',
      subHeader: 'Something Went Wrong',
      message: 'Please try again',
      buttons: ['Try Again']
    });
  
    await alert.present();
  }
  
  async presentAlertsuccess() {
    const alert = await this.alertCtrl.create({
      header: 'Wooo Hooo !',
      subHeader: 'Order Placed',
      buttons: [ {
        text: 'Place Another',
        handler: () => {
          this.navigation.goBack();
        }
      }]
    });
  
    await alert.present();
  }
  
  back()
  {
    this.navigation.goBack();
  }
  }

