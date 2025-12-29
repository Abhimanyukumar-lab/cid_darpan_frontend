import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LangModule } from 'src/app/models/LangModule';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

import { select, Store } from '@ngrx/store';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  AppLoadderHide,
  AppLoadderShow,
} from 'src/app/storage/actions/app.actions';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ModelService } from 'src/app/common/popup/model.service';

const CITIZEN = {
  id: null,
  policeStationId: null,
  policeStationName: null,
  reportType: null,
  reportFor: null,
  lostArea: null,
  foundArea: null,
  area: null,
  vehicleType: null,
  regNumber: null,
  modelName: null,
  imeiNumber: null,
  chassisNumber: null,
  engineNo: null,
  color: null,
  incidentDate: null,
  invoice: null,
  itemImage: null,
  invoiceSource: null,
  itemImageSource: null,
  itemName: null,
  vehicleName: null,
  description: null,
  name: null,
  mobileNo: null,
  email: null,
  address: null,
  districtId: null,
  districtName: null,
  otherDistrict: null,
};

@Component({
  selector: 'app-citizen-report',
  templateUrl: './citizen-report.component.html',
  styleUrls: ['./citizen-report.component.scss'],
})
export class CitizenReportComponent implements OnInit, OnDestroy {
  subscription: any;
  //Check Status Variable

  baseUrl: string = AppConstants.backServer;
  citizenReportCheckStatusGroup: UntypedFormGroup;
  isOtp: boolean = false;
  showData: boolean = false;
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

  citizenReport: any;
  districtList: any[];
  stationList: any[];

  INVOICE: File = null;
  ITEMIMAGE: File = null;

  APP_ID: string = '';
  MODELTYPE: string = '';
  MODELNUMBER: string = '';
  currrentLang: string;
  isCompleted: boolean = false;

  REPORT_MSG_EN: string;
  REPORT_MSG_HI: string;

  max: Date = new Date();
  currentYear = this.max.getFullYear();
  currentMonth = this.max.getMonth();
  currentDay = this.max.getDate();
  currentTime = this.max.getHours();

  isStolen: boolean = false;
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

  iscsForMobile: boolean = false;
  iscsForVehicle: boolean = false;
  isblockAvail: boolean = false;

  citizenForm: UntypedFormGroup;
  constructor(
    private appStore: Store<{ app: any }>,
    private fb: UntypedFormBuilder,
    private global: GlobalFunctionsService,
    private localStorage: LocalstorageService,
    public langModule: LangModule,
    private apiCaller: ApiCallerService,
    private toaster: ToasterService,
    private modelService: ModelService
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;
    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.currrentLang = data.defaultLang;
    });

    this.citizenReport = this.localStorage.getStoredValue('editData');

    this.initAppForm();
    this.initCheckStatusForm();

    this.apiCaller
      .apiGetCall(AppConstants.PUBLIC_APIS.DISTRICTSFETCH, false)
      .subscribe((data) => {
        this.districtList = data.districtDTOs;
      });

    this.apiCaller
      .apiGetCall(AppConstants.PUBLIC_APIS.STATIONSFETCH, false)
      .subscribe((data) => {
        this.stationList = data.stationDtos;
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initAppForm() {
    this.citizenForm = this.fb.group({
      id: [CITIZEN.id],
      policeStationId: [
        CITIZEN.policeStationId,
        Validators.compose([Validators.required]),
      ],
      reportType: [
        CITIZEN.reportType,
        Validators.compose([Validators.required]),
      ],
      reportFor: [CITIZEN.reportFor, Validators.compose([Validators.required])],
      // lostArea: [CITIZEN.lostArea],
      // foundArea: [CITIZEN.foundArea],
      area: [CITIZEN.area],
      vehicleType: [CITIZEN.vehicleType],
      regNumber: [
        CITIZEN.regNumber,
        Validators.compose([Validators.minLength(10)]),
      ],
      modelName: [CITIZEN.modelName],
      imeiNumber: [
        CITIZEN.imeiNumber,
        Validators.compose([Validators.minLength(16)]),
      ],
      chassisNumber: [
        CITIZEN.chassisNumber,
        Validators.compose([Validators.minLength(17)]),
      ],
      engineNo: [
        CITIZEN.engineNo,
        Validators.compose([Validators.minLength(12)]),
      ],
      color: [CITIZEN.color],
      incidentDate: [
        CITIZEN.incidentDate,
        Validators.compose([Validators.required]),
      ],

      invoiceSource: [this.INVOICE], //, Validators.compose([Validators.required])
      itemImageSource: [this.ITEMIMAGE],
      itemName: [CITIZEN.itemName],
      vehicleName: [CITIZEN.vehicleName],
      description: [CITIZEN.description],
      name: [CITIZEN.name, Validators.compose([Validators.required])],
      email: [
        CITIZEN.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
      mobileNo: [
        CITIZEN.mobileNo,
        Validators.compose([Validators.required, Validators.minLength(10)]),
      ],
      address: [CITIZEN.address, Validators.compose([Validators.required])],
      districtId: [
        CITIZEN.districtId,
        Validators.compose([Validators.required]),
      ],
      otherDistrict: [CITIZEN.otherDistrict],
      // invoiceSource: null,
      // itemImageSource: null,
    });
  }

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.citizenForm.controls;
    if (this.citizenForm.invalid && !this.citizenForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );

      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    var formData = new FormData();

    if (this.citizenReport) formData.append('id', this.citizenForm.value['id']);
    formData.append(
      'policeStationId',
      this.citizenForm.value['policeStationId']
    );
    formData.append('reportType', this.citizenForm.value['reportType']);
    formData.append('reportFor', this.citizenForm.value['reportFor']);
    formData.append('area', this.citizenForm.value['area']);
    formData.append('vehicleType', this.citizenForm.value['vehicleType']);
    formData.append('regNumber', this.citizenForm.value['regNumber']);
    formData.append('modelName', this.citizenForm.value['modelName']);
    formData.append('imeiNumber', this.citizenForm.value['imeiNumber']);
    formData.append('chassisNumber', this.citizenForm.value['chassisNumber']);
    formData.append('engineNo', this.citizenForm.value['engineNo']);
    formData.append('color', this.citizenForm.value['color']);

    var date: any[] = this.citizenForm.value['incidentDate'].split('-');
    formData.append('incidentDate', `${date[2]}/${date[1]}/${date[0]}`);
    formData.append('itemName', this.citizenForm.value['itemName']);
    formData.append('vehicleName', this.citizenForm.value['vehicleName']);
    formData.append('description', this.citizenForm.value['description']);
    formData.append('name', this.citizenForm.value['name']);
    formData.append('mobileNo', this.citizenForm.value['mobileNo']);
    formData.append('email', this.citizenForm.value['email']);
    formData.append('address', this.citizenForm.value['address']);
    formData.append('districtId', this.citizenForm.value['districtId']);
    if (this.citizenForm.value['otherDistrict'] != null)
      formData.append('otherDistrict', this.citizenForm.value['otherDistrict']);

    if (this.INVOICE) {
      formData.append('invoiceSource', this.INVOICE, this.INVOICE.name);
    }

    if (this.ITEMIMAGE) {
      formData.append('itemImageSource', this.ITEMIMAGE, this.ITEMIMAGE.name);
    }

    this.apiCaller
      .apiFormDataPostCall(
        AppConstants.PUBLIC_APIS.CITIZENREPORTADD,
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
          this.MODELNUMBER = data.modelNumber;
          this.MODELTYPE = data.modelType;
          if (this.MODELTYPE == 'Mobile' || this.MODELTYPE == 'मोबाइल') {
            this.REPORT_MSG_EN = `Citizen Report Successfully Registered with ID ${this.APP_ID}/${this.currentYear}. Your citizen report for ${this.MODELTYPE} with IMEI No: ${this.MODELNUMBER}`;
            this.REPORT_MSG_HI = `आपका सिटिजन रिपोर्ट मोबाइल के लिए सफलतापूर्वक दर्ज कर ली गई है । जिसका आईडी संख्या है : ${this.APP_ID}/${this.currentYear} और IMEI नंबर है: ${this.MODELNUMBER}`;
            this.isCompleted = true;
          } else if (this.MODELTYPE == 'Vehicle' || this.MODELTYPE == 'वाहन') {
            this.REPORT_MSG_EN = `Citizen Report Successfully Registered with ID ${this.APP_ID}/${this.currentYear}. Your citizen report for ${this.MODELTYPE} with Chassis No: ${this.MODELNUMBER}`;
            this.REPORT_MSG_HI = `आपका सिटिजन रिपोर्ट वाहन के लिए सफलतापूर्वक दर्ज कर ली गई है। जिसका आईडी संख्या है : ${this.APP_ID}/${this.currentYear} और Chassis नंबर है: ${this.MODELNUMBER}`;
            this.isCompleted = true;
          } else {
            this.APP_ID = data.id;
            this.REPORT_MSG_EN = `Citizen Report Successfully Registered. Your Citizen Report Id Number : ${this.APP_ID}/${this.currentYear}`;
            this.REPORT_MSG_HI = `आपका सिटिजन रिपोर्ट सफलतापूर्वक दर्ज कर ली गई है। जिसका आईडी संख्या है : ${this.APP_ID}/${this.currentYear}`;
            this.isCompleted = true;
          }

          this.citizenForm.reset();
          this.isStolen = false;
          this.isLostArea = false;
          this.isFoundArea = false;
          this.isForMobile = false;
          this.isForVehicle = false;
          this.isForOther = false;
          this.isVehicleType = false;
          this.idOtherVehicle = false;
          this.isColor = false;
          this.isOtherDistrict = false;
          this.isDescription = false;
          this.isFor = false;
          this.isIncidentDate = false;
          this.isInvoice = false;
          this.isItemImage = false;
          this.isPersonal = false;
          this.isSubmit = false;
        },
        (error) => {
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  isControlHasErrors = (name: string) => {
    return this.global.isControlHasErrors(this.citizenForm, name);
  };

  isControlHasError = (name: string, methode: string) => {
    return this.global.isControlHasError(this.citizenForm, name, methode);
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

  doCheckDistrict = (value) => {
    var district = value.options[value.selectedIndex].text;
    if (district == 'Other' || district == 'अन्य') {
      this.isOtherDistrict = true;
    } else {
      this.isOtherDistrict = false;
      this.citizenForm.patchValue({
        otherDistrict: null,
      });
    }
  };

  doCheckVehicleType = (value) => {
    var type = value.options[value.selectedIndex].text;
    if (type == 'Other' || type == 'अन्य') {
      this.isDescription = true;
    } else {
      this.isDescription = false;
      this.citizenForm.patchValue({ description: null });
    }
  };

  doCheckReportFor = (value) => {
    var type = value.options[value.selectedIndex].text;
    if (type == 'Mobile' || type == 'मोबाइल') {
      this.isForMobile = true;
      this.isForVehicle = false;
      this.isForOther = false;
      this.idOtherVehicle = false;
      this.citizenForm.patchValue({
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
      this.citizenForm.patchValue({
        modelName: null,
        imeiNumber: null,
        itemName: null,
      });

      if (type == 'Other' || type == 'अन्य') {
        this.isDescription = true;
      } else {
        this.isDescription = false;
        this.citizenForm.patchValue({
          description: null,
        });
      }

      var data = this.citizenForm.get('reportType').value;

      if (data == 'Found') {
        this.citizenForm.get('invoiceSource').clearValidators();
      }
    } else if (type == 'Other' || type == 'अन्य') {
      this.isForMobile = false;
      this.isForVehicle = false;
      this.isForOther = true;
      this.idOtherVehicle = false;
      this.isDescription = true;
      this.citizenForm.patchValue({
        vehicleType: null,
        regNumber: null,
        engineNo: null,
        chassisNumber: null,
        vehicleName: null,
        modelName: null,
        imeiNumber: null,
      });
    } else {
      this.isStolen = false;
      this.isLostArea = false;
      this.isFoundArea = false;
      this.isForMobile = false;
      this.isForVehicle = false;
      this.isForOther = false;
      this.isVehicleType = false;
      this.idOtherVehicle = false;
      this.isColor = false;
      this.isOtherDistrict = false;
      this.isDescription = false;
      this.isFor = false;
      this.isIncidentDate = false;
      this.isInvoice = false;
      this.isItemImage = false;
      this.isPersonal = false;
      this.isSubmit = false;
    }
  };

  doCheckReportType = (value) => {
    var type = value.options[value.selectedIndex].text;
    if (type == 'Lost' || type == 'खो गया') {
      this.isStolen = false;
      this.isLostArea = true;
      this.isFoundArea = false;
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
        } else {
          this.isDescription = false;
        }
      } else if (type == 'Other' || type == 'अन्य') {
        this.isForMobile = false;
        this.isForVehicle = false;
        this.isLostArea = true;
        this.isFoundArea = false;
      }
      this.idOtherVehicle = false;
    } else if (type == 'Found' || type == 'मिल गया') {
      this.isStolen = false;
      this.isLostArea = false;
      this.isFoundArea = true;
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
        } else {
          this.isDescription = false;
        }

        this.citizenForm.get('invoiceSource').clearValidators();
      } else if (type == 'Other' || type == 'अन्य') {
        this.isForMobile = false;
        this.isForVehicle = false;
        this.isLostArea = false;
        this.isFoundArea = true;
      }
      this.idOtherVehicle = false;
    } else if (type == 'Stolen' || type == 'चोरी हो गया') {
      this.isStolen = true;
      this.isFor = false;
      this.isIncidentDate = false;
      this.isInvoice = false;
      this.isItemImage = false;
      this.isPersonal = false;
      this.isSubmit = false;
      this.isColor = false;
      this.idOtherVehicle = false;
      this.isLostArea = false;
      this.isFoundArea = false;
      this.isForMobile = false;
      this.isForVehicle = false;
      this.isForOther = false;
      this.isVehicleType = false;
      this.isOtherDistrict = false;
    } else {
      this.isStolen = false;
      this.isLostArea = false;
      this.isFoundArea = false;
      this.isForMobile = false;
      this.isForVehicle = false;
      this.isForOther = false;
      this.isVehicleType = false;
      this.idOtherVehicle = false;
      this.isColor = false;
      this.isOtherDistrict = false;
      this.isDescription = false;
      this.isFor = false;
      this.isIncidentDate = false;
      this.isInvoice = false;
      this.isItemImage = false;
      this.isPersonal = false;
      this.isSubmit = false;
    }
  };

  handleInvoiceChange = (file: FileList) => {
    this.INVOICE = file.item(0);
  };

  handleItemImageChange = (file: FileList) => {
    this.ITEMIMAGE = file.item(0);
  };

  //Check Status

  reportForSelected = (value) => {
    var forType = value.options[value.selectedIndex].text;

    if (forType == 'Mobile') {
      this.isblockAvail = true;
      this.iscsForMobile = true;
      this.iscsForVehicle = false;
    } else if (forType == 'Vehicle') {
      this.isblockAvail = true;
      this.iscsForMobile = false;
      this.iscsForVehicle = true;
    } else if (forType == 'Other') {
      this.isblockAvail = false;
      this.iscsForMobile = false;
      this.iscsForVehicle = false;
    } else {
      this.isblockAvail = false;
      this.iscsForMobile = false;
      this.iscsForVehicle = false;
    }
  };

  initCheckStatusForm = () => {
    this.citizenReportCheckStatusGroup = this.fb.group({
      id: ['', Validators.compose([Validators.required])],
      mobile: ['', Validators.compose([Validators.required])],
      reportType: [null, Validators.compose([Validators.required])],
      reportfor: [null, Validators.compose([Validators.required])],
      forValue: ['', Validators.compose([Validators.required])],
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
    const controls = this.citizenReportCheckStatusGroup.controls;
    if (
      this.citizenReportCheckStatusGroup.invalid &&
      !this.citizenReportCheckStatusGroup.valid
    ) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );

      this.alertType = 'danger';
      this.errorMsg = 'All fields are Required';

      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.CITIZEN_REPORT_OTP_CHECKSTATUS,
        this.citizenReportCheckStatusGroup.value,
        false,
        false,
        false
      )
      .subscribe(
        (data) => {
          this.alertType = 'success';
          this.errorMsg = data.message;

          this.citizenReportCheckStatusGroup.controls['id'].disable();
          this.citizenReportCheckStatusGroup.controls['mobile'].disable();
          this.citizenReportCheckStatusGroup.controls['reportType'].disable();
          this.citizenReportCheckStatusGroup.controls['reportfor'].disable();
          this.citizenReportCheckStatusGroup.controls['forValue'].disable();

          this.isOtp = true;
          this.citizenReportCheckStatusGroup.controls['otp'].patchValue(
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
    this.citizenReportCheckStatusGroup.controls['id'].enable();
    this.citizenReportCheckStatusGroup.controls['mobile'].enable();
    this.citizenReportCheckStatusGroup.controls['reportType'].enable();
    this.citizenReportCheckStatusGroup.controls['reportfor'].enable();
    this.citizenReportCheckStatusGroup.controls['forValue'].enable();
    var data = this.citizenReportCheckStatusGroup.value;
    this.citizenReportCheckStatusGroup.controls['id'].disable();
    this.citizenReportCheckStatusGroup.controls['mobile'].disable();
    this.citizenReportCheckStatusGroup.controls['reportType'].disable();
    this.citizenReportCheckStatusGroup.controls['reportfor'].disable();
    this.citizenReportCheckStatusGroup.controls['forValue'].disable();

    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.citizenReportCheckStatusGroup.controls;
    if (
      this.citizenReportCheckStatusGroup.invalid &&
      !this.citizenReportCheckStatusGroup.valid
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
        AppConstants.PUBLIC_APIS.CITIZEN_REPORT_CHECKSTATUS,
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

          this.citizenReportCheckStatusGroup.controls['id'].enable();
          this.citizenReportCheckStatusGroup.controls['mobile'].enable();
          this.citizenReportCheckStatusGroup.controls['reportType'].enable();
          this.citizenReportCheckStatusGroup.controls['reportfor'].enable();
          // this.citizenReportCheckStatusGroup.controls['forValue'].enable();
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

    this.citizenReportCheckStatusGroup.controls['id'].enable();
    this.citizenReportCheckStatusGroup.controls['mobile'].enable();
    this.citizenReportCheckStatusGroup.controls['reportType'].enable();
    this.citizenReportCheckStatusGroup.controls['reportfor'].enable();
    this.citizenReportCheckStatusGroup.controls['forValue'].enable();
    this.citizenReportCheckStatusGroup.reset();
  };

  focusOut = (event, name) => {
    this.citizenForm.patchValue({
      [name]: event.target.value,
    });
  };
}
