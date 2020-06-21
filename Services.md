# Angular Services

## What is an Angular Service?

- Reusable piece of functionality shared across components
- Responsible for single, discrete piece of functionality
- Able to be delivered when and where it is needed
- Service injected using Constructor Injection
- Parameter Properties - use it to add instance passed as parameter to component property

### Dependency Injection

- A provider tells an injector how to create the service.
- Provider Tokens

```
providers: [DataService] // <== Token

constructor(private dataService: DataService) // <== Token
```

- Provider Recipes

```
providers: [
  { provide: LoggerService, useClass: LoggerService }
  // ^ Token                ^ Recipe
]

// Same as
providers: [ LoggerService ]
// Since both are same
```

### Role of Injectors

- Deliver provided services when they're required via constructor injection
- Maintain a single instance of each service provided
- Determine what to inject based on emitted metadata
- Delegate injection to the parent injector if necessary

### The importance of Metadata

Provides information about parameters to injectors
Enabled with the "emitDecoratorMetadata" compiler option set to true

- Any decorator is sufficient for emitting metadata
- Hence we use only @Component decorator and @Injectable is not required for components

## Built-In Services

### Title

```
class Title {
  getTitle(): string
  setTitle(newTitle: string)
}
```

### Version

```
class Version {
  constructor(full: string)
  major: string
  minor: string
  patch: string
  full: string
}
```

## Unsubscribe using takeUntil

```
@Component({
  ...
})
export class MyComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private myService: MyService) {
    myService.some$.pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

## Lint for subscription

```
npm install @angular-extensions/lint-rules --save-dev

// tslint.json
{
  "extends": [
    "tslint:recommended",
    "@angular-extensions/lint-rules"
  ]
}
```

## Third-Party Service

```
toastr.service.ts

import { InjectionToken } from '@angular/core';

export let TOASTR_TOKEN = new InjectionToken<Toastr>('toastr');

export interface Toastr {
    success: (msg: string, title?: string): void;
    info: (msg: string, title?: string): void;
    warning: (msg: string, title?: string): void;
    error: (msg: string, title?: string): void;
}


my.module.ts

import { TOASTR_TOKEN, Toastr } from 'toastr.service.ts';

let toastr: Toastr = window['toastr'];


{ provide: TOASTR_TOKEN, useValue: toastr }


my.component.ts

import { Inject } from '@angular/core';
import { TOASTR_TOKEN, Toastr } from 'toastr.service.ts';

constructor(
  @Inject(TOASTR_TOKEN) private toastr: Toastr
)
```

# Adding jQuery

```
jQuery.service.ts

import { InjectionToken } from '@angular/core';

export let JQUERY_TOKEN = new InjectionToken<Object>('jQuery');


import { JQUERY_TOKEN } from 'jQuery.service.ts';

let jQuery = window['$'];

{ provide: JQUERY_TOKEN, useValue: jQuery }

```
