# HTTP Interceptor

## Interceptor Template

```
@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = req.clone();
    // Make changes
    return next.handle(modifiedRequest)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            // make changes
          }
        })
      );
  }
}
```

## Providing an Interceptor

```
{ provide: HTTP_INTERCEPTORS, userClass: FirstInterceptor, multi: true }
```

## Cache HTTP Response with Interceptor

- Provide a data structure for the cached items
- Add items to the cache
- Retrieve items from the cache
- Remove items from the cache - cache invalidation
