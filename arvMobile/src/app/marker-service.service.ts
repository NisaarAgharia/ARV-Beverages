
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Markers {
  constructor() { }
	lat: number;
	lng: number;
	label?: string;
  draggable: boolean;
  StoreName: string;
  StoreNumber:number;
  Status:string;
  FormattedAddress:string;
  id:string;
  labelOptions?: {
    color?:string,
    text?:string,
    fontSize?:string,
    fontWeight?:string,
  };
icon?:{
  url?:string;
  scaledSize?: {
      width?: number,
      height?: number,
  }
};
}

 

