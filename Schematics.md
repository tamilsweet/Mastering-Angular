# Schematics

- A schematic is a collection of executable tasks that can generate
  and/or modify code deterministically.

```
npm install -g @angular-devkit/schematics-cli
schematics blank --name=ribbon-service
npm run build
schematics .:my-component --name=test
```

## Abstract Syntax Tree

- An abstract syntax tree (AST) is a tree representation of the abstract
  syntactic structure of source code written in a programming language.

- Generate tree @ `https://astexplorer.net/`

## Build and Test

```
tsc -p tsconfig.json
npm link && cd sandbox && npm link \"ng-conf-schematic\"
cd sandbox && ng g ng-denver-schematic:add
cd sandbox && npm lint && npm test && npm build --prod
```

Ref: github.com/schuchard/schematic-starter
