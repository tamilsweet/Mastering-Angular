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
