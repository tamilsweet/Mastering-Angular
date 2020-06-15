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
