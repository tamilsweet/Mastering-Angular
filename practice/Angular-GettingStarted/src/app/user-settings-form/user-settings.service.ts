import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { IUserSettings } from './user-settings.model';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  constructor() { }

  postUserSettingsForm(settings: IUserSettings): Observable<IUserSettings> {
    return of();
  }
}
