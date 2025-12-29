import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { CircleInspector } from 'src/app/models/CircleInspector';
import { District } from 'src/app/models/District';
import { LangModule } from 'src/app/models/LangModule';
import { Subdivision } from 'src/app/models/Subdivision';
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
  selector: 'app-modify-police-station',
  templateUrl: './modify-police-station.component.html',
  styleUrls: ['./modify-police-station.component.scss'],
})
export class ModifyPoliceStationComponent implements OnInit, OnDestroy {
  subscription: any;
  station: any;
  loading = false;
  stationForm: UntypedFormGroup;

  circleList: [];

  ADD_POLICE_STATION: boolean;
  EDIT_POLICE_STATION: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  LINKSOURCE: File = null;
  language: string;

  isCollapsed = true;

  RangeList: Range[];
  DistrictList: District[];
  SubDivisionList: Subdivision[];
  circleInspectorList: CircleInspector[];
  
  selectedDistrict : District[] = [];
  selectedSubDivisoin : Subdivision[] = [];
  selectedCircle: CircleInspector[] = [];
  
  POLICE_STATION_PARAMS = {
    ID: null,
    rangeId: null,
    districtId: null,
    SUBDIVISION_ID: null,
    CIRCLE_ID: null,
    CIRCLE_NAME: '',
    NAME: '',
    NAMEHI: '',
    MOBILE: '',
    AMBULANCE: '',
    HELPLINE: '',
    MEDICAL: '',
    FIRE_BRIGADE: '',
    EMAIL: '',
    DESCRIPTION: '',
    ADDRESS: '',
    URL: '',
    LINKSOURCE: '',
    PRIORITY: '',
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
    this.station = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.station) {
      this.POLICE_STATION_PARAMS.ID = this.station.id;
      this.POLICE_STATION_PARAMS.rangeId = this.station.rangeId;
      this.POLICE_STATION_PARAMS.districtId = this.station.districtId;
      this.POLICE_STATION_PARAMS.SUBDIVISION_ID = this.station.subdivisionId;
      this.POLICE_STATION_PARAMS.CIRCLE_ID = this.station.circleId;
      this.POLICE_STATION_PARAMS.CIRCLE_NAME = this.station.circleName;
      this.POLICE_STATION_PARAMS.NAME = this.station.stationName;
      this.POLICE_STATION_PARAMS.NAMEHI = this.station.stationNameHi;
      this.POLICE_STATION_PARAMS.MOBILE = this.station.stationNo;
      this.POLICE_STATION_PARAMS.DESCRIPTION = this.station.stationDesc;
      this.POLICE_STATION_PARAMS.EMAIL = this.station.stationEmail;
      this.POLICE_STATION_PARAMS.AMBULANCE = this.station.stationAmbulane;
      this.POLICE_STATION_PARAMS.MEDICAL = this.station.stationMedical;
      this.POLICE_STATION_PARAMS.HELPLINE = this.station.stationHelpline;
      this.POLICE_STATION_PARAMS.FIRE_BRIGADE = this.station.stationFireBrigade;
      this.POLICE_STATION_PARAMS.ADDRESS = this.station.stationAddress;
      this.POLICE_STATION_PARAMS.URL = this.station.stationUrl;
      this.POLICE_STATION_PARAMS.PRIORITY = this.station.stationPriority;
    }

    this.ADD_POLICE_STATION = this.global.checkForUserButtonPermission(
      AppConstants.POLICE_STATION_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_POLICE_STATION = this.global.checkForUserButtonPermission(
      AppConstants.POLICE_STATION_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.POLICE_STATION_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.POLICE_STATION_MODULE.EDIT_SUBMIT_URL;

    
    
    
    this.apiService
      .apiPostCall('getRange',{ stateId: 1 },true)
      .subscribe((data) => {
        this.RangeList = data.rangeDTOs;
      });
  
    this.apiService
      .apiGetCall('getDistricts',true)
      .subscribe((data) => {
        this.DistrictList = data.districtDTOs;
        this.selectRange();
      });

    this.apiService
      .apiGetCall(AppConstants.PUBLIC_APIS.FETCHSUBDIVISION, true)
      .subscribe((data) => {
        this.SubDivisionList = data.subdivisionDTOs;
        this.selectDistrict();
      });
    
    this.apiService
      .apiGetCall(AppConstants.PUBLIC_APIS.FETCHCIRCLEINSPECTOR, true)
      .subscribe((data) => {
        // this.circleList = data.circleInspectorDTO;
        this.circleInspectorList = data.circleInspectorDTO;
        this.selectSubDivision();
      });

  }

  ngOnInit(): void {
    this.initImageGalleryForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initImageGalleryForm = () => {
    this.stationForm = this.fb.group({
      id: this.POLICE_STATION_PARAMS.ID,
      rangeId: [
        this.POLICE_STATION_PARAMS.rangeId,
        Validators.compose([Validators.required]),
      ],
      districtId: [
        this.POLICE_STATION_PARAMS.districtId,
        Validators.compose([Validators.required]),
      ],
      subdivisionId: [
        this.POLICE_STATION_PARAMS.SUBDIVISION_ID,
        Validators.compose([Validators.required]),
      ],

      circleId: [
        this.POLICE_STATION_PARAMS.CIRCLE_ID,
        Validators.compose([Validators.required]),
      ],
      stationName: [
        this.POLICE_STATION_PARAMS.NAME,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      stationNameHi: [
        this.POLICE_STATION_PARAMS.NAMEHI,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      stationNo: [
        this.POLICE_STATION_PARAMS.MOBILE,
        Validators.compose([Validators.required]),
      ],
      stationUrl: [this.POLICE_STATION_PARAMS.URL],
      stationAmbulane: [this.POLICE_STATION_PARAMS.AMBULANCE],
      stationHelpline: [this.POLICE_STATION_PARAMS.HELPLINE],
      stationMedical: [this.POLICE_STATION_PARAMS.MEDICAL],
      stationFireBrigade: [this.POLICE_STATION_PARAMS.FIRE_BRIGADE],
      stationEmail: [
        this.POLICE_STATION_PARAMS.EMAIL,
        Validators.compose([
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      ],
      stationDesc: [this.POLICE_STATION_PARAMS.DESCRIPTION],
      stationAddress: [
        this.POLICE_STATION_PARAMS.ADDRESS,
        // Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      linkSource: [this.POLICE_STATION_PARAMS.LINKSOURCE],
      stationPriority: [
        this.POLICE_STATION_PARAMS.PRIORITY,
        // Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    });

    this.selectRange();
    this.selectDistrict();
    this.selectSubDivision();
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.stationForm.controls;
    if (this.stationForm.invalid && !this.stationForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.station) formData.append('id', this.stationForm.value['id']);
    formData.append('rangeId', this.stationForm.value['rangeId']);
    formData.append('districtId', this.stationForm.value['districtId']);
    formData.append('subdivisionId', this.stationForm.value['subdivisionId']);
    formData.append('circleId', this.stationForm.value['circleId']);
    // formData.append('circleName', this.stationForm.value['circleName']);
    formData.append('stationName', this.stationForm.value['stationName']);
    formData.append('stationNameHi', this.stationForm.value['stationNameHi']);
    formData.append('stationNo', this.stationForm.value['stationNo']);
    formData.append('stationDesc', this.stationForm.value['stationDesc']);
    formData.append('stationEmail', this.stationForm.value['stationEmail']);
    formData.append(
      'stationAmbulane',
      this.stationForm.value['stationAmbulane']
    );
    formData.append('stationMedical', this.stationForm.value['stationMedical']);
    formData.append(
      'stationFireBrigade',
      this.stationForm.value['stationFireBrigade']
    );
    formData.append(
      'stationHelpline',
      this.stationForm.value['stationHelpline']
    );
    formData.append('stationAddress', this.stationForm.value['stationAddress']);
    formData.append('stationUrl', this.stationForm.value['stationUrl']);
    // formData.append(
    //   'stationPriority',
    //   this.stationForm.value['stationPriority']
    // );
    formData.append('language', this.language);

    if (this.LINKSOURCE) {
      formData.append('linkSource', this.LINKSOURCE, this.LINKSOURCE.name);
    }

    if (this.stationForm.value['id'])
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
    const control = this.stationForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.stationForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  goBack() {
    this._location.back();
  }

  handleFileChange = (file: FileList) => {
    this.LINKSOURCE = file.item(0);
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

  focusOut = (event, name) => {
    this.stationForm.patchValue({
      [name]: event.target.value,
    });
  };

  toggle = () => {
    this.isCollapsed = !this.isCollapsed;
  };
 
  selectRange = () => {
    var rangeID = this.stationForm.value['rangeId'];
    if (rangeID)
      this.selectedDistrict = this.DistrictList?.filter(
        (a) => a.rangeId == rangeID
      );
  };

  selectDistrict = () => {
    var districtID = this.stationForm.value['districtId'];
    if (districtID)
      this.selectedSubDivisoin = this.SubDivisionList?.filter(
        (a) => a.districtId == districtID
      );
      // console.log("selectDistrict " +JSON.stringify(this.selectedSubDivisoin,null,2));
      
  };

  selectSubDivision = () => {
    var subDivisionID = this.stationForm.value['subdivisionId'];
    if (subDivisionID)
      this.selectedCircle = this.circleInspectorList?.filter(
        (a) => a.subdivisionId == subDivisionID
      );
  };
}
