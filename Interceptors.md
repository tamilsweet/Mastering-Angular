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

```
@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(private cacheService: HttpCacheService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`Cache Interceptor - ${req.url}`);

    // pass along non-cacheable requests and invalidate cache
    if (req.method !== 'GET') {
      console.log(`Invalidate Cache: ${req.method} ${req.url}`);
      this.cacheService.invalidateCache();
      return next.handle(req);
    }

    // attempt to retrieve a cache response
    const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);

    // return cached response
    if (cachedResponse) {
      console.log(`Returning a cached response: ${req.url}`);
      return of(cachedResponse);
    }

    // send request to server and add response to cache
    return next.handle(req)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            console.log(`Adding item to the cache: ${req.url}`);
            this.cacheService.put(req.url, event);
          }
        })
      );
  }
}
```
