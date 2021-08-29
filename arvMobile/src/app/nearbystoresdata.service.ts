import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
declare var google: any;
@Injectable({
  providedIn: 'root'
})
export class NearbystoresdataService {
  private geocoder: any;
data:string;
  constructor() {
    this.geocoder = new google.maps.Geocoder();
   }

  StoreData(recieveddata:string){
  this.data=recieveddata;
  }

  RetrieveStoreData(){
  return this.data;
    }

    geocodeAddress(location: string): Observable<Location> {
          return new Observable(observer => {
            this.geocoder.geocode({'address': location}, (results, status) => {
              if (status == google.maps.GeocoderStatus.OK) {
                observer.next({
                  lat: results[0].geometry.location.lat(), 
                  lng: results[0].geometry.location.lng(),
                  Area:results[0].formatted_address,
                });
              } else {
                  observer.next({ lat: 0, lng: 0,Area:"" });
              }
              observer.complete();
            });
          })        
        
      
    }
}


export interface Location {
  lat: number; 
  lng: number;
  Area:string;
}