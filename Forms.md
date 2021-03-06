# Angular Forms

## Template-driven Forms vs Reactive Forms

- Template-driven Forms

  - Easy to use
  - Use a Component's Template
  - Unit Test Against DOM
  - Two-way data binding -> Minimal component code
  - Automatically tracks form and input element state

  _Template_

  - Form element
  - Input element(s)
  - Data binding
  - Validation rules (attributes)
  - Validation error messages
  - Form model automatically generated

  _Component Class_

  - Properties for data binding (data model)
  - Methods for form operation, such as getting data for display, save on submit

- Reactive Forms

  - More flexible -> for more complex scenarios
  - Immutable data model
  - Easier to perform an action on a value change
  - ReactiveTransformations -> DebounceTime and DistinctUntilChanged
  - Easliy add input elements dynamically
  - Easier unit testing
  - Use a Component's Template
  - Create a Form Model in Typescript
  - Unit Test Against Form Model
  - Validation in Form Model

  _Component Class_

  - Form Model is created manually
  - Validation Rules
  - Validation error messages
  - Properties for managing data (data model)
  - Methods for form processing such as submit

  _Template_

  - Form element
  - Input element(s)
  - Binding to form model

## Template Driven Forms

- _Module:_ FormsModule
- _Directives:_ ngForm, ngModel, ngModelGroup

## Reactive Forms

- _Module:_ ReactiveFormsModule
- _Directives:_ formGroup, formControl, formControlName, formGroupName, formArrayName

## Template based forms

- [(ngModel)] - use 2-way binding using [()], refered to as "Banana in a box" syntax
- Use () for create form
- Use [()] for edit form
- Use `#loginform="ngForm"` to access form data
- Use safe navigation operator for checking control data
- Use placeholder css rules to style error / required fields
- Need FormsModule
- Use `ngModelGroup` to nested object fields
- `name` field is used to populate form value - Used as Form Control instance key
- `ngSubmit` - triggered on both click on submit button as well as enter button.

```
<form #loginform="ngForm" (ngSubmit)="login(loginform.value)">

  <em *ngIf="loginform.controls.username?.invalid && loginform.controls.username?.touched || mouseoverLogin">Required</em>
  <input (ngModel)="username" name="username" id="username"
      type="text" required pattern="[a-zA-Z].*" placeholder="Username"
      #usernameVar="ngModel"
      [ngClass]="{'is-valid': usernameVar.touched && !usernameVar.valid }"
      />
      <span *ngIf="usernameVar.errors">Please enter username</span>

  <input (ngModel)="imageUrl" name="imageUrl" id="imageUrl" type="text" required pattern=".*\/.*.(png|jpg)" placeholder="Url of image..." />

  <span (mouseenter)="mouseoverLogin=true" (mouseleave)="mouseoverLogin=false">
  <button type="submit" [disabled]="loginform.invalid">Login</button>
  </span>

  <div ngModelGroup="location">
    <input (ngModel)="address" name="address" />
    <input (ngModel)="country" name="country" >
  </div>

</form>
```

### Form Validation

- `ngNativeValidate` - Enable default browser validation
- HTML5 Validations
  - required
  - pattern
  - minlength
  - maxlength
  - min
  - max

### Form States

- Value Changed => pristine | dirty
- Validity => valid | error
- Visited => touched | untouched

#### _Validation Classes_

- ng-untouched | ng-touched
- ng-pristine | ng-dirty
- ng-valid | ng-invalid

#### _Classes and Associated NgModel Properties_

- untouched | touched
- pristine | dirty
- valid | invalid

- Style using classes
  eg.

```
  .ng-invalid:not(form).ng-touched {
    border: 1px solid #red;
  }
  <input name="name" class="form-control" [(ngModel)]="formObj.name" required #nameField="ngModel">
  <div [hidden]="nameField.valid || nameField.untouched" class="alert alert-danger">
    Enter a name
  </div>

```

- Use `form.submitted` to validate on submit

## Reactive forms

- Create form in OnInit
- Need FormsModule, ReactiveFormsModule
- Map with interface for type-safety before submit/save

### Accessing the Form Model Properties

- `customerForm.controls.firstname.valid`
- `customerForm.get('firstname').valid`
- ```
  firstname = new FormControl();
  this.customerForm = new FormGroup({
    firstname: this.firstname
  })
  ---
  firstname.valid
  ```

```
this.firstname = new FormControl(this.authService.currentUser.firstname, [Validators.required, Validators.pattern('[a-zA-Z].*')]);
this.lastname = new FormControl(this.authService.currentUser.lastname, [Validators.required, Validators.pattern('[a-zA-Z].*')]);
this.profileForm = new FormGroup({
  firstname: this.firstname,
  lastname: this.lastname
});

validateLastname() {
  return this.lastname.valid || this.lastname.touched;
}

<form [formGroup]="profileForm" (ngSubmit)="saveForm(profileForm.value)">
...
<div [ngClass]="{'error': profileForm.controls.firstname.invalid && profileForm.controls.firstname.touched }">
  <input formControlName="firstname" id="firstname" class="form-control" type="text" placeholder="firstname" />
...
<div [ngClass]="{'error': !validateLastname() }">
  <em *ngIf="!validLastname() && lastname.errors.required">Required</em>
  <em *ngIf="!validLastname() && lastname.errors.pattern">Must start with a letter</em>
  <input formControlName="lastname" id="lastname" class="form-control" type="text" placeholder="lastname" />
...
</form>

```

## Using setValue and patchValue

- setValue to set all of formControls on the form model
- patchValue to some of the formControls on the form model

## Form Builder

- Creates a form model from a configuration
- Shortens bolierplate code
- Provided as a service

### FormBuilder's FormControl Syntax

```
this.customerForm = this.fb.group({
  firstName: '',
  sendCatalog: true
});


this.customerForm = this.fb.group({
  firstName: { value: 'n/a', disabled: true },
  sendCatalog: { value: true, disabled: false }
});


this.customerForm = this.fb.group({
  firstName: [''],
  sendCatalog: [{ value: true, disabled: false }]
});
```

### Benefits of FormGroup

- Match the value of the form model to the data model
- Check touched, dirty and valid state
- Watch for changes and react as needed
- Perform cross field validation
- Dynamically duplicate the group

### Adjusting Validation Rules at Runtime

```
myControl.setValidators(Validators.required);
myControl.setValidators([Validators.required, Validators.maxLength(50)]);
myControl.clearValidators();
myControl.updateValueAndValidity();


eg.

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
```

## Custom Validators

```
// Example 1
// Simple Validator
function myValidator(c: AbstractControl): { [key: string]: boolean } | null {
  if(somethingWrong) {
    return { 'myValidator': true };
  }
  return null;
}

// Validator with parameters - Use factory function
function myValidator(params: any): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if(somethingWrong) {
      return { 'myValidator': true };
    }
    return null;
  }
}

// Example 2

[this.restrictedWords]

private restrictedWords(control: FormControl): {[key: string]: any} {
  return control.value.includes('foo')
    ? { 'restrictedWords': 'foo' }
    : null
}

[this.restrictedWords(restrictedList)]

function restrictedWords(words: string[]) {
  return (control: FormControl): {[key: string]: any} => {
    if(!words) {
      return null;
    }

    var invalidWords = words.map(w => control.value.includes(w) ? w : null).filter(w => w !== null);

    return invalidWords && invalidWords.length > 0
      ? { 'restrictedWords': invalidWords.join(', ') }
      : null
  }
}
```

## Cross-field Validation: Nested FormGroup

```
function dateCompare(c: AbstractControl): { [key: string]: boolean } | null {
  const startControl = c.get('start');
  const endControl = c.get('end');
  if(startControl.value !== endControl.value) {
    return { 'match': true };
  }
  return null;
}
// or
function dateCompare(params: any): ValidatorFn {
  return (c:AbstractControl): { [key: string]: boolean } | null => {
    const startControl = c.get('start');
    const endControl = c.get('end');
    if(startControl.value !== endControl.value) {
      return { 'match': true };
    }
    return null;
  }
}

this.customerForm = this.fb.group({
  firstName: ['', [Validators.required, Validators.minLength(3)]],
  lastName: ['', [Validators.required, Validators.minLength(3)]],
  availability: this.fb.group({
    start: ['', Validators.required],
    end: ['', Validators.required]
  }, { validator: dateCompare })
});

<div formGroupName="availability">
  ...
  <input formControlName="start" />
  ...
  <input formControlName="end" />
  ...
</div>
```

## Watching

- Use valueChanges or statusChanges Observable property
- Subscribe to Observable

```
const phoneControl = this.customerForm.get('phone');
phoneControl.valueChanges.subscribe();
phoneControl.statusChanges.subscribe();
```

### Reacting

- Adjust validation rules
- Handle validation messages
- Modify user interface elements
- Provide automatic suggestions

```
  // ngOnInit
  const emailControl = this.customerForm.get('emailGroup.email');
  emailControl.valueChanges.subscribe(
    value => this.setMessage(emailControl)
  );

  setMessage(c: AbstractControl): void {
    this.emailMessages = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessages = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
    }
  }
```

## Reactive Transforms

- _debounceTime_

  - Ignores events until a specific time has passed without another event
  - debounceTime(1000) waits for 1000ms (1s) of no events before emitting another event

- _throttleTime_

  - Emits a value, then ignores subsequent values for a specific amount of time
  - Useful when receiving too many events like mouse movements.

- _distinctUntilChanged_
  - Suppresses duplicate consecutive items
  - Useful when tracking key events to prevent events when only control or shift keys changed

```
    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
        value => this.setMessage(emailControl)
      );
```

## Dynamically Duplicate Input Elements

- Define the input element to duplicate
- Define a FormGroup to duplicate multiple input element(s)
- Refactor to make copies
- Create a FormArray
- Loop through the FormArray

### Creating a FormArray

```
this.myArray = new FormArray([...]);

this.myArray = this.fb.array([...]);
```

```
// Getter for addresses formGroup
  get addresses(): FormArray {
    return this.customerForm.get('addresses') as FormArray;
  }

// Use formGroup from formArray
this.customerForm = this.fb.group({
  ...
  addresses: this.fb.array([this.buildAddress()])
  ...
});


// Build formGroup dynamically
  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: '',
      street2: '',
      city: '',
      state: '',
      pincode: null
    });
  }

// Add formGroup and add to formArray
  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }

// Update html
// Add *ngFor and use index for formGroupName
// Added index to id and for. Use attr.for instead of for
<div formArrayName="addresses" *ngFor="let address of addresses.controls; let i = index;">
  <div [formGroupName]="i">
    ...
    <div class="form-group row">
      <label class="col-md-2 col-form-label" attr.for="{{ 'street1' + i }}">Street Address 1</label>
      <div class="col-md-8">
        <input type="text" class="form-control" name="street1" id="{{ 'street1' + i }}"
            formControlName="street1" placeholder=" Street Address" />
      </div>
    </div>
    ...
  </div>
</div>
```
