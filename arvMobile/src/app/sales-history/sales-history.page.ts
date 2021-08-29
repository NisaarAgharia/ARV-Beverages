import { HTTPCallsService } from './../service/httpcalls.service';
import { HTTP } from '@ionic-native/http/ngx';

import { ViewChild, Component } from '@angular/core';
import { NgCalendarModule  } from 'ionic2-calendar';

import { ActionSheetController, ModalController, NavController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.page.html',
  styleUrls: ['./sales-history.page.scss'],
})
export class SalesHistoryPage  {
  selectedDay = new Date()
  selectedObject
  eventSource = []
  viewTitle;
  isToday: boolean;
  calendarModes = [
    { key: 'month', value: 'Month' },
    { key: 'week', value: 'Week' },
    { key: 'day', value: 'Day' },
  ]
  calendar = {
    mode: this.calendarModes[0].key,
    currentDate: new Date()
  }; // these are the variab
OrderHistory:any[]=[];
  constructor(public navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,private http:HTTPCallsService,public spinnerLoader:LoadingController){

    }
    ionViewWillEnter(){
    
    }

    loadEvents() {
      //this.eventSource = this.createRandomEvents();
    }
    onViewTitleChanged(title) {
      this.viewTitle = title;
    }
    onEventSelected(event) {
     // console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }
    changeMode(mode) {
      this.calendar.mode = mode;
    }
    today() {
      this.calendar.currentDate = new Date();
    }
    onTimeSelected(ev) {
     var dateselected=convert(ev.selectedTime);
     this.httpcall(dateselected);
     
        function convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
    return [ date.getFullYear(), mnth, day ].join("-");

   
}

    }
    httpcall(dateselected:any){

     console.log(dateselected);

  var url ="https://5rtkc2u5y2.execute-api.ap-south-1.amazonaws.com/pre-production/sales-history-prod";
      //call http req.
     this.http.getData(url,{})
     .subscribe(data => {
      this.OrderHistory=data.body;
console.log(this.OrderHistory);
     
     });

    }
    async presentLoadingSave() {
      const loading = await this.spinnerLoader.create({
        message: 'Fetching Sales ...',
        duration: 1500
      });
      return await loading.present();
    }
    
    back()
    {
      this.navCtrl.goBack();
    }
    

    


  }
  interface ordersHistory{
    date;
    total_units;
    total_orders;
    Stores;

  }