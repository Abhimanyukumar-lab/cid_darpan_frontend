import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { MustMatch } from 'src/app/common/MustMatch';
import { CircleInspector } from 'src/app/models/CircleInspector';
import { Dsp } from 'src/app/models/Dsp';
import { LangModule } from 'src/app/models/LangModule';
import { PoliceStation } from 'src/app/models/PoliceStation';
import { Role } from 'src/app/models/Role';
import { Sdpo } from 'src/app/models/Sdpo';
import { Sections } from 'src/app/models/Sections';
import { Subdivision } from 'src/app/models/Subdivision';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  AppLoadderHide,
  AppLoadderShow,
} from 'src/app/storage/actions/app.actions';
import { AuthLogin, AuthLogout } from 'src/app/storage/actions/auth.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.scss'],
})
export class UpdateUserProfileComponent implements OnInit, OnDestroy {
  subscription: any;
  userProfile: any;
  loading = false;
  userProfileForm: UntypedFormGroup;

  ADD_USER: boolean;
  EDIT_USER: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  newPassword1: string;
  newPassword2: string;
  passwordMatch: boolean = false;

  isDisabled: boolean = false;

  isStationList: boolean = false;
  isCircleListShow: boolean = false;
  isSectionShow: boolean = false;
  isSDPOShow: boolean = false;
  isDSPShow: boolean = false;
  isSubdivisionShow: boolean = false;

  USER_IMAGE: File = null;
  language: string;

  USER_PARAMS = {
    ID: null,
    ROLE_ID: null,
    ROLE_NAME: '',
    SECTION_ID: null,
    SECTION_NAME: '',
    DSP_ID: null,
    DSP_NAME: '',
    SDPO_ID: null,
    SDPO_NAME: '',
    SUBDIV_ID: null,
    SUBDIV_NAME: '',
    CIRCLE_INSPECTOR_ID: null,
    CIRCLE_INSPECTOR_NAME: '',
    STATION_ID: null,
    STATION_NAME: '',
    FIRST_NAME: '',
    LAST_NAME: '',
    OLDPASSWORD: '',
    NEWPASSWORD: '',
    EMAIL: '',
    MOBILE: '',
    CONTACT: '',
    USER_IMAGE: '',
  };

  public imagePath;
  imgURL: any;
  public message: string;
  router: any;

  constructor(
    private appStore: Store<{ app: any }>,
    private authStore: Store<{ auth: any }>,
    private apiService: ApiCallerService,
    private localStorage: LocalstorageService,
    private fb: UntypedFormBuilder,
    private global: GlobalFunctionsService,
    private toaster: ToasterService,
    private _location: Location,
    public langModule: LangModule
  ) {
    this.userProfile = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.userProfile) {
      this.USER_PARAMS.ID = this.userProfile.id;
      this.USER_PARAMS.SECTION_ID = this.userProfile.sectionId;
      this.USER_PARAMS.SECTION_NAME = this.userProfile.sectionName;
      this.USER_PARAMS.DSP_ID = this.userProfile.dspId;
      this.USER_PARAMS.DSP_NAME = this.userProfile.dspName;
      this.USER_PARAMS.ROLE_ID = this.userProfile.roleId;
      this.USER_PARAMS.ROLE_NAME = this.userProfile.roleName;
      this.USER_PARAMS.SDPO_ID = this.userProfile.sdpoId;
      this.USER_PARAMS.SDPO_NAME = this.userProfile.sdpoName;
      this.USER_PARAMS.SUBDIV_ID = this.userProfile.subdivId;
      this.USER_PARAMS.SUBDIV_NAME = this.userProfile.subdivName;
      this.USER_PARAMS.CIRCLE_INSPECTOR_ID = this.userProfile.circleInspectorId;
      this.USER_PARAMS.CIRCLE_INSPECTOR_NAME =
        this.userProfile.circleInspectorName;
      this.USER_PARAMS.STATION_ID = this.userProfile.stationId;
      this.USER_PARAMS.STATION_NAME = this.userProfile.stationName;
      this.USER_PARAMS.FIRST_NAME = this.userProfile.firstName;
      this.USER_PARAMS.LAST_NAME = this.userProfile.lastName;
      this.USER_PARAMS.OLDPASSWORD = this.userProfile.password;
      this.USER_PARAMS.NEWPASSWORD = this.userProfile.newPassword;
      this.USER_PARAMS.EMAIL = this.userProfile.email;
      this.USER_PARAMS.MOBILE = this.userProfile.mobileNo;
      this.USER_PARAMS.CONTACT = this.userProfile.contactNo;
    }

    this.ADD_USER = this.global.checkForUserButtonPermission(
      AppConstants.USER_MODULE.ADD_SUBMIT_DATA
    );

    this.EDIT_USER = this.global.checkForUserButtonPermission(
      AppConstants.USER_MODULE.EDIT_SUBMIT_DATA
    );
    this.ADD_URL = AppConstants.USER_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.USER_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initiateUserForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initiateUserForm = () => {
    this.userProfileForm = this.fb.group({
      id: this.USER_PARAMS.ID,
      firstName: [
        this.USER_PARAMS.FIRST_NAME,
        Validators.compose([Validators.required]),
      ],
      lastName: [
        this.USER_PARAMS.LAST_NAME,
        Validators.compose([Validators.required]),
      ],
      email: [
        this.USER_PARAMS.EMAIL,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
      mobileNo: [
        this.USER_PARAMS.MOBILE,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(13),
        ]),
      ],
      contactNo: [this.USER_PARAMS.CONTACT],
      userProfileImage: [this.USER_PARAMS.USER_IMAGE],

      password: [''],
    });
  };


  // doLogOut = () => {
  //   this.authStore.dispatch(new AuthLogout({}));
  //   this.router.navigate([AppConstants.LOGIN_PATH]);
  // };

  // submit = () => {
  //   this.appStore.dispatch(new AppLoadderShow({}));
  //   const controls = this.userProfileForm.controls;
  //   if (this.userProfileForm.invalid && !this.userProfileForm.valid) {
  //     Object.keys(controls).forEach((controlName) =>
  //       controls[controlName].markAsTouched()
  //     );
  //     this.loading = false;
  //     this.appStore.dispatch(new AppLoadderHide({}));
  //     return;
  //   }

  //   this.loading = true;

  //   var formData = new FormData();

  //   if (this.USER_PARAMS.ID) formData.append('id', this.userProfile.id);
  //   formData.append('firstName', this.userProfileForm.value['firstName']);
  //   formData.append('lastName', this.userProfileForm.value['lastName']);
  //   formData.append('email', this.userProfile.email);
  //   formData.append('roleId', this.userProfile.roleId);
  //   formData.append('roleName', this.userProfile.roleName);
  //   if (this.userProfile.sectionId)
  //     formData.append('sectionId', this.userProfile.sectionId);
  //   formData.append('sectionName', this.userProfile.sectionName);
  //   if (this.userProfile.dspId)
  //     formData.append('dspId', this.userProfile.dspId);
  //   formData.append('dspName', this.userProfile.dspName);
  //   if (this.userProfile.sdpoId)
  //     formData.append('sdpoId', this.userProfile.sdpoId);
  //   formData.append('sdpoName', this.userProfile.sdpoName);
  //   if (this.userProfile.subdivId)
  //     formData.append('subdivId', this.userProfile.subdivId);
  //   formData.append('subdivName', this.userProfile.subdivName);
  //   if (this.userProfile.circleInspectorId)
  //     formData.append('circleInspectorId', this.userProfile.circleInspectorId);
  //   formData.append(
  //     'circleInspectorName',
  //     this.userProfile.circleInspectorName
  //   );
  //   if (this.userProfile.stationId)
  //     formData.append('stationId', this.userProfile.stationId);
  //   formData.append('stationName', this.userProfile.stationName);

  //   formData.append('mobileNo', this.userProfileForm.value['mobileNo']);
  //   formData.append('contactNo', this.userProfileForm.value['contactNo']);
  //   formData.append('password', this.userProfileForm.value['password']);

  //   if (this.USER_IMAGE) {
  //     formData.append(
  //       'userProfileImage',
  //       this.USER_IMAGE,
  //       this.USER_IMAGE.name
  //     );
  //   }

  //   var email = this.userProfileForm.value['email'];

  //   if (email != null) {
  //     this.userProfileForm.controls.email.disable();
  //   }

  //   if (this.userProfileForm.value['id']) {
  //     this.apiService
  //       .apiFormDataPostCall(this.EDIT_URL, formData, true)
  //       .subscribe(
  //         (data) => {
  //           this.toaster.getToastMessage(
  //             data.message,
  //             'success',
  //             3000,
  //             'top-end'
  //           );
  //           this.appStore.dispatch(new AppLoadderHide({}));
  //           this.authStore.dispatch(new AuthLogin(data.userDTO));
  //           this.goBack();
  //         },
  //         (error) => {
  //           this.loading = false;
  //           this.appStore.dispatch(new AppLoadderHide({}));
  //         }
  //       );
  //   } else {
  //     this.apiService
  //       .apiFormDataPostCall(this.ADD_URL, formData, true)
  //       .subscribe(
  //         (data) => {
  //           this.toaster.getToastMessage(
  //             data.message,
  //             'success',
  //             3000,
  //             'top-end'
  //           );
  //           this.appStore.dispatch(new AppLoadderHide({}));
  //           this.goBack();
  //         },
  //         (error) => {
  //           this.loading = false;
  //           this.appStore.dispatch(new AppLoadderHide({}));
  //         }
  //       );
  //   }
  // };




  doLogOut = () => {
    this.authStore.dispatch(new AuthLogout({}));
    this.router.navigate([AppConstants.LOGIN_PATH]);
  };

  submit = (): Observable<any> => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.userProfileForm.controls;

    if (this.userProfileForm.invalid && !this.userProfileForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return of(null); // Return empty observable
    }

    this.loading = true;

    var formData = new FormData();

    if (this.USER_PARAMS.ID) formData.append('id', this.userProfile.id);
    formData.append('firstName', this.userProfileForm.value['firstName']);
    formData.append('lastName', this.userProfileForm.value['lastName']);
    formData.append('email', this.userProfile.email);
    formData.append('roleId', this.userProfile.roleId);
    formData.append('roleName', this.userProfile.roleName);
    if (this.userProfile.sectionId)
      formData.append('sectionId', this.userProfile.sectionId);
    formData.append('sectionName', this.userProfile.sectionName);
    if (this.userProfile.dspId)
      formData.append('dspId', this.userProfile.dspId);
    formData.append('dspName', this.userProfile.dspName);
    if (this.userProfile.sdpoId)
      formData.append('sdpoId', this.userProfile.sdpoId);
    formData.append('sdpoName', this.userProfile.sdpoName);
    if (this.userProfile.subdivId)
      formData.append('subdivId', this.userProfile.subdivId);
    formData.append('subdivName', this.userProfile.subdivName);
    if (this.userProfile.circleInspectorId)
      formData.append('circleInspectorId', this.userProfile.circleInspectorId);
    formData.append(
      'circleInspectorName',
      this.userProfile.circleInspectorName
    );
    if (this.userProfile.stationId)
      formData.append('stationId', this.userProfile.stationId);
    formData.append('stationName', this.userProfile.stationName);

    formData.append('mobileNo', this.userProfileForm.value['mobileNo']);
    formData.append('contactNo', this.userProfileForm.value['contactNo']);
    formData.append('password', this.userProfileForm.value['password']);

    if (this.USER_IMAGE) {
      formData.append(
        'userProfileImage',
        this.USER_IMAGE,
        this.USER_IMAGE.name
      );
    }

    var email = this.userProfileForm.value['email'];

    if (email != null) {
      this.userProfileForm.controls.email.disable();
    }

    // Return the observable so we can subscribe to it
    if (this.userProfileForm.value['id']) {
      return this.apiService
        .apiFormDataPostCall(this.EDIT_URL, formData, true)
        .pipe(
          tap((data) => {
            this.toaster.getToastMessage(
              data.message,
              'success',
              3000,
              'top-end'
            );
            this.appStore.dispatch(new AppLoadderHide({}));
            this.authStore.dispatch(new AuthLogin(data.userDTO));
            this.loading = false;
          }),
          catchError((error) => {
            this.loading = false;
            this.appStore.dispatch(new AppLoadderHide({}));
            return throwError(error);
          })
        );
    } else {
      return this.apiService
        .apiFormDataPostCall(this.ADD_URL, formData, true)
        .pipe(
          tap((data) => {
            this.toaster.getToastMessage(
              data.message,
              'success',
              3000,
              'top-end'
            );
            this.appStore.dispatch(new AppLoadderHide({}));
            this.loading = false;
          }),
          catchError((error) => {
            this.loading = false;
            this.appStore.dispatch(new AppLoadderHide({}));
            return throwError(error);
          })
        );
    }
  };

  // NEW METHOD: Submit and then logout
  submitAndLogout = () => {
    // Call submit and wait for it to complete
    this.submit().subscribe({
      next: (response) => {
        // Only logout if submit was successful
        if (response !== null) { // null means form was invalid
          setTimeout(() => {
            this.doLogOut();
          }, 500); // Small delay to show success message
        }
      },
      error: (error) => {
        // Don't logout on error
        console.error('Submit failed:', error);
      }
    });
  };

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.userProfileForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.userProfileForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  goBack() {
    this._location.back();
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  validAplpha(event) {
    const charCode = event.which ? event.which : event.KeyCode;

    if (
      (charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122) ||
      charCode == 32
    ) {
      return true;
    } else return false;
  }

  handleFileChange = (file: FileList) => {
    this.USER_IMAGE = file.item(0);
  };

  checkPassword = (value: string, type: string) => {
    var newPassword1 = this.userProfileForm.controls['newPassword1'].value;
    var newPassword2 = this.userProfileForm.controls['newPassword2'].value;

    if (type == 'pass1') newPassword1 = value;
    if (type == 'pass2') newPassword2 = value;
    if (newPassword1 == newPassword2) {
      this.passwordMatch = true;
    } else {
      this.passwordMatch = false;
    }
  };

  preview = (files: FileList) => {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  };

  focusOut = (event, name) => {
    this.userProfileForm.patchValue({
      [name]: event.target.value,
    });
  };
}
