import { Component, OnInit } from '@angular/core';
import { IUserSettings } from './user-settings.model';
import { UserSettingsService } from './user-settings.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'pm-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  originalUsersettings: IUserSettings = {
    name: null,
    emailOffers: null,
    interfaceStyle: null,
    subscriptionType: null,
    notes: null
  };

  userSettings: IUserSettings = { ...this.originalUsersettings };
  postError = false;
  postErrorMessage = '';

  constructor(private dataService: UserSettingsService) { }

  ngOnInit(): void {
  }

  onHttpError(errorResponse: any) {
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onSubmit(form: NgForm) {
    console.log('on submit', form);
    if (form.valid) {
      this.postError = false;
      this.postErrorMessage = '';
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        result => {
          console.log(result);
        },
        err => this.onHttpError(err)
      );
    } else {
      this.postError = true;
      this.postErrorMessage = 'Please fix the above errors';
    }
  }
}
