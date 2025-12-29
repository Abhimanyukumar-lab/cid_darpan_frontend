import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Resource } from 'src/app/models/Resource';
import { ApiCallerService } from 'src/app/services/api-caller.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  subscription: any;
  subscriptionAuth: any;
  MENU: any[] = [];

  currrentLang: string;

  currentRoute: any;
  isCurrentMenu: any = {};
  isCurrentSubMenu: any = {};
  isCurrentURL: any;

  constructor(
    private router: Router,
    private authResourceStore: Store<{ resouce: Resource }>,
    private appStore: Store<{ app: any }>,
    private apiService: ApiCallerService
  ) {
    this.subscriptionAuth = this.authResourceStore.pipe(select('resouce')).subscribe((data) => {
      if (data) {
        if (data.resource) {
          this.MENU = JSON.parse(JSON.stringify(data.resource.sidebarMenu));

          this.apiService
            .apiGetCall('getRourceSideBarMenu', true)
            .subscribe((data) => {
              this.MENU = data.sidebarMenu;
            });

          this.router.events.subscribe((val) => {
            this.currentRoute = val as NavigationEnd;

            if (this.currentRoute.url) {
              this.isCurrentURL = this.currentRoute.url;
              this.showSubMenuOnRefresh();
            }
          });
        }
      }
    });

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.currrentLang = data.defaultLang;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionAuth.unsubscribe();
  }

  ngOnInit(): void {}

  showSubMenu = (menu) => {
    if (JSON.stringify(this.isCurrentMenu) == JSON.stringify(menu)) {
      this.MENU.forEach((menuItem) => {
        menuItem.isActive = false;
      });

      this.isCurrentMenu = {};
      this.isCurrentSubMenu = {};
      menu.isSelected = false;
      menu.isActive = false;
    } else {
      this.MENU.forEach((menuItem) => {
        menuItem.isActive = false;
      });

      this.isCurrentMenu = menu;
      menu.isActive = true;
    }
  };

  showSubMenuOnRefresh = () => {
    if (this.MENU) {
      this.MENU.forEach((menuItem) => {
        if (menuItem.subMenus) {
          menuItem.subMenus.forEach((menuChildItem) => {
            if (menuChildItem.submenus) {
              menuChildItem.submenus.forEach((submenuChildItem) => {
                if (this.isCurrentURL.indexOf(submenuChildItem.menuUrl) > -1) {
                  this.isCurrentMenu = menuItem;
                  this.isCurrentSubMenu = menuChildItem;
                  menuItem.isSelected = true;
                  menuItem.isActive = true;
                  menuChildItem.isSelected = true;
                  menuChildItem.isActive = true;
                }
              });
            } else {
              if (this.isCurrentURL.indexOf(menuChildItem.menuUrl) > -1) {
                this.isCurrentMenu = menuItem;
                menuItem.isSelected = true;
                menuItem.isActive = true;
              }
            }
          });
        } else {
          if (this.isCurrentURL.indexOf(menuItem.mainMenuUrl) > -1) {
            this.isCurrentMenu = menuItem;
            menuItem.isSelected = true;
            menuItem.isActive = true;
          }
        }
      });
    }
  };

  hideSubMenu = (menu) => {
    this.isCurrentMenu = menu;
    this.MENU.forEach((menuItem) => {
      menuItem.isActive = false;
      menuItem.isSelected = false;
    });
  };

  showSubSubMenu = (menu) => {
    if (JSON.stringify(this.isCurrentSubMenu) == JSON.stringify(menu)) {
      this.MENU.forEach((menuItem) => {
        menuItem.isActive = false;
      });

      this.isCurrentSubMenu = {};
      menu.isSelected = false;
      menu.isActive = false;
    } else {
      this.MENU.forEach((menuItem) => {
        menuItem.isActive = false;
      });

      this.isCurrentSubMenu = menu;
      menu.isActive = true;
    }
  };
  hideSubSubMenu = (menu) => {
    this.isCurrentSubMenu = menu;
    this.MENU.forEach((menuItem) => {
      if (menuItem.submenus) menuItem.isActive = false;
      menuItem.isSelected = false;
    });
  };
}
