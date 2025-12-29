import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  AppLoadderHide,
  AppLoadderShow,
  UpdateTableDetails,
} from 'src/app/storage/actions/app.actions';

@Component({
  selector: 'app-sms-sending-form',
  templateUrl: './sms-sending-form.component.html',
  styleUrls: ['./sms-sending-form.component.scss'],
})
export class SmsSendingFormComponent implements OnInit, OnDestroy {
  subscription: any;

  @Input('url')
  url: string;

  @Input('id')
  id: number;

  @Input('departmentName')
  departmentName: string;

  loading: boolean = false;

  SENDSMS_PARAM = {
    ID: null,
    MESSAGE: null,
  };

  sendSmsForm: UntypedFormGroup;
  language: string;

  constructor(
    private fb: UntypedFormBuilder,
    private apiService: ApiCallerService,
    private toaster: ToasterService,
    private appStore: Store<{ app: any }>
  ) {
    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.SENDSMS_PARAM.ID = this.id;

    this.initSendSmsForm();
  }

  initSendSmsForm = () => {
    this.sendSmsForm = this.fb.group({
      id: [this.SENDSMS_PARAM.ID, Validators.compose([Validators.required])],
      message: [
        this.SENDSMS_PARAM.MESSAGE,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  };

  submitSendSms = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.sendSmsForm.controls;
    if (this.sendSmsForm.invalid && !this.sendSmsForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();
    formData.append('id', this.sendSmsForm.value['id']);
    formData.append('msg', this.sendSmsForm.value['message']);
    formData.append('caseId', this.sendSmsForm.value['id']);
    formData.append('deptName', this.departmentName);

    this.apiService.apiFormDataPostCall(this.url, formData, true).subscribe(
      (data) => {
        this.toaster.getToastMessage(data.message, 'success', 3000, 'top-end');
        this.loading = false;
        this.sendSmsForm.reset();
        this.initSendSmsForm();
        this.appStore.dispatch(new UpdateTableDetails(true));
      },
      (error) => {
        this.loading = false;
        this.appStore.dispatch(new AppLoadderHide({}));
      }
    );
  };

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.sendSmsForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.sendSmsForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  focusOut = (event, name) => {
    this.sendSmsForm.patchValue({
      [name]: event.target.value,
    });
  };
}
