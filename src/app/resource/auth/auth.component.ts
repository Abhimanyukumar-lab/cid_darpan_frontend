import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import moment from 'moment';
import { Resource } from 'src/app/models/Resource';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  AppLoadderHide,
  AppLoadderShow,
} from 'src/app/storage/actions/app.actions';
import { AuthResourceLogin } from 'src/app/storage/actions/auth-resource.action';

const LOGIN_PARAMS = {
  MOBILE: '',
  OTP: '',
};

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  subscription: any;
  // Public params
  loginForm: UntypedFormGroup;
  loading = false;
  isOtp: boolean = false;
  errors: any = [];
  passwordIcon: string = 'VISIBLE';

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private appStore: Store<{ app: any }>,
    private authResourceStore: Store<{ resouce: Resource }>,
    private toast: ToasterService,
    private apiService: ApiCallerService
  ) {
    this.subscription = this.authResourceStore
      .pipe(select('resouce'))
      .subscribe((data) => {
        if (data) {
          if (data.isResourceAuthenticated) {
            if (
              data.resource.tokenValidity &&
              moment(data.resource.tokenValidity).isAfter(new Date())
            )
              this.router.navigate(['officialResource/dashboard']);
          }
        }
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.appStore.dispatch(new AppLoadderHide({}));
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      mobile: [
        LOGIN_PARAMS.MOBILE,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(13),
        ]),
      ],
      otp: [LOGIN_PARAMS.OTP],
    });
  }

  submit() {
    this.appStore.dispatch(new AppLoadderShow({}));

    const controls = this.loginForm.controls;
    if (this.loginForm.invalid && !this.loginForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    this.apiService
      .apiPostCall('resourceLogin', this.loginForm.value, false)
      .subscribe(
        (data) => {
          if (data.resourceDTO) {
            this.authResourceStore.dispatch(
              new AuthResourceLogin(data.resourceDTO)
            );
            this.toast.getToastMessage(
              data.message,
              'success',
              3000,
              'bottom-end'
            );
            this.router.navigate(['officialResource/dashboard']);
          } else {
            this.loading = false;
            this.isOtp = true;
          }
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.loginForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.loginForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }
}
