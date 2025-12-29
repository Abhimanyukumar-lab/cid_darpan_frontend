import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { User } from 'src/app/models/user';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.component.scss'],
})
export class AuthContainerComponent implements OnInit, OnDestroy {
  subscription: any;
  constructor(
    private authStore: Store<{ auth: User }>,
    private router: Router
  ) {
    this.subscription = this.authStore
      .pipe(select('auth'))
      .subscribe((data) => {
        if (data) {
          if (data.isAuthenticated) {
            if (
              data.user.tokenValidity &&
              moment(data.user.tokenValidity).isAfter(new Date())
            )
              this.router.navigate(['official/dashboard']);
          }
        }
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}
}
