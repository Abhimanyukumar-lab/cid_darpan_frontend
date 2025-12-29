import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { User } from 'src/app/models/user';
import * as moment from 'moment';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { UpdatePermissions } from 'src/app/storage/actions/auth.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { UpdateDistrictDetails } from 'src/app/storage/actions/app.actions';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
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
export class BaseComponent implements OnInit, OnDestroy {
  subscription: any;
  isSidebar: boolean;
  language: string;

  constructor(
    private authStore: Store<{ auth: User }>,
    private appStore: Store<{ app: any }>,
    private router: Router,
    private apiService: ApiCallerService
  ) {
    this.subscription = this.authStore
      .pipe(select('auth'))
      .subscribe((data) => {
        if (data) {
          if (data.isAuthenticated) {
            if (
              data.user.tokenValidity &&
              !moment(data.user.tokenValidity).isAfter(new Date())
            )
              this.router.navigate([AppConstants.LOGIN_PATH]);
          } else {
            this.router.navigate([AppConstants.LOGIN_PATH]);
          }
        } else {
          this.router.navigate([AppConstants.LOGIN_PATH]);
        }
      });

    this.appStore.pipe(select('app')).subscribe((data) => {
      this.isSidebar = data.isSidebar;
      this.language = data.defaultLang;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.apiService
      .apiGetCall('getUserPermissions', true, false)
      .subscribe((data) => {
        this.authStore.dispatch(new UpdatePermissions(data.permisions));
      });

    this.fetchDetails();
  }

  fetchDetails = () => {
    var body = {
      language: this.language,
    };
    this.apiService
      .apiPostCall(AppConstants.PUBLIC_APIS.DISTRICTDETAILS, body, false)
      .subscribe((data) => {
        this.appStore.dispatch(
          new UpdateDistrictDetails(data.districtDetailsDTOs)
        );
      });
  };
}
