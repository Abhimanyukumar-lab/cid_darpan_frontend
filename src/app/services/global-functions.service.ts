import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { User } from '../models/user';
import { ApiCallerService } from './api-caller.service';
import { AppConstants } from '../storage/localdata/AppConstants';
import { Location } from '@angular/common';
import { Resource } from '../models/Resource';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GlobalFunctionsService {
  constructor(
    private apiCaller: ApiCallerService,
    private router: Router,
    private authStore: Store<{ auth: User }>,
    private resorceStore: Store<{ resouce: Resource }>,
    private loc: Location
  ) {}

  isPresentInArray(data: String, array: any[]): Boolean {
    if (array.includes(data)) return true;
    else return false;
  }

  isControlHasError(
    form: UntypedFormGroup,
    controlName: string,
    validationType: string
  ): boolean {
    const control = form.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(form: UntypedFormGroup, controlName: string): boolean {
    const control = form.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  checkUserPermission = (body: any): boolean => {
    this.apiCaller.apiPostCall('checkPermission', body, true).subscribe(
      (data) => {
        if (data.status != 'OK') {
          this.router.navigate([AppConstants.PERMISSION_DENIAL_PATH]);
          return false;
        } else {
          return true;
        }
      },
      (error) => {
        this.router.navigate([AppConstants.PERMISSION_DENIAL_PATH]);
        return false;
      }
    );

    return false;
  };

  checkForUserPermission(routeName: string): boolean {
    var isPresent;

    this.authStore.pipe(take(1), select('auth')).subscribe((data) => {
      if (data) {
        if (data.isAuthenticated) {
          var body = {
            permissionCode: AppConstants.PAGE_URLS[routeName],
          };
          return this.checkUserPermission(body);
        } else {
          isPresent = false;
        }
      } else {
        isPresent = false;
      }
    });

    return isPresent;
  }

  checkForUserButtonPermission(permissionCode: string): boolean {
    var isPresent;
    this.authStore.pipe(take(1), select('auth')).subscribe(
      (data) => {
        if (data) {
          if (data.isAuthenticated) {
            isPresent = this.isPresentInArray(
              permissionCode,
              data.user.permissions
            );
          } else {
            isPresent = false;
          }
        } else {
          isPresent = false;
        }
      },
      (error) => {
        isPresent = false;
      }
    );

    return isPresent;
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

  getSiteBackUrl = (): string => {
    const angularRoute = this.loc.path();
    const url = window.location.href;
    const domainAndApp = url.replace(angularRoute, '');

    if (domainAndApp.indexOf('localhost') > -1) {
      return 'http://localhost:8081';
    }

    return domainAndApp;
  };

  checkUserResourcePermission = (body: any): boolean => {
    this.apiCaller.apiPostCall('checkResourcePermission', body, true).subscribe(
      (data) => {
        if (data.status != 'OK') {
          this.router.navigate([AppConstants.RESOURCE_PERMISSION_DENIAL_PATH]);
          return false;
        } else {
          return true;
        }
      },
      (error) => {
        this.router.navigate([AppConstants.RESOURCE_PERMISSION_DENIAL_PATH]);
        return false;
      }
    );

    return false;
  };

  checkForUserResourcePermission(routeName: string): boolean {
    var isPresent;

    this.resorceStore.pipe(take(1), select('resouce')).subscribe((data) => {
      if (data) {
        if (data.isResourceAuthenticated) {
          var body = {
            permissionCode: AppConstants.PAGE_URLS[routeName],
          };
          return this.checkUserResourcePermission(body);
        } else {
          isPresent = false;
        }
      } else {
        isPresent = false;
      }
    });

    return isPresent;
  }
}
