import { SalesHistoryPage } from './sales-history/sales-history.page';
import { LocalityfinderPage } from './localityfinder/localityfinder.page';
import { MapAddressPage } from './map-address/map-address.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryBoyCardPage } from './delivery-boy-card/delivery-boy-card.page';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'HomePage', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'CheckStores', component:LocalityfinderPage },
  { path: 'map-address', loadChildren: './map-address/map-address.module#MapAddressPageModule' },
   { path: 'nearby-stores', loadChildren: './tab1/tab1.module#Tab1PageModule' },
   { path: 'DeliveryBoard', component:DeliveryBoyCardPage },
  { path: 'AddStore', loadChildren: './tab2/tab2.module#Tab2PageModule' },
  { path: 'AddOrder', loadChildren: './tab3/tab3.module#Tab3PageModule' },
  { path: 'DailyStatus', component:SalesHistoryPage},
  { path: 'tabs/tab2/map-adress/:myid', loadChildren: './map-address/map-address.module#MapAddressPageModule'},
 {path: 'map-address/:myid', loadChildren: './map-address/map-address.module#MapAddressPageModule'  },
 { path: 'tabs/tab2/map-adress/:myid', component: MapAddressPage },
  { path: 'place-order', loadChildren: './place-order/place-order.module#PlaceOrderPageModule' },
  { path: 'place-order/:myid', loadChildren: './place-order/place-order.module#PlaceOrderPageModule' },
  { path: 'oops', loadChildren: './oops/oops.module#OOPSPageModule' },
  { path: 'localityfinder', loadChildren: './localityfinder/localityfinder.module#LocalityfinderPageModule' },
  { path: 'delivery-boy-card', loadChildren: './delivery-boy-card/delivery-boy-card.module#DeliveryBoyCardPageModule' },
  { path: 'sales-history', loadChildren: './sales-history/sales-history.module#SalesHistoryPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'user-profile', loadChildren: './user-profile/user-profile.module#UserProfilePageModule' },
  { path: 'information', loadChildren: './information/information.module#InformationPageModule' },
  { path: 'StoreCustomer', loadChildren: './store-owner/store-owner.module#StoreOwnerPageModule' },
  { path: 'pws', loadChildren: './home/home.module#HomePageModule' },
  { path: 'pws-stores-nearby', loadChildren: './pws-stores-nearby/pws-stores-nearby.module#PwsStoresNearbyPageModule' },
  { path: 'pws-order', loadChildren: './pws-order/pws-order.module#PwsOrderPageModule' },
  { path: 'pws-free-sample', loadChildren: './pws-free-sample/pws-free-sample.module#PwsFreeSamplePageModule' },
  { path: 'AddExpense', loadChildren: './add-expense/add-expense.module#AddExpensePageModule' },
  { path: 'StoreDetails', loadChildren: './store-details/store-details.module#StoreDetailsPageModule' },
  { path: 'store-profile/:ShopId', loadChildren: './store-details/store-profile/store-profile.module#StoreProfilePageModule' }













  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
