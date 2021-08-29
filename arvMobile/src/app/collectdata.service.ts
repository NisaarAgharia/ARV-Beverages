import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollectdataService {

  StoreName: string="";
  StoreNumber:number=0;
    lat: number=0;
    lng: number=0;
  FormattedAddress:string="";
Landmark: string="";
FormStreet: string="";
FormArea: string="";
  FormAddress: string="";

  constructor() { }
}
