import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { LangModule } from 'src/app/models/LangModule';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  AppLoadderHide,
  AppLoadderShow,
  UpdateTableDetails,
} from 'src/app/storage/actions/app.actions';

@Component({
  selector: 'app-assign-to-officer-form',
  templateUrl: './assign-to-officer-form.component.html',
  styleUrls: ['./assign-to-officer-form.component.scss'],
})
export class AssignToOfficerFormComponent implements OnInit, OnDestroy {
  subscription: any;

  @Input()
  url: string;

  @Input()
  id: number;

  @Input()
  assignForModule: string;

  loading: boolean = false;

  assignToOfficerForm: UntypedFormGroup;
  language: string;

  ASSIGNTOOFFICER_PARAM = {
    ID: null,
    STATUS: null,
    DISCRIPTION: null,
  };

  constructor(
    private fb: UntypedFormBuilder,
    private apiService: ApiCallerService,
    private toaster: ToasterService,
    private appStore: Store<{ app: any }>,
    public langModule: LangModule
  ) {
    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
     // console.log(data);
      this.language = data.defaultLang;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ASSIGNTOOFFICER_PARAM.ID = this.id;
    this.initAssignToOfficerForm();
  }

  initAssignToOfficerForm = () => {
    this.assignToOfficerForm = this.fb.group({
      id: [
        this.ASSIGNTOOFFICER_PARAM.ID,
        Validators.compose([Validators.required]),
      ],
      status: [
        this.ASSIGNTOOFFICER_PARAM.STATUS,
        Validators.compose([Validators.required]),
      ],
      description: [
        this.ASSIGNTOOFFICER_PARAM.DISCRIPTION,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  };

  submitAssignToOfficer = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.assignToOfficerForm.controls;
    if (this.assignToOfficerForm.invalid && !this.assignToOfficerForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();
    formData.append('id', this.assignToOfficerForm.value['id']);
    formData.append('status', this.assignToOfficerForm.value['status']);
    formData.append(
      'discription',
      this.assignToOfficerForm.value['description']
    );

    this.apiService.apiFormDataPostCall(this.url, formData, true).subscribe(
      (data) => {
        this.toaster.getToastMessage(data.message, 'success', 3000, 'top-end');
        this.loading = false;
        this.assignToOfficerForm.reset();
        this.initAssignToOfficerForm();
        this.appStore.dispatch(new UpdateTableDetails(true));
      },
      (error) => {
        this.loading = false;
        this.appStore.dispatch(new AppLoadderHide({}));
      }
    );
  };

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.assignToOfficerForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.assignToOfficerForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  focusOut = (event, name) => {
    this.assignToOfficerForm.patchValue({
      [name]: event.target.value,
    });
  };
}
