# Mastering Angular

Angular related notes

## Application

`app` folder has the Angular application code

## Tips to build respectable, high quality and scalable Angular Applications

- Create architecture template and style guide to help team develop faster
- Use @Optional, @SkipSelf decorators to prevent CoreModule from being imported more than once
- LIFT
  - Locate code quickly
  - Identify the code at a glance
  - Flattest structure possible
  - Try to be DRY

### Performance Tips

- Use the Angular CLI
- Compile before deploying - using AOT (`npm start -- --prod`, `npm run build -- --prod`)
- Use `source-map-explorer` to check bundle size (`npm run build -- --prod --sourcemaps=true`)

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

## Event Bus vs Observable Service

| Event Bus                                                      | Observable Service                                        |
| -------------------------------------------------------------- | --------------------------------------------------------- |
| Mediator pattern                                               | Observer pattern                                          |
| Angular service acts as the middleman between components       | Angular service exposes observable directly to components |
| Components don't know where the data is coming from by default | Components know where data is coming from                 |
| Loosely coupled                                                | Not as loosely coupled as event bus                       |
| Relies on subject/observable                                   | Relies on subject/observable                              |

## Security Considerations

### CORS Considerations

- CORS allows a browser to call a different domain or port
- Enable on the server as needed
- Limit allowed domain, headers, and methods

### CSRF Considerations

- Enable CSRF on the server if using cookie authentication
- Angular will read a token from a cookie set by the server and add it to the request headers
- Change the cookie/header name as appropriate for your server
- Server will validate the header value

### Route Guards

- Define route guards needed by application based on user or group/role
- route guards dont "secure" an application
- Rely on the server to secure data, APIs, etc.

### Sensitive Data

- Anyone can access variables, local/session storage, cookie, etc.
- Do not store sensitive data in the browser
- If an API requries a "secret" to be passed, consider calling it through a "middle-man" service that you own
- Use JWT tokens where possible for server authentication (set appropriate TTL expiration for tokens)

## ILL-ities

- Usability
- Testability
- Predictability
- Discoverability
- Maintainability
- Immutability
