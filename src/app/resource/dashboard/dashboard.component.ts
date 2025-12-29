import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Resource } from 'src/app/models/Resource';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { UpdateResourcePermissions } from 'src/app/storage/actions/auth-resource.action';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('slide', [
      state('true', style({ transform: 'translateX(0)' })),
      state(
        'false',
        style({ transform: 'translateX(-100%)', display: 'none' })
      ),
      transition('true => false', animate(200)),
      transition('false => true', [style({ display: 'block' }), animate(200)]),
    ]),
  ],
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscription: any;
  subscriptionAuth: any;
  isSidebar: boolean;

  constructor(
    private authStore: Store<{ resouce: Resource }>,
    private appStore: Store<{ app: any }>,
    private router: Router,
    private apiService: ApiCallerService
  ) {
    this.subscriptionAuth = this.authStore
      .pipe(select('resouce'))
      .subscribe((data) => {
        if (data) {
          if (data.isResourceAuthenticated) {
            if (
              data.resource.tokenValidity &&
              !moment(data.resource.tokenValidity).isAfter(new Date())
            )
              this.router.navigate([AppConstants.RESOURCE_LOGIN_PATH]);
          } else {
            this.router.navigate([AppConstants.RESOURCE_LOGIN_PATH]);
          }
        } else {
          this.router.navigate([AppConstants.RESOURCE_LOGIN_PATH]);
        }
      });

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.isSidebar = data.isSidebar;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionAuth.unsubscribe();
  }

  ngOnInit(): void {
    this.apiService
      .apiGetCall('getUserResourcePermissions', true, false)
      .subscribe((data) => {
        this.authStore.dispatch(new UpdateResourcePermissions(data.permisions));
      });
  }
}
