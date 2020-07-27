# Angular Storybook

## Auto Installation

```
npx -p @storybook/cli sb init --type angular
```

## Manual Installation

- Add @storybook/angular

```
npm install @storybook/angular --save-dev
```

- Add @babel/core, and babel-loader

```
npm install babel-loader @babel/core --save-dev
```

- Add a npm script in package.json

```
{
  "scripts": {
    "storybook": "start-storybook"
  }
}
```

- Create .storybook/main.js

```
module.exports = {
  stories: ['../src/**/*.stories.[tj]s'],
};
```

- Storybook TypeScript configuration - .storybook/tsconfig.json

```
{
  "extends": "../tsconfig.json",
  "exclude": [
    "../src/test.ts",
    "../src/**/*.spec.ts",
    "../projects/**/*.spec.ts"
  ],
  "include": [
    "../src/**/*",
    "../projects/**/*"
  ]
}
```

- Write your stories
- Run stories

```
npm run storybook
```

## Component Story Format (CSF)

- In CSF, stories and component metadata are defined as ES Modules.
- Every component story file consists of a required default export and one or more named exports.

```
class AlertServiceStub implements AlertServiceInterface {
  public value$ = new BehaviorSubject(new Alert(2, 3, 4));
  getAlertCounts(): Observable<Alert> {
    return this.value$;
  }
}
const AlertServiceObj = new AlertServiceStub();

export default {
  title: 'Alert Component',
  decorators: [
    withA11y,
    withKnobs,
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        AppModule
      ],
      providers: [
        { provide: 'AlertServiceInterface', useValue: AlertServiceObj }
      ]
    })
  ]
};

const updateValues = () => {
  const info = Math.round(Math.random() * 1000);
  const debug = Math.round(Math.random() * 1000);
  const error = Math.round(Math.random() * 1000);
  return AlertServiceObj.value$.next(new Alert(info, debug, error));
};

export const AlertUsage = () => ({
  component: AlertComponent,
  prop: {
    button: button('Update', updateValues)
  }
});
```
