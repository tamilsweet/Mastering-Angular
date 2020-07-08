# Angular Forms

## Template-driven Forms vs Reactive Forms

- Template-driven Forms

  - Use a Component's Template
  - Unit Test Against DOM

- Reactive Forms

  - Use a Component's Template
  - Create a Form Model in Typescript
  - Unit Test Against Form Model
  - Validation in Form Model

## Template based forms

- [(ngModel)] - use 2-way binding using [()], refered to as "Banana in a box" syntax
- Use () for create form
- Use [()] for edit form
- Use `#loginform="ngForm"` to access form data
- Use safe navigation operator for checking control data
- Use placeholder css rules to style error / required fields
- Need FormsModule
- Use `ngModelGroup` to nested object fields
- `name` field is used to populate form value
- `ngSubmit` - triggered on both click on submit button as well as enter button.

```
<form #loginform="ngForm" (ngSubmit)="login(loginform.value)">
<em *ngIf="loginform.controls.username?.invalid && loginform.controls.username?.touched || mouseoverLogin">Required</em>
<input (ngModel)="username" name="username" id="username" type="text" required pattern="[a-zA-Z].*" placeholder="Username" />

<input (ngModel)="imageUrl" name="imageUrl" id="imageUrl" type="text" required pattern=".*\/.*.(png|jpg)" placeholder="Url of image..." />

<span (mouseenter)="mouseoverLogin=true" (mouseleave)="mouseoverLogin=false">
<button type="submit" [disabled]="loginform.invalid">Login</button>

<div ngModelGroup="location">
  <input (ngModel)="address" name="address" />
  <input (ngModel)="country" name="country" >
</div>
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

#### _Validation Classes_

- ng-untouched | ng-touched
- ng-pristine | ng-dirty
- ng-valid | ng-invalid

#### _Classes and Associated NgModel Properties_

- untouched | touched
- pristine | dirty
- valid | invalid

## Reactive forms

- Create form in OnInit
- Need FormsModule, ReactiveFormsModule
- Map with interface for type-safety before submit/save

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

## Custom Validators

```
[this.restrictedWords]

private restrictedWords(control: FormControl): {[key: string]: any} {
  return control.value.includes('foo')
    ? { 'restrictedWords': 'foo' }
    : null
}

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

private restrictedWords(control: FormControl): {[key: string]: any} {
  return control.value.includes('foo')
    ? { 'restrictedWords': 'foo' }
    : null
}
```
