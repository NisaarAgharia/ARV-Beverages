import { Injectable } from '@angular/core';

declare var H: any;

@Injectable({
  providedIn: 'root'
})

export class HereService {


  public platform: any;
  public geocoder: any;

  public constructor() {
      this.platform = new H.service.Platform({
          "app_id": "EK2EbFctsyA835fVWxcT",
          "app_code": "cM2x68fB0FSKRv_94_EZLw"
      });
      this.geocoder = this.platform.getGeocodingService();
  }

  public getAddress(query: string) {}

  public getAddressFromLatLng(query: string) {
    return new Promise((resolve, reject) => {
        this.geocoder.reverseGeocode({ prox: query, mode: "retrieveAddress" }, result => {
            if(result.Response.View.length > 0) {
                if(result.Response.View[0].Result.length > 0) {
                    resolve(result.Response.View[0].Result);
                } else {
                    reject({ message: "no results found" });
                }
            } else {
                reject({ message: "no results found" });
            }
        }, error => {
            reject(error);
        });
    });
}

 
}
