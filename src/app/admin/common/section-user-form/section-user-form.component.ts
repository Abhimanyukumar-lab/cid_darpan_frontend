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
  selector: 'app-section-user-form',
  templateUrl: './section-user-form.component.html',
  styleUrls: ['./section-user-form.component.scss'],
})
export class SectionUserFormComponent implements OnInit, OnChanges, OnDestroy {
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
  sectionsUserForm: UntypedFormGroup;

  language: string;
  designationList: string;

  STATION_USER_PARAM = {
    ID: null,
    SECTIONS_ID: null,
    NAME: null,
    IMAGE: null,
    EMAIL: null,
    CONTACTNO: null,
    MOBILENO: null,
    TYPE: null,
    VILLAGE: null,
    DESIGNATIONID: null,
    DESIGNATION: null,
    PRIORITY: null,
  };

  loading: boolean = false;

  sectionsId: any = null;

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
        this.sectionsId = data.user.sectionsId;
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
      this.STATION_USER_PARAM.SECTIONS_ID = this.id;
    } else {
      this.STATION_USER_PARAM.SECTIONS_ID = this.sectionsId;
    }

    this.form
      ? (this.sectionsUserForm = this.form)
      : this.initStationUserForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.id) {
      this.STATION_USER_PARAM.SECTIONS_ID = this.id;
    } else {
      this.STATION_USER_PARAM.SECTIONS_ID = this.sectionsId;
    }

    this.form
      ? (this.sectionsUserForm = this.form)
      : this.initStationUserForm();
  }

  initStationUserForm = () => {
    this.sectionsUserForm = this.fb.group({
      id: [this.STATION_USER_PARAM.ID],
      sectionsId: [
        this.STATION_USER_PARAM.SECTIONS_ID,
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
      contactNo: [this.STATION_USER_PARAM.CONTACTNO],
      type: [this.STATION_USER_PARAM.TYPE],
      villageName: [this.STATION_USER_PARAM.VILLAGE],
      designationId: [this.STATION_USER_PARAM.DESIGNATIONID],
      priority: [
        this.STATION_USER_PARAM.PRIORITY,
        Validators.compose([Validators.required]),
      ],
    });
  };

  submitForwardData = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.sectionsUserForm.controls;
    if (this.sectionsUserForm.invalid && !this.sectionsUserForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();
    if (this.sectionsUserForm.value['id'])
      formData.append('id', this.sectionsUserForm.value['id']);
    formData.append('name', this.sectionsUserForm.value['name']);
    if (this.sectionsUserForm.value['email'])
      formData.append('email', this.sectionsUserForm.value['email']);
    formData.append('mobileNo', this.sectionsUserForm.value['mobileNo']);
    if (this.sectionsUserForm.value['contactNo'])
      formData.append('contactNo', this.sectionsUserForm.value['contactNo']);
    if (this.sectionsUserForm.value['type'])
      formData.append('type', this.sectionsUserForm.value['type']);
    if (this.sectionsUserForm.value['designationId'])
      formData.append(
        'designationId',
        this.sectionsUserForm.value['designationId']
      );
    if (this.sectionsUserForm.value['villageName'])
      formData.append(
        'villageName',
        this.sectionsUserForm.value['villageName']
      );
    formData.append('priority', this.sectionsUserForm.value['priority']);
    formData.append('sectionsId', this.sectionsUserForm.value['sectionsId']);

    if (this.IMAGE) {
      formData.append('image', this.IMAGE, this.IMAGE.name);
    }

    if (this.sectionsUserForm.value['id'])
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
            this.sectionsUserForm.reset();
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
          this.sectionsUserForm.reset();
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
    const control = this.sectionsUserForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.sectionsUserForm.controls[controlName];
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

  focusOut = (event, name) => {
    this.sectionsUserForm.patchValue({
      [name]: event.target.value,
    });
  };
}
