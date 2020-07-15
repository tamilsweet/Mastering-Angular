import { Component, OnInit } from '@angular/core';
import { Customer, STATE_LIST } from './customer.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.customerForm = new FormGroup({
    //   firstName: new FormControl(),
    //   lastName: new FormControl(),
    //   email: new FormControl(),
    //   sendCatalog: new FormControl(true),
    // });

    this.customerForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      sendCatalog: false
    });
  }

  save() {
    console.log(this.customerForm);
    console.log('Save values : ', this.customerForm.value);
  }
}
