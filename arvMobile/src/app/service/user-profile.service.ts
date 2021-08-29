import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  UserProfile:any[]=[];
  constructor() { }


populateUserProfile(element:any)
{
this.UserProfile=element;
//console.log(this.UserProfile);

}
deleteUserProfile()
{
this.UserProfile=[];
}
}
