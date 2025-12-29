import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { FileSaverService } from 'ngx-filesaver';
import { ModelService } from 'src/app/common/popup/model.service';
import { Permissions } from 'src/app/models/Permissions';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  AppLoadderHide,
  AppLoadderShow,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-modify-resource-transfer',
  templateUrl: './modify-resource-transfer.component.html',
  styleUrls: ['./modify-resource-transfer.component.scss'],
})
export class ModifyResourceTransferComponent implements OnInit, OnDestroy {
  subscription: any;
  permissions: Permissions = new Permissions();
  loading = false;

  transfer: any;
  transferForm: UntypedFormGroup;

  TRANSFERSOURCE: File = null;
  language: string;

  TRANSFER_PARAMS = {
    ID: null,
    NAME: '',
    TRANSFERSOURCE: '',
    RESOURCE_LIST: [],
    LOCATION_LIST: [],
  };

  constructor(
    private global: GlobalFunctionsService,
    private router: Router,
    private _location: Location,
    private apiCaller: ApiCallerService,
    private _FileSaverService: FileSaverService,
    private appStore: Store<{ app: any }>,
    private fb: UntypedFormBuilder,
    private toaster: ToasterService,
    private modelService: ModelService
  ) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.download_cert = this.global.checkForUserButtonPermission(
      AppConstants.TRANSFER_MODULE.DOWNLOAD_BUTTON
    );

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initiateResourcetransferForm();
  }

  initiateResourcetransferForm = () => {
    this.transferForm = this.fb.group({
      id: this.TRANSFER_PARAMS.ID,
      name: [
        this.TRANSFER_PARAMS.NAME,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      transferSource: [
        this.TRANSFER_PARAMS.TRANSFERSOURCE,
        Validators.compose([Validators.required]),
      ],
      resourceList: this.TRANSFER_PARAMS.RESOURCE_LIST,
      locationList: this.TRANSFER_PARAMS.LOCATION_LIST,
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.transferForm.controls;
    if (this.transferForm.invalid && !this.transferForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = {};

    if (this.transfer) formData['id'] = this.transferForm.value['id'];
    formData['name'] = this.transferForm.value['name'];

    var resourceList = [];
    this.TRANSFER_PARAMS.RESOURCE_LIST.forEach((reource) => {
      resourceList.push({
        resourceName: reource['Resource Name'],
        designation: reource['Designation'],
        currentPosting: reource['Current Posting'],
        lastPosting: reource['Last Posting'],
        mobileNumber: reource['Mobile Number'],
      });
    });
    formData['resourceList'] = resourceList;

    var locationList = [];
    this.TRANSFER_PARAMS.LOCATION_LIST.forEach((location) => {
      locationList.push({
        nameOfLocation: location['Name Of Location'],
        noOfResourceRequired: location['No Of Resource Required'],
        transferTiming: location['Transfer Timing'],
      });
    });
    formData['locationList'] = locationList;

    if (this.transferForm.value['id'])
      this.apiCaller
        .apiPostCall('uploadTransferData', formData, true)
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
      this.apiCaller
        .apiPostCall('uploadTransferData', formData, true)
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

  goBack() {
    this._location.back();
  }

  openModal = (id: string) => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.transferForm.controls;
    if (this.transferForm.invalid && !this.transferForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.modelService.open(id);
  };

  openAndcloseModal = (old_id: string, new_id: string) => {
    this.modelService.close(old_id);
    this.modelService.open(new_id);
  };

  closeModal = (id: string) => {
    this.modelService.close(id);
    this.submit();
  };

  downloadSample = () => {
    this.apiCaller
      .apiPostCallDownloadFile('downloadSample', true)
      .subscribe((blob) => {
        this._FileSaverService.save(blob, 'Sample Transfer File');
        this.appStore.dispatch(new AppLoadderHide({}));
      });
  };

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.transferForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.transferForm.controls[controlName];
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
    this.TRANSFERSOURCE = file.item(0);
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(file.item(0));
    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, {
        type: 'binary',
        cellDates: true,
        dateNF: 'yyyy/mm/dd;@',
      });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { raw: false });
      this.TRANSFER_PARAMS.RESOURCE_LIST = data;

      const wsname1: string = wb.SheetNames[1];
      const ws1: XLSX.WorkSheet = wb.Sheets[wsname1];
      const data1 = XLSX.utils.sheet_to_json(ws1, { raw: false });
      this.TRANSFER_PARAMS.LOCATION_LIST = data1;
    };
  };

  focusOut = (event, name) => {
    this.transferForm.patchValue({
      [name]: event.target.value,
    });
  };
}
