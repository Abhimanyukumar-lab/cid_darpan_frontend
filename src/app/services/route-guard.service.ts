import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppConstants } from '../storage/localdata/AppConstants';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService implements CanActivateChild {
  constructor(private titleService: Title) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    this.titleService.setTitle(
      AppConstants.titleDistrict +
        ' - ' +
        (route.data.title ? route.data.title : 'Dashboard')
    );
    return true;
  }
}
