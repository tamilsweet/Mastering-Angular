# Mastering Angular

Angular related notes

## Application

`app` folder has the Angular application code

## Structuring Components

Container and presentation components
Passing state with input and output properties
Change detection strategies
ngOnChanges: reference vs value
Cloning techniques
Component inheritance

### Container and Presentation Components

- Container component - retrieves state
- Presentation component - presents/renders state

```
// /customer/25
// /customer/25/edit
// /customer/25/details

const routes: Route = [
  {
    path: 'customer:id',
    component: CustomerComponent,
    children: [
      { path: 'edit', component: CustomerEditComponent },
      { path: 'details', component: CustomerDetailsComponent }
    ]
  }
];
```

- Pass state from container -> presentation using input properties
- Communicate from presentation -> container using output properties
- Set change detection strategy to OnPush in presentation components
- Consider cloning complex types - for change detection to trigger
- Use child routes as appropriate
- Change detection strategy OnPush - Performance improvement
  - When using OnPush detectors, then the framework will check an OnPush
    component when any of its input properties change, when it fires
    an event, or when an observable fires an event

### Cloning Techiniques

- JSON.parse() and JSON.stringify()
- Custom
- Immutable.js

```
// cloner.service.ts

import { Injectable } from '@angular/core';
import * as clone from 'clone';

@Injectable({
  provideIn: 'root'
})
export class ClonerService {

  deepClone<T>(value): T {
    return clone<T>(value);
  }

}
```

### Setter Getter for properties

```
private _value: string;
@Input() get value() {
  return this._value;
}

set value(val: string) {
  if ( val && val !== this._value) {
    this.isDirty = true;
  }
  this._value = val;
  this.valueChange.emit(val);
}

@Input() isDirty = false;
@Output valueChange = new EventEmitter<string>();
```

### Inherit Component

```
export class SimpleComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {

  }
}
```
