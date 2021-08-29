import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;
declare let google: any;

@Injectable({
  providedIn: 'root'
})
export class CurrentLocationService {
  FormatedAdd:String;
  AdressFecthed:Address={Landmark:'',Area:'',Street:'',Address:''};

  constructor() { }

  async getCurrentPosition () {
    const coordinates = await Geolocation.getCurrentPosition({enableHighAccuracy:true});
    console.log('Current', coordinates.coords);
    this.getAddress(coordinates.coords.latitude,coordinates.coords.longitude);
  }

  watchPosition() {
    const wait = Geolocation.watchPosition({}, (position, err) => {
    })
  }

  getAddress( lat: number, lng: number ) {
    
    if (navigator.geolocation) {
      let geocoder = new google.maps.Geocoder();
      let latlng = new google.maps.LatLng(lat, lng);
      let request = { latLng: latlng };
      geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          let result = results[0];
         console.log(results);
          if (result != null) {
            this.FormatedAdd=result.formatted_address;
            this.FormatedAdd=this.FormatedAdd.replace(/[\/\\]/g, "");
           console.log(this.FormatedAdd);

          } else {
            this.FormatedAdd="error";
          }
        }
      });
  }
  }
}

export interface Address {
  Landmark: string;
  Area: string;
	Street: string;
  Address: string;
}