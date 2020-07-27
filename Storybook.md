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
