import { HTTPCallsService } from './../service/httpcalls.service';
import { LoadingController, Platform, NavController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-boy-card',
  templateUrl: './delivery-boy-card.page.html',
  styleUrls: ['./delivery-boy-card.page.scss'],
})
export class DeliveryBoyCardPage  {
  isLoading:boolean=false;
  searchTerm: string = '';
  FilterArray:any[]=[];
  isfilter:boolean;
  PendingJSON:JSON;
  PendingOrdersArray:any[]=[];
  CashCollected:string;
  Status:string[]=['Pending','Complete'];
  ChangedStatus:string="";
  constructor(private http:HTTPCallsService,private spinnerLoader:LoadingController,private platform:Platform,private navgation:NavController,public alertCtrl: AlertController) {
    this.LoadPendingOrders();
   }

ionViewWillEnter(){
  this.isfilter=false;
 this.CashCollected='';
 this.isLoading=true;

}
 

LoadPendingOrders()
{
  this.isLoading=true;
  var url = "https://4irb6ok37h.execute-api.ap-south-1.amazonaws.com/pre-production/delivery-boy-card-prod";
  this.http.getData(url,{})
  .subscribe(Response => {
 
this.PendingJSON=Response;
this.PendingOrdersArray=this.PendingJSON['body'];
//console.log(this.PendingJSON);
 //console.log(this.PendingOrdersArray);
 this.isLoading=false;
   });
 
}



Navigate(order:any)
{
  //console.log("navigating");
  let destination = order.lat + ',' + order.lng;

if(this.platform.is('ios')){
	window.open("maps://?q=" + destination, '_system');
} else if (this.platform.is('android')) {
 
  window.open("https://maps.google.com/maps?daddr="+destination+"&amp;ll=");

//window.open("https://www.google.com/maps/search/?api=1&query="+destination+"&amp;ll=");  backup if upper one stops working

}
else{
  window.open("http://maps.google.com/?q="+ destination, '_system');
}
 
}

back()
{
  this.navgation.goBack();
}


updateStatus(orderdetails:JSON)
{
  this.isLoading=true;
var orderNumber=orderdetails['Order_Number'];
var Store_ID=orderdetails['Store_Number'];
var cashCollected=this.CashCollected; //need to put it in http req
  var status="DEL";
  var OrderStatus={
    "Status": status,
    "OrderNumber":orderNumber,
    "Store_ID":Store_ID,
    "Cash":cashCollected
  };
 
 var url="https://e65pogo3k8.execute-api.ap-south-1.amazonaws.com/pre-production/update-order-status-prod";
  this.http.PostData(url,OrderStatus)
  .subscribe(data => {
   // data received by server
    var dataJson=data;
    var responsecode=dataJson['responsecode'];
    if (responsecode==200){
         //succes scenario
      this.presentAlertsuccess();
      this.LoadPendingOrders();
      this.isLoading=false;
      }
     if(responsecode==300){
       //error scenario
       this.presentAlertERROR();
       this.isLoading=false;
     }
  })
  ;

}
cancelFilter(){
  this.isfilter=false;
  
}

async presentAlertERROR() {
  const alert = await this.alertCtrl.create({
    header: 'OOPS',
    subHeader: 'Something Went Wrong',
    message: 'Please try again',
    buttons: ['OK']
  });

  await alert.present();
}

async presentAlertsuccess() {
  const alert = await this.alertCtrl.create({
    header: 'Wooo Hooo !',
    subHeader: 'Order Completed Successfully',
    cssClass:'buttonCss',
    buttons: [ {
      text: 'Okay',
      cssClass: 'exit-button',
      handler: () => {
      //  console.log('Confirm Okay');
        this.navgation.goBack();
      }
    }]
  });

  await alert.present();
}
setFilteredItems() {
  this.isfilter=true;
  this.FilterArray = this.filterItems(this.searchTerm);
  

}

filterItems(searchTerm){
  return this.PendingOrdersArray.filter((item) => {
      return item['Name'].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;  
  });     

}

}