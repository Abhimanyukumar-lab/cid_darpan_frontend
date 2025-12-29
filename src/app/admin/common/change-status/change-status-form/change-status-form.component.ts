import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { LangModule } from 'src/app/models/LangModule';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  AppLoadderHide,
  AppLoadderShow,
  RefreshTableAndForm,
  RefreshViewDataStart,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-change-status-form',
  templateUrl: './change-status-form.component.html',
  styleUrls: ['./change-status-form.component.scss'],
})
export class ChangeStatusFormComponent implements OnInit, OnDestroy {
  subscription: any;

  @Input('url')
  url: string;

  @Input('id')
  id: number;

  @Input('extraInputLabel')
  extraInputLabel?: string;

  @Input('extraInputPlaceholder')
  extraInputPlaceholder?: string;

  @Input('extraInputName')
  extraInputName?: string;

  @Input('extraInputFormControl')
  extraInputFormControl?: UntypedFormControl;

  extraInput: boolean = false;
  isVisitorId: boolean = false;

  loading: boolean = false;
  language: string;

  options: any[] = [];

  CHANGESTATUS_PARAM = {
    ID: null,
    STATUS: null,
    DISCRIPTION: null,
  };

  changeStatusForm: UntypedFormGroup;

  //module for dropdown condition
  @Input()
  changeStatusForModule: string;

  @Input()
  moduleStatus: string;

  @Input()
  otherInput: string;

  assigned: string = '';
  rejected: string = '';
  completed: string = '';

  visitorStatus = new UntypedFormControl(null);

  constructor(
    private fb: UntypedFormBuilder,
    private apiService: ApiCallerService,
    private toaster: ToasterService,
    private appStore: Store<{ app: any }>,
    public langModule: LangModule,
    private translate: TranslateService
  ) {
    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.CHANGESTATUS_PARAM.ID = this.id;
    this.initChangeStatusForm();
  }

  initChangeStatusForm = () => {
    this.changeStatusForm = this.fb.group({
      id: [
        this.CHANGESTATUS_PARAM.ID,
        Validators.compose([Validators.required]),
      ],
      status: [
        this.CHANGESTATUS_PARAM.STATUS,
        Validators.compose([Validators.required]),
      ],
      description: [
        this.CHANGESTATUS_PARAM.DISCRIPTION,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  };

  submitChangeStatus = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.changeStatusForm.controls;
    if (this.changeStatusForm.invalid && !this.changeStatusForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();
    formData.append('id', this.changeStatusForm.value['id']);
    formData.append('status', this.changeStatusForm.value['status']);
    formData.append('discription', this.changeStatusForm.value['description']);

    if (this.extraInput && this.extraInputFormControl)
      formData.append(
        this.extraInputName,
        this.changeStatusForm.value[this.extraInputName]
      );

    this.apiService.apiFormDataPostCall(this.url, formData, true).subscribe(
      (data) => {
        this.toaster.getToastMessage(data.message, 'success', 3000, 'top-end');
        this.loading = false;
        this.changeStatusForm.reset();
        this.initChangeStatusForm();
        this.appStore.dispatch(new RefreshTableAndForm(true));
      },
      (error) => {
        this.loading = false;
        this.appStore.dispatch(new AppLoadderHide({}));
      }
    );
  };

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.changeStatusForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.changeStatusForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  changeStatusDropDownChange = () => {
    var selected = this.changeStatusForm.controls['status'].value;

    if (
      this.changeStatusForModule == 'APPOINTMENT' &&
      selected == 'Appointment Completed'
    ) {
      this.isVisitorId = true;
    } else {
      this.isVisitorId = false;
    }

    if (
      selected == 'Character Completed' &&
      this.extraInputName == 'districtMemoNo' &&
      this.extraInputFormControl
    ) {
      this.extraInput = true;
      this.changeStatusForm.addControl(
        this.extraInputName,
        this.extraInputFormControl
      );

      this.changeStatusForm
        .get(this.extraInputName)
        .setValidators([Validators.required]);
      this.changeStatusForm.get(this.extraInputName).updateValueAndValidity();
    } else if (
      selected == 'Appointment Completed' &&
      this.extraInputName == 'visitor_id' &&
      this.visitorStatus.value == 'Available' &&
      this.extraInputFormControl
    ) {
      this.extraInput = true;
      this.changeStatusForm.addControl(
        this.extraInputName,
        this.extraInputFormControl
      );

      this.changeStatusForm
        .get(this.extraInputName)
        .setValidators([Validators.required]);
      this.changeStatusForm.get(this.extraInputName).updateValueAndValidity();
    } else {
      this.extraInput = false;
      if (this.changeStatusForm.get(this.extraInputName)) {
        this.changeStatusForm.get(this.extraInputName).clearValidators();
        this.changeStatusForm.get(this.extraInputName).updateValueAndValidity();
      }
    }
  };

  focusOut = (event, name) => {
    this.changeStatusForm.patchValue({
      [name]: event.target.value,
    });
  };
}
