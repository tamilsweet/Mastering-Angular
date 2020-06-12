# Testing

- End to End Testing
- Integration or Functional Testing
- Unit Testing

## Unit Testing

### Types of Mocking

- Dummies
- Stubs - Controllable behavior
- Spies - Keep track of which methods called, what parameters sent
- True Mocks - Specific

### Types of Unit Tests in Angular

- Isolated
- Integration
  - Shallow
  - Deep

### AAA Pattern

- _Arrange_ all necessary preconditions and inputs
- _Act_ on the object or class under test
- _Assert_ that the expected results have occured

### DAMP vs DRY

- DRY (don't repeat yourself) - Remove duplication
- DAMP - Repeat yourself if necessary

## Tell the Story

- A test should be complete story, all within the it()
- You shouldn't need to look around much to understand the test

### Techniques

- Move less interesting setup into beforeEach()
- Keep the critical setup within the it()
- Include Arrange, Act, and Arrange inside the it()

## Karma & Jasmine

- _Karma_ - Test Runner for JavaScript
- _Jasmine_ - Behavior-driven development framework for testing JavaScript code

### Mocking Service

```
describe('HeroesComponent', () => {
  ...
  let mockHeroService;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    component = new HeroesComponent(mockHeroService);
  });

  describe('delete', () {
    it('should remove the selected hero from the heroes list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      ...
    });
  });
}
```

## NO_ERRORS_SCHEMA

- Ignore unknown attributes and elements
- Can hide other issues, use with caution

```
TestBed.configureTestingModule({
  schemas: [NO_ERRORS_SCHEMA]
})
```

## NativeElement vs DebugElement

- NativeElement - actual DOM object - exposes DOM API
  `fixture.nativeElement.querySelector('a').textContent`

- DebugElement - wrapper around NativeElement - different set of functionality
  `fixture.debugElement.query(By.css('a')).nativeElement.textContent`

- Component is subclass of directive, specialized kind of directive !!??

### Mocking RouterLink

```

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

```

## TIPS

- Use .toContain('text') to avoid fragile unit tests
- Principles of Testing
  - Don't test the framework
  - Test your code
