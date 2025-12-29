import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LangModule } from 'src/app/models/LangModule';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { select, Store } from '@ngrx/store';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  AppLoadderHide,
  AppLoadderShow,
} from 'src/app/storage/actions/app.actions';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { ModelService } from 'src/app/common/popup/model.service';
import { PublicModelService } from 'src/app/common/public-popup/public-model.service';
import { CharacterDetails } from 'src/app/models/CharacterDetails';
import { TranslateService } from 'src/app/services/translate.service';

const CHAR = {
  stationId: null,
  stationName: null,
  stationNameHi: null,
  gender: null,
  initialsName: null,
  name: null,
  relationName: null,
  fatherHusbandName: null,
  guardianRelation: null,
  mobileno: null,
  districtId: null,
  districtName: null,
  villageLocality: null,
  postOffice: null,
  panchayat: null,
  wardNumber: null,
  dob: null,
  durationStay: null,
  durationIn: null,
  maritalStatus: null,
  pinCode: null,
  aadharNumber: null,
  adharCardFile: null,
  signImage: null,
  userImage: null,
  type: null,
  comments: null,

  addressProof: null,
  addressProofImage: null,
  identityProof: null,
  identityProofImage: null,
  addressProofOther: null,
  addressProofOtherImage: null,
  identityProofOther: null,
  identityProofOtherImage: null,
  otherProofOther: null,
  otherProofOtherImage: null,
};

@Component({
  selector: 'app-charatcer',
  templateUrl: './charatcer.component.html',
  styleUrls: ['./charatcer.component.scss'],
})
export class CharatcerComponent implements OnInit, OnDestroy {
  subscription: any;
  //Check Status Variable

  characterCheckStatusGroup: UntypedFormGroup;
  isOtp: boolean = false;
  showData: boolean = false;
  isDistCharacterDown: boolean = false;
  isDistCharacterDownCheck: boolean = false;
  errorMsg: string = '';
  alertType: string = '';

  srNo: string = '';
  name: string = '';
  appliedDate: string = '';
  dataStatus: string = '';
  appDate: string = '';
  appShift: string = '';
  dataMessage: string = '';

  //Check Status Variable End

  districtList: any[];
  stationList: any[];
  genderList: [];

  baseUrl: string = AppConstants.backServer;
  character: CharacterDetails;

  min: Date = new Date();
  currentYear = this.min.getFullYear();
  currentMonth = this.min.getMonth();
  currentDay = this.min.getDate();
  currentTime = this.min.getHours();

  dob = new Date(this.currentYear - 16, this.currentMonth, this.currentDay);

  isMale: boolean = false;
  isFemale: boolean = false;
  isTransgender: boolean = false;
  isMiss: boolean = false;

  isDefault: boolean = true;
  isFather: boolean = false;
  isHusband: boolean = false;
  isMother: boolean = false;
  isGuardian: boolean = false;
  isDurationMonth: boolean = false;

  isOtherPurpose: boolean = false;
  isForAadharDoc: boolean = false;
  isAadharDoc: boolean = false;
  isForDocIdentity: boolean = false;
  isDocIdentity: boolean = false;
  isForDocAddress: boolean = false;
  isDocAddress: boolean = false;

  isForDocIdentityOther: boolean = false;
  isDocIdentityOther: boolean = false;
  isForDocAddressOther: boolean = false;
  isDocAddressOther: boolean = false;

  isYear: boolean = false;
  isMonth: boolean = false;
  isUserImgSelected: boolean = false;
  isCheckboxNotSelected: boolean = false;

  charForm: UntypedFormGroup;

  adharCardFile: File = null;
  signImage: File = null;
  userImage: File = null;
  addressProofImage: File = null;
  identityProofImage: File = null;
  addressProofOtherImage: File = null;
  identityProofOtherImage: File = null;
  otherProofOtherImage: File = null;

  adharCardFileURL: string = null;
  signImageURL: string = null;
  userImageURL: string = null;
  addressProofImageURL: string = null;
  identityProofImageURL: string = null;
  addressProofOtherImageURL: string = null;
  identityProofOtherImageURL: string = null;
  otherProofOtherImageURL: string = null;

  signImagePreview: any = null;
  userImagePreview: any = null;

  getPicture: WebcamImage = null;
  showWebcam = true;
  isCameraExist = false;
  errors: WebcamInitError[] = [];

  stationName: string = '';
  stationNameHi: string = '';
  districtName: string = '';

  CHARACTER_MSG_EN: string;
  CHARACTER_MSG_HI: string;

  CHARACTER_ERROR_MSG_EN: string;
  CHARACTER_ERROR_MSG_HI: string;

  APP_ID: string = '';
  isError: boolean = false;
  isCompleted: boolean = false;
  currrentLang: string;

  CHECKBOX_MSG_EN =
    'I declare that all the information given by me is correct and no criminal or civil case pending against me in any police station or court. therefore, it is humble request that immense grace be issued to issue a certificate of conduct. i will always be grateful to you.';
  CHECKBOX_MSG_HI =
    'मैं घोषणा करता हूं कि मेरे द्वारा दी गई सभी जानकारी सही है। मेरे विरुद्ध किसी भी पुलिस थाने या न्यायालय में कोई आपराधिक या दिवानी का मुकदमा लंबित नहीं है';

  CHECKBOX_ERROR_MSG_EN: string;
  CHECKBOX_ERROR_MSG_HI: string;

  fileCount: number = 0;

  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();

  currentMessage: string = 'Process is starting up';

  isChecked: boolean;
  constructor(
    private appStore: Store<{ app: any }>,
    private fb: UntypedFormBuilder,
    private global: GlobalFunctionsService,
    public langModule: LangModule,
    private apiCaller: ApiCallerService,
    private toaster: ToasterService,
    private model: PublicModelService,
    private modelService: ModelService,
    private translate: TranslateService
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;
    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.character = data.character;
      this.currrentLang = data.defaultLang;

      this.isDistCharacterDown = data.districtDetails.isCharacter;
      this.isDistCharacterDownCheck =
        data.districtDetails.isCharacterStatusCheck;
    });

    this.initAppForm();
    this.initCheckStatusForm();

    this.apiCaller
      .apiGetCall(AppConstants.PUBLIC_APIS.ONLYDISTFETCH, false)
      .subscribe((data) => {
        this.districtList = data.districtDTOs;
      });
    this.apiCaller
      .apiGetCall(AppConstants.PUBLIC_APIS.STATIONSFETCH, false)
      .subscribe((data) => {
        this.stationList = data.stationDtos;
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.isCameraExist = mediaDevices && mediaDevices.length > 0;
      }
    );

    // if (
    //   AppConstants.titleDistrict == 'SARAN POLICE' ||
    //   AppConstants.titleDistrict == 'SITAMARHI POLICE'
    // ) {
    //   this.isDistCharacterDown = true;
    //   this.isDistCharacterDownCheck = true;
    // }

    // if (AppConstants.titleDistrict == 'BHOJPUR POLICE') {
    //   this.isDistCharacterDown = false;
    //   this.isDistCharacterDownCheck = true;
    // }
  }

  initAppForm() {
    this.charForm = this.fb.group({
      stationId: [CHAR.stationId, Validators.compose([Validators.required])],
      gender: [CHAR.gender, Validators.compose([Validators.required])],
      initialsName: [
        CHAR.initialsName,
        Validators.compose([Validators.required]),
      ],
      name: [
        CHAR.name,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      relationName: [
        CHAR.relationName,
        Validators.compose([Validators.required]),
      ],
      fatherHusbandName: [CHAR.fatherHusbandName],
      // fatherName: [CHAR.fatherName],
      // husbandName: [CHAR.husbandName],
      // motherName: [CHAR.motherName],
      guardianRelation: [CHAR.guardianRelation],
      mobileno: [
        CHAR.mobileno,
        Validators.compose([Validators.required, Validators.minLength(10)]),
      ],
      districtId: [CHAR.districtId, Validators.compose([Validators.required])],
      villageLocality: [
        CHAR.villageLocality,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      postOffice: [CHAR.postOffice, Validators.compose([Validators.required])],
      panchayat: [CHAR.panchayat, Validators.compose([Validators.required])],
      wardNumber: [CHAR.wardNumber, Validators.compose([Validators.required])],
      dob: [CHAR.dob, Validators.compose([Validators.required])],
      durationStay: [
        CHAR.durationStay,
        Validators.compose([Validators.required]),
      ],
      durationIn: [CHAR.durationIn, Validators.compose([Validators.required])],
      maritalStatus: [
        CHAR.maritalStatus,
        Validators.compose([Validators.required]),
      ],
      pinCode: [
        CHAR.pinCode,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      aadharNumber: [
        CHAR.aadharNumber,
        Validators.compose([
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(12),
        ]),
      ],
      adharCardFile: [
        CHAR.adharCardFile,
        Validators.compose([Validators.required]),
      ],
      signImage: [CHAR.signImage, Validators.compose([Validators.required])],
      userImage: [CHAR.userImage],
      type: [CHAR.type, Validators.compose([Validators.required])],
      comments: [CHAR.comments],

      addressProof: [CHAR.addressProof],
      addressProofImage: [CHAR.addressProofImage],
      identityProof: [CHAR.identityProof],
      identityProofImage: [CHAR.identityProofImage],
      addressProofOther: [CHAR.addressProofOther],
      addressProofOtherImage: [CHAR.addressProofOtherImage],
      identityProofOther: [CHAR.identityProofOther],
      identityProofOtherImage: [CHAR.identityProofOtherImage],
      otherProofOther: [CHAR.otherProofOther],
      otherProofOtherImage: [CHAR.otherProofOtherImage],
      checkbox: [Validators.compose([Validators.required])],
    });
  }

  submit = () => {
    if (!this.isChecked) {
      this.isCheckboxNotSelected = true;
      return;
    } else {
      this.isCheckboxNotSelected = false;
    }

    this.closeModal('submitCharacterForm');

    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.charForm.controls;
    if (this.charForm.invalid && !this.charForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.openModal('characterUploadModel');

    this.currentMessage = `Processing 0/${this.fileCount}`;
    var completedCount: number = 0;

    if (this.adharCardFile) {
      var formFileData = new FormData();
      formFileData.append('upload', this.adharCardFile);
      this.apiCaller
        .apiFormDataPostCall(AppConstants.UPLOAD_FILE_URL, formFileData, false)
        .subscribe(
          (data) => {
            if (data) {
              this.adharCardFileURL = data.fileDownloadUri;

              completedCount++;
              this.currentMessage = `Processing ${completedCount}/${this.fileCount}`;

              if (completedCount == this.fileCount) {
                this.postDataSubmit();
              }
            }
          },
          (error) => {
            this.toaster.getToastMessage(
              error.message,
              'error',
              4000,
              'top-end'
            );
            this.appStore.dispatch(new AppLoadderHide({}));
            this.closeModal('characterUploadModel');
            return null;
          }
        );
    }

    if (this.signImage) {
      var formFileData = new FormData();
      formFileData.append('upload', this.signImage);
      this.apiCaller
        .apiFormDataPostCall(AppConstants.UPLOAD_FILE_URL, formFileData, false)
        .subscribe(
          (data) => {
            if (data) {
              this.signImageURL = data.fileDownloadUri;

              completedCount++;
              this.currentMessage = `Processing ${completedCount}/${this.fileCount}`;

              if (completedCount == this.fileCount) {
                this.postDataSubmit();
              }
            }
          },
          (error) => {
            this.toaster.getToastMessage(
              error.message,
              'error',
              4000,
              'top-end'
            );
            this.appStore.dispatch(new AppLoadderHide({}));
            this.model.close('characterUploadModel');
            return null;
          }
        );
    }
    if (this.userImage) {
      var formFileData = new FormData();
      formFileData.append('upload', this.userImage);
      this.apiCaller
        .apiFormDataPostCall(AppConstants.UPLOAD_FILE_URL, formFileData, false)
        .subscribe(
          (data) => {
            if (data) {
              this.userImageURL = data.fileDownloadUri;

              completedCount++;
              this.currentMessage = `Processing ${completedCount}/${this.fileCount}`;

              if (completedCount == this.fileCount) {
                this.postDataSubmit();
              }
            }
          },
          (error) => {
            this.toaster.getToastMessage(
              error.message,
              'error',
              4000,
              'top-end'
            );
            this.appStore.dispatch(new AppLoadderHide({}));
            this.model.close('characterUploadModel');
            return null;
          }
        );
    }
    if (this.getPicture) {
      const arr = this.getPicture.imageAsDataUrl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const file: File = new File([u8arr], 'jpg', {
        type: 'image/jpg',
      });

      var formFileData = new FormData();
      formFileData.append('upload', file);
      this.apiCaller
        .apiFormDataPostCall(AppConstants.UPLOAD_FILE_URL, formFileData, false)
        .subscribe(
          (data) => {
            if (data) {
              this.userImageURL = data.fileDownloadUri;

              completedCount++;
              this.currentMessage = `Processing ${completedCount}/${this.fileCount}`;

              if (completedCount == this.fileCount) {
                this.postDataSubmit();
              }
            }
          },
          (error) => {
            this.toaster.getToastMessage(
              error.message,
              'error',
              4000,
              'top-end'
            );
            this.appStore.dispatch(new AppLoadderHide({}));
            this.model.close('characterUploadModel');
            return null;
          }
        );
    }
    if (this.addressProofImage) {
      var formFileData = new FormData();
      formFileData.append('upload', this.addressProofImage);
      this.apiCaller
        .apiFormDataPostCall(AppConstants.UPLOAD_FILE_URL, formFileData, false)
        .subscribe(
          (data) => {
            if (data) {
              this.addressProofImageURL = data.fileDownloadUri;

              completedCount++;
              this.currentMessage = `Processing ${completedCount}/${this.fileCount}`;

              if (completedCount == this.fileCount) {
                this.postDataSubmit();
              }
            }
          },
          (error) => {
            this.toaster.getToastMessage(
              error.message,
              'error',
              4000,
              'top-end'
            );
            this.appStore.dispatch(new AppLoadderHide({}));
            this.model.close('characterUploadModel');
            return null;
          }
        );
    }
    if (this.identityProofImage) {
      var formFileData = new FormData();
      formFileData.append('upload', this.identityProofImage);
      this.apiCaller
        .apiFormDataPostCall(AppConstants.UPLOAD_FILE_URL, formFileData, false)
        .subscribe(
          (data) => {
            if (data) {
              this.identityProofImageURL = data.fileDownloadUri;

              completedCount++;
              this.currentMessage = `Processing ${completedCount}/${this.fileCount}`;

              if (completedCount == this.fileCount) {
                this.postDataSubmit();
              }
            }
          },
          (error) => {
            this.toaster.getToastMessage(
              error.message,
              'error',
              4000,
              'top-end'
            );
            this.appStore.dispatch(new AppLoadderHide({}));
            this.model.close('characterUploadModel');
            return null;
          }
        );
    }
    if (this.addressProofOtherImage) {
      var formFileData = new FormData();
      formFileData.append('upload', this.addressProofOtherImage);
      this.apiCaller
        .apiFormDataPostCall(AppConstants.UPLOAD_FILE_URL, formFileData, false)
        .subscribe(
          (data) => {
            if (data) {
              this.addressProofOtherImageURL = data.fileDownloadUri;

              completedCount++;
              this.currentMessage = `Processing ${completedCount}/${this.fileCount}`;

              if (completedCount == this.fileCount) {
                this.postDataSubmit();
              }
            }
          },
          (error) => {
            this.toaster.getToastMessage(
              error.message,
              'error',
              4000,
              'top-end'
            );
            this.appStore.dispatch(new AppLoadderHide({}));
            this.model.close('characterUploadModel');
            return null;
          }
        );
    }
    if (this.identityProofOtherImage) {
      var formFileData = new FormData();
      formFileData.append('upload', this.identityProofOtherImage);
      this.apiCaller
        .apiFormDataPostCall(AppConstants.UPLOAD_FILE_URL, formFileData, false)
        .subscribe(
          (data) => {
            if (data) {
              this.identityProofOtherImageURL = data.fileDownloadUri;

              completedCount++;
              this.currentMessage = `Processing ${completedCount}/${this.fileCount}`;
              if (completedCount == this.fileCount) {
                this.postDataSubmit();
              }
            }
          },
          (error) => {
            this.toaster.getToastMessage(
              error.message,
              'error',
              4000,
              'top-end'
            );
            this.appStore.dispatch(new AppLoadderHide({}));
            this.model.close('characterUploadModel');
            return null;
          }
        );
    }
    if (this.otherProofOtherImage) {
      var formFileData = new FormData();
      formFileData.append('upload', this.otherProofOtherImage);
      this.apiCaller
        .apiFormDataPostCall(AppConstants.UPLOAD_FILE_URL, formFileData, false)
        .subscribe(
          (data) => {
            if (data) {
              this.otherProofOtherImageURL = data.fileDownloadUri;

              completedCount++;
              this.currentMessage = `Processing ${completedCount}/${this.fileCount}`;

              if (completedCount == this.fileCount) {
                this.postDataSubmit();
              }
            }
          },
          (error) => {
            this.toaster.getToastMessage(
              error.message,
              'error',
              4000,
              'top-end'
            );
            this.appStore.dispatch(new AppLoadderHide({}));
            this.model.close('characterUploadModel');
            return null;
          }
        );
    }
  };

  postDataSubmit = () => {
    var formData = new FormData();

    if (this.charForm)
      formData.append('stationId', this.charForm.value['stationId']);
    formData.append('gender', this.charForm.value['gender']);
    formData.append('initialsName', this.charForm.value['initialsName']);
    formData.append('name', this.charForm.value['name']);
    formData.append('relationName', this.charForm.value['relationName']);
    if (this.charForm.value['guardianRelation'] != null) {
      formData.append(
        'guardianRelation',
        this.charForm.value['guardianRelation']
      );
    }
    if (this.charForm.value['fatherHusbandName'] != null) {
      formData.append(
        'fatherHusbandName',
        this.charForm.value['fatherHusbandName']
      );
    }
    formData.append('mobileno', this.charForm.value['mobileno']);
    formData.append('districtId', this.charForm.value['districtId']);
    formData.append('villageLocality', this.charForm.value['villageLocality']);
    formData.append('postOffice', this.charForm.value['postOffice']);
    formData.append('panchayat', this.charForm.value['panchayat']);
    formData.append('wardNumber', this.charForm.value['wardNumber']);
    formData.append('dob', this.charForm.value['dob']);
    formData.append('durationStay', this.charForm.value['durationStay']);
    formData.append('durationIn', this.charForm.value['durationIn']);
    formData.append('maritalStatus', this.charForm.value['maritalStatus']);
    formData.append('pinCode', this.charForm.value['pinCode']);
    formData.append('aadharNumber', this.charForm.value['aadharNumber']);

    formData.append('type', this.charForm.value['type']);
    formData.append('comments', this.charForm.value['comments']);
    formData.append('addressProof', this.charForm.value['addressProof']);
    formData.append('identityProof', this.charForm.value['identityProof']);
    formData.append(
      'addressProofOther',
      this.charForm.value['addressProofOther']
    );
    formData.append(
      'identityProofOther',
      this.charForm.value['identityProofOther']
    );
    formData.append('otherProofOther', this.charForm.value['otherProofOther']);

    if (this.adharCardFile) {
      formData.append('adharCardFile', this.adharCardFileURL);
    }
    if (this.signImage) {
      formData.append('signImage', this.signImageURL);
    }

    if (this.userImage && !this.getPicture) {
      formData.append('userImage', this.userImageURL);
    } else {
      formData.append('userImage', this.userImageURL);
    }
    if (this.addressProofImage) {
      formData.append('addressProofImage', this.addressProofImageURL);
    }
    if (this.identityProofImage) {
      formData.append('identityProofImage', this.identityProofImageURL);
    }
    if (this.addressProofOtherImage) {
      formData.append('addressProofOtherImage', this.addressProofOtherImageURL);
    }
    if (this.identityProofOtherImage) {
      formData.append(
        'identityProofOtherImage',
        this.identityProofOtherImageURL
      );
    }
    if (this.otherProofOtherImage) {
      formData.append('otherProofOtherImage', this.otherProofOtherImageURL);
    }

    this.apiCaller
      .apiFormDataPostCall(
        AppConstants.PUBLIC_APIS.CHARACTERADD,
        formData,
        false
      )
      .subscribe(
        (data) => {
          this.toaster.getToastMessage(
            data.message,
            'success',
            4000,
            'top-end'
          );

          this.APP_ID = data.id;
          this.CHARACTER_MSG_EN = `Your Character Application successfully registered. Your Character Id Number : ${this.APP_ID}/${this.currentYear}`;
          this.CHARACTER_MSG_HI = `आपका चरित्र प्रमाण - पत्र आवेदन सफलतापूर्वक दर्ज कर ली गई है । आपका चरित्र प्रमाण - पत्र आवेदन संख्या है : ${this.APP_ID}/${this.currentYear}`;

          this.isCompleted = true;
          this.isError = false;
          this.charForm.reset();

          this.userImage = null;
          if (this.getPicture != null) {
            this.getPicture = null;
            this.onOffWebCame();
          }

          this.closeModal('characterUploadModel');
        },
        (error) => {
          this.appStore.dispatch(new AppLoadderHide({}));

          this.isError = true;
          this.CHARACTER_ERROR_MSG_EN = error.message;
          this.CHARACTER_ERROR_MSG_HI = error.message;
          this.CHECKBOX_ERROR_MSG_EN = error.message;
          this.CHECKBOX_ERROR_MSG_HI = error.message;

          this.closeModal('characterUploadModel');
        }
      );
  };

  isControlHasErrors = (name: string) => {
    return this.global.isControlHasErrors(this.charForm, name);
  };

  isControlHasError = (name: string, methode: string) => {
    return this.global.isControlHasError(this.charForm, name, methode);
  };

  doCkeckUserImage = () => {};

  doCkeckApplicantType = (value) => {
    var types = value.options[value.selectedIndex].text;
    if (types == 'Job' || types == 'Placement') {
      this.isOtherPurpose = false;
      this.isForDocAddress = true;
      this.isDocAddress = true;
      this.isForDocIdentity = true;
      this.isDocIdentity = true;
      this.isForAadharDoc = false;
      this.isAadharDoc = false;
      this.isForDocIdentityOther = false;
      this.isDocIdentityOther = false;
      this.isForDocAddressOther = false;
      this.isDocAddressOther = false;
      this.charForm.patchValue({
        comments: null,
        addressProofOther: null,
        addressProofOtherImage: null,
        identityProofOther: null,
        identityProofOtherImage: null,
        otherProofOther: null,
        otherProofOtherImage: null,
      });
    } else if (
      types == 'Contractors' ||
      types == 'Business Purpose' ||
      types == 'Bank CSP'
    ) {
      this.isOtherPurpose = false;
      this.isForAadharDoc = true;
      this.isAadharDoc = true;
      this.isForDocIdentity = false;
      this.isDocIdentity = false;
      this.isForDocAddress = false;
      this.isDocAddress = false;
      this.isForDocIdentityOther = true;
      this.isDocIdentityOther = true;
      this.isForDocAddressOther = true;
      this.isDocAddressOther = true;
      this.charForm.patchValue({
        comments: null,
        addressProof: null,
        addressProofImage: null,
        identityProof: null,
        identityProofImage: null,
      });
    } else if (types == 'Other Commercial Purpose / Any Other') {
      this.isOtherPurpose = true;
      this.isForAadharDoc = true;
      this.isAadharDoc = true;
      this.isForDocIdentity = false;
      this.isDocIdentity = false;
      this.isForDocAddress = false;
      this.isDocIdentity = false;
      this.isForDocIdentityOther = true;
      this.isDocIdentityOther = true;
      this.isForDocAddressOther = true;
      this.isDocAddressOther = true;
      this.charForm.patchValue({
        comments: null,
        addressProof: null,
        addressProofImage: null,
        identityProof: null,
        identityProofImage: null,
      });
    } else {
      this.isForAadharDoc = false;
      this.isAadharDoc = false;
      this.isForDocIdentity = false;
      this.isDocIdentity = false;
      this.isForDocAddress = false;
      this.isDocAddress = false;
      this.isForDocIdentityOther = false;
      this.isDocIdentityOther = false;
      this.isForDocAddressOther = false;
      this.isDocAddressOther = false;
    }
  };

  doCkeckTitle = (value) => {
    var genders = value.options[value.selectedIndex].text;

    if (genders == 'Miss' || genders == 'सुश्री') {
      this.isMiss = true;
      this.isFather = true;
    } else {
      this.isMiss = false;
      this.isFather = true;
    }
  };

  doCkeckGender = (value) => {
    var genders = value.options[value.selectedIndex].text;
    if (genders == 'Male' || genders == 'पुरुष') {
      this.isMale = true;
      this.isFemale = false;
      this.isTransgender = false;
    } else if (genders == 'Female' || genders == 'महिला') {
      this.isMale = false;
      this.isFemale = true;
      this.isTransgender = false;
    } else if (genders == 'Transgender' || genders == 'ट्रांसजेंडर') {
      this.isMale = false;
      this.isFemale = false;
      this.isTransgender = true;
    } else {
      this.isMale = false;
      this.isFemale = false;
      this.isTransgender = false;
    }
  };

  doCkeckRelation = (value) => {
    var relations = value.options[value.selectedIndex].text;
    if (relations == 'S/O' || relations == 'पिता') {
      this.isDefault = false;
      this.isFather = true;
      this.isHusband = false;
      this.isMother = false;
      this.isGuardian = false;
    } else if (relations == 'D/O' || relations == 'पिता') {
      this.isDefault = false;
      this.isFather = true;
      this.isHusband = false;
      this.isMother = false;
      this.isGuardian = false;
    } else if (relations == 'W/O' || relations == 'पति') {
      this.isDefault = false;
      this.isFather = false;
      this.isHusband = true;
      this.isMother = false;
      this.isGuardian = false;
    } else if (relations == 'Mother' || relations == 'माता') {
      this.isDefault = false;
      this.isFather = false;
      this.isHusband = false;
      this.isMother = true;
      this.isGuardian = false;
    } else if (relations == 'Guardian' || relations == 'अभिभावक') {
      this.isDefault = false;
      this.isFather = false;
      this.isHusband = false;
      this.isMother = false;
      this.isGuardian = true;
    } else {
      this.isDefault = true;
      this.isFather = false;
      this.isHusband = false;
      this.isMother = false;
      this.isGuardian = false;
    }

    this.translate.onLoad();
  };

  doCkeckDurationType = (value) => {
    var durationType = value.options[value.selectedIndex].text;
    if (durationType == 'Years' || durationType == 'वर्ष') {
      this.isYear = true;
      this.isMonth = false;
    } else if (durationType == 'Months' || durationType == 'माह') {
      this.isYear = false;
      this.isMonth = true;
    } else {
      this.isYear = false;
      this.isMonth = false;
    }
  };

  checkMonthDurationType = () => {
    var count = this.charForm.controls['durationIn'].value;

    if (this.isMonth) {
      if (count > 11) {
        this.charForm.controls['durationIn'].setErrors({ max: 11 });
      }
    }
  };

  checkYearDurationType = () => {
    var count = this.charForm.controls['durationIn'].value;

    if (this.isYear) {
      if (count > 101) {
        this.charForm.controls['durationIn'].setErrors({ max: 101 });
      }
    }
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

  takeSnapshot = (): void => {
    this.trigger.next();
  };

  onOffWebCame = (): void => {
    this.showWebcam = !this.showWebcam;
  };

  handleInitError = (error: WebcamInitError): void => {
    this.errors.push(error);
  };

  changeWebCame = (directionOrDeviceId: boolean | string): void => {
    this.nextWebcam.next(directionOrDeviceId);
  };

  handleImageDone: boolean = false;
  handleImage = (webcamImage: WebcamImage): void => {
    this.getPicture = webcamImage;
    this.showWebcam = false;

    if (!this.handleImageDone) {
      this.fileCount++;
      this.handleImageDone = true;
    }
  };

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  validateForm = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.charForm.controls;
    if (this.charForm.invalid && !this.charForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.appStore.dispatch(new AppLoadderHide({}));
    this.openModal('submitCharacterForm');
  };

  handleSignImgDone: boolean = false;
  handleSignImg = (file: FileList) => {
    this.signImage = file.item(0);

    if (!this.handleSignImgDone) {
      this.fileCount++;
      this.handleSignImgDone = true;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.signImage);
    reader.onload = (_event) => {
      this.signImagePreview = reader.result;
    };
  };

  handleAdharCardImgDone: boolean = false;
  handleAdharCardImg = (file: FileList) => {
    this.adharCardFile = file.item(0);

    if (!this.handleAdharCardImgDone) {
      this.fileCount++;
      this.handleAdharCardImgDone = true;
    }
  };

  handleUserImageDone: boolean = false;
  handleUserImage = (file: FileList) => {
    this.userImage = file.item(0);

    if (!this.handleUserImageDone) {
      this.fileCount++;
      this.handleUserImageDone = true;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.userImage);
    reader.onload = (_event) => {
      this.userImagePreview = reader.result;
    };
  };

  handleDocAddressImgDone: boolean = false;
  handleDocAddressImg = (file: FileList) => {
    this.addressProofImage = file.item(0);
    if (!this.handleDocAddressImgDone) {
      this.fileCount++;
      this.handleDocAddressImgDone = true;
    }
  };

  handleDocIdentityImgDone: boolean = false;
  handleDocIdentityImg = (file: FileList) => {
    this.identityProofImage = file.item(0);
    if (!this.handleDocIdentityImgDone) {
      this.fileCount++;
      this.handleDocIdentityImgDone = true;
    }
  };

  handleAadharDocImgDone: boolean = false;
  handleAadharDocImg = (file: FileList) => {
    this.addressProofOtherImage = file.item(0);
    if (!this.handleAadharDocImgDone) {
      this.fileCount++;
      this.handleAadharDocImgDone = true;
    }
  };

  handleDocIdentityOtherImgDone: boolean = false;
  handleDocIdentityOtherImg = (file: FileList) => {
    this.identityProofOtherImage = file.item(0);
    if (!this.handleDocIdentityOtherImgDone) {
      this.fileCount++;
      this.handleDocIdentityOtherImgDone = true;
    }
  };

  handleDocAddressOtherImgDone: boolean = false;
  handleDocAddressOtherImg = (file: FileList) => {
    this.otherProofOtherImage = file.item(0);
    if (!this.handleDocAddressOtherImgDone) {
      this.fileCount++;
      this.handleDocAddressOtherImgDone = true;
    }
  };

  onStationSelected = () => {
    var station = this.stationList.filter(
      (v) => v.id == this.charForm.get('stationId').value
    )[0];
    if (this.currrentLang == 'en') this.stationName = station.stationName;
    else this.stationName = station.stationNameHi;
    // this.stationName = this.stationList.filter(
    //   (v) => v.id == this.charForm.get('stationId').value
    // )[0].stationName;
  };

  onDistrictSelected = () => {
    this.districtName = this.districtList.filter(
      (v) => v.id == this.charForm.get('districtId').value
    )[0].districtName;
  };

  //Check Status

  initCheckStatusForm = () => {
    this.characterCheckStatusGroup = this.fb.group({
      id: ['', Validators.compose([Validators.required])],
      mobile: ['', Validators.compose([Validators.required])],
      otp: '',
    });
  };

  openModal = (id: string) => {
    this.modelService.open(id);
  };

  closeModal = (id: string) => {
    this.closeAlert();
    this.modelService.close(id);
  };

  submitData = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.characterCheckStatusGroup.controls;
    if (
      this.characterCheckStatusGroup.invalid &&
      !this.characterCheckStatusGroup.valid
    ) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );

      this.alertType = 'danger';
      this.errorMsg = 'Character Id and Mobile No both are Required';

      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.CHARACTER_OTP_CHECKSTATUS,
        this.characterCheckStatusGroup.value,
        false,
        false,
        false
      )
      .subscribe(
        (data) => {
          this.alertType = 'success';
          this.errorMsg = data.message;

          this.characterCheckStatusGroup.controls['id'].disable();
          this.characterCheckStatusGroup.controls['mobile'].disable();

          this.isOtp = true;
          this.characterCheckStatusGroup.controls['otp'].patchValue(
            '',
            Validators.compose([Validators.required])
          );

          this.showData = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        },
        (error) => {
          this.alertType = 'danger';
          this.errorMsg = error.message;
          this.srNo = '';
          this.name = '';
          this.appliedDate = '';
          this.dataStatus = '';
          this.appDate = '';
          this.appShift = '';
          this.dataMessage = '';
          this.showData = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  submitOTPData = () => {
    this.characterCheckStatusGroup.controls['id'].enable();
    this.characterCheckStatusGroup.controls['mobile'].enable();
    var data = this.characterCheckStatusGroup.value;
    this.characterCheckStatusGroup.controls['id'].disable();
    this.characterCheckStatusGroup.controls['mobile'].disable();

    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.characterCheckStatusGroup.controls;
    if (
      this.characterCheckStatusGroup.invalid &&
      !this.characterCheckStatusGroup.valid
    ) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );

      this.alertType = 'danger';
      this.errorMsg = 'OTP is Required';

      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.CHARACTER_CHECKSTATUS,
        data,
        false,
        false,
        false
      )
      .subscribe(
        (data) => {
          this.alertType = 'success';
          this.errorMsg = data.message;
          this.srNo = data.srNo;
          this.name = data.name;
          this.appliedDate = data.appliedDate;
          this.dataStatus = data.dataStatus;
          this.appDate = data.appDate;
          this.appShift = data.appShift;
          this.dataMessage = data.dataMessage;

          this.showData = true;
          this.isOtp = false;

          this.characterCheckStatusGroup.controls['id'].enable();
          this.characterCheckStatusGroup.controls['mobile'].enable();
          this.initCheckStatusForm();
          this.appStore.dispatch(new AppLoadderHide({}));
        },
        (error) => {
          this.alertType = 'danger';
          this.errorMsg = error.message;
          this.srNo = '';
          this.name = '';
          this.appliedDate = '';
          this.dataStatus = '';
          this.appDate = '';
          this.appShift = '';
          this.dataMessage = '';
          this.showData = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  closeAlert = () => {
    this.errorMsg = '';
    this.alertType = '';
    this.srNo = '';
    this.name = '';
    this.appliedDate = '';
    this.dataStatus = '';
    this.appDate = '';
    this.appShift = '';
    this.dataMessage = '';
    this.showData = false;

    this.characterCheckStatusGroup.controls['id'].enable();
    this.characterCheckStatusGroup.controls['mobile'].enable();
    this.characterCheckStatusGroup.reset();
  };

  focusOut = (event, name) => {
    this.charForm.patchValue({
      [name]: event.target.value,
    });
  };
}
