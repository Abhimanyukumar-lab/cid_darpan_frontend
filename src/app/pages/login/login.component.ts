// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { select, Store } from '@ngrx/store';
// import { User } from 'src/app/models/user';
// import { ApiCallerService } from 'src/app/services/api-caller.service';
// import { ToasterService } from 'src/app/services/toaster.service';
// import {
//   AppLoadderHide,
//   AppLoadderShow,
// } from 'src/app/storage/actions/app.actions';
// import { AuthLogin } from 'src/app/storage/actions/auth.actions';
// import * as moment from 'moment';

// const LOGIN_PARAMS = {
//   EMAIL: '',
//   PASSWORD: '',
// };

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
// })
// export class LoginComponent implements OnInit, OnDestroy {
//   subscription: any;
//   // Public params
//   loginForm: UntypedFormGroup;
//   loading = false;
//   errors: any = [];
//   passwordIcon: string = 'VISIBLE';

//   constructor(
//     private fb: UntypedFormBuilder,
//     private router: Router,
//     private appStore: Store<{ auth: any }>,
//     private store: Store<{ auth: User }>,
//     private toast: ToasterService,
//     private apiService: ApiCallerService
//   ) {
//     this.subscription = this.store.pipe(select('auth')).subscribe((data) => {
//       // if (data) {
//       //   if (data.isAuthenticated) {
//       //     if (
//       //       data.user.tokenValidity &&
//       //       moment(data.user.tokenValidity).isAfter(new Date())
//       //     )
//       //       this.router.navigate(['official/dashboard']);

//       //     // if (!data.user.tnc_accepted) this.router.navigate(['tnc']);
//       //     // else this.router.navigate(['verify']);
//       //   }
//       // }

// if (data) {
//   if (data.isAuthenticated) {
//     // Store district information - prioritize ID since name might be null
//     if (data.user?.districtId) {
//       localStorage.setItem('userDistrictId', data.user.districtId.toString());
      
//       // Only store name if it's not null
//       if (data.user?.districtName) {
//         localStorage.setItem('userDistrict', data.user.districtName);
//       }
//     }
    
//     // Rest of your existing code
//     if (data.user.tokenValidity && moment(data.user.tokenValidity).isAfter(new Date())) {
//       this.router.navigate(['official/dashboard']);
//     }
//   }
// }


//     });
//   }
//   ngOnDestroy(): void {
//     this.subscription.unsubscribe();
//   }

//   ngOnInit(): void {
//     this.appStore.dispatch(new AppLoadderHide({}));
//     this.initLoginForm();
//   }

//   initLoginForm() {
//     this.loginForm = this.fb.group({
//       email: [
//         LOGIN_PARAMS.EMAIL,
//         Validators.compose([
//           Validators.required,
//           Validators.email,
//           Validators.minLength(3),
//           Validators.maxLength(320),
//         ]),
//       ],
//       password: [
//         LOGIN_PARAMS.PASSWORD,
//         Validators.compose([
//           Validators.required,
//           Validators.minLength(3),
//           Validators.maxLength(100),
//         ]),
//       ],
//     });
//   }

//   submit() {
//     this.appStore.dispatch(new AppLoadderShow({}));

//     const controls = this.loginForm.controls;

//     if (this.loginForm.invalid && !this.loginForm.valid) {
//       Object.keys(controls).forEach((controlName) =>
//         controls[controlName].markAsTouched()
//       );
//       this.appStore.dispatch(new AppLoadderHide({}));
//       return;
//     }

//     this.loading = true;

//     this.apiService.makeAuthCall('login', this.loginForm.value).subscribe(
//       (data) => {
//         this.store.dispatch(new AuthLogin(data.userDTO));
//         this.toast.getToastMessage(data.message, 'success', 3000, 'bottom-end');
//         this.router.navigate(['official/dashboard']);
//         // if (!data.data.tnc_accepted) this.router.navigate(['tnc']);
//         // else this.router.navigate(['verify']);
//       },
//       (error) => {
//         this.loading = false;
//       }
//     );
//   }

//   isControlHasError(controlName: string, validationType: string): boolean {
//     const control = this.loginForm.controls[controlName];
//     if (!control) {
//       return false;
//     }

//     const result =
//       control.hasError(validationType) && (control.dirty || control.touched);
//     return result;
//   }

//   isControlHasErrors(controlName: string): boolean {
//     const control = this.loginForm.controls[controlName];
//     if (!control) {
//       return false;
//     }

//     const result = control.errors && (control.dirty || control.touched);
//     return result;
//   }

//   showPass() {
//     var element = document.getElementById('password');
//     if (element.getAttribute('type') == 'text') {
//       element.setAttribute('type', 'password');
//       this.passwordIcon = 'VISIBLE';
//     } else {
//       element.setAttribute('type', 'text');
//       this.passwordIcon = 'HIDDEN';
//     }
//   }
// }


import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  AppLoadderHide,
  AppLoadderShow,
} from 'src/app/storage/actions/app.actions';
import { AuthLogin } from 'src/app/storage/actions/auth.actions';
import * as moment from 'moment';

const LOGIN_PARAMS = {
  EMAIL: '',
  PASSWORD: '',
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  subscription: any;
  loginForm: UntypedFormGroup;
  loading = false;
  errors: any = [];
  passwordIcon: string = 'VISIBLE';

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private appStore: Store<{ auth: any }>,
    private store: Store<{ auth: User }>,
    private toast: ToasterService,
    private apiService: ApiCallerService
  ) {
    this.subscription = this.store.pipe(select('auth')).subscribe((data) => {
      if (data?.isAuthenticated) {
        // Clear previous auth data
        localStorage.removeItem('userDistrict');
        localStorage.removeItem('userDistrictId');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        
        // Store all required user information
        const user = data.user;
        
        // District information (required for district filtering)
        if (user?.districtId) {
          localStorage.setItem('userDistrictId', user.districtId.toString());
          localStorage.setItem('userDistrict', user.districtName || '');
        } else {
          console.warn('District ID missing in user data - district filtering may not work properly');
        }

        // Role information (required for permission checks)
        if (user?.roleName) {
          localStorage.setItem('userRole', user.roleName);
        } else {
          console.warn('Role name missing in user data - permission checks may fail');
        }

        // User ID (recommended for tracking)
        if (user?.id) {
          localStorage.setItem('userId', user.id.toString());
        }

        // Redirect if token is valid
        if (user.tokenValidity && moment(user.tokenValidity).isAfter(new Date())) {
          this.router.navigate(['official/dashboard']);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // Note: Don't clear localStorage here - it should persist after login
  }

  ngOnInit(): void {
    this.appStore.dispatch(new AppLoadderHide({}));
    this.initLoginForm();
    
    // Clear any existing auth data on initialization
    localStorage.removeItem('userDistrict');
    localStorage.removeItem('userDistrictId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: [
        LOGIN_PARAMS.EMAIL,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      password: [
        LOGIN_PARAMS.PASSWORD,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {
    this.appStore.dispatch(new AppLoadderShow({}));

    const controls = this.loginForm.controls;

    if (this.loginForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    this.apiService.makeAuthCall('login', this.loginForm.value).subscribe(
      (data) => {
        // Verify required fields in API response
        if (!data.userDTO?.districtId) {
          console.error('API response missing districtId - district filtering will not work');
        }
        if (!data.userDTO?.roleName) {
          console.error('API response missing roleName - permission checks will fail');
        }
        
        this.store.dispatch(new AuthLogin(data.userDTO));
        this.toast.getToastMessage(data.message, 'success', 3000, 'bottom-end');
        this.router.navigate(['official/dashboard']);
      },
      (error) => {
        this.loading = false;
        this.appStore.dispatch(new AppLoadderHide({}));
        // Clear any partial auth data on error
        localStorage.removeItem('userDistrict');
        localStorage.removeItem('userDistrictId');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
      }
    );
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.loginForm.controls[controlName];
    if (!control) {
      return false;
    }
    return control.hasError(validationType) && (control.dirty || control.touched);
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.loginForm.controls[controlName];
    if (!control) {
      return false;
    }
    return control.errors && (control.dirty || control.touched);
  }

  showPass() {
    const element = document.getElementById('password');
    if (element) {
      if (element.getAttribute('type') == 'text') {
        element.setAttribute('type', 'password');
        this.passwordIcon = 'VISIBLE';
      } else {
        element.setAttribute('type', 'text');
        this.passwordIcon = 'HIDDEN';
      }
    }
  }
}