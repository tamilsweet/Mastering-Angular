# Tips & Gotchas

## Tips

- Use CLI
- Follow Angular style guide
- Do sorting & filtering in your component !?
- Learn & use Typescript features
- Use Lazyloading
- Don't touch the DOM directly
- Use immutable or observable data to maximize performance

## Pure & Impure pipes

- Pure: only evaluated when input changes
- Impure: evaluated on every change detection cycle

## RxJS

- Forget to subscribe
- Forget to unsubscribe
- Hot vs Cold observables
- Self-subcribe or not. Subcribe in service or in component ?

## RESTful CURD

Create

- POST - http://localhost/api/books
  - If successful, returns HTTP 201 Created

Read

- GET - http://localhost/api/books or http://localhost/api/books/5
  - If successful, return HTTP 200 OK

Update

- PUT - http://localhost/api/books/5
  - If successful, return HTTP 204 No Content

Delete

- DELETE - http://localhost/api/books/5
  - If successful, return HTTP 204 No Content
