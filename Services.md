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
