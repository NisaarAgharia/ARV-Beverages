import {
  CurrentLocationService,
  Address
} from "./../service/current-location.service";
import { HTTPCallsService } from "./../service/httpcalls.service";
import { CollectdataService } from "./../collectdata.service";
import {
  NavController,
  LoadingController,
  AlertController
} from "@ionic/angular";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { LocationAccuracy } from "@ionic-native/location-accuracy/ngx";
import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import {
  NativeGeocoder,
  NativeGeocoderReverseResult,
  NativeGeocoderOptions
} from "@ionic-native/native-geocoder/ngx";
import { Plugins, Capacitor } from "@capacitor/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

declare let google: any;

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page implements OnInit {
  @ViewChild('input') myInput ;
  Form: FormGroup;
  isLoading:boolean=true;
  PhoneNumber: string = "";
  markers: marker;
  pushdata: any[] = [];
  ContactNumber:string="";
  StoreName: string;
  zoom: number = 17;
  lat: number = 0;
  lng: number = 0;
  location: { lat: number; lng: number } = { lat: 0, lng: 0 };
  Address: string;
  FormatedAdd: string;
  Landmark: string = "";
  petName: string = "";
  AdressFecthed: Address = { Landmark: "", Area: "", Street: "", Address: "" };
  lodaing: any;
  ngOnInit() {
    this.Form = new FormGroup({
      StoreName: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.minLength(3)]
      }),
      petName: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      PhoneNumber: new FormControl(null,{
        updateOn: "blur",
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      }),
      FormLandmark: new FormControl(null,{
        updateOn: "blur",
        validators: [Validators.required, Validators.minLength(1)]
      }),
      FormStreet: new FormControl({
        updateOn: "blur",
        Validators: [Validators.required, Validators.minLength(1)]
      }),
      FormArea: new FormControl({
        updateOn: "blur",
        Validators: [Validators.required, Validators.minLength(1)]
      }),
      FormAddress: new FormControl({
        updateOn: "blur",
        Validators: [Validators.required, Validators.minLength(1)]
      })
    });
  }
  constructor(
    private GeoBoy: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public navgation: NavController,
    private locationAccuracy: LocationAccuracy,
    public CollectdataService: CollectdataService,
    public spinnerLoader: LoadingController,
    public alertCtrl: AlertController,
    private http: HTTPCallsService,
    private locationfinder: CurrentLocationService
  ) {
    this.StoreName = "";
    this.onLocateUser();
  }

  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  ionViewWillEnter() {
    this.AdressFecthed.Landmark="";
    this.onLocateUser();
    this.StoreName = "";  
    setTimeout(() => {
      this.myInput.setFocus();
    },500);
   
  }
  
 

  markerDragEnd(m: marker, $event: MouseEvent) {
    // console.log('dragEnd',$event);
    this.location.lat = $event["coords"]["lat"];
    this.location.lng = $event["coords"]["lng"];
    this.getAddress(this.location.lat, this.location.lng);
    this.presentLoading1().then();
  }

  onLocateUserCapacitor() {
    if (Capacitor.isPluginAvailable("Geolocation")) {
      this.presentAlertERROR();
      return;
    }
    Plugins.Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(
      Position => {
        this.lat = Position.coords.latitude;
        this.lng = Position.coords.longitude;
        this.location.lat = this.lat;
        this.location.lng = this.lng;

        this.getAddress(this.location.lat, this.location.lng);
        
      }
    );
    //this.locationfinder.getCurrentPosition().then();
  }

  onLocateUser() {
    this.GeoBoy.getCurrentPosition({ enableHighAccuracy: true })
      .then(location => {
        this.lat = location.coords.latitude;
        this.lng = location.coords.longitude;
        this.location.lat = this.lat;
        this.location.lng = this.lng;

        this.getAddress(this.location.lat, this.location.lng);
      })
      .catch(error => {
        this.presentAlertERROR();
      });
  
  }

  async presentLoading() {
    const loading = await this.spinnerLoader.create({
      message: "Kaha Ho Aap ?",
      duration: 3500
    });
    return await loading.present();
  }

  async presentLoading1() {
    const loading = await this.spinnerLoader.create({
      message: "Refreshing Location !",
      duration: 3500
    });
    return await loading.present();
  }

  saveLocation() {
    this.presentLoadingSave().then();
    this.CollectdataService.StoreName = this.Form.get("StoreName").value +" "+this.Form.get("petName").value; //+","+this.Form.get('petName').value;
    this.CollectdataService.StoreNumber = this.Form.get("PhoneNumber").value;
    this.CollectdataService.lat = this.location.lat;
    this.CollectdataService.lng = this.location.lng;
     this.CollectdataService.FormArea=this.Form.get("FormArea").value;
     this.CollectdataService.FormAddress=this.Form.get("FormAddress").value;
     this.CollectdataService.FormStreet=this.Form.get("FormStreet").value;
     this.CollectdataService.Landmark=this.Form.get("FormLandmark").value;
    console.log(this.CollectdataService);
    let data = JSON.stringify(this.CollectdataService);
    this.pushdata.push(this.CollectdataService);
    var url =
      "https://jkxu0p54hi.execute-api.ap-south-1.amazonaws.com/pre-production/add-store-prod";
    //call http req.
    this.http.PostData(url, this.pushdata).subscribe(data => {
      var json = data;
      var responsecode = json["responsecode"];
      if (responsecode == 200) {
        //succes scenario
        this.presentAlertsuccess();
      }
      if (responsecode == 300) {
        //error scenario
        this.presentAlertFailure();
      }
      // console.log(responsecode);// data received by server
    });

    // this.navgation.navigateForward(`map-address/${this.Address}`);
  }

  getAddress(lat: number, lng: number) {
    if (navigator.geolocation) {
      let geocoder = new google.maps.Geocoder();
      let latlng = new google.maps.LatLng(lat, lng);
      let request = { latLng: latlng };
      geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          let result = results[0];

          if (result != null) {
            this.FormatedAdd = result.formatted_address;
            this.FormatedAdd = this.FormatedAdd.replace(/[()\/\\]/g, " ");

            let x = this.FormatedAdd.split(",");
            //split logic
            this.AdressFecthed.Address =
              x[x.length - 3] + "," + x[x.length - 2] + "," + x[x.length - 1];
            this.AdressFecthed.Area = x[x.length - 4];
            this.AdressFecthed.Street = x[0] + "," + x[1] + "," + x[2];
            this.isLoading=false;
            //       console.log(this.FormatedAdd);
          } else {
            this.presentAlertERROR();
          }
        }
      });
    }
   
  }

  async presentAlertERROR() {
    const alert = await this.alertCtrl.create({
      header: "Check GPS Setting",
      subHeader: "Could not fetch location ",
      message: "Try again after turning on GPS",
      buttons: ["OK"]
    });
  }

  async presentAlertsuccess() {
    const alert = await this.alertCtrl.create({
      header: "Wooo Hooo !",
      subHeader: "Place added SucessFully",
      buttons: [
        {
          text: "Home",
          handler: () => {
            // console.log('Confirm Okay');
            this.navgation.goBack();
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertFailure() {
    const alert = await this.alertCtrl.create({
      header: "FAILED!",
      subHeader: "Adding Place Failed",
      message: "Please try again",
      buttons: ["Retry"]
    });
    await alert.present();
  }

  async presentLoadingSave() {
    const loading = await this.spinnerLoader.create({
      message: "Saving Store ...",
      duration: 1500
    });
    return await loading.present();
  }

  back() {
    this.navgation.goBack();
  }
  
  
}

export class StoreDetails {
  StoreName: string;
  StoreNumber: number;
  lat: number;
  lng: number;
  FormattedAddress: string;
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
