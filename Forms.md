# Angular Forms

## Template based forms

- [(ngModel)] - use 2-way binding using [()], refered to as "Banana in a box" syntax

```
<form #loginform="ngForm" (ngSubmit)="login(loginform.value)">
<em *ngIf="loginform.controls.username?.invalid && loginform.controls.username?.touched || mouseoverLogin">Required</em>
<input [(ngModel)]="username" id="username" type="text" placeholder="Username" />

<span (mouseenter)="mouseoverLogin=true" (mouseleave)="mouseoverLogin=false">
<button type="submit" [disabled]="loginform.invalid">Login</button>
```

## Reactive forms

- Create form in OnInit
- Need ReactiveFormsModule

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
  <em *ngIf="!validLastname() && profileForm.controls.lastname.errors.required">Required</em>
  <em *ngIf="!validLastname() && profileForm.controls.lastname.errors.pattern">Must start with a letter</em>
  <input formControlName="lastname" id="lastname" class="form-control" type="text" placeholder="lastname" />
...
</form>

```
