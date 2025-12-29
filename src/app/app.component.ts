import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';

import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import Swal from 'sweetalert2';
import { User } from './models/user';
import { select, Store } from '@ngrx/store';
import { AuthLogout } from './storage/actions/auth.actions';
import { ConnectionService } from 'ng-connection-service';
import { TranslateService } from '@ngx-translate/core';
import { AppConstants } from './storage/localdata/AppConstants';

import { locale as enLang } from './i18n/en';
import { locale as hiLang } from './i18n/hi';
import { Resource } from './models/Resource';
import { AuthResourceLogout } from './storage/actions/auth-resource.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  subscriptionRoute: any;

  title = 'PSM';
  isLoading: boolean = false;
  particles = Array(12).fill(0); 

  subscriptions: any[] = [];

  currentPath: String;

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  status = 'ONLINE';
  isConnected = true;

  isIframe: boolean = false;
  domain: string = AppConstants.domain;

  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    private location: Location,
    private router: Router,
    private store: Store<{ auth: User }>,
    private resourceStore: Store<{ resouce: Resource }>,
    private appStore: Store<{ app: any }>,
    private connectionService: ConnectionService,
    private translate: TranslateService
  ) {
    if (window.location !== window.parent.location) {
      // The page is in an iframe
      this.isIframe = true;
      // localStorage.clear();
    } else {
      // The page is not in an iframe
      this.isIframe = false;
    }

    if (!this.isIframe) {
      this.translate.setTranslation(enLang.lang, enLang.data, true);
      this.translate.setTranslation(hiLang.lang, hiLang.data, true);

      translate.addLangs(['en', 'hi']);
      translate.setDefaultLang('hi');
    }
  }

  ngAfterViewInit(): void {
    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|hi/) ? browserLang : 'en');
    if (!this.isIframe) {
      this.connectionService.monitor().subscribe((isConnected) => {
        this.isConnected = isConnected;
        if (this.isConnected) {
          this.status = 'ONLINE';
        } else {
          this.status = 'OFFLINE';
        }
      });
      var subscription = this.appStore.pipe(select('app')).subscribe((data) => {
        this.translate.use(data.defaultLang);
        this.isLoading = data.isLoading;
      });

      this.subscriptions.push(subscription);

      if (this.isLoading) {
        this.reset();
      } else {
        // sets an idle timeout of 5 seconds, for testing purposes.
        this.idle.setIdle(600);

        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        this.idle.setTimeout(60);

        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        this.idle.onIdleEnd.subscribe(() => {
          this.idleState = 'No longer idle.';
        });

        this.idle.onTimeout.subscribe(() => {
          this.idleState = 'Timed out!';
          this.timedOut = true;
          Swal.close();
          this.store.dispatch(new AuthLogout({}));
          this.resourceStore.dispatch(new AuthResourceLogout({}));
          this.router.navigate([AppConstants.LOGIN_PATH]);
        });

        this.idle.onIdleStart.subscribe(() => {
          this.idleState = "You've gone idle!";
          this.alertConfirmation();
        });

        this.idle.onTimeoutWarning.subscribe((countdown) => {
          this.idleState = 'You will time out in ' + countdown + ' seconds!';
          Swal.getTitle().textContent = this.idleState;
        });

        // Sets the ping interval to 15 seconds
        this.keepalive.interval(15);

        this.keepalive.onPing.subscribe(() => {
          this.lastPing = new Date();
        });

        // Lets check the path everytime the route changes, stop or start the idle check as appropriate.
        this.subscriptionRoute = this.router.events.subscribe((val) => {
          this.currentPath = this.location.path();
          if (
            (this.currentPath.indexOf('/official/') > -1 ||
              this.currentPath.indexOf('/officialResource/') > -1) &&
            this.currentPath.indexOf('/login') == -1 &&
            this.currentPath.indexOf('/forgot-password') == -1 &&
            this.currentPath.indexOf('/verify-user') == -1
          )
            this.idle.watch();
          else this.idle.stop();

          var multisegmentpopupeditor = document.getElementsByClassName(
            'inputapi-multisegmentpopupeditor'
          );
          if (multisegmentpopupeditor.length > 0)
            for (var i = 0; i < multisegmentpopupeditor.length; i++) {
              multisegmentpopupeditor.item(i).remove();
            }

          var popupeditor = document.getElementsByClassName(
            'inputapi-popupeditor'
          );
          if (popupeditor.length > 0)
            for (var i = 0; i < popupeditor.length; i++) {
              popupeditor.item(i).remove();
            }
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });

    this.subscriptionRoute.unsubscribe();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  alertConfirmation() {
    Swal.fire({
      title: "You've gone idle!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'I am back',
      cancelButtonText: 'Log Out',
    }).then((result) => {
      if (result.value) {
        this.reset();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        if (this.currentPath.indexOf('/official/') > -1) {
          this.store.dispatch(new AuthLogout({}));
          this.router.navigate([AppConstants.LOGIN_PATH]);
        } else if (this.currentPath.indexOf('/officialResource/') > -1) {
          this.resourceStore.dispatch(new AuthResourceLogout({}));
          this.router.navigate([AppConstants.RESOURCE_LOGIN_PATH]);
        }
      }
    });
  }
}
