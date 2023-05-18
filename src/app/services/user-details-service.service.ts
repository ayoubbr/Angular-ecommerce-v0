import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserDetailsServiceService {
  constructor() {}
  private userDetailsKey = 'userDetails';

  setUserDetails(user: any) {
    localStorage.setItem(this.userDetailsKey, JSON.stringify(user));
  }

  getUserDetails(): any {
    const userDetails = localStorage.getItem(this.userDetailsKey);
    return userDetails ? JSON.parse(userDetails) : null;
  }

  clearUserDetails() {
    localStorage.removeItem(this.userDetailsKey);
  }
}
