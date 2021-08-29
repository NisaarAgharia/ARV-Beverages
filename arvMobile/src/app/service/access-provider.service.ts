
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AccessProviderService {

  TotalFunctions:any[]=['AddOrder','AddStore','CheckStores','DeliveryBoard','DailyStatus','StoreCustomer','AddExpense',"StoreDetails"];
  AccessProvided:any[];
  FunctAccessGranted:JSON[];
  Map ;
  AddOrder={
    'Function':'AddOrder',
    'FunctName':'Order',
      'Details':'Add New orders',
      'image':'add-circle',
     
  };
  AddStore={
    'Function':'AddStore',
    'FunctName':'Store',
    'Details':'Add Stores here',
    'image':'person-add',
  };
  CheckStores={
    'Function':'CheckStores',
    'FunctName':'Map',
    'Details':'Arv Stores',
    'image':'people',
  };
  DeliveryBoard={
    'Function':'DeliveryBoard',
    'FunctName':'Orders',
    'Details':'Delivery/Status',
    'image':'man',
  };
  DailyStatus={
    'Function':'DailyStatus',
    'FunctName':'Status',
    'Details':'Daily Sales',
    'image':'podium',
  }
  
  StoreCustomer={
    'Function':'StoreCustomer',
    'FunctName':'My Store',
    'Details':'Place Order',
    'image':'today',
    
  }
  AddExpense={
    'Function':'AddExpense',
    'FunctName':'Expenses',
    'Details':'Add Expenses',
    'image':'add',
    
  }
  StoreDetails={
    'Function':'StoreDetails',
    'FunctName':'Arv Stores',
    'Details':'Details',
    'image':'person',
    
  }
  constructor() {

   }

populatevalues(element:string)
{

}

 getaccess(useraccess:any[]):Promise<any[]>{
   
 var lenght= useraccess.length;
 var Access=new Set();
 
 for (var usertype of useraccess)
 {
switch(usertype['userType'])
{
  case "D": { 
    //deliveryboy     
 Access.add(this.DeliveryBoard);
 Access.add(this.AddStore);
 Access.add(this.AddExpense);

  break; 
} 
case "RM": { 
  Access.add(this.CheckStores);
  Access.add(this.DeliveryBoard);
  Access.add(this.AddOrder);
  Access.add(this.DailyStatus);
  Access.add(this.AddStore);
 
 
 //regional manager
  break; 
} 
case "C": {
  Access.add(this.StoreCustomer);
//customer
  
  break;    
} 
case "A": {
  Access.add(this.AddOrder);
  Access.add(this.AddStore);
  Access.add(this.CheckStores);
  Access.add(this.DeliveryBoard);
  Access.add(this.StoreDetails);
  Access.add(this.DailyStatus);
  Access.add(this.AddExpense);


//admin
  
  break; 
} 
case "F": {
  Access.add(this.AddOrder);
  Access.add(this.AddStore);
  Access.add(this.CheckStores);
  Access.add(this.DailyStatus);
  Access.add(this.DeliveryBoard);

//admin
  
  break; 
} 
}

 }
var acc=Array.from(Access);
return Promise.resolve(acc);
 }


}

