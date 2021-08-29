import { HTTPCallsService } from './../service/httpcalls.service';
import { HTTP } from '@ionic-native/http/ngx';
import { HereService } from './../here.service';
import { CollectdataService } from './../collectdata.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-map-address',
  templateUrl: './map-address.page.html',
  styleUrls: ['./map-address.page.scss'],
})
export class MapAddressPage  {

  @Input() CollectdataService:CollectdataService;
  JSONOBJ:JSON;
  pushdata:any[]=[];
  passedId:any;
  address :string="";
  arraypassed:any[]=[];
  locations:any;
  position: string;
  lat:number;
  lng:number;
  StoreName:string;
  StoreNumber:number;
  zoom:number=17;
  Collecteddata:any;
  Postdata:string;
  constructor(private activatedRoute: ActivatedRoute, public navigation:NavController,private HereService:HereService,
    public Collectdata:CollectdataService,private http:HTTPCallsService,public spinnerLoader:LoadingController,public alertCtrl:AlertController) { 
      this.passedId = this.activatedRoute.snapshot.paramMap.get('myid');
 this.JSONOBJ=JSON.parse(this.passedId);
 this.lat=this.JSONOBJ["lat"];
 this.lng=this.JSONOBJ["lng"];
 this.StoreName=this.JSONOBJ["StoreName"];
 this.StoreNumber=this.JSONOBJ["StoreNumber"];
 this.address=this.JSONOBJ["FormattedAddress"];

 

  }

  ionViewWillEnter (){
    this.presentLoading().then();
    this.Collectdata.FormattedAddress=this.address;
    this.Collectdata.StoreName=this.StoreName;
    this.Collectdata.StoreNumber=this.StoreNumber;
    this.Collectdata.lat=this.lat;
    this.Collectdata.lng=this.lng;
  }

  async presentLoading() {
    const loading = await this.spinnerLoader.create({
      message: ' Address Lara hu bro',
      duration: 3000
    });
    return await loading.present();
  }
    
goBack()
{

let data=JSON.stringify(this.Collectdata);
this.pushdata.push(this.Collectdata);


   var url="https://jkxu0p54hi.execute-api.ap-south-1.amazonaws.com/pre-production/add-store-prod";
   //call http req.
  this.http.PostData(url,this.pushdata)
  .subscribe(data => {

    
   // console.log(data.status);
  //  console.log(data.data); // data received by server
   if (data.status==200)
   {
    this.presentAlertsuccess();
   }
   

  })
  ;
}
async presentAlertsuccess() {
  const alert = await this.alertCtrl.create({
    header: 'Wooo Hooo !',
    subHeader: 'Place added',
    buttons: ['OK']
  });
  await alert.present();
}

async presentAlertFailure() {
  const alert = await this.alertCtrl.create({
    header: 'OOPS !',
    subHeader: 'Adding Place Failed',
    message: 'Please try again',
    buttons: ['Retry']
  });
  await alert.present();
}
back(){
  this.navigation.goBack();
}

}