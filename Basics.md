# Angular Basics

## Serve in prod mode

```
npm start -- --prod
```

## Template Syntax

### Interpolation

- Expression inside {{ }} is known as Template Expression

```
<h2>{{user.name}}</h2>
```

### Property Binding

```
<img [src]="user.imageUrl" />
```

- [] => Binding Target
- "" => Binding Source

_Expression Restrictions in Interpolation_

- Cannot use assignment operators (=, +=, ++, etc)
- new Keyword
- Expression chaining with ;
- Cannot use global namespace, eg. console.log

_Expression Recommendations in Interpolation_

- No Side-effects
- Fast
- Simple
- Idempotent - Same result

### Event Binding

```
<button (click)="doSomething()"></button>
```

- () => Target Event
- "" => Template Statement

Ref: for events - https://developer.mozilla.org/en-US/docs/Web/Events

### Two-way Binding

```
[(ngModel)]="property"
```

- [()] => Banana in a Box

_Expression Restrictions in Interpolation_

- Cannot use assignment operators _except =_
- new Keyword
- Cannot use global namespace, eg. console.log

_Expression Recommendations in Interpolation_

- Simple

## \*ngFor, \*ngIf - built in structural directive

- \* denotes structural directive

## Safe-Navigation Operator

```
<h2>{{event?.location?.address}}</h2>
```

### \*ngIf vs [hidden]

- Use \*ngIf to avoid adding element to DOM
- Use hidden to show/hide element in DOM

## ngSwitch, \*ngSwitchCase, \*ngSwitchDefault

```
<div [ngSwitch]="event?.time">
  <span *ngSwitchCase="'8:00 am'">Early Start</span>
  <span *ngSwitchCase="'10:00 am'">Late Start</span>
  <span *ngSwitchDefault>Normal Start</span>
</div>
```

## ngClass

```
<div [ngClass]="{ green: event?.time === '8:00 am', bold: event?.time === '8:00 am'}">

<div [ngClass]="getStartTimeClass()">
getStartTimeClass() {
  const isEarlyStart = this.event && this.event.time === '8:00 am';
  return { green: isEarlyStart, bold: isEarlyStart };
}

getStartTimeClass() {
  return this.event && this.event.time === '8:00 am' ? 'green bold': '';
}

getStartTimeClass() {
  return this.event && this.event.time === '8:00 am' ? ['green bold']: [];
}
```

## ngStyle

```
<div [style.color]="event?.time === '8:00 am' ? 'green' : 'black'">

<div [ngStyle]="{ 'color': event?.time === '8:00 am' ? 'green' : 'black', 'font-weight': event?.time === '8:00 am' ? 'bold' : 'normal' }">

```

## Models for Type Safety

- Use class or interface

### Interface

- development time only!
- strong typing and better tooling support
- make it easy to maintain and debug code

```
export interface IProduct {
  productName: string;
  ...
}
```

## @Input() Setters

```
@Input() set voted(val) {
  this.iconColor = val ? 'red' : 'white';
}
this.iconColor: string;
```

### Getters

- Defines a read-only property

```
get fullName(): string {
  return this.lastName + ', ' this.firstName;
}

console.log(this.fullName);
```

### Setters

- Defines a write-only property

```
set quantity(value: number) {
  this.recalculate(value);
}

```

### Getter & Setter

- To define getter & setter with same name needs backing field

```
private _listFilter: string;

get listFilter(): string {
  return this._listFilter;
}

set listFilter(value: string) {
  this._listFilter = value;
}

```
