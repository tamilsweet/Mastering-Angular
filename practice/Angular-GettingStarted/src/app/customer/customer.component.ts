import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Customer, STATE_LIST } from './customer.model';


function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true };
    }
    return null;
  };
}

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmEmailControl = c.get('confirmEmail');
  if (emailControl.pristine || confirmEmailControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmEmailControl.value) {
    return null;
  }
  return { 'match': true };
}

@Component({
  selector: 'pm-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerForm: FormGroup;
  customer = new Customer();
  customerError = false;
  customerErrorMessage = '';
  stateList = STATE_LIST;

  emailMessages: string;
  private validationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.'
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required]
      }, { validator: emailMatcher }),
      phone: '',
      notification: 'email',
      rating: [null, ratingRange(1, 5)],
      sendCatalog: false
    });
    this.subscribeChanges();
  }

  subscribeChanges() {
    this.customerForm.get('notification').valueChanges
      .subscribe(
        value => this.setNotification(value)
      );

    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
        value => this.setMessage(emailControl)
      );
  }

  setMessage(c: AbstractControl): void {
    this.emailMessages = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessages = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
    }
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    console.log(notifyVia);
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  save() {
    console.log(this.customerForm);
    console.log('Save values : ', this.customerForm.value);
  }
}
