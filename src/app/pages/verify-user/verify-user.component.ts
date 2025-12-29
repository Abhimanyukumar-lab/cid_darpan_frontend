import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { ToasterService } from 'src/app/services/toaster.service';

const VERIFY_PARAM = {
  PASSWORD: '',
  CONFIRM_PASSWORD: '',
};

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss'],
})
export class VerifyUserComponent implements OnInit {
  verifyUserForm: UntypedFormGroup;
  loading = false;
  errors: any = [];

  isVerify: boolean;

  email: string;
  token: string;

  passwordIcon: string = 'assets/media/svg/icons/General/Visible.svg';
  confirmPasswordIcon: string = 'assets/media/svg/icons/General/Visible.svg';

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private appStore: Store<{ auth: any }>,
    private toast: ToasterService,
    private apiService: ApiCallerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email');
    this.token = this.route.snapshot.queryParamMap.get('token');

    this.apiService
      .apiPostCall('checkLink', { email: this.email, token: this.token }, false)
      .subscribe(
        (data) => {
          this.initVerifyUserForm();
          this.isVerify = true;
        },
        (error) => {
          this.loading = false;
          this.isVerify = false;
        }
      );
  }

  initVerifyUserForm() {
    this.verifyUserForm = this.fb.group(
      {
        email: this.email,
        token: this.token,
        password: [
          VERIFY_PARAM.PASSWORD,
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(50),
          ]),
        ],
        confirmPassword: [
          VERIFY_PARAM.CONFIRM_PASSWORD,
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(50),
          ]),
        ],
      },
      {
        validator: this.MustMatch('password', 'confirmPassword'),
      }
    );
  }

  submit() {
    const controls = this.verifyUserForm.controls;

    if (this.verifyUserForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.loading = true;

    this.apiService
      .apiPostCall('resetPassword', this.verifyUserForm.value, false)
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
    const control = this.verifyUserForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.verifyUserForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  showPass() {
    var element = document.getElementById('password');
    if (element.getAttribute('type') == 'text') {
      element.setAttribute('type', 'password');
      this.passwordIcon = 'assets/media/svg/icons/General/Visible.svg';
    } else {
      element.setAttribute('type', 'text');
      this.passwordIcon = 'assets/media/svg/icons/General/Hidden.svg';
    }
  }

  showConfirmPass() {
    var element = document.getElementById('confirmPassword');
    if (element.getAttribute('type') == 'text') {
      element.setAttribute('type', 'password');
      this.confirmPasswordIcon = 'assets/media/svg/icons/General/Visible.svg';
    } else {
      element.setAttribute('type', 'text');
      this.confirmPasswordIcon = 'assets/media/svg/icons/General/Hidden.svg';
    }
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: UntypedFormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
