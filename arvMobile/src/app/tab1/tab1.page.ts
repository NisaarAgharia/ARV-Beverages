import { NearbystoresdataService } from "./../nearbystoresdata.service";
import { ActivatedRoute } from "@angular/router";
import { Markers } from "./../marker-service.service";
import { LoadingController, NavController, Platform } from "@ionic/angular";
import { Component } from "@angular/core";
import { HTTPCallsService } from "../service/httpcalls.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  marker: Markers[] = [];
  zoom: number = 14;
  lat: number = 0;
  lng: number = 0;
  areastring = "";
  locationArea: { lat: number; lng: number; Area: string } = {
    lat: 0,
    lng: 0,
    Area: "Not Populated Yet"
  };
  JSONResp: JSON;
  JSONlocal: any;
  data: any;
  Iconurl: string = "";
  LocalitySelected: string = "";
isLoading:boolean=false;
  // markers:marker[]=[];
  fecthingData: JSON;
  list: any[] = [];
  Stores: [] = [];
  constructor(
    private platform: Platform,
    private http: HTTPCallsService,
    public spinnerLoader: LoadingController,
    private activatedRoute: ActivatedRoute,
    private navigation: NavController,
    private NearbystoresdataService: NearbystoresdataService
  ) {
    this.isLoading=true;
    this.LocalitySelected = this.NearbystoresdataService.RetrieveStoreData();
    // console.log(this.LocalitySelected);
    this.locationArea = JSON.parse(this.LocalitySelected);
    // console.log(this.locationArea);

    this.lat = this.locationArea.lat;
    this.lng = this.locationArea.lng;
    this.LocalitySelected = this.locationArea.Area;
  }

  ionViewWillEnter() {
    this.marker = [];
    this.getAllStores();
  this.isLoading=true;
  }
  getAllStores() {
    var url =
      "https://tj9ywreeya.execute-api.ap-south-1.amazonaws.com/pre-production/get-store-prod";
    var results = this.http.getData(url, {});
    results.subscribe(response => {
      this.fecthingData = response.body;
      this.Stores = this.fecthingData["Items"];
      // area logic

      for (var i = 0; i < this.Stores.length; i++) {
        //Declaring modal
        var modal = <marker>{};
        modal.labelOptions = {};
        modal.icon = {
          url: "",
          scaledSize: {
            height: 10,
            width: 10
          }
        };

        modal.FormattedAddress = this.Stores[i]["address"];
        modal.StoreName = this.Stores[i]["Name"];
        modal.lat = this.Stores[i]["lat"];
        modal.lng = this.Stores[i]["lng"];
        modal.StoreNumber = this.Stores[i]["PhoneNumber"];
        modal.id = this.Stores[i]["id"];
        modal.icon.scaledSize.height = 30;
        modal.icon.scaledSize.width = 30;
        modal.labelOptions.color = "#fcfcfc"; //white color
        modal.labelOptions.fontSize = "13px";
        modal.labelOptions.text = "";
        modal.labelOptions.fontWeight = "bold";
        modal.draggable = false;

        //ICON Logic according to status
        //Label Logic as per status
        var Status: string = this.Stores[i]["Order_Status"];
        switch (Status) {
          case "PEN": {
            modal.icon.url = "./assets/redMarker.png";
            modal.labelOptions.text = "P";
            modal.Status = "Order Pending";
            modal.labelOptions.color = "black";
            modal.icon.scaledSize.height = 40;
            modal.icon.scaledSize.width = 40;
            modal.labelOptions.fontSize = "19px";
            break;
          }
          case "DEL": {
            modal.icon.url = "./assets/greenMarker.png";
            modal.labelOptions.text = "D";
            modal.Status = "Order Delivered";
            modal.labelOptions.color = "black";
            modal.icon.scaledSize.height = 45;
            modal.icon.scaledSize.width = 45;
            modal.labelOptions.fontSize = "19px";
            break;
          }
          case "ACK": {
            modal.icon.url = "./assets/blackMarker.png";
            modal.Status = "Being Prepared / On its Way";
            break;
          }
          case "DEAD": {
            modal.icon.url = "./assets/deadMarker.png";
            modal.labelOptions.text = "RIP";
            modal.Status = "Shop LOST !!";
            modal.icon.scaledSize.height = 35;
            modal.icon.scaledSize.width = 35;
            break;
          }
          case "NA": {
            modal.icon.url = "./assets/blueMarker.png";
            modal.labelOptions.text = "NA";
            modal.Status = "New Shop";
            break;
          }
          default: {
            modal.icon.url = "./assets/blueMarker.png";
            modal.labelOptions.text = "NA";
            modal.Status = "IDLE";
            break;
          }
        }
        //constant values

        this.marker.push(modal);
        this.isLoading=false;
      }
    });
  }

  Navigate(order: any) {
    let destination = order.lat + "," + order.lng;

    if (this.platform.is("ios")) {
      window.open("maps://?q=" + destination, "_system");
    } else if (this.platform.is("android")) {
      window.open(
        "https://maps.google.com/maps?daddr=" + destination + "&amp;ll="
      );

      //window.open("https://www.google.com/maps/search/?api=1&query="+destination+"&amp;ll=");  backup if upper one stops working
    } else {
      window.open("http://maps.google.com/?q=" + destination, "_system");
    }
  }

  processJSON() {
    //    area logic
    var Area = <marker>{};
    Area.labelOptions = {};
    Area.icon = {
      url: "",
      scaledSize: {
        height: 10,
        width: 10
      }
    };
    Area.lat = this.lat;
    Area.lng = this.lng;
    Area.icon.url = "./assets/pinkMarker.png";
    Area.icon.scaledSize.height = 40;
    Area.icon.scaledSize.width = 40;
    this.marker.push(Area);

    // area logic

    for (var i = 0; i < this.Stores.length; i++) {
      //Declaring modal
      var modal = <marker>{};
      modal.labelOptions = {};
      modal.icon = {
        url: "",
        scaledSize: {
          height: 10,
          width: 10
        }
      };
      modal.FormattedAddress = this.Stores[i]["address"];
      modal.StoreName = this.Stores[i]["Name"];
      modal.lat = this.Stores[i]["lat"];
      modal.lng = this.Stores[i]["lng"];
      modal.StoreNumber = this.Stores[i]["PhoneNumber"];
      modal.id = this.Stores[i]["id"];
      modal.icon.scaledSize.height = 30;
      modal.icon.scaledSize.width = 30;
      modal.labelOptions.color = "#fcfcfc"; //white color
      modal.labelOptions.fontSize = "13px";
      modal.labelOptions.fontWeight = "bold";
      modal.draggable = false;

      //ICON Logic according to status
      //Label Logic as per status
      var Status: string = this.Stores[i]["Order_Status"];
      switch (Status) {
        case "PEN": {
          modal.icon.url = "./assets/redMarker.png";
          modal.labelOptions.text = "P";
          modal.Status = "Order Pending";
          modal.labelOptions.color = "black";
          modal.icon.scaledSize.height = 40;
          modal.icon.scaledSize.width = 40;
          modal.labelOptions.fontSize = "19px";
          break;
        }
        case "DEL": {
          modal.icon.url = "./assets/greenMarker.png";
          modal.labelOptions.text = "D";
          modal.Status = "Order Delivered";
          modal.labelOptions.color = "black";
          modal.icon.scaledSize.height = 45;
          modal.icon.scaledSize.width = 45;
          modal.labelOptions.fontSize = "19px";
          break;
        }
        case "ACK": {
          modal.icon.url = "./assets/blackMarker.png";
          modal.Status = "Being Prepared / On its Way";
          break;
        }
        case "DEAD": {
          modal.icon.url = "./assets/deadMarker.png";
          modal.labelOptions.text = "RIP";
          modal.Status = "Shop LOST !!";
          modal.icon.scaledSize.height = 35;
          modal.icon.scaledSize.width = 35;
          break;
        }
        case "NA": {
          modal.icon.url = "./assets/blueMarker.png";
          modal.labelOptions.text = "NA";
          modal.Status = "New Shop";
          break;
        }
        default: {
          modal.icon.url = "./assets/blueMarker.png";
          modal.labelOptions.text = "NA";
          modal.Status = "IDLE";
          break;
        }
      }
      //constant values

      this.marker.push(modal);
    }
  }

  filterData() {}
  async presentLoading() {
    const loading = await this.spinnerLoader.create({
      message: " Fetching all shops ",
      duration: 3000
    });
    return await loading.present();
  }

  back() {
    this.navigation.goBack();
  }
  home() {
    this.navigation.navigateBack("");
  }
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  StoreName: string;
  StoreNumber: number;
  FormattedAddress: string;
  Status: string;
  id: string;
  labelOptions?: {
    color?: string;
    text?: string;
    fontSize?: string;
    fontWeight?: string;
  };
  icon?: {
    url?: string;
    scaledSize?: {
      width?: number;
      height?: number;
    };
  };
}

// just an interface for type safety.
