import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Permissions } from 'src/app/models/Permissions';
import { DistrictDetail } from 'src/app/models/districtDetails';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-district-details',
  templateUrl: './district-details.component.html',
  styleUrls: ['./district-details.component.scss'],
})
export class DistrictDetailsComponent implements OnInit, OnDestroy {
  subscription: any;
  permissions: Permissions = new Permissions();
  baseUrl: string = AppConstants.backServer;

  path: string = AppConstants.DISTRICT_DETAILS_MODULE.FETCH_URL;
  language: string;
  preLanguage: string;
  firstTimeLang: BehaviorSubject<string>;
  details: DistrictDetail;
  isFirst = true;

  constructor(
    private appStore: Store<{ app: any }>,
    private global: GlobalFunctionsService,
    private apiService: ApiCallerService,
    private localStorage: LocalstorageService,
    private router: Router
  ) {
    this.baseUrl = global.getSiteBackUrl() || AppConstants.backServer;

    this.firstTimeLang = new BehaviorSubject<string>('');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
      if (this.language != this.preLanguage)
        this.firstTimeLang.next(this.language);
        
    });

    this.firstTimeLang.subscribe((newSelectedUser) => {
      this.fetchData();
    });

    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.DISTRICT_DETAILS_MODULE.ADD_BUTTON
    );

    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.DISTRICT_DETAILS_MODULE.EDIT_BUTTON
    );

    this.permissions.add_url = AppConstants.DISTRICT_DETAILS_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.DISTRICT_DETAILS_MODULE.EDIT_URL;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}

  goToEdit = () => {
    this.localStorage.setStoredValue('editData', this.details);
    this.router.navigate([this.permissions.edit_url]);
  };

  fetchData = () => {
    this.preLanguage = this.language;
    this.apiService
      .apiPostCall(this.path, { language: this.language }, true)
      .subscribe(
        (data) => {
          this.details = data.districtDetailsDTOs;
        },
        (error) => {
          this.details = null;
        }
      );
  };
}
