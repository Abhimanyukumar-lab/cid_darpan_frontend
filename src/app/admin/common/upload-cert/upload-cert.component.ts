import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  AppLoadderHide,
  AppLoadderShow,
  RefreshTableAndForm,
  UpdateTableDetails,
} from 'src/app/storage/actions/app.actions';

@Component({
  selector: 'app-upload-cert',
  templateUrl: './upload-cert.component.html',
  styleUrls: ['./upload-cert.component.scss'],
})
export class UploadCertComponent implements OnInit {
  @Input('url')
  url: string;

  @Input('id')
  id: number;

  loading: boolean = false;

  SENDSMS_PARAM = {
    ID: null,
    CERT: null,
  };

  sendSmsForm: UntypedFormGroup;

  cert: File = null;

  constructor(
    private fb: UntypedFormBuilder,
    private apiService: ApiCallerService,
    private toaster: ToasterService,
    private appStore: Store<{ app: any }>
  ) {}

  ngOnInit(): void {
    this.SENDSMS_PARAM.ID = this.id;

    this.initSendSmsForm();
  }

  initSendSmsForm = () => {
    this.sendSmsForm = this.fb.group({
      id: [this.SENDSMS_PARAM.ID, Validators.compose([Validators.required])],
      cert: [
        this.SENDSMS_PARAM.CERT,
        Validators.compose([Validators.required]),
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

    if (this.cert) {
      formData.append('document', this.cert, this.cert.name);
    }

    this.apiService.apiFormDataPostCall(this.url, formData, true).subscribe(
      (data) => {
        this.toaster.getToastMessage(data.message, 'success', 3000, 'top-end');
        this.loading = false;
        this.sendSmsForm.reset();
        this.initSendSmsForm();
        this.appStore.dispatch(new RefreshTableAndForm(true));
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

  handleFileChange = (file: FileList) => {
    this.cert = file.item(0);
  };
}
