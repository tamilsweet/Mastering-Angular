import { Component, OnInit } from '@angular/core';
import { ISignup, STATE_LIST } from './signup.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'pm-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signup: ISignup = {
    firstname: '',
    lastname: '',
    email: '',
    sendCatalog: true,
    addressType: 'home',
    streetAddress1: '',
    streetAddress2: '',
    city: '',
    state: '',
    pincode: null
  };
  signupError = false;
  signupErrorMessage = '';
  stateList = STATE_LIST;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log('Form submitted ');
    console.table(form.value);
  }

}
