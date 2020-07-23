# End to End Testing

## Using Cypress.io

```
npm install cypress --save-dev
npx cypress open // npm > v5.2

// or use our schematic install it globally
npm install -g @briebug/cypress-schematic

// add it to my project
ng g @briebug/cypress-schematic:add
```

### Fixtures

```
cy.server()
cy.route('GET', 'users/*', 'fixture:users.json');

cy.fixture('users.json').as('userJSON');
cy.route('GET', 'users/*', '@userJSON')

---

cy.wait(['@getActivities', '@getMessages']);
```
