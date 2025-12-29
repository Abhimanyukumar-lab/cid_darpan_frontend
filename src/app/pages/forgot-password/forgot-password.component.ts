import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { AppLoadderHide } from 'src/app/storage/actions/app.actions';
import * as moment from 'moment';

const FORGOT_PARAM = {
  EMAIL: '',
};

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  subscription: any;
  forgotPasswordForm: UntypedFormGroup;
  loading = false;
  errors: any = [];

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private appStore: Store<{ auth: any }>,
    private store: Store<{ auth: User }>,
    private toast: ToasterService,
    private apiService: ApiCallerService
  ) {
    this.subscription = this.store.pipe(select('auth')).subscribe((data) => {
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

  ngOnInit(): void {
    this.appStore.dispatch(new AppLoadderHide({}));
    this.initForgotForm();
  }

  initForgotForm() {
    this.forgotPasswordForm = this.fb.group({
      email: [
        FORGOT_PARAM.EMAIL,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
    });
  }

  submit() {
    const controls = this.forgotPasswordForm.controls;

    if (this.forgotPasswordForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.loading = true;

    this.apiService
      .apiPostCall('reset', this.forgotPasswordForm.value, false)
      .subscribe(
        (data) => {
          this.toast.getToastMessage(data.message, 'success', 3000, 'top-end');
          this.router.navigate(['login']);
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.forgotPasswordForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.forgotPasswordForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }
}
