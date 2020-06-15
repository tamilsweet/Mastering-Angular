# Angular Basics

## Template Syntax

### Interpolation

```
<h2>{{user.name}}</h2>
```

### Property Binding

```
<img [src]="user.imageUrl" />
```

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
