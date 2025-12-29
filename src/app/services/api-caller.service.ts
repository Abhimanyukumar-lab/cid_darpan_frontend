import { Injectable } from '@angular/core';
import { timeout as res } from 'rxjs/operators';


import {
  HttpClient,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';
import { ToasterService } from './toaster.service';

import { Auth } from '../models/Auth.model';
import { select, Store } from '@ngrx/store';
import { AppLoadderHide, AppLoadderShow } from '../storage/actions/app.actions';
import { AppConstants } from '../storage/localdata/AppConstants';
import { GlobalFunctionsService } from './global-functions.service';
import { Location } from '@angular/common';
import { Resource } from '../models/Resource';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ApiCallerService implements HttpInterceptor {
  apiPost(path: string, arg1: {}) {
    throw new Error('Method not implemented.');
  }
  private count: number = 0;
  httpOptions = {};
  options = {};
  language: string;
  userId: string;
  token: string;

  resourceId: string;
  resourceToken: string;

  header: any;

  baseURL: string;

  constructor(
    private http: HttpClient,
    private toaster: ToasterService,
    private appStore: Store<{ app: any }>,
    private authStore: Store<{ auth: User }>,
    private authResourceStore: Store<{ resouce: Resource }>,
    private loc: Location
  ) {
    this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    this.authStore.pipe(select('auth')).subscribe((data) => {
      if (data.isAuthenticated) {
        this.userId = data.user.id + '';
        this.token = data.user.token;
      }
    });

    this.authResourceStore.pipe(select('resouce')).subscribe((data) => {
      if (data.isResourceAuthenticated) {
        this.resourceId = data.resource.id + '';
        this.resourceToken = data.resource.token;
      }
    });

    this.baseURL = this.getSiteBaseUrl() || AppConstants.backServer;
  }

  getSiteBaseUrl = (): string => {
    const angularRoute = this.loc.path();
    const url = window.location.href;
    const domainAndApp = url.replace(angularRoute, '');

    if (domainAndApp.indexOf('localhost') > -1) {
      return 'http://localhost:8081/api/';
    }

    return domainAndApp + '/api/';
  };

  apiGetCall = (
    URL: string,
    isAuthenticated: boolean,
    isLoading: boolean = true
  ) => {
    if (isLoading) this.count++;

    if (this.count >= 1) this.appStore.dispatch(new AppLoadderShow({}));

    if (this.userId && this.resourceId)
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          XUUID: this.token,
          userId: this.userId,
          XUUIDR: this.resourceToken,
          resourceId: this.resourceId,
          language: this.language,
        }),
      };
    else if (this.userId)
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          XUUID: this.token,
          userId: this.userId,
          language: this.language,
        }),
      };
    else
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          XUUIDR: this.resourceToken,
          resourceId: this.resourceId,
          language: this.language,
        }),
      };

    return this.http
      .get(this.baseURL + URL, isAuthenticated ? this.httpOptions : {})
      .pipe(
        take(1),
        map((event: any) => {
          if (isLoading) this.count--;
          if (this.count == 0) this.appStore.dispatch(new AppLoadderHide({}));
          if (event.status) {
            return event;
          } else {
            this.toaster.getToastMessage(
              event.msg || event.message,
              'error',
              3000,
              'bottom-end'
            );
            return null;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          if (isLoading) this.count--;
          if (this.count == 0) this.appStore.dispatch(new AppLoadderHide({}));

          //var message = this.cryptoservice.get(error.error.data).message; message ||
          this.toaster.getToastMessage(
            error.error.message || error.statusText,
            'error',
            3000,
            'bottom-end'
          );
          return throwError(error.error);
        })
      );
  };

  apiPostCall = (
    URL: string,
    data: any,
    isAuthenticated: boolean,
    isLoading: boolean = true,
    isToaster: boolean = true
  ) => {
    if (isLoading) this.count++;

    if (this.count >= 1) this.appStore.dispatch(new AppLoadderShow({}));

    if (this.userId && this.resourceId)
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          XUUID: this.token,
          userId: this.userId,
          XUUIDR: this.resourceToken,
          resourceId: this.resourceId,
          language: this.language,
        }),
        responseType: 'blob' as 'json',
      };
    else if (this.userId)
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          XUUID: this.token,
          userId: this.userId,
          language: this.language,
        }),
      };
    else
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          XUUIDR: this.resourceToken,
          resourceId: this.resourceId,
          language: this.language,
        }),
      };

    data['language'] = this.language;

    return this.http
      .post(this.baseURL + URL, data, isAuthenticated ? this.httpOptions : {})
      .pipe(
        take(1),
        map((event: any) => {
          if (isLoading) this.count--;
          if (this.count == 0) this.appStore.dispatch(new AppLoadderHide({}));

          if (event.status) {
            // this.toaster.getToastMessage(
            //   event.msg || event.message,
            //   'success',
            //   3000,
            //   'bottom-end'
            // );

            return event;
          } else {
            if (isToaster)
              this.toaster.getToastMessage(
                event.msg || event.message,
                'error',
                3000,
                'bottom-end'
              );
            return null;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          if (isLoading) this.count--;
          if (this.count == 0) this.appStore.dispatch(new AppLoadderHide({}));

          // var message = this.cryptoservice.get(error.error.data).message;message ||

          if (isToaster)
            this.toaster.getToastMessage(
              error.error
                ? error.error.message
                : error.message || error.statusText,
              'error',
              3000,
              'bottom-end'
            );
          return throwError(error.error);
        })
      );
  };

  makeAuthCall = (URL: string, data: Auth): Observable<any> => {
    this.count++;

    if (this.count >= 1) this.appStore.dispatch(new AppLoadderShow({}));

    var header = {
      headers: new HttpHeaders()
        .set('X-AUTH', 'Basic ' + btoa(data.email + ':' + data.password))
        .set('X-Real-IP', '127.0.0.1'),
    };

    return this.http.get(this.baseURL + URL, header).pipe(
      take(1),
      map((event: any) => {
        this.count--;
        if (this.count == 0) this.appStore.dispatch(new AppLoadderHide({}));

        if (event.status) {
          // this.toaster.getToastMessage(
          //   event.msg || event.message,
          //   'success',
          //   3000,
          //   'bottom-end'
          // );
          return event;
        } else {
          this.toaster.getToastMessage(
            event.msg || event.message,
            'error',
            3000,
            'bottom-end'
          );
          return null;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.count--;
        if (this.count == 0) this.appStore.dispatch(new AppLoadderHide({}));

        // var message = this.cryptoservice.get(error.error.data).message;message ||

        this.toaster.getToastMessage(
          error.error.message || error.statusText,
          'error',
          3000,
          'bottom-end'
        );
        return throwError(error.error);
      })
    );
  };

  apiPostFileUpload = (
    data: File,
    isAuthenticated: boolean,
    isLoading: boolean = true
  ) => {
    var URL = AppConstants.UPLOAD_FILE_URL;

    if (isLoading) this.count++;

    if (this.count >= 1) this.appStore.dispatch(new AppLoadderShow({}));

    if (this.userId && this.resourceId)
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          XUUID: this.token,
          userId: this.userId,
          XUUIDR: this.resourceToken,
          resourceId: this.resourceId,
          language: this.language,
        }),
      };
    else if (this.userId)
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          XUUID: this.token,
          userId: this.userId,
          language: this.language,
        }),
      };
    else
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          XUUIDR: this.resourceToken,
          resourceId: this.resourceId,
          language: this.language,
        }),
      };

    const formData: FormData = new FormData();
    formData.append('upload', data, data.name);

    return this.http
      .post(this.baseURL + URL, data, isAuthenticated ? this.httpOptions : {})
      .pipe(
        take(1),
        map((event: any) => {
          if (isLoading) this.count--;
          if (this.count == 0) this.appStore.dispatch(new AppLoadderHide({}));

          if (event.status) {
            // this.toaster.getToastMessage(
            //   event.msg || event.message,
            //   'success',
            //   3000,
            //   'bottom-end'
            // );

            return event;
          } else {
            this.toaster.getToastMessage(
              event.msg || event.message,
              'error',
              3000,
              'bottom-end'
            );
            return null;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          if (isLoading) this.count--;
          if (this.count == 0) this.appStore.dispatch(new AppLoadderHide({}));

          // var message = this.cryptoservice.get(error.error.data).message;message ||

          this.toaster.getToastMessage(
            error.error.message || error.statusText,
            'error',
            3000,
            'bottom-end'
          );
          return throwError(error.error);
        })
      );
  };

  apiFormDataPostCall = (
    URL: string,
    data: any,
    isAuthenticated: boolean,
    isLoading: boolean = true
  ) => {
    if (isLoading) this.count++;

    if (this.count >= 1) this.appStore.dispatch(new AppLoadderShow({}));

    if (this.userId && this.resourceId)
      this.httpOptions = {
        headers: new HttpHeaders({
          XUUID: this.token,
          userId: this.userId,
          XUUIDR: this.resourceToken,
          resourceId: this.resourceId,
          language: this.language,
        }).set('X-Real-IP', '127.0.0.1'),
      };
    else if (this.userId)
      this.httpOptions = {
        headers: new HttpHeaders({
          XUUID: this.token,
          userId: this.userId,
          language: this.language,
        }).set('X-Real-IP', '127.0.0.1'),
      };
    else
      this.httpOptions = {
        headers: new HttpHeaders({
          XUUIDR: this.resourceToken,
          resourceId: this.resourceId,
          language: this.language,
        }).set('X-Real-IP', '127.0.0.1'),
      };

    data.append('language', this.language);

    return this.http
      .post(this.baseURL + URL, data, isAuthenticated ? this.httpOptions : {})
      .pipe(
        take(1),
        map((event: any) => {
          if (isLoading) this.count--;
          if (this.count == 0) this.appStore.dispatch(new AppLoadderHide({}));

          if (event.status) {
            // this.toaster.getToastMessage(
            //   event.msg || event.message,
            //   'success',
            //   3000,
            //   'bottom-end'
            // );

            return event;
          } else {
            this.toaster.getToastMessage(
              event.msg || event.message,
              'error',
              3000,
              'bottom-end'
            );
            return null;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          if (isLoading) this.count--;
          if (this.count == 0) this.appStore.dispatch(new AppLoadderHide({}));

          // var message = this.cryptoservice.get(error.error.data).message;message ||

          this.toaster.getToastMessage(
            error.error.message || error.statusText,
            'error',
            3000,
            'bottom-end'
          );
          return throwError(error.error);
        })
      );
  };

  externalApiGetCall = (URL: string) => {
    this.count++;

    if (this.count >= 1) this.appStore.dispatch(new AppLoadderShow({}));

    if (this.userId && this.resourceId)
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          XUUID: this.token,
          userId: this.userId,
          XUUIDR: this.resourceToken,
          resourceId: this.resourceId,
          language: this.language,
        }),
      };
    else if (this.userId)
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          XUUID: this.token,
          userId: this.userId,
          language: this.language,
        }),
      };
    else
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          XUUIDR: this.resourceToken,
          resourceId: this.resourceId,
          language: this.language,
        }),
      };

    return this.http.get(URL).pipe(
      take(1),
      map((event: any) => {
        this.count--;
        if (this.count == 0) this.appStore.dispatch(new AppLoadderHide({}));
        if (event.status) {
          // this.toaster.getToastMessage(
          //   event.msg || event.message,
          //   'success',
          //   3000,
          //   'bottom-end'
          // );
          return event;
        } else {
          this.toaster.getToastMessage(
            event.msg || event.message,
            'error',
            3000,
            'bottom-end'
          );
          return null;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.count--;
        if (this.count == 0) this.appStore.dispatch(new AppLoadderHide({}));

        // var message = this.cryptoservice.get(error.error.data).message;message ||

        this.toaster.getToastMessage(
          error.error.message,
          'error',
          3000,
          'bottom-end'
        );
        return throwError(error.error);
      })
    );
  };

  apiPostCallDownloadFile = (
    URL: string,
    isAuthenticated: boolean,
    isLoading: boolean = true,
    isToaster: boolean = true
  ): Observable<Blob> => {
    // if (isLoading) this.count++;

    // if (this.count >= 1) this.appStore.dispatch(new AppLoadderShow({}));

    if (this.userId && this.resourceId)
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          XUUID: this.token,
          userId: this.userId,
          XUUIDR: this.resourceToken,
          resourceId: this.resourceId,
          language: this.language,
        }),
        responseType: 'blob',
      };
    else if (this.userId)
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          XUUID: this.token,
          userId: this.userId,
          language: this.language,
        }),
        responseType: 'blob',
      };
    else
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          XUUIDR: this.resourceToken,
          resourceId: this.resourceId,
          language: this.language,
        }),
        responseType: 'blob',
      };

    var url = this.baseURL + URL;

    return this.http.get<Blob>(url, isAuthenticated ? this.httpOptions : {});
  };

  // apiDataPostCallDownloadFile = (
  //   URL: string,
  //   data: any,
  //   isAuthenticated: boolean,
  //   isLoading: boolean = true,
  //   isToaster: boolean = true
  // ): Observable<Blob> => {
  //   // if (isLoading) this.count++;

  //   // if (this.count >= 1) this.appStore.dispatch(new AppLoadderShow({}));

  //   if (this.userId && this.resourceId)
  //     this.httpOptions = {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         XUUID: this.token,
  //         userId: this.userId,
  //         XUUIDR: this.resourceToken,
  //         resourceId: this.resourceId,
  //         language: this.language,
  //       }),
  //       responseType: 'blob',
  //     };
  //   else if (this.userId)
  //     this.httpOptions = {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         XUUID: this.token,
  //         userId: this.userId,
  //         language: this.language,
  //       }),
  //       responseType: 'blob',
  //     };
  //   else
  //     this.httpOptions = {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         XUUIDR: this.resourceToken,
  //         resourceId: this.resourceId,
  //         language: this.language,
  //       }),
  //       responseType: 'blob',
  //     };

  //   var url = this.baseURL + URL;

  //   return this.http.post<Blob>(
  //     url,
  //     data,
  //     isAuthenticated ? this.httpOptions : {}
  //   );
  // };


  apiDataPostCallDownloadFile = (
    URL: string,
    data: any,
    isAuthenticated: boolean,
    isLoading: boolean = true,
    isToaster: boolean = true
  ): Observable<Blob> => {
    if (isLoading) this.count++;
    if (this.count >= 1) this.appStore.dispatch(new AppLoadderShow({}));

    let headers: HttpHeaders;

    if (this.userId && this.resourceId) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'XUUID': this.token,
        'userId': this.userId,
        'XUUIDR': this.resourceToken,
        'resourceId': this.resourceId,
        'language': this.language,
      });
    } else if (this.userId) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'XUUID': this.token,
        'userId': this.userId,
        'language': this.language,
      });
    } else {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'XUUIDR': this.resourceToken,
        'resourceId': this.resourceId,
        'language': this.language,
      });
    }

    const url = this.baseURL + URL;

    return this.http.post(url, data, {
      headers: headers,
      responseType: 'blob',
      observe: 'response'
    }).pipe(
      res(65000),
      take(1),
      map((response: HttpResponse<Blob>) => {
        if (isLoading) this.count--;
        if (this.count == 0) this.appStore.dispatch(new AppLoadderHide({}));
        if (response.status >= 200 && response.status < 300) {
          return response.body;
        } else {
          throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (isLoading) this.count--;
        if (this.count == 0) this.appStore.dispatch(new AppLoadderHide({}));

        console.error('Download error:', error);

        if (isToaster) {
          this.toaster.getToastMessage(
            error.error?.message || error.message || 'Download failed',
            'error',
            3000,
            'bottom-end'
          );
        }

        return throwError(error);
      })
    );
  };
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}
