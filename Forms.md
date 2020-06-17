# Angular Forms

## Template based forms

- [(ngModel)] - use 2-way binding using [()], refered to as "Banana in a box" syntax

```
<form #loginform="ngForm" (ngSubmit)="login(loginform.value)">
<input [(ngModel)]="username" id="username" type="text" placeholder="Username" />

```

## Reactive forms
