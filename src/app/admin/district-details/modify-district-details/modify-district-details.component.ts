import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { LangModule } from 'src/app/models/LangModule';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  AppLoadderHide,
  AppLoadderShow,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modify-district-details',
  templateUrl: './modify-district-details.component.html',
  styleUrls: ['./modify-district-details.component.scss'],
})
export class ModifyDistrictDetailsComponent implements OnInit, OnDestroy {
  environment = environment;

  subscription: any;
  details: any;
  loading = false;
  detailsForm: UntypedFormGroup;

  ADD_DISTRICT_DETAILS: boolean;
  EDIT_DISTRICT_DETAILS: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  DISTRICT_DETAILS_PARAMS = {
    ID: null,
    NAME: '',
    HEADER_ADDRESS: '',
    EMAIL: '',
    CONTACT_NO: '',
    MOBILE_NO: '',
    FB_LINK: '',
    YOUTYBE_LINK: '',
    TWITTER_LINK: '',
    QR_CODE: '',
    DOWNLOAD_LINK: '',
    G_PLAY_LINK: '',
    VISITORS_NO: '',
    DGP_IMAGE: '',
    DGP_NAME: '',
    SP_IMAGE: '',
    SP_NAME: '',
    MAP: '',
    LOGO: '',
    ABOUTSP: '',
    ABOUTUS: '',
    LANGUAGE: '',
    IS_CHARACTER: false,
    IS_CHARACTER_CHECK_STATUS: false,
    IS_CHARACTER_TYPE: '',
    EXTRA_PERSON_NAME: '',
    EXTRA_PERSON_POSITION: '',
    EXTRA_PERSON_IMAGE: '',
    DIG_SIGN: '',
  };

  DGP_IMAGE: File = null;
  LOGO: File = null;
  EXPEIM: File = null;
  SP_IMAGE: File = null;
  QR_CODE: File = null;
  DIGSIGNFILE: File = null;

  language: string;

  constructor(
    private appStore: Store<{ app: any }>,
    private apiService: ApiCallerService,
    private localStorage: LocalstorageService,
    private fb: UntypedFormBuilder,
    private global: GlobalFunctionsService,
    private toaster: ToasterService,
    private _location: Location,
    public langModule: LangModule
  ) {
    this.details = this.localStorage.getStoredValue('editData');

    if (this.details) {
      this.DISTRICT_DETAILS_PARAMS.ID = this.details.id;
      this.DISTRICT_DETAILS_PARAMS.NAME = this.details.fullName;
      this.DISTRICT_DETAILS_PARAMS.HEADER_ADDRESS = this.details.headAddress;
      this.DISTRICT_DETAILS_PARAMS.EMAIL = this.details.email;
      this.DISTRICT_DETAILS_PARAMS.CONTACT_NO = this.details.contactNo;
      this.DISTRICT_DETAILS_PARAMS.MOBILE_NO = this.details.mobileNo;
      this.DISTRICT_DETAILS_PARAMS.FB_LINK = this.details.fbLink;
      this.DISTRICT_DETAILS_PARAMS.YOUTYBE_LINK = this.details.youtubeLink;
      this.DISTRICT_DETAILS_PARAMS.TWITTER_LINK = this.details.twitterLink;
      this.DISTRICT_DETAILS_PARAMS.DOWNLOAD_LINK = this.details.downloadLink;
      this.DISTRICT_DETAILS_PARAMS.G_PLAY_LINK = this.details.gplayLink;
      this.DISTRICT_DETAILS_PARAMS.VISITORS_NO = this.details.visitorsNumber;
      this.DISTRICT_DETAILS_PARAMS.DGP_NAME = this.details.dgpName;
      this.DISTRICT_DETAILS_PARAMS.SP_NAME = this.details.spName;
      this.DISTRICT_DETAILS_PARAMS.MAP = this.details.mapUrl;
      this.DISTRICT_DETAILS_PARAMS.ABOUTSP = this.details.aboutSp;
      this.DISTRICT_DETAILS_PARAMS.ABOUTUS = this.details.aboutUs;
      this.DISTRICT_DETAILS_PARAMS.IS_CHARACTER = this.details.isCharacter;
      this.DISTRICT_DETAILS_PARAMS.IS_CHARACTER_CHECK_STATUS =
        this.details.isCharacterStatusCheck;
      this.DISTRICT_DETAILS_PARAMS.IS_CHARACTER_TYPE =
        this.details.isCharacterType;
      this.DISTRICT_DETAILS_PARAMS.EXTRA_PERSON_NAME =
        this.details.extraPersonName;
      this.DISTRICT_DETAILS_PARAMS.EXTRA_PERSON_POSITION =
        this.details.extraPersonPosition;
      this.DISTRICT_DETAILS_PARAMS.EXTRA_PERSON_IMAGE =
        this.details.extraPersonImage;
      this.DISTRICT_DETAILS_PARAMS.DIG_SIGN = this.details.digSign;
    }

    this.ADD_DISTRICT_DETAILS = this.global.checkForUserButtonPermission(
      AppConstants.DISTRICT_DETAILS_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_DISTRICT_DETAILS = this.global.checkForUserButtonPermission(
      AppConstants.DISTRICT_DETAILS_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.DISTRICT_DETAILS_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.DISTRICT_DETAILS_MODULE.EDIT_SUBMIT_URL;

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.DISTRICT_DETAILS_PARAMS.LANGUAGE = data.defaultLang;
      this.language = data.defaultLang;
    });
  }

  ngOnInit(): void {
    this.initiateDetailsForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initiateDetailsForm = () => {
    this.detailsForm = this.fb.group({
      id: this.DISTRICT_DETAILS_PARAMS.ID,
      fullName: [
        this.DISTRICT_DETAILS_PARAMS.NAME,
        Validators.compose([Validators.required]),
      ],
      headAddress: [
        this.DISTRICT_DETAILS_PARAMS.HEADER_ADDRESS,
        Validators.compose([Validators.required]),
      ],
      email: [
        this.DISTRICT_DETAILS_PARAMS.EMAIL,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      ],
      contactNo: [
        this.DISTRICT_DETAILS_PARAMS.CONTACT_NO,
        Validators.compose([Validators.required]),
      ],
      mobileNo: [this.DISTRICT_DETAILS_PARAMS.MOBILE_NO],
      fbLink: [this.DISTRICT_DETAILS_PARAMS.FB_LINK],
      youtubeLink: [this.DISTRICT_DETAILS_PARAMS.YOUTYBE_LINK],
      twitterLink: [this.DISTRICT_DETAILS_PARAMS.TWITTER_LINK],
      qrCode: [this.DISTRICT_DETAILS_PARAMS.QR_CODE],
      downloadLink: [this.DISTRICT_DETAILS_PARAMS.DOWNLOAD_LINK],
      gplayLink: [this.DISTRICT_DETAILS_PARAMS.G_PLAY_LINK],
      visitorsNumber: [this.DISTRICT_DETAILS_PARAMS.VISITORS_NO],
      dgpImage: [this.DISTRICT_DETAILS_PARAMS.DGP_IMAGE],
      dgpName: [
        this.DISTRICT_DETAILS_PARAMS.DGP_NAME,
        Validators.compose([Validators.required]),
      ],
      spImage: [this.DISTRICT_DETAILS_PARAMS.SP_IMAGE],
      spName: [
        this.DISTRICT_DETAILS_PARAMS.SP_NAME,
        Validators.compose([Validators.required]),
      ],
      map: [
        this.DISTRICT_DETAILS_PARAMS.MAP,
        Validators.compose([Validators.required]),
      ],
      aboutSp: [
        this.DISTRICT_DETAILS_PARAMS.ABOUTSP,
        Validators.compose([Validators.required]),
      ],
      aboutUs: [
        this.DISTRICT_DETAILS_PARAMS.ABOUTUS,
        Validators.compose([Validators.required]),
      ],
      logo: [this.DISTRICT_DETAILS_PARAMS.LOGO],
      language: this.DISTRICT_DETAILS_PARAMS.LANGUAGE,
      qrCodeSource: null,
      dgpImageSource: null,
      spImageSource: null,
      logoSource: null,
      extraPersonName: [this.DISTRICT_DETAILS_PARAMS.EXTRA_PERSON_NAME],
      extraPersonImage: [this.DISTRICT_DETAILS_PARAMS.EXTRA_PERSON_IMAGE],
      extraPersonPosition: [this.DISTRICT_DETAILS_PARAMS.EXTRA_PERSON_POSITION],
      isCharacter: this.DISTRICT_DETAILS_PARAMS.IS_CHARACTER,
      isCharacterStatusCheck:
        this.DISTRICT_DETAILS_PARAMS.IS_CHARACTER_CHECK_STATUS,
      isCharacterType: [
        this.DISTRICT_DETAILS_PARAMS.IS_CHARACTER_TYPE,
        Validators.compose([Validators.required]),
      ],
      digSignFile: [this.DISTRICT_DETAILS_PARAMS.DIG_SIGN],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));

    this.detailsForm.patchValue({
      qrCodeSource: this.QR_CODE,
      dgpImageSource: this.DGP_IMAGE,
      spImageSource: this.SP_IMAGE,
      logoSource: this.LOGO,
      extraPersonImageSource: this.EXPEIM,
      digSignSource: this.DIGSIGNFILE,
    });

    const controls = this.detailsForm.controls;
    if (this.detailsForm.invalid && !this.detailsForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData: FormData = new FormData();

    if (this.details) {
      formData.append('id', this.detailsForm.value['id']);
    }
    formData.append('fullName', this.detailsForm.value['fullName']);
    formData.append('headAddress', this.detailsForm.value['headAddress']);
    formData.append('email', this.detailsForm.value['email']);
    formData.append('contactNo', this.detailsForm.value['contactNo']);
    formData.append('mobileNo', this.detailsForm.value['mobileNo']);
    formData.append('fbLink', this.detailsForm.value['fbLink']);
    formData.append('youtubeLink', this.detailsForm.value['youtubeLink']);
    formData.append('twitterLink', this.detailsForm.value['twitterLink']);
    if (this.QR_CODE) {
      formData.append('qrCodeSource', this.QR_CODE, this.QR_CODE.name);
    }
    formData.append('downloadLink', this.detailsForm.value['downloadLink']);
    formData.append('gplayLink', this.detailsForm.value['gplayLink']);
    if (this.DISTRICT_DETAILS_PARAMS.VISITORS_NO)
      formData.append(
        'visitorsNumber',
        this.detailsForm.value['visitorsNumber']
      );
    if (this.DGP_IMAGE) {
      formData.append('dgpImageSource', this.DGP_IMAGE, this.DGP_IMAGE.name);
    }
    formData.append('dgpName', this.detailsForm.value['dgpName']);
    if (this.SP_IMAGE) {
      formData.append('spImageSource', this.SP_IMAGE, this.SP_IMAGE.name);
    }
    formData.append('spName', this.detailsForm.value['spName']);
    formData.append('language', this.language);
    if (this.LOGO) {
      formData.append('logoSource', this.LOGO, this.LOGO.name);
    }
    formData.append('map', this.detailsForm.value['map']);
    formData.append('aboutUs', this.detailsForm.value['aboutUs']);
    formData.append('aboutSp', this.detailsForm.value['aboutSp']);

    formData.append('isCharacter', this.detailsForm.value['isCharacter']);
    formData.append(
      'isCharacterStatusCheck',
      this.detailsForm.value['isCharacterStatusCheck']
    );
    formData.append(
      'isCharacterType',
      this.detailsForm.value['isCharacterType']
    );

    formData.append(
      'extraPersonName',
      this.detailsForm.value['extraPersonName']
    );
    formData.append(
      'extraPersonPosition',
      this.detailsForm.value['extraPersonPosition']
    );
    if (this.EXPEIM) {
      formData.append('extraPersonImageSource', this.EXPEIM, this.EXPEIM.name);
    }

    if (this.DIGSIGNFILE) {
      formData.append('digSign', this.DIGSIGNFILE, this.DIGSIGNFILE.name);
    }

    if (this.detailsForm.value['id'])
      this.apiService
        .apiFormDataPostCall(this.EDIT_URL, formData, true)
        .subscribe(
          (data) => {
            this.toaster.getToastMessage(
              data.message,
              'success',
              3000,
              'top-end'
            );
            this.goBack();
          },
          (error) => {
            this.loading = false;
            this.appStore.dispatch(new AppLoadderHide({}));
          }
        );
    else
      this.apiService
        .apiFormDataPostCall(this.ADD_URL, formData, true)
        .subscribe(
          (data) => {
            this.toaster.getToastMessage(
              data.message,
              'success',
              3000,
              'top-end'
            );
            this.goBack();
          },
          (error) => {
            this.loading = false;
            this.appStore.dispatch(new AppLoadderHide({}));
          }
        );
  };

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.detailsForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.detailsForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  goBack() {
    this._location.back();
  }

  handleDgpFile = (file: FileList) => {
    this.DGP_IMAGE = file.item(0);
  };

  handleSpFile = (file: FileList) => {
    this.SP_IMAGE = file.item(0);
  };

  handleLogoFile = (file: FileList) => {
    this.LOGO = file.item(0);
  };

  handleEPIFile = (file: FileList) => {
    this.EXPEIM = file.item(0);
  };

  handleQrFile = (file: FileList) => {
    this.QR_CODE = file.item(0);
  };

  handleDigSignFile = (file: FileList) => {
    this.DIGSIGNFILE = file.item(0);
  };

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

  focusOut = (event, name) => {
    this.detailsForm.patchValue({
      [name]: event.target.value,
    });
  };
}
