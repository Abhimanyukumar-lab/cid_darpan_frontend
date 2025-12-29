import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { LangModule } from 'src/app/models/LangModule';
import { User } from 'src/app/models/user';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { TranslateService } from 'src/app/services/translate.service';
import {
  AppChangeLanguage,
  AppSidebarHide,
  AppSidebarShow,
  RefreshTableAndForm,
} from 'src/app/storage/actions/app.actions';
import { AuthLogout } from 'src/app/storage/actions/auth.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: any;
  subscriptionAuth: any;
  selectedLang: string;
  defaultLang: string;
  userName: string;
  email: string;
  roleName: string;
  isSidebar: boolean;
  userImage: string;

  user: any;

  constructor(
    private authStore: Store<{ auth: User }>,
    private appStore: Store<{ app: any }>,
    private router: Router,
    private langModule: LangModule,
    private translateService: TranslateService,
    private localStorage: LocalstorageService
  ) {
    this.subscriptionAuth = this.authStore
      .pipe(select('auth'))
      .subscribe((data) => {
        if (data.isAuthenticated) {
          this.userName = data.user.firstName + ' ' + data.user.lastName;
          this.email = data.user.email;
          this.roleName = data.user.roleName;
          this.userImage = data.user.userImage;
          this.user = data.user;
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
    this.subscriptionAuth.unsubscribe();
    this.subscription.unsubscribe();
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
    this.authStore.dispatch(new AuthLogout({}));
    this.router.navigate([AppConstants.LOGIN_PATH]);
  };

  changeLanguage = () => {
    if (this.defaultLang == 'en') {
      this.defaultLang = 'hi';
    } else {
      this.defaultLang = 'en';
    }

    this.appStore.dispatch(new AppChangeLanguage(this.defaultLang));
    this.appStore.dispatch(new RefreshTableAndForm({}));
  };

  doUpdateProfile = () => {
    this.localStorage.setStoredValue('editData', this.user);
    this.router.navigate(['/official/user/updateProfile']);
     };
  doViewProfile = () => {
    this.localStorage.setStoredValue('viewData', this.user);
    this.router.navigate(['/official/user/viewProfile']);
     };
}
