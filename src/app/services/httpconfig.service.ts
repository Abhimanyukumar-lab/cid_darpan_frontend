import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EncrDecrService } from './EncrDecrService';

@Injectable({
  providedIn: 'root',
})
export class HttpconfigService implements HttpInterceptor {
  constructor(private cryptoservice: EncrDecrService, private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // let encrypt = this.cryptoservice.set(req.body);

    // let cloned: any = {};

    // let obj = {
    //   data: encrypt,
    // };
    // cloned = req.clone({
    //   body: obj,
    // });

    // return next.handle(cloned).pipe(
    //   map((event: HttpEvent<any>) => {
    //     if (event instanceof HttpResponse) {
    //       if (event.headers.has('Content-Type')) {
    //         var ContentType = event.headers.get('Content-Type');
    //         if (
    //           ContentType == 'image/svg+xml; charset=UTF-8' ||
    //           ContentType == 'image/svg+xml' ||
    //           ContentType == 'application/octet-stream'
    //         )
    //           return event.clone();
    //       }

    //       return event.clone({
    //         body: this.cryptoservice.get(event.body.data),
    //       });
    //     }
    //   }),
    //   catchError((error: HttpErrorResponse) => {
    //     return throwError(error);
    //   })
    // );

    return next.handle(req);
  }
}
