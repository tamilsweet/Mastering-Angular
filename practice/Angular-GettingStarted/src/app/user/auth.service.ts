import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;
  currentUser: any;

  constructor() { }

  login(username: string, password: string) {
    this.isLoggedIn = true;
    this.currentUser = { username };
    return true;
  }

  logout() {
    this.isLoggedIn = false;
    this.currentUser = null;
  }
}
