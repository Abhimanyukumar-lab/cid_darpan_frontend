import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  AppLoadderHide,
  AppLoadderShow,
  RefreshTableAndForm,
} from 'src/app/storage/actions/app.actions';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-forward-to-destination-form',
  templateUrl: './forward-to-destination-form.component.html',
  styleUrls: ['./forward-to-destination-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ForwardToDestinationFormComponent
  implements OnInit, OnChanges, OnDestroy {
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

  @Input('forwardOfficerList')
  forwardOfficerList: string = AppConstants.CHARACTER_MODULE.USER_FORMWARD_LIST;

  @Input('extranInputConditions')
  extranInputConditions: string;

  extraInput: boolean = false;

  DOCUMENT: File = null;
  forwardDataForm: UntypedFormGroup;

  FORWARDDATA_PARAM = {
    ID: null,
    DISCRIPTION: null,
    DESTINATION: null,
    DOCUMENT: null,
    DISP_NO: null,
  };

  loading: boolean = false;

  officersList: any[];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };

  selectedOfficersids: string[] = [];
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
    this.FORWARDDATA_PARAM.ID = this.id;

    this.initForwardDataForm();

    this.getOfficerList();

    if (this.extraInputFormControl) {
      if (
        this.extraInputName == 'add_soft_no' &&
        (this.extranInputConditions == null || this.extranInputConditions == '')
      ) {
        this.extraInput = true;
        this.forwardDataForm.addControl(
          this.extraInputName,
          this.extraInputFormControl
        );

        this.forwardDataForm
          .get(this.extraInputName)
          .setValidators([Validators.required]);
        this.forwardDataForm.get(this.extraInputName).updateValueAndValidity();
      } else if (this.extraInputName != 'add_soft_no') {
        this.extraInput = true;
        this.forwardDataForm.addControl(
          this.extraInputName,
          this.extraInputFormControl
        );

        this.forwardDataForm
          .get(this.extraInputName)
          .setValidators([Validators.required]);
        this.forwardDataForm.get(this.extraInputName).updateValueAndValidity();
      }
    } else {
      this.extraInput = false;
      if (this.forwardDataForm.get(this.extraInputName)) {
        this.forwardDataForm.get(this.extraInputName).clearValidators();
        this.forwardDataForm.get(this.extraInputName).updateValueAndValidity();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.extraInputFormControl && this.forwardDataForm) {
      if (this.extraInputName == 'add_soft_no') {
        if (
          this.extranInputConditions == null ||
          this.extranInputConditions == ''
        ) {
          this.extraInput = true;
          this.forwardDataForm.addControl(
            this.extraInputName,
            this.extraInputFormControl
          );

          this.forwardDataForm
            .get(this.extraInputName)
            .setValidators([Validators.required]);
          this.forwardDataForm
            .get(this.extraInputName)
            .updateValueAndValidity();
        } else {
          this.extraInput = false;
          if (this.forwardDataForm.get(this.extraInputName)) {
            this.forwardDataForm.get(this.extraInputName).clearValidators();
            this.forwardDataForm
              .get(this.extraInputName)
              .updateValueAndValidity();
          }
        }
      } else if (this.extraInputName != 'add_soft_no') {
        this.extraInput = true;
        this.forwardDataForm.addControl(
          this.extraInputName,
          this.extraInputFormControl
        );

        this.forwardDataForm
          .get(this.extraInputName)
          .setValidators([Validators.required]);
        this.forwardDataForm.get(this.extraInputName).updateValueAndValidity();
      }
    } else {
      this.extraInput = false;
      if (
        this.forwardDataForm &&
        this.forwardDataForm.get(this.extraInputName)
      ) {
        this.forwardDataForm.get(this.extraInputName).clearValidators();
        this.forwardDataForm.get(this.extraInputName).updateValueAndValidity();
      }
    }
  }

  initForwardDataForm = () => {
    this.forwardDataForm = this.fb.group({
      id: [
        this.FORWARDDATA_PARAM.ID,
        Validators.compose([Validators.required]),
      ],
      discription: [
        this.FORWARDDATA_PARAM.DISCRIPTION,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      dispatchNo: [this.FORWARDDATA_PARAM.DISP_NO],
      document: [this.FORWARDDATA_PARAM.DOCUMENT],
    });
  };

  submitForwardData = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.forwardDataForm.controls;
    if (this.forwardDataForm.invalid && !this.forwardDataForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var selectedOne = [];
    this.selectedOfficersids.forEach((selection: any) => {
      selectedOne.push(selection.id);
    });

    var formData = new FormData();
    formData.append('id', this.forwardDataForm.value['id']);
    formData.append('discription', this.forwardDataForm.value['discription']);
    formData.append('destinations', selectedOne.toString());
    if (this.forwardDataForm.value['extraInputName']) {
      formData.append(
        'dispatchNo',
        this.forwardDataForm.value['extraInputName'].toUpperCase()
      );
    }

    if (this.DOCUMENT) {
      formData.append('document', this.DOCUMENT, this.DOCUMENT.name);
    }

    if (this.extraInput && this.extraInputFormControl) {
      formData.append(
        this.extraInputName,
        this.forwardDataForm.value[this.extraInputName]
      );
    }

    this.apiService.apiFormDataPostCall(this.url, formData, true).subscribe(
      (data) => {
        this.toaster.getToastMessage(data.message, 'success', 3000, 'top-end');
        this.loading = false;
        this.selectedOfficersids = [];
        this.initForwardDataForm();
        this.appStore.dispatch(new RefreshTableAndForm(true));
      },
      (error) => {
        this.loading = false;
        this.appStore.dispatch(new AppLoadderHide({}));
      }
    );
  };

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.forwardDataForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.forwardDataForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  handleFileChange = (file: FileList) => {
    this.DOCUMENT = file.item(0);
  };

  onItemSelect(item: any) {
    //this.selectedOfficersids.push(item.id + '');
  }
  onSelectAll(items: any[]) {
    // items.forEach((item: any) => {
    //   this.selectedOfficersids.push(item.id + '');
    // });
  }

  getOfficerList = (): any => {
    this.apiService
      .apiPostCall(this.forwardOfficerList, { id: this.id }, true)
      .subscribe((data) => {
        this.officersList = data.list;
      });
  };

  focusOut = (event, name) => {
    this.forwardDataForm.patchValue({
      [name]: event.target.value,
    });
  };
}
