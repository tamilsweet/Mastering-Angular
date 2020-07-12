import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogResponseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`LogResponse Interceptor - ${req.url}`);

    return next.handle(req)
      .pipe(
        tap(event => {
          console.log(event.type);
          if (event.type === HttpEventType.Response) {
            console.log(event)
          }
        })
      );
  }
}
