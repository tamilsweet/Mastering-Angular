import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { IUserSettings } from './user-settings.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  constructor(private http: HttpClient) { }

  postUserSettingsForm(settings: IUserSettings): Observable<any> {
    return this.http.post('https://putsreq.com/ZqJCki8PdPkTNE87R2K3', settings);
  }

  getSubscriptionTypes(): Observable<string[]> {
    return of(['Monthly', 'Annual', 'Lifetime']);
  }
}
