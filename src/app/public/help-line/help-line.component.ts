import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-help-line',
  templateUrl: './help-line.component.html',
  styleUrls: ['./help-line.component.scss'],
})
export class HelpLineComponent implements OnInit, OnDestroy {
  subscription: any;
  baseUrl: string = AppConstants.backServer;
  helplineList: any[] = [];
  otherHelplineList: any[] = [];

  tempHelplineList: any[] = [];
  tempOtherHelplineList: any[] = [];

  isAll: boolean = true;
  isOfficer: boolean = false;
  isOther: boolean = false;

  currrentLang: string;
  searchText: string;

  constructor(
    private apiCaller: ApiCallerService,
    private appStore: Store<{ app: any }>,
    private global: GlobalFunctionsService
  ) {
    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.currrentLang = data.defaultLang;
    });

    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;
    this.apiCaller
      .apiGetCall(AppConstants.PUBLIC_APIS.GETHELPLINE, false)
      .subscribe((data) => {
        this.helplineList = data.helplineDTOs.filter((helpLine) => {
          return helpLine.type == 'OFFICER';
        });

        this.otherHelplineList = data.helplineDTOs.filter((helpLine) => {
          return helpLine.type == 'OTHER';
        });

        this.tempHelplineList = this.helplineList;
        this.tempOtherHelplineList = this.otherHelplineList;
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}

  doOfficerOnly = () => {
    this.isAll = false;
    this.isOfficer = true;
    this.isOther = false;
  };

  doOtherOnly = () => {
    this.isAll = false;
    this.isOfficer = false;
    this.isOther = true;
  };

  doAll = () => {
    this.isAll = true;
    this.isOfficer = false;
    this.isOther = false;
  };

  doSearch = () => {
    if (this.searchText.length > 0) {
      this.helplineList = Object.assign([], this.helplineList).filter(
        (item) =>
          (item.designation &&
            item.designation
              .toLowerCase()
              .indexOf(this.searchText.toLowerCase()) > -1) ||
          item.no.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1 ||
          item.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
      );

      this.otherHelplineList = Object.assign([], this.otherHelplineList).filter(
        (item) =>
          (item.designation &&
            item.designation
              .toLowerCase()
              .indexOf(this.searchText.toLowerCase()) > -1) ||
          item.no.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1 ||
          item.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
      );
    } else {
      this.helplineList = this.tempHelplineList;
      this.otherHelplineList = this.tempOtherHelplineList;
    }
  };
}
