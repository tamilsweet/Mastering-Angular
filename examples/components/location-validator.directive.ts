import { Directive } from '@angular/core';
import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[validateLocation]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true }
  ]
})
export class LocationValidator implements Validator {
  validate(formGroup: FormGroup): { [key: string]: any } {
    let addressControl = formGroup.controls['address'];
    let cityControl = formGroup.controls['city'];
    let countryControl = formGroup.controls['country'];
    let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl'];
    if (
      (addressControl && addressControl.value
        && cityControl && cityControl.value
        && countryControl && countryControl.value)
      || (onlineUrlControl && onlineUrlControl.value)) {
      return null;
    } else {
      return { locationValidator: false };
    }
  }
}

/*

<div ngModelGroup="location" #locationGroup="ngModelGroup" validateLocation>
  <div class="form-group">
    <label for="address">Event Location:</label>
    <em *ngIf="locationGroup?.invalid && locationGroup?.touched">You must enter either the full location OR an online URL</em>
    <input [(ngModel)]="event.location.address" name="address" id="address" type="text" class="form-control" placeholder="Address of event..."/>
  </div>
  <div class="row">
    <div class="col-md-6">
      <input [(ngModel)]="event.location.city" name="city" id="city" type="text" class="form-control" placeholder="City..." />
    </div>
    <div class="col-md-6">
      <input [(ngModel)]="event.location.country" name="country" id="country" type="text" class="form-control" placeholder="Country..." />
    </div>
  </div>
</div>

<div class="form-group">
  <label for="onlineUrl">Online URL:</label>
  <input [(ngModel)]="event.onlineUrl" id="onlineUrl" name="onlineUrl" type="text" class="form-control" (change)="locationGroup.control.controls.address.updateValueAndValidity()" placeholder="Online Url..." />
</div>



*/