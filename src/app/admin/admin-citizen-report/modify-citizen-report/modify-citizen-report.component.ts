import { DatePipe, formatDate, Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-modify-citizen-report',
  templateUrl: './modify-citizen-report.component.html',
  styleUrls: ['./modify-citizen-report.component.scss'],
})
export class ModifyCitizenReportComponent implements OnInit, OnDestroy {
  subscription: any;

  citizenReport: any;
  loading = false;
  citizenReportForm: UntypedFormGroup;

  ADD_CITIZEN: boolean;
  EDIT_CITIZEN: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  max: Date = new Date();
  language: string;

  districtList: any[];
  stationList: any[];
  INVOICE: File = null;
  ITEMIMAGE: File = null;

  isLostArea: boolean = false;
  isFoundArea: boolean = false;
  isForMobile: boolean = false;
  isForVehicle: boolean = false;
  isForOther: boolean = false;
  isVehicleType: boolean = false;
  idOtherVehicle: boolean = false;
  isColor: boolean = false;
  isOtherDistrict: boolean = false;
  isDescription: boolean = false;
  isFor: boolean = false;
  isIncidentDate: boolean = false;
  isInvoice: boolean = false;
  isItemImage: boolean = false;
  isPersonal: boolean = false;
  isSubmit: boolean = false;
  isStolenArea: boolean = false;

  CITIZEN_PARAMS = {
    ID: null,
    STATION_ID: null,
    STATION_NAME: null,
    REPORT_TYPE: null,
    AREA: null,
    REPORT_FOR: null,
    MODEL_NAME: null,
    IMEI_NO: null,
    REG_NO: null,
    VEHICLE_TYPE: null,
    CHESSIS_NO: null,
    ENGINE_NO: null,
    VEHICLE_NAME: null,
    ITEM_NAME: null,
    DESCRIPTION: null,
    COLOR: null,
    INVOICE: null,
    ITEM_IMAGE: null,
    INCIDENT_DATE: null,
    FIR_NO_DATE: null,
    SECTION_LOGED: null,
    OWNER_NAME: null,
    FATHER_NAME: null,
    MOBILE_NO: null,
    EMAIL: null,
    ADDRESS: null,
    DISTRICT_ID: null,
    DISTRICT_NAME: null,
    OTHER_DISTRICT: null,
  };

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
    this.citizenReport = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.citizenReport) {
      this.CITIZEN_PARAMS.ID = this.citizenReport.id;
      this.CITIZEN_PARAMS.STATION_ID = this.citizenReport.stationId;
      this.CITIZEN_PARAMS.STATION_NAME = this.citizenReport.stationName;
      this.CITIZEN_PARAMS.REPORT_TYPE = this.citizenReport.reportType;
      this.CITIZEN_PARAMS.AREA = this.citizenReport.area;
      this.CITIZEN_PARAMS.REPORT_FOR = this.citizenReport.modelType;
      this.CITIZEN_PARAMS.MODEL_NAME = this.citizenReport.modelName;
      this.CITIZEN_PARAMS.IMEI_NO = this.citizenReport.modelNumber;
      this.CITIZEN_PARAMS.REG_NO = this.citizenReport.regNumber;
      this.CITIZEN_PARAMS.VEHICLE_TYPE = this.citizenReport.vehicleType;
      this.CITIZEN_PARAMS.CHESSIS_NO = this.citizenReport.chassisNumber;
      this.CITIZEN_PARAMS.ENGINE_NO = this.citizenReport.engineNo;
      this.CITIZEN_PARAMS.VEHICLE_NAME = this.citizenReport.modelName;
      this.CITIZEN_PARAMS.ITEM_NAME = this.citizenReport.itemName;
      this.CITIZEN_PARAMS.DESCRIPTION = this.citizenReport.description;
      this.CITIZEN_PARAMS.COLOR = this.citizenReport.color;
      this.CITIZEN_PARAMS.INCIDENT_DATE = this.citizenReport.citizenDate;
      this.CITIZEN_PARAMS.FIR_NO_DATE = this.citizenReport.firnoDate;
      this.CITIZEN_PARAMS.SECTION_LOGED = this.citizenReport.sectionFirLoged;
      this.CITIZEN_PARAMS.OWNER_NAME = this.citizenReport.citizenName;
      this.CITIZEN_PARAMS.FATHER_NAME = this.citizenReport.citizenFather;
      this.CITIZEN_PARAMS.MOBILE_NO = this.citizenReport.mobileNo;
      this.CITIZEN_PARAMS.EMAIL = this.citizenReport.emailid;
      this.CITIZEN_PARAMS.ADDRESS = this.citizenReport.citizenAddress;
      this.CITIZEN_PARAMS.DISTRICT_ID = this.citizenReport.districtId;
      this.CITIZEN_PARAMS.DISTRICT_NAME = this.citizenReport.districtName;
      this.CITIZEN_PARAMS.OTHER_DISTRICT = this.citizenReport.otherDistrict;
    }

    this.ADD_CITIZEN = this.global.checkForUserButtonPermission(
      AppConstants.CITIZEN_REPORT_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_CITIZEN = this.global.checkForUserButtonPermission(
      AppConstants.CITIZEN_REPORT_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.CITIZEN_REPORT_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.CITIZEN_REPORT_MODULE.EDIT_SUBMIT_URL;

    this.apiService
      .apiGetCall(AppConstants.PUBLIC_APIS.DISTRICTSFETCH, false)
      .subscribe((data) => {
        this.districtList = data.districtDTOs;
      });

    this.apiService
      .apiGetCall(AppConstants.PUBLIC_APIS.STATIONSFETCH, false)
      .subscribe((data) => {
        this.stationList = data.stationDtos;
      });
  }

  ngOnInit(): void {
    this.initCitizenReportForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initCitizenReportForm = () => {
    this.citizenReportForm = this.fb.group({
      id: this.CITIZEN_PARAMS.ID,
      policeStationId: [
        this.CITIZEN_PARAMS.STATION_ID,
        Validators.compose([Validators.required]),
      ],
      reportType: [
        this.CITIZEN_PARAMS.REPORT_TYPE,
        Validators.compose([Validators.required]),
      ],
      reportFor: [
        this.CITIZEN_PARAMS.REPORT_FOR,
        Validators.compose([Validators.required]),
      ],
      area: [this.CITIZEN_PARAMS.AREA],

      vehicleType: [this.CITIZEN_PARAMS.VEHICLE_TYPE],
      regNumber: [
        this.CITIZEN_PARAMS.REG_NO,
        Validators.compose([Validators.minLength(10)]),
      ],
      modelName: [this.CITIZEN_PARAMS.MODEL_NAME],
      imeiNumber: [
        this.CITIZEN_PARAMS.IMEI_NO,
        Validators.compose([Validators.minLength(16)]),
      ],
      chassisNumber: [
        this.CITIZEN_PARAMS.CHESSIS_NO,
        Validators.compose([Validators.minLength(17)]),
      ],
      engineNo: [
        this.CITIZEN_PARAMS.ENGINE_NO,
        Validators.compose([Validators.minLength(12)]),
      ],
      color: [this.CITIZEN_PARAMS.COLOR],
      incidentDate: [
        this.CITIZEN_PARAMS.INCIDENT_DATE,
        Validators.compose([Validators.required]),
      ],
      firnoDate: [this.CITIZEN_PARAMS.FIR_NO_DATE],
      sectionFirLoged: [this.CITIZEN_PARAMS.SECTION_LOGED],
      invoiceSource: [this.INVOICE],
      itemImageSource: [this.ITEMIMAGE],
      itemName: [this.CITIZEN_PARAMS.ITEM_NAME],
      vehicleName: [this.CITIZEN_PARAMS.VEHICLE_NAME],
      description: [this.CITIZEN_PARAMS.DESCRIPTION],
      name: [
        this.CITIZEN_PARAMS.OWNER_NAME,
        Validators.compose([Validators.required]),
      ],
      citizenFather: [this.CITIZEN_PARAMS.FATHER_NAME],
      email: [
        this.CITIZEN_PARAMS.EMAIL,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
      mobileNo: [this.CITIZEN_PARAMS.MOBILE_NO],
      address: [this.CITIZEN_PARAMS.ADDRESS],
      districtId: [this.CITIZEN_PARAMS.DISTRICT_ID],
      otherDistrict: [this.CITIZEN_PARAMS.OTHER_DISTRICT],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.citizenReportForm.controls;
    if (this.citizenReportForm.invalid && !this.citizenReportForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.citizenReport)
      formData.append('id', this.citizenReportForm.value['id']);
    formData.append(
      'policeStationId',
      this.citizenReportForm.value['policeStationId']
    );
    formData.append('reportType', this.citizenReportForm.value['reportType']);
    formData.append('reportFor', this.citizenReportForm.value['reportFor']);
    formData.append('area', this.citizenReportForm.value['area']);
    formData.append('vehicleType', this.citizenReportForm.value['vehicleType']);
    formData.append('regNumber', this.citizenReportForm.value['regNumber']);
    formData.append('modelName', this.citizenReportForm.value['modelName']);
    formData.append('imeiNumber', this.citizenReportForm.value['imeiNumber']);
    formData.append(
      'chassisNumber',
      this.citizenReportForm.value['chassisNumber']
    );
    formData.append('engineNo', this.citizenReportForm.value['engineNo']);
    formData.append('color', this.citizenReportForm.value['color']);
    var date: any[] = this.citizenReportForm.value['incidentDate'].split('-');
    formData.append('incidentDate', `${date[2]}/${date[1]}/${date[0]}`);
    formData.append('itemName', this.citizenReportForm.value['itemName']);
    formData.append('vehicleName', this.citizenReportForm.value['vehicleName']);
    formData.append('description', this.citizenReportForm.value['description']);
    formData.append('name', this.citizenReportForm.value['name']);
    formData.append('mobileNo', this.citizenReportForm.value['mobileNo']);
    formData.append('email', this.citizenReportForm.value['email']);
    formData.append('address', this.citizenReportForm.value['address']);
    formData.append('districtId', this.citizenReportForm.value['districtId']);
    if (this.citizenReportForm.value['otherDistrict'] != null)
      formData.append(
        'otherDistrict',
        this.citizenReportForm.value['otherDistrict']
      );
    formData.append('firnoDate', this.citizenReportForm.value['firnoDate']);
    formData.append(
      'sectionFirLoged',
      this.citizenReportForm.value['sectionFirLoged']
    );
    formData.append(
      'citizenFather',
      this.citizenReportForm.value['citizenFather']
    );

    if (this.INVOICE) {
      formData.append('invoiceSource', this.INVOICE, this.INVOICE.name);
    }
    if (this.ITEMIMAGE) {
      formData.append('itemImageSource', this.ITEMIMAGE, this.ITEMIMAGE.name);
    }

    if (this.citizenReportForm.value['id'])
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
    const control = this.citizenReportForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.citizenReportForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  goBack() {
    this._location.back();
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

  doCheckDistrict = (value) => {
    var district = value.options[value.selectedIndex].text;
    if (district == 'Other' || district == 'अन्य') {
      this.isOtherDistrict = true;
      this.citizenReportForm.patchValue({ policeStationId: null });
    } else {
      this.isOtherDistrict = false;
      this.citizenReportForm.patchValue({
        otherDistrict: null,
      });
    }
  };

  doCheckVehicleType = (value) => {
    var type = value.options[value.selectedIndex].text;
    if (type == 'Other' || type == 'अन्य') {
      this.isDescription = true;
      this.idOtherVehicle = true;
    } else {
      this.isDescription = false;
      this.idOtherVehicle = false;
      this.citizenReportForm.patchValue({ description: null });
      this.citizenReportForm.patchValue({ vehicleName: null });
    }
  };

  doCheckReportFor = (value) => {
    var type = value.options[value.selectedIndex].text;
    if (type == 'Mobile' || type == 'मोबाइल') {
      this.isForMobile = true;
      this.isForVehicle = false;
      this.isForOther = false;
      this.idOtherVehicle = false;
      this.citizenReportForm.patchValue({
        vehicleType: null,
        regNumber: null,
        engineNo: null,
        chassisNumber: null,
        vehicleName: null,
        itemName: null,
        description: null,
      });
    } else if (type == 'Vehicle' || type == 'वाहन') {
      this.isForMobile = false;
      this.isForVehicle = true;
      this.isForOther = false;
      this.idOtherVehicle = true;
      this.citizenReportForm.patchValue({
        modelName: null,
        imeiNumber: null,
        itemName: null,
      });

      if (type == 'Other' || type == 'अन्य') {
        this.isDescription = true;
        this.idOtherVehicle = true;
      } else {
        this.isDescription = false;
        this.idOtherVehicle = false;
        this.citizenReportForm.patchValue({
          description: null,
        });
        this.citizenReportForm.patchValue({
          vehicleName: null,
        });
      }
    } else if (type == 'Other' || type == 'अन्य') {
      this.isForMobile = false;
      this.isForVehicle = false;
      this.isForOther = true;
      this.idOtherVehicle = false;
      this.isDescription = true;
      this.citizenReportForm.patchValue({
        vehicleType: null,
        regNumber: null,
        engineNo: null,
        chassisNumber: null,
        vehicleName: null,
        modelName: null,
        imeiNumber: null,
      });
    } else {
      this.isForMobile = false;
      this.isForVehicle = false;
      this.isForOther = false;
      this.idOtherVehicle = false;
      this.isDescription = false;
    }
  };

  doCheckReportType = (value) => {
    var type = value.options[value.selectedIndex].text;
    if (type == 'Lost' || type == 'खो गया') {
      this.isLostArea = true;
      this.isFoundArea = false;
      this.isStolenArea = false;
      this.isColor = true;
      this.isFor = false;
      this.isIncidentDate = false;
      this.isInvoice = false;
      this.isItemImage = false;
      this.isPersonal = false;
      this.isSubmit = false;

      if (type == 'Mobile' || type == 'मोबाइल') {
        this.isForMobile = true;
        this.isForVehicle = false;
        this.isLostArea = true;
        this.isFoundArea = false;
        this.idOtherVehicle = false;
      } else if (type == 'Vehicle' || type == 'वाहन') {
        this.isForMobile = false;
        this.isForVehicle = true;
        this.isLostArea = true;
        this.isFoundArea = false;
        this.idOtherVehicle = true;
        if (type == 'Other' || type == 'अन्य') {
          this.isDescription = true;
          this.idOtherVehicle = true;
        } else {
          this.isDescription = false;
          this.idOtherVehicle = false;
          this.citizenReportForm.patchValue({
            description: null,
          });
          this.citizenReportForm.patchValue({
            vehicleName: null,
          });
        }
      } else if (type == 'Other' || type == 'अन्य') {
        this.isForMobile = false;
        this.isForVehicle = false;
        this.isLostArea = true;
        this.isFoundArea = false;
      }
      this.idOtherVehicle = false;
    } else if (type == 'Found' || type == 'मिल गया') {
      this.isLostArea = false;
      this.isFoundArea = true;
      this.isStolenArea = false;
      this.isColor = true;
      this.isFor = false;
      this.isIncidentDate = false;
      this.isInvoice = false;
      this.isItemImage = false;
      this.isPersonal = false;
      this.isSubmit = false;

      if (type == 'Mobile' || type == 'मोबाइल') {
        this.isForMobile = true;
        this.isForVehicle = false;
        this.isLostArea = false;
        this.isFoundArea = true;
        this.idOtherVehicle = false;
      } else if (type == 'Vehicle' || type == 'वाहन') {
        this.isForMobile = false;
        this.isForVehicle = true;
        this.isLostArea = false;
        this.isFoundArea = true;
        this.idOtherVehicle = true;
        if (type == 'Other' || type == 'अन्य') {
          this.isDescription = true;
          this.idOtherVehicle = true;
        } else {
          this.isDescription = false;
          this.idOtherVehicle = false;
          this.citizenReportForm.patchValue({
            description: null,
          });
          this.citizenReportForm.patchValue({
            vehicleName: null,
          });
        }
      } else if (type == 'Other' || type == 'अन्य') {
        this.isForMobile = false;
        this.isForVehicle = false;
        this.isLostArea = false;
        this.isFoundArea = true;
      }
      this.idOtherVehicle = false;
    } else if (type == 'Stolen' || type == 'चोरी हो गया') {
      this.isLostArea = false;
      this.isFoundArea = false;
      this.isStolenArea = true;
      this.isColor = true;
      this.isFor = false;
      this.isIncidentDate = false;
      this.isInvoice = false;
      this.isItemImage = false;
      this.isPersonal = false;
      this.isSubmit = false;
      if (type == 'Mobile' || type == 'मोबाइल') {
        this.isForMobile = true;
        this.isForVehicle = false;
        this.isLostArea = false;
        this.isFoundArea = true;
        this.idOtherVehicle = false;
      } else if (type == 'Vehicle' || type == 'वाहन') {
        this.isForMobile = false;
        this.isForVehicle = true;
        this.isLostArea = false;
        this.isFoundArea = true;
        this.idOtherVehicle = true;
        if (type == 'Other' || type == 'अन्य') {
          this.isDescription = true;
          this.idOtherVehicle = true;
        } else {
          this.isDescription = false;
          this.idOtherVehicle = false;
          this.citizenReportForm.patchValue({
            description: null,
          });
          this.citizenReportForm.patchValue({
            vehicleName: null,
          });
        }
      } else if (type == 'Other' || type == 'अन्य') {
        this.isForMobile = false;
        this.isForVehicle = false;
        this.isLostArea = false;
        this.isFoundArea = true;
      }
      this.idOtherVehicle = false;
    } else {
      this.isLostArea = false;
      this.isFoundArea = false;
      this.isForMobile = false;
      this.isForVehicle = false;
      this.isForOther = false;
      this.isVehicleType = false;
      this.isOtherDistrict = false;
    }
  };

  handleInvoiceChange = (file: FileList) => {
    this.INVOICE = file.item(0);
  };

  handleItemImageChange = (file: FileList) => {
    this.ITEMIMAGE = file.item(0);
  };

  focusOut = (event, name) => {
    this.citizenReportForm.patchValue({
      [name]: event.target.value,
    });
  };
}
