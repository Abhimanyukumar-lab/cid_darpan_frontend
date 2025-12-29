import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { LangModule } from 'src/app/models/LangModule';
import { Resource } from 'src/app/models/Resource';
import { TranslateService } from 'src/app/services/translate.service';
import {
  AppChangeLanguage,
  AppSidebarHide,
  AppSidebarShow,
} from 'src/app/storage/actions/app.actions';
import { AuthResourceLogout } from 'src/app/storage/actions/auth-resource.action';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscriptionAuth: any;
  subscription: any;
  selectedLang: string;
  defaultLang: string;
  userName: string;
  email: string;
  roleName: string;
  isSidebar: boolean;
  userImage: string;

  constructor(
    private authResourceStore: Store<{ resouce: Resource }>,
    private appStore: Store<{ app: any }>,
    private router: Router,
    private langModule: LangModule,
    private translateService: TranslateService
  ) {
    this.subscriptionAuth = this.authResourceStore
      .pipe(select('resouce'))
      .subscribe((data) => {
        if (data.isResourceAuthenticated) {
          this.userName = data.resource.name;
          this.email = data.resource.email;
          this.roleName = data.resource.roleName;
          this.userImage = data.resource.userImage;
        }
      });
    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.isSidebar = data.isSidebar;
      this.defaultLang = data.defaultLang;
      this.selectedLang = data.defaultLang;

      this.langModule.language = data.defaultLang;

      if (data.defaultLang == 'en') {
        this.translateService.disableTranslation();
      } else {
        this.translateService.onLoad();
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionAuth.unsubscribe();
  }

  ngOnInit(): void {}

  showHideSidebar = () => {
    if (this.isSidebar) {
      this.appStore.dispatch(new AppSidebarHide({}));
    } else {
      this.appStore.dispatch(new AppSidebarShow({}));
    }
  };

  doLogOut = () => {
    this.authResourceStore.dispatch(new AuthResourceLogout({}));
    this.router.navigate([AppConstants.RESOURCE_LOGIN_PATH]);
  };

  changeLanguage = () => {
    if (this.defaultLang == 'en') {
      this.defaultLang = 'hi';
    } else {
      this.defaultLang = 'en';
    }

    this.appStore.dispatch(new AppChangeLanguage(this.defaultLang));
  };

  goToupdateProfile = () => {
    this.authResourceStore.dispatch(new AuthResourceLogout({}));
    this.router.navigate([AppConstants.USER_MODULE.PROFILE_URL]);
  };
}
