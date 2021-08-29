import { Address } from "./../service/current-location.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Geolocation } from "@ionic-native/geolocation/ngx";

declare let google: any;
@Component({
  selector: "app-pws-free-sample",
  templateUrl: "./pws-free-sample.page.html",
  styleUrls: ["./pws-free-sample.page.scss"]
})
export class PwsFreeSamplePage implements OnInit {
  Form: FormGroup;
  zoom: number = 15;
  lat: number = 0;
  lng: number = 0;
  AdressFecthed: Address = { Landmark: "", Area: "", Street: "", Address: "" };
  Landmark: string = "";
  FormatedAdd: string = "";
  marker: marker;
  constructor(private GeoBoy: Geolocation) {}
  ionViewWillEnter() {
    this.onLocateUser();
  }

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
      ContactNumber: new FormControl({
        updateOn: "blur",
        Validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      }),
      FormLandmark: new FormControl({
        updateOn: "blur"
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
  onLocateUser() {
    this.GeoBoy.getCurrentPosition({ enableHighAccuracy: true })
      .then(location => {
        this.lat = location.coords.latitude;
        this.lng = location.coords.longitude;

        this.getAddress(this.lat, this.lng);
      })
      .catch(error => {
        //  this.presentAlertERROR();
      });
    //   this.presentLoading().then();
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    // console.log('dragEnd',$event);
    this.lat = $event["coords"]["lat"];
    this.lng = $event["coords"]["lng"];
    this.getAddress(this.lat, this.lng);
    //this.presentLoading1().then();
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

            //       console.log(this.FormatedAdd);
          } else {
            // this.presentAlertERROR();
          }
        }
      });
    }
  }

  TakeOrder() {}
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
