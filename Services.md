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
