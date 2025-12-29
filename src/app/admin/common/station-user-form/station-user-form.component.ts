import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { LangModule } from 'src/app/models/LangModule';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { TranslateService } from 'src/app/services/translate.service';
import {
  AppLoadderHide,
  AppLoadderShow,
  RefreshTableAndForm,
  StopEditFormData,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-station-user-form',
  templateUrl: './station-user-form.component.html',
  styleUrls: ['./station-user-form.component.scss'],
})
export class StationUserFormComponent implements OnInit, OnChanges, OnDestroy {
  subscription: any;

  villageInput: boolean = false;

  @Input('url')
  url: string;

  @Input('editUrl')
  editUrl: string;

  @Input('id')
  id: number;

  @Input('form')
  form: UntypedFormGroup;

  IMAGE: File = null;
  stationUserForm: UntypedFormGroup;

  language: string;
  designationList: string;

  STATION_USER_PARAM = {
    ID: null,
    STATION_ID: null,
    NAME: null,
    IMAGE: null,
    EMAIL: null,
    // CONTACTNO: null,
    MOBILENO: null,
    TYPE: null,
    // VILLAGE: null,
    DESIGNATIONID: null,
    DESIGNATION: null,
    // PRIORITY: null,
  };

  loading: boolean = false;

  stationId: any = null;

  constructor(
    private fb: UntypedFormBuilder,
    private apiService: ApiCallerService,
    private toaster: ToasterService,
    private appStore: Store<{ app: any }>,
    private authStore: Store<{ auth: any }>,
    public langModule: LangModule,
    private translate: TranslateService
  ) {
    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    this.subscription = this.authStore
      .pipe(select('auth'))
      .subscribe((data) => {
        this.stationId = data.user.stationId;
      });

    this.apiService
      .apiGetCall(AppConstants.DESIGNATION_MODULE.GET_DESGN_LIST, true)
      .subscribe((data) => {
        this.designationList = data.designationDTOs;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    if (this.id) {
      this.STATION_USER_PARAM.STATION_ID = this.id;
    } else {
      this.STATION_USER_PARAM.STATION_ID = this.stationId;
    }

    this.form ? (this.stationUserForm = this.form) : this.initStationUserForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.id) {
      this.STATION_USER_PARAM.STATION_ID = this.id;
    } else {
      this.STATION_USER_PARAM.STATION_ID = this.stationId;
    }

    this.form ? (this.stationUserForm = this.form) : this.initStationUserForm();
  }

  initStationUserForm = () => {
    this.stationUserForm = this.fb.group({
      id: [this.STATION_USER_PARAM.ID],
      stationId: [
        this.STATION_USER_PARAM.STATION_ID,
        Validators.compose([Validators.required]),
      ],
      name: [
        this.STATION_USER_PARAM.NAME,
        Validators.compose([Validators.required]),
      ],
      image: [this.STATION_USER_PARAM.IMAGE],
      email: [this.STATION_USER_PARAM.EMAIL],
      mobileNo: [
        this.STATION_USER_PARAM.MOBILENO,
        Validators.compose([Validators.required]),
      ],
      // contactNo: [this.STATION_USER_PARAM.CONTACTNO],
      type: [
        this.STATION_USER_PARAM.TYPE,
        Validators.compose([Validators.required]),
      ],
      // villageName: [this.STATION_USER_PARAM.VILLAGE],
      designationId: [this.STATION_USER_PARAM.DESIGNATIONID],
      // priority: [
      //   this.STATION_USER_PARAM.PRIORITY,
      //   Validators.compose([Validators.required]),
      // ],
    });
  };

  submitForwardData = () => {
    // console.log("this.stationUserForm.value " + JSON.stringify(this.stationUserForm.value,null,2));
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.stationUserForm.controls;
    // if (this.stationUserForm.invalid && !this.stationUserForm.valid) {
    //   Object.keys(controls).forEach((controlName) =>
    //     controls[controlName].markAsTouched()
    //   );
    //   this.loading = false;
    //   this.appStore.dispatch(new AppLoadderHide({}));
    //   return;
    // }

    
    this.loading = true;

    var formData = new FormData();
    if (this.stationUserForm.value['id'])
      formData.append('id', this.stationUserForm.value['id']);
    formData.append('name', this.stationUserForm.value['name']);
    if (this.stationUserForm.value['email'])
      formData.append('email', this.stationUserForm.value['email']);
    formData.append('mobileNo', this.stationUserForm.value['mobileNo']);
    // if (this.stationUserForm.value['contactNo'])
      // formData.append('contactNo', this.stationUserForm.value['contactNo']);
    formData.append('type', this.stationUserForm.value['type']);
    if (this.stationUserForm.value['designationId'])
      formData.append(
        'designationId',
        this.stationUserForm.value['designationId']
      );
    // if (this.stationUserForm.value['villageName'])
      // formData.append('villageName', this.stationUserForm.value['villageName']);
    // formData.append('priority', this.stationUserForm.value['priority']);
    formData.append('stationId', this.stationUserForm.value['stationId']);

    if (this.IMAGE) {
      formData.append('image', this.IMAGE, this.IMAGE.name);
    }

    //   this.apiService.apiFormDataPostCall(this.url, formData, true).subscribe(
    //     (data) => {
    //       this.toaster.getToastMessage(data.message, 'success', 3000, 'top-end');
    //       this.loading = false;
    //       this.stationUserForm.reset();
    //       this.initStationUserForm();
    //       this.appStore.dispatch(new RefreshTableAndForm(true));
    //       this.appStore.dispatch(new StopEditFormData({}));
    //     },
    //     (error) => {
    //       this.loading = false;
    //       this.appStore.dispatch(new AppLoadderHide({}));
    //     }
    //   );
    // };

    if (this.stationUserForm.value['id'])
      this.apiService
        .apiFormDataPostCall(this.editUrl, formData, true)
        .subscribe(
          (data) => {
            this.toaster.getToastMessage(
              data.message,
              'success',
              3000,
              'top-end'
            );
            this.loading = false;
            this.stationUserForm.reset();
            this.initStationUserForm();
            this.appStore.dispatch(new RefreshTableAndForm(true));
            this.appStore.dispatch(new StopEditFormData({}));
          },
          (error) => {
            this.loading = false;
            this.appStore.dispatch(new AppLoadderHide({}));
          }
        );
    else
      this.apiService.apiFormDataPostCall(this.url, formData, true).subscribe(
        (data) => {
          this.toaster.getToastMessage(
            data.message,
            'success',
            3000,
            'top-end'
          );
          this.loading = false;
          this.stationUserForm.reset();
          this.initStationUserForm();
          this.appStore.dispatch(new RefreshTableAndForm(true));
          this.appStore.dispatch(new StopEditFormData({}));
        },
        (error) => {
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.stationUserForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.stationUserForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
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
    this.IMAGE = file.item(0);
  };

  checkSelType = (value) => {
    var officerType = value.options[value.selectedIndex].text;
    if (
      officerType == 'SHO Details' ||
      officerType == 'थानाध्यक्ष का नाम' ||
      officerType == 'Investigation additional police station head Name' ||
      officerType == 'अपर थानाध्यक्ष, अनुसंधान' ||
      officerType == 'Law & order additional police station head' ||
      officerType == 'अपर थानाध्यक्ष, विधि-व्यवस्था'
    ) {
      this.villageInput = false;
    } else {
      this.villageInput = true;
      this.translate.onLoad();
    }

    // var input = document.getElementsByClassName('hindiFont');
    // this.translate.onLoadAddedControll(input);
  };

  focusOut = (event, name) => {
    this.stationUserForm.patchValue({
      [name]: event.target.value,
    });
  };
}
