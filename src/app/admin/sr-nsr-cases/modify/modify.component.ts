import { Location } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { select, Store } from '@ngrx/store';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import {
  AppLoadderHide,
  AppLoadderShow,
} from 'src/app/storage/actions/app.actions';
import { Subdivision } from 'src/app/models/Subdivision';
import { CircleInspector } from 'src/app/models/CircleInspector';
import { PoliceStation } from 'src/app/models/PoliceStation';
import { map, Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { User } from 'src/app/models/user';
import { PoliceOfficer } from 'src/app/models/PoliceOfficer';
import { StationUser } from 'src/app/models/StationUser';
import { District } from 'src/app/models/District';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModifyComponent {
  subscription: any;
  subscriptionDistrict: any;
  entry: any;
  loading = false;
  entryForm: FormGroup;

  ADD_ENTRY: boolean;
  EDIT_ENTRY: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  language: string;

  districtId: number;

  today = new Date();

  
  isCollapsed =  false;
  isCollapsed1 = false;
  isCollapsed2 = false;
  isCollapsed3 = false;
  
  toggle = () => {
    this.isCollapsed = !this.isCollapsed;
    this.isCollapsed1 = false;
    this.isCollapsed2 = false;
    this.isCollapsed3 = false;
    // this.showDossier =false;
    
  };
  toggle1 = () => {
    this.isCollapsed = false;
    this.isCollapsed1 = !this.isCollapsed1;
    this.isCollapsed2 = false;
    this.isCollapsed3 = false;

    // this.fetchDeceaseds();
    if(this.entry){
      this.fetchAccuseds();
      // this.fetchcriminalHistory();
    }
  };
  toggle2 = () => {
    this.isCollapsed = false;
    this.isCollapsed1 = false;
    this.isCollapsed2 = !this.isCollapsed2;
    this.isCollapsed3 = false;
    if(this.entry){
      this.fetchCaseProceeding();
    }
    // this.showDossier =false;
    // if(this.entry)this.fetchRecoveryDetails();
  };
  toggle3 = () => {
    this.isCollapsed =  false;
    this.isCollapsed1 = false;
    this.isCollapsed2 = false;
    this.isCollapsed3 = !this.isCollapsed3;
    // this.showDossier =false;
  };

  ENTRY_PARAMS = {
    ID: null,
    cidCrimeCategoryId: null,
    cidCrimeCategoryTypeId: null,
    cidDistrictId: null,
    SUBDIV_ID: null,
    CIRCLE_INSPECTOR_ID: null,
    STATION_ID: null,
    SRSNSRSTYPE: null,
    CidCrimeModusId: null,
    FIRNO: null,
    FIRDATE: null,
    section: null,
    LOCATION: null,
    village: null, 
    street: null,
    placeOfOccurance: null,
    date: null,
    NoOfKnownAccused: null,
    NoOfUnnownAccused: null,
    IoName: null,
    IoDesignation: null,
    IoMobile: null,
    
    srno: null,

    esakshya: null,
    
    comName: null,
    comAge: null,
    comGender: null,
    comMob: null,
    comFatName: null,
    comMotName: null,
  };

  majorHeads: any[] = [];
  subMajorHeads: any[] = [];
  selectedSubMajerHead: any[] = [];
  modusOperandis: any[] = [];
  selectedModusOperandi: any[] = [];
  subMajorHead: any;


  DistrictList: District[];
  SubDivisionList: Subdivision[];
  circleInspectorList: CircleInspector[];
  
  selectedDistrict : District[] = [];
  selectedSubDivisoin : Subdivision[] = [];
  selectedCircle: CircleInspector[] = [];

  subdivisionList: Subdivision[];
  stationList: PoliceStation[];
  IoOfficers: StationUser[] = [];

  selectedStations: PoliceStation[] = [];
  selectedIo: StationUser[] = [];
  


  stepperOrientation: Observable<StepperOrientation>;

  designationList: any[] = [];

  constructor(
    private appStore: Store<{ app: any }>,
    private userStore: Store<{ auth: User }>,
    private apiService: ApiCallerService,
    private localStorage: LocalstorageService,
    private fb: FormBuilder,
    private global: GlobalFunctionsService,
    private toaster: ToasterService,
    private _location: Location,
    breakpointObserver: BreakpointObserver
  ) {
    this.entry = this.localStorage.getStoredValue('editData');

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    this.subscriptionDistrict = this.userStore
      .pipe(select('auth'))
      .subscribe((data) => {
        this.districtId = data.user.districtId;
      });

    if (this.entry) {
      console.log(this.entry);
      
      this.ENTRY_PARAMS.ID = this.entry.id;
      this.ENTRY_PARAMS.cidCrimeCategoryId = this.entry.cidCrimeCategoryId;
      this.ENTRY_PARAMS.cidCrimeCategoryTypeId =
        this.entry.cidCrimeCategoryTypeId;
      this.ENTRY_PARAMS.cidDistrictId = this.entry.cidDistrictId;
      this.ENTRY_PARAMS.SUBDIV_ID = this.entry.cidSubDivisionId;
      this.ENTRY_PARAMS.CIRCLE_INSPECTOR_ID = this.entry.circleInspectorId;
      this.ENTRY_PARAMS.STATION_ID = this.entry.cidPoliceStationId;
      // this.ENTRY_PARAMS.STATION_ID = this.entry.policeStation.id;
      this.ENTRY_PARAMS.SRSNSRSTYPE = this.entry.srsNsrsType;
      this.ENTRY_PARAMS.srno = this.entry.srNo;
      this.ENTRY_PARAMS.CidCrimeModusId = this.entry.cidCrimeModusId;
      this.ENTRY_PARAMS.FIRNO = this.entry.firNo;

      const date = this.entry.firDate
        ? this.entry.firDate.split('T')[0].split('-')
        : null;
      this.ENTRY_PARAMS.FIRDATE = this.entry.firDate
        ? date[0] + '-' + date[1] + '-' + date[2]
        : null;

      this.ENTRY_PARAMS.section = this.entry.section;
      this.ENTRY_PARAMS.placeOfOccurance = this.entry.placeOfOccurance;
      this.ENTRY_PARAMS.LOCATION = this.entry.location;
      // this.ENTRY_PARAMS.village = this.entry.village; 
      // this.ENTRY_PARAMS.street = this.entry.street; 
      // this.ENTRY_PARAMS.NoOfKnownAccused = this.entry.noOfKnownAccused;

      this.ENTRY_PARAMS.date = this.entry.date;
      this.ENTRY_PARAMS.NoOfUnnownAccused = this.entry.noOfUnnownAccused;
      this.ENTRY_PARAMS.IoName = this.entry.ioId;
      // this.ENTRY_PARAMS.IoName = this.entry.ioName;
      // this.ENTRY_PARAMS.IoDesignation = this.entry.ioDesignation;
      // this.ENTRY_PARAMS.IoMobile = this.entry.ioMobile;
      
      this.ENTRY_PARAMS.esakshya = this.entry.esakshya;
      this.ENTRY_PARAMS.comName = this.entry.comName;
      this.ENTRY_PARAMS.comAge = this.entry.comAge;
      this.ENTRY_PARAMS.comGender = this.entry.comGender;
      this.ENTRY_PARAMS.comMob = this.entry.comMob;
      this.ENTRY_PARAMS.comFatName = this.entry.comFatName;
      this.ENTRY_PARAMS.comMotName = this.entry.comMotName;
      
    }

    this.ADD_ENTRY = this.global.checkForUserButtonPermission(
      AppConstants.SR_NSR_CASES_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_ENTRY = this.global.checkForUserButtonPermission(
      AppConstants.SR_NSR_CASES_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.SR_NSR_CASES_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.SR_NSR_CASES_MODULE.EDIT_SUBMIT_URL;

    this.apiService
      .apiGetCall('getDistricts',true)
      .subscribe((data) => {
        this.DistrictList = data.districtDTOs;
        // this.selectRange();
      });

    this.apiService
      .apiGetCall(AppConstants.PUBLIC_APIS.FETCHSUBDIVISION, true)
      .subscribe((data) => {
        this.SubDivisionList = data.subdivisionDTOs;
        this.selectDistrict();
      });

    this.apiService
      .apiGetCall(AppConstants.USER_MODULE.FETCH_CIRCLE_INSPCTOR, true)
      .subscribe((data) => {
        this.circleInspectorList = data.circleInspectorDTO;
        this.selectSubDivision();
      });

    this.apiService
      .apiGetCall(AppConstants.USER_MODULE.FETCH_STATION, true)
      .subscribe((data) => {
        this.stationList = data.stationDtos;
        // console.log(JSON.stringify(data,null,2));
        
        this.selectCircle();
      });
      
    this.apiService
      .apiGetCall(AppConstants.USER_MODULE.FETCH_ALL_STATION_USER, true)
      .subscribe((data) => {
        this.IoOfficers = data.stationUserDTOs;
        // console.log(JSON.stringify(data,null,2));
        
        this.selectIoDes();
      });

    this.apiService
      .apiGetCall(AppConstants.DESIGNATION_MODULE.GET_DESGN_LIST, true)
      .subscribe((data) => {
        this.designationList = data.designationDTOs;
      });

    this.fetchMajorHead();
    this.fetchSubMajorHead();
    this.fetchModusOperandi();
  }

  ngOnInit(): void {
    this.initiateForm();
    this.initVictimsForm(null);
    this.initDeceassedForm(null);
    this.initAccusedForm(null);
    this.initCaseProceeding(null);
    this.initTrailForm(null);
  }

  initiateForm = () => {
    console.log("this.districtId " + this.districtId);
    
    this.entryForm = this.fb.group({
      id: this.ENTRY_PARAMS.ID,
      cidCrimeCategoryId: [
        this.ENTRY_PARAMS.cidCrimeCategoryId,
        // Validators.compose([Validators.required]),
      ],
      cidCrimeCategoryTypeId: [
        this.ENTRY_PARAMS.cidCrimeCategoryTypeId,
        // Validators.compose([Validators.required]),
      ],
      // cidDistrictId: this.districtId,
      cidDistrictId: [
        this.ENTRY_PARAMS.cidDistrictId,
        // Validators.compose([Validators.required]),
      ],
      cidSubDivisionId: [
        this.ENTRY_PARAMS.SUBDIV_ID,
        // Validators.compose([Validators.required]),
      ],
      circleInspectorId: [
        this.ENTRY_PARAMS.CIRCLE_INSPECTOR_ID,
        // Validators.compose([Validators.required]),
      ],
      cidPoliceStationId: [
        this.ENTRY_PARAMS.STATION_ID,
        // Validators.compose([Validators.required]),
      ],
      srsNsrsType: [
        this.ENTRY_PARAMS.SRSNSRSTYPE,
        // Validators.compose([Validators.required]),
      ],
      srno: [
        this.ENTRY_PARAMS.srno,
        // Validators.compose([Validators.required]),
      ],
      // caseDetails: this.fb.group({
        cidCrimeModusId: [
          this.ENTRY_PARAMS.CidCrimeModusId,
          // Validators.compose([Validators.required]),
        ],
        firNo: [this.ENTRY_PARAMS.FIRNO],
        firDate: [this.ENTRY_PARAMS.FIRDATE],
        section: [
          this.ENTRY_PARAMS.section,
          // Validators.compose([Validators.required]),
        ],
        placeOfOccurance: [
          this.ENTRY_PARAMS.placeOfOccurance,
          // Validators.compose([Validators.required]),
        ],
        date: [
          this.ENTRY_PARAMS.date,
          // Validators.compose([Validators.required]),
        ],
        location: [this.ENTRY_PARAMS.LOCATION], 
        // village: [this.ENTRY_PARAMS.village], 
        // street: [this.ENTRY_PARAMS.street], 
        // noOfKnownAccused: [this.ENTRY_PARAMS.NoOfKnownAccused],
        // noOfUnnownAccused: [this.ENTRY_PARAMS.NoOfUnnownAccused],
        // ioName: [this.ENTRY_PARAMS.IoName],
        ioId: [this.ENTRY_PARAMS.IoName],
        // ioDesignation: [this.ENTRY_PARAMS.IoDesignation],
        // ioMobile: [this.ENTRY_PARAMS.IoMobile],
      // }),

      esakshya: [this.ENTRY_PARAMS.esakshya], 
      comName: [this.ENTRY_PARAMS.comName], 
      comAge: [this.ENTRY_PARAMS.comAge], 
      comGender: [this.ENTRY_PARAMS.comGender], 
      comMob: [this.ENTRY_PARAMS.comMob], 
      comFatName: [this.ENTRY_PARAMS.comFatName], 
      comMotName: [this.ENTRY_PARAMS.comMotName], 
    });

    this.selectDistrict();
    this.selectSubDivision();
    this.selectCircle();
    this.selectIoDes();

  };

  fetchMajorHead = () => {
    this.apiService.apiGetCall('getCIDCrimeCategoryList', true).subscribe(
      (data) => {
        this.majorHeads = data.cidCrimeCategories;
        // console.log(" this.majorHeads " + JSON.stringify(this.majorHeads,null,2));
        
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.appStore.dispatch(new AppLoadderHide({}));
      }
    );
  };

  changeOccurrenceDate = () => {
    var caseDetails = this.entryForm.controls['caseDetails'];

    caseDetails.patchValue({
      firDate: null,
    });
  };

  fetchSubMajorHead = () => {
    this.apiService.apiGetCall('getCIDCrimeCategoryTypeData', true).subscribe(
      (data) => {
        this.subMajorHeads = data.cidCrimeCategories;
        this.showSubMajorHead();
        this.selectSubMejerHead();
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.appStore.dispatch(new AppLoadderHide({}));
      }
    );
  };

  fetchModusOperandi = () => {
    this.apiService.apiPostCall('getCIDCrimeModus', {}, true).subscribe(
      (data) => {
        this.modusOperandis = data.cidCrimeModusList;
        this.loading = false;

        this.selectModusOperandi();
      },
      (error) => {
        this.loading = false;
        this.appStore.dispatch(new AppLoadderHide({}));
      }
    );
  };

  showSubMajorHead = () => {
    var categoryId = this.entryForm.value['cidCrimeCategoryId'];
    var subCategoryId = this.entryForm.value['cidCrimeCategoryTypeId'];

    if (categoryId) {
      this.selectedSubMajerHead = this.subMajorHeads.filter(
        (a) => a.cidCrimeCategoryId == categoryId
      );

      if (
        this.selectedSubMajerHead &&
        subCategoryId &&
        this.selectedSubMajerHead.filter((a) => a.id == subCategoryId).length ==
          0
      ) {
        this.entryForm.patchValue({
          cidCrimeCategoryTypeId: null,
        });
      }
    }
  };

  selectSubMejerHead = () => {
    var subMajorHeadID =
      this.entryForm.controls['cidCrimeCategoryTypeId'].value;
    this.subMajorHead = this.selectedSubMajerHead.filter(
      (subMajorHead) => subMajorHeadID == subMajorHead.id
    )[0];

    this.selectModusOperandi();
  };

  selectModusOperandi = () => {
    var categoryId = this.entryForm.value['cidCrimeCategoryId'];
    var subCategoryId = this.entryForm.value['cidCrimeCategoryTypeId'];
    var modusOperandi = this.entryForm.value['cidCrimeModusId'];

    if (categoryId && subCategoryId) {
      this.selectedModusOperandi = this.modusOperandis.filter(
        (modusOperandi) =>
          modusOperandi.cidCrimeCategoryId == categoryId &&
          modusOperandi.cidCrimeSubCategoryId == subCategoryId
      );
    } else {
      this.entryForm.patchValue({
        cidCrimeModusId: modusOperandi,
      });
    }
  };

  submit = () => {
    
    
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.entryForm.controls;
    if (this.entryForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }
    this.loading = true;


    if (this.entryForm.value['id'])
      this.apiService
        .apiPostCall(this.EDIT_URL, this.entryForm.value, true)
        .subscribe(
          (data) => {
            this.toaster.getToastMessage(
              data.message,
              'success',
              3000,
              'top-end'
            );

            if (this.subMajorHead?.allowVictim) this.fetchVictims();
            this.initVictimsForm(null);
            this.initDeceassedForm(null);
            this.initCaseProceeding(null);
            this.initAccusedForm(null);

            this.fetchDeceaseds();
            this.fetchAccuseds();

            this.loading = false;
          },
          (error) => {
            this.loading = false;
            this.appStore.dispatch(new AppLoadderHide({}));
          }
        );
    else
      this.apiService
        .apiPostCall(this.ADD_URL, this.entryForm.value, true)
        .subscribe(
          (data) => {
            this.toaster.getToastMessage(
              data.message,
              'success',
              3000,
              'top-end'
            );
            this.entryForm.patchValue({
              id: data.dataId,
            });
            if (this.subMajorHead?.allowVictim) this.fetchVictims();
            this.initVictimsForm(null);
            this.initDeceassedForm(null);
            this.initAccusedForm(null);
            this.initCaseProceeding(null);
            this.loading = false;
          },
          (error) => {
            this.loading = false;
            this.appStore.dispatch(new AppLoadderHide({}));
          }
        );
  };

  isControlHasError(
    controlName: string,
    validationType: string,
    form: FormGroup,
    subForm?: string
  ): boolean {
    var control = null;

    if (subForm)
      control = (form.controls[subForm] as FormGroup).controls[controlName];
    else control = form.controls[controlName];

    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(
    controlName: string,
    form: FormGroup,
    subForm?: string
  ): boolean {
    var control = null;

    if (subForm)
      control = (form.controls[subForm] as FormGroup).controls[controlName];
    else control = form.controls[controlName];

    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  goBack() {
    this.localStorage.destroyStoredValue('editData');
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

  focusOut = (event, name) => {
    this.entryForm.patchValue({
      [name]: event.target.value,
    });
  };

  
  selectDistrict = () => {
    var districtID = this.entryForm.value['cidDistrictId'];
    if (districtID)
      this.selectedSubDivisoin = this.SubDivisionList?.filter(
        (a) => a.districtId == districtID
      );
      // console.log("selectDistrict " +JSON.stringify(this.selectedSubDivisoin,null,2));
      
  };

  selectSubDivision = () => {
    var subDivisionID = this.entryForm.value['cidSubDivisionId'];
    if (subDivisionID)
      this.selectedCircle = this.circleInspectorList?.filter(
        (a) => a.subdivisionId == subDivisionID
      );
  };

  selectCircle = () => {
    var circleId = this.entryForm.value['circleInspectorId'];
    if (circleId)
      this.selectedStations = this.stationList?.filter(
        (a) => a.circleId == circleId
      );
  };

  selectIoDes = () => {
    var stationId = this.entryForm.value['cidPoliceStationId'];
    if (stationId)
      this.selectedIo = this.IoOfficers?.filter(
        (a) => a.stationId == stationId
      );
  };

  getShownHere = () => {
    return (
      this.entryForm.controls['cidCrimeCategoryId'].value &&
      this.entryForm.controls['cidCrimeCategoryTypeId'].value &&
      this.entryForm.controls['cidSubDivisionId'].value &&
      this.entryForm.controls['circleInspectorId'].value &&
      this.entryForm.controls['cidPoliceStationId'].value &&
      this.entryForm.controls['srsNsrsType'].value
    );
  };

  victimsForm: FormGroup;
  victims: any[] = [];

  initVictimsForm = (data: any) => {
    this.victimsForm = this.fb.group({
      id: data && data.id ? data.id : null,
      cidCrimeDataId: [
        this.entryForm.controls['id'].value,
        Validators.compose([Validators.required]),
      ],
      cav: [
        data && data.cav ? data.cav : null,
        Validators.compose([Validators.required]),
      ],
      name: [
        data && data.name ? data.name : null,
        Validators.compose([Validators.required]),
      ],
      age: data && data.age ? data.age : null,
      gender: [
        data && data.gender ? data.gender : null,
        Validators.compose([Validators.required]),
      ],
      fatherName: data && data.fatherName ? data.fatherName : null,
      motherName: data && data.motherName ? data.motherName : null,
      address: [data && data.address ? data.address : null],
      contact: [data && data.contact ? data.contact : null],
    });
  };

  fetchVictims = () => {
    this.apiService
      .apiPostCall(
        'getCIDCrimeDataVictim',
        { id: this.entryForm.controls['id'].value },
        true
      )
      .subscribe(
        (data) => {
          this.victims = data.cidCrimeVictimPeople;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  saveVictims = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.victimsForm.controls;
    if (this.victimsForm.invalid && !this.victimsForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    this.apiService
      .apiPostCall('addCIDCrimeDataVictim', this.victimsForm.value, true)
      .subscribe(
        (data) => {
          this.fetchVictims();
          this.victimsForm.reset();
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  deactivateCIDCrimeDataVictim = (id: number) => {
    this.apiService
      .apiPostCall(
        'deactivateCIDCrimeDataVictim',
        { cidCrimeVictimId: id },
        true
      )
      .subscribe(
        (data) => {
          this.fetchVictims();
          this.victimsForm.reset();
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  activateCIDCrimeDataVictim = (id: number) => {
    this.apiService
      .apiPostCall('activateCIDCrimeDataVictim', { cidCrimeVictimId: id }, true)
      .subscribe(
        (data) => {
          this.fetchVictims();
          this.victimsForm.reset();
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  deceassedForm: FormGroup;
  deceasseds: any[] = [];

  initDeceassedForm = (data: any) => {
    this.deceassedForm = this.fb.group({
      id: data && data.id ? data.id : null,
      cidCrimeDataId: [
        this.entryForm.controls['id'].value,
        Validators.compose([Validators.required]),
      ],
      name: [
        data && data.name ? data.name : null,
        Validators.compose([Validators.required]),
      ],
      age: data && data.age ? data.age : null,
      gender: data && data.gender ? data.gender : null,
      fatherName: data && data.fatherName ? data.fatherName : null,
      motherName: data && data.motherName ? data.motherName : null,
      address: [data && data.address ? data.address : null],
      contact: [data && data.contact ? data.contact : null],
    });
  };

  fetchDeceaseds = () => {
    this.apiService
      .apiPostCall(
        'getCIDCrimeDataDeceased',
        { id: this.entryForm.controls['id'].value },
        true
      )
      .subscribe(
        (data) => {
          this.deceasseds = data.cidCrimeDeceasedPeople;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  saveDeceased = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.deceassedForm.controls;
    if (this.deceassedForm.invalid && !this.deceassedForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    this.apiService
      .apiPostCall('addCIDCrimeDataDeceased', this.deceassedForm.value, true)
      .subscribe(
        (data) => {
          this.fetchDeceaseds();
          this.deceassedForm.reset();
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  deactivateCIDCrimeDataDeceased = (id: number) => {
    this.apiService
      .apiPostCall(
        'deactivateCIDCrimeDataDeceased',
        { cidCrimeDeceasedId: id },
        true
      )
      .subscribe(
        (data) => {
          this.fetchDeceaseds();
          this.deceassedForm.reset();
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  activateCIDCrimeDataDeceased = (id: number) => {
    this.apiService
      .apiPostCall(
        'activateCIDCrimeDataDeceased',
        { cidCrimeDeceasedId: id },
        true
      )
      .subscribe(
        (data) => {
          this.fetchDeceaseds();
          this.deceassedForm.reset();
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  accusedForm: FormGroup;
  accuseds: any[] = [];

  personImage: File = null;
  confessionStatement: File = null;

  selectedAccusedCircle: CircleInspector[] = [];
  selectedAccusedStations: PoliceStation[] = [];

  selectAccusedSubDivision = () => {
    var subDivisionID = this.accusedForm.value['subDivisionId'];
    if (subDivisionID)
      this.selectedAccusedCircle = this.circleInspectorList?.filter(
        (a) => a.subdivisionId == subDivisionID
      );
  };

  selectAccusedCircle = () => {
    var circleId = this.accusedForm.value['circleInspectorId'];
    if (circleId)
      this.selectedAccusedStations = this.stationList?.filter(
        (a) => a.circleId == circleId
      );
  };

  initAccusedForm = (data: any) => {
    
    this.accusedForm = this.fb.group({
      id: data && data.id ? data.id : null,
      cidCrimeDataId: [
        this.entryForm.controls['id'].value,
        Validators.compose([Validators.required]),
      ],
      fir: [
        data && data.fir ? data.fir : null,
        // Validators.compose([Validators.required]),
      ],
      name: [
        data && data.name ? data.name : '',
        // Validators.compose([Validators.required]),
      ],
      fatherName: [data && data.fatherName ? data.fatherName : ''],
      motherName: [data && data.motherName ? data.motherName : ''],
      age: [data && data.age ? data.age : ''],
      gender: [
        data && data.gender ? data.gender : null,
        // Validators.compose([Validators.required]),
      ],
      address: [data && data.address ? data.address : ''],
      presentStatus: [
        data && data.presentStatus ? data.presentStatus : null,
        // Validators.compose([Validators.required]),
      ],
      // cidDistrictId: this.districtId,
      // subDivisionId: [
      //   data && data.subDivisionId ? data.subDivisionId : null,
      //   Validators.compose([Validators.required]),
      // ],
      // circleInspectorId: [
      //   data && data.circleInspectorId ? data.circleInspectorId : null,
      //   Validators.compose([Validators.required]),
      // ],
      // policeStationId: [
      //   data && data.policeStationId ? data.policeStationId : null,
      //   Validators.compose([Validators.required]),
      // ],
      personImage: [null],
      confessionStatement: [null],
      chargesheet: [data && data.chargesheet ? data.chargesheet : null],
      // dossierNo: [data && data.dossierNo ? data.dossierNo : ''],
      // confessionalStatement: [null],
      // chargesheetDetails: [
      //   data && data.chargesheetDetails ? data.chargesheetDetails : null,
      // ],
      // sectionFoundTrue: [
      //   data && data.sectionFoundTrue
      //     ? data.sectionFoundTrue
      //     : this.entryForm.controls['caseDetails'].get('section').value,
      // ],
    });

    // this.selectAccusedSubDivision();
    // this.selectAccusedCircle();
  };

  fetchAccuseds = () => {
    this.apiService
      .apiPostCall(
        'getCIDCrimeDataAccused',
        { id: this.entryForm.controls['id'].value },
        true
      )
      .subscribe(
        (data) => {
          this.accuseds = data.cidCrimeAccusedPeople;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  saveAccused = () => {
    const controls = this.accusedForm.controls;
    var id = this.accusedForm.get('id').value;

    // if (
    //   id == null &&
    //   this.accuseds &&
    //   this.accuseds.length ==
    //     (this.entryForm.controls['caseDetails'].value['noOfKnownAccused']
    //       ? this.entryForm.controls['caseDetails'].value['noOfKnownAccused']
    //       : 0)
    // ) {
    //   this.toaster.getToastMessage(
    //     'Allowed only number of known accused enter at case details',
    //     'error',
    //     3000,
    //     'top'
    //   );
    //   return;
    // }

    this.appStore.dispatch(new AppLoadderShow({}));
    if (this.accusedForm.invalid && !this.accusedForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();
    if (this.accusedForm.get('id').value)
      formData.append('id', this.accusedForm.get('id').value);
    formData.append(
      'cidCrimeDataId',
      this.accusedForm.get('cidCrimeDataId').value
    );
    formData.append('name', this.accusedForm.get('name').value);
    formData.append('age', this.accusedForm.get('age').value);
    formData.append('gender', this.accusedForm.get('gender').value);
    formData.append('fir', this.accusedForm.get('fir').value);
    formData.append('fatherName', this.accusedForm.get('fatherName').value);
    formData.append('motherName', this.accusedForm.get('motherName').value);
    formData.append('address', this.accusedForm.get('address').value);
    formData.append('chargesheet', this.accusedForm.get('chargesheet').value);
    // formData.append(
    //   'chargesheetDetails',
    //   this.accusedForm.get('chargesheetDetails').value
    // );
    // formData.append(
    //   'cidDistrictId',
    //   this.accusedForm.get('cidDistrictId').value
    // );
    // formData.append(
    //   'subDivisionId',
    //   this.accusedForm.get('subDivisionId').value
    // );
    // formData.append(
    //   'circleInspectorId',
    //   this.accusedForm.get('circleInspectorId').value
    // );
    // formData.append(
    //   'policeStationId',
    //   this.accusedForm.get('policeStationId').value
    // );
    formData.append(
      'presentStatus',
      this.accusedForm.get('presentStatus').value
    );
    // formData.append('dossierNo', this.accusedForm.get('dossierNo').value);
    // if (this.accusedForm.get('confessionalStatement').value)
    //   formData.append(
    //     'confessionalStatement',
    //     this.accusedForm.get('confessionalStatement').value
    //   );
    if (this.personImage)
      formData.append('personImage', this.personImage, this.personImage.name);

    if (this.confessionStatement)
      formData.append(
        'confessionStatement',
        this.confessionStatement,
        this.confessionStatement.name
      );
    // if (this.accusedForm.get('sectionFoundTrue').value)
    //   formData.append(
    //     'sectionFoundTrue',
    //     this.accusedForm.get('sectionFoundTrue').value
    //   );

    this.apiService
      .apiFormDataPostCall('addCIDCrimeDataAccused', formData, true)
      .subscribe(
        (data) => {
          this.toaster.getToastMessage(
              data.message,
              'success',
              3000,
              'top-end'
            );
          this.fetchAccuseds();
          this.accusedForm.reset();
          this.loading = false;
          this.initAccusedForm(null);
        },
        (error) => {
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  handleFileChange = (file: FileList) => {
    this.personImage = file.item(0);
  };

  handleFileStatementChange = (file: FileList) => {
    this.confessionStatement = file.item(0);
  };

  deactivateCIDCrimeDataAccused = (id: number) => {
    this.apiService
      .apiPostCall(
        'deactivateCIDCrimeDataAccused',
        { cidCrimeAccusedId: id },
        true
      )
      .subscribe(
        (data) => {
          this.fetchAccuseds();
          this.accusedForm.reset();
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  activateCIDCrimeDataAccused = (id: number) => {
    this.apiService
      .apiPostCall(
        'activateCIDCrimeDataAccused',
        { cidCrimeAccusedId: id },
        true
      )
      .subscribe(
        (data) => {
          this.fetchAccuseds();
          this.accusedForm.reset();
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  caseProceeding: FormGroup;

  forensicReport: File = null;
  postmortem: File = null;
  caseDocument: File = null;

  handleForensicFileChange = (file: FileList) => {
    this.forensicReport = file.item(0);
  };

  handlePostmortemFileChange = (file: FileList) => {
    this.postmortem = file.item(0);
  };

  handleCaseDocumentsFileChange = (file: FileList) => {
    this.caseDocument = file.item(0);
  };

  initCaseProceeding = (data) => {
    this.caseProceeding = this.fb.group({
      id: data && data.id ? data.id : null,
      cidCrimeDataId: [
        this.entryForm.controls['id'].value,
        Validators.compose([Validators.required]),
      ],
      pr: [data && data.pr ? data.pr : null],
      prDate: [data && data.prDate ? data.prDate : null],
      prPreparedBy: [data && data.prPreparedBy ? data.prPreparedBy : null],
      prRemarks: [data && data.prRemarks ? data.prRemarks : null],
      srNo: [data && data.srNo ? data.srNo : null],
      caseDairy: [data && data.caseDairy ? data.caseDairy : null],
      caseDairyNo: [data && data.caseDairyNo ? data.caseDairyNo : null],
      sNote: [data && data.sNote ? data.sNote : null],
      sNoteDate: [data && data.sNoteDate ? data.sNoteDate : null],
      sNoteBy: [data && data.sNoteBy ? data.sNoteBy : null],
      sNoteRemarks: [data && data.sNoteRemarks ? data.sNoteRemarks : null],
      newSubHeadAdded: [
        data && data.newSubHeadAdded ? data.newSubHeadAdded : null,
      ],
      // pendingFor: [data && data.pendingFor ? data.pendingFor : null],
      // postmortem: [data && data.postmortem ? data.postmortem : null],
      // postmortemFile: [null],
      // compensation: [data && data.compensation ? data.compensation : null],
      // armedTest: [data && data.armedTest ? data.armedTest : null],
      // explosiveTest: [data && data.explosiveTest ? data.explosiveTest : null],
      // forensicReport: [
      //   data && data.forensicReport ? data.forensicReport : null,
      // ],
      // forensicReportFile: [null],
      // prosecutionSection: [
      //   data && data.prosecutionSection ? data.prosecutionSection : null,
      // ],
      chargesheetReport: [
        data && data.chargesheetReport ? data.chargesheetReport : null,
      ],
      ff: [data && data.ff ? data.ff : null],
      currentCaseStatus: [
        data && data.currentCaseStatus ? data.currentCaseStatus : null,
      ],
      caseFinalHead: [data && data.caseFinalHead ? data.caseFinalHead : null],
      caseDocument: [null],
      caseDocumentType: [
        data && data.caseDocumentType ? data.caseDocumentType : null,
      ],
      report: [data && data.report1 ? data.report1 : null],
      reportDate: [data && data.report1Date ? data.report1Date : null],
      reportPreparedBy: [data && data.reportPreparedBy ? data.reportPreparedBy : null],
      reportRemarks: [data && data.reportRemarks ? data.reportRemarks : null],
      // report2: [data && data.report2 ? data.report2 : null],
      // report2Date: [data && data.report2Date ? data.report2Date : null],
      // report345: [data && data.report345 ? data.report345 : null],
      // report3Date: [data && data.report3Date ? data.report3Date : null],
    });
  };

  fetchCaseProceeding = () => {
    this.apiService
      .apiPostCall(
        'getCIDCrimeDataCaseProceeding',
        { cidCrimeDataId: this.entryForm.controls['id'].value },
        true
      )
      .subscribe(
        (data) => {
          this.initCaseProceeding(data.cidCrimeCaseProceeding);
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  saveCaseProceeding = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.caseProceeding.controls;
    if (this.caseProceeding.invalid && !this.caseProceeding.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;
    // console.log("this.caseProceeding.value" + JSON.stringify(this.caseProceeding.value));
    

    var formData = new FormData();
    if (this.caseProceeding.get('id').value)
      formData.append('id', this.caseProceeding.get('id').value);

    if (this.caseProceeding.get('cidCrimeDataId').value)
      formData.append(
        'cidCrimeDataId',
        this.caseProceeding.get('cidCrimeDataId').value
      );

    if (this.caseProceeding.get('sNote').value)
      formData.append('sNote', this.caseProceeding.get('sNote').value);

    if (this.caseProceeding.get('sNoteDate').value)
      formData.append('sNoteDate', this.caseProceeding.get('sNoteDate').value);

    if (this.caseProceeding.get('sNoteBy').value)
      formData.append('sNoteBy', this.caseProceeding.get('sNoteBy').value);

    if (this.caseProceeding.get('sNoteRemarks').value)
      formData.append('sNoteRemarks', this.caseProceeding.get('sNoteRemarks').value);

    // if (this.caseProceeding.get('newSubHeadAdded').value)
    //   formData.append(
    //     'newSubHeadAdded',
    //     this.caseProceeding.get('newSubHeadAdded').value
    //   );

    // if (this.caseProceeding.get('pendingFor').value)
    //   formData.append(
    //     'pendingFor',
    //     this.caseProceeding.get('pendingFor').value
    //   );

    // if (this.caseProceeding.get('postmortem').value)
    //   formData.append(
    //     'postmortem',
    //     this.caseProceeding.get('postmortem').value
    //   );

    // if (this.caseProceeding.get('postmortemFile').value)
    //   if (this.postmortem)
    //     formData.append(
    //       'postmortemFile',
    //       this.postmortem,
    //       this.postmortem.name
    //     );

    // if (this.caseProceeding.get('compensation').value)
    //   formData.append(
    //     'compensation',
    //     this.caseProceeding.get('compensation').value
    //   );

    // if (this.caseProceeding.get('armedTest').value)
    //   formData.append('armedTest', this.caseProceeding.get('armedTest').value);

    // if (this.caseProceeding.get('explosiveTest').value)
    //   formData.append(
    //     'explosiveTest',
    //     this.caseProceeding.get('explosiveTest').value
    //   );

    // if (this.caseProceeding.get('forensicReport').value)
    //   formData.append(
    //     'forensicReport',
    //     this.caseProceeding.get('forensicReport').value
    //   );

    // if (this.caseProceeding.get('forensicReportFile').value)
    //   if (this.forensicReport)
    //     formData.append(
    //       'forensicReportFile',
    //       this.forensicReport,
    //       this.forensicReport.name
    //     );

    // if (this.caseProceeding.get('prosecutionSection').value)
    //   formData.append(
    //     'prosecutionSection',
    //     this.caseProceeding.get('prosecutionSection').value
    //   );

    if (this.caseProceeding.get('chargesheetReport').value)
      formData.append(
        'chargesheetReport',
        this.caseProceeding.get('chargesheetReport').value
      );

    if (this.caseProceeding.get('caseDairyNo').value)
      formData.append('caseDairyNo', this.caseProceeding.get('caseDairyNo').value);

    if (this.caseProceeding.get('ff').value)
      formData.append('ff', this.caseProceeding.get('ff').value);

    if (this.caseProceeding.get('currentCaseStatus').value)
      formData.append(
        'currentCaseStatus',
        this.caseProceeding.get('currentCaseStatus').value
      );

    if (this.caseProceeding.get('caseFinalHead').value)
      formData.append(
        'caseFinalHead',
        this.caseProceeding.get('caseFinalHead').value
      );

    if (this.caseProceeding.get('caseDocumentType').value)
      formData.append(
        'caseDocumentType',
        this.caseProceeding.get('caseDocumentType').value
      );

    if (this.caseDocument)
      formData.append(
        'caseDocument',
        this.caseDocument,
        this.caseDocument.name
      );

    if (this.caseProceeding.get('report').value)
      formData.append('report', this.caseProceeding.get('report').value);

    if (this.caseProceeding.get('reportDate').value)
      formData.append(
        'reportDate',
        this.caseProceeding.get('reportDate').value
      );

    if (this.caseProceeding.get('reportPreparedBy').value)
      formData.append('reportPreparedBy', this.caseProceeding.get('reportPreparedBy').value);
    if (this.caseProceeding.get('reportRemarks').value)
      formData.append('reportRemarks', this.caseProceeding.get('reportRemarks').value);

    // if (this.caseProceeding.get('report2').value)
    //   formData.append('report2', this.caseProceeding.get('report2').value);

    // if (this.caseProceeding.get('report2Date').value)
    //   formData.append(
    //     'report2Date',
    //     this.caseProceeding.get('report2Date').value
    //   );

    // if (this.caseProceeding.get('report345').value)
    //   formData.append('report345', this.caseProceeding.get('report345').value);

    // if (this.caseProceeding.get('report3Date').value)
    //   formData.append(
    //     'report3Date',
    //     this.caseProceeding.get('report3Date').value
    //   );

    if (this.caseProceeding.get('pr').value)
      formData.append('pr', this.caseProceeding.get('pr').value);

    if (this.caseProceeding.get('prDate').value)
      formData.append('prDate', this.caseProceeding.get('prDate').value);

    if (this.caseProceeding.get('prPreparedBy').value)
      formData.append('prPreparedBy', this.caseProceeding.get('prPreparedBy').value);

    if (this.caseProceeding.get('prRemarks').value)
      formData.append('prRemarks', this.caseProceeding.get('prRemarks').value);

    if (this.caseProceeding.get('srNo').value)
      formData.append('srNo', this.caseProceeding.get('srNo').value);

    if (this.caseProceeding.get('caseDairy').value)
      formData.append('caseDairy', this.caseProceeding.get('caseDairy').value);

    this.apiService
      .apiFormDataPostCall('addCIDCrimeDataCaseProceeding', formData, true)
      .subscribe(
        (data) => {

          this.toaster.getToastMessage(
              data.message,
              'success',
              3000,
              'top-end'
            );
          this.loading = false;
          // this.goBack();
        },
        (error) => {
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  TrailForm: FormGroup;

  trailData: any[] = [];

  initTrailForm = (data: any) => {
    this.TrailForm = this.fb.group({
      id: data && data.id ? data.id : null,
      cidCrimeDataId: [
        this.entryForm.controls['id'].value,
        Validators.compose([Validators.required]),
      ],
      courtName: [
        data && data.courtName ? data.courtName : null,
      ],
      // Validators.compose([Validators.required]),
      courtSupervisedBy: data && data.courtSupervisedBy ? data.courtSupervisedBy : null,
      trialDate: data && data.trialDate ? data.trialDate : null,
      nextTrialDate: data && data.nextTrialDate ? data.nextTrialDate : null,
      remarks: [data && data.remarks ? data.remarks : null],
    });
  };

  fetchTrails = () => {
    // this.apiService
    //   .apiPostCall(
    //     'getCIDCrimeDataDeceased',
    //     { id: this.entryForm.controls['id'].value },
    //     true
    //   )
    //   .subscribe(
    //     (data) => {
    //       this.deceasseds = data.cidCrimeDeceasedPeople;
    //       this.loading = false;
    //     },
    //     (error) => {
    //       this.loading = false;
    //       this.appStore.dispatch(new AppLoadderHide({}));
    //     }
    //   );
  };

  saveTrails = () => {

    console.log("trail form "+ this.TrailForm.value['id']);
    console.log("trail form "+ this.TrailForm.value['cidCrimeDataId']);
    console.log("trail form "+ this.TrailForm.value['courtName']);
    console.log("trail form "+ this.TrailForm.value['courtSupervisedBy']);
    console.log("trail form "+ this.TrailForm.value['trialDate']);
    console.log("trail form "+ this.TrailForm.value['nextTrialDate']);
    console.log("trail form "+ this.TrailForm.value['remarks']);
    return;
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.TrailForm.controls;
    if (this.TrailForm.invalid && !this.TrailForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    // this.apiService
    //   .apiPostCall('addCIDCrimeDataDeceased', this.deceassedForm.value, true)
    //   .subscribe(
    //     (data) => {
    //       this.fetchDeceaseds();
    //       this.deceassedForm.reset();
    //       this.loading = false;
    //     },
    //     (error) => {
    //       this.loading = false;
    //       this.appStore.dispatch(new AppLoadderHide({}));
    //     }
    //   );
  };

  photoFile: File = null;

  handleFileChangeNew = (file: FileList, property: string, inputElement: HTMLInputElement) => {
    const selectedFile = file.item(0);
  
    if (selectedFile) {
      const fileType = selectedFile.type.split('/')[0]; // 'image', 'application', etc.
      const fileSizeMB = selectedFile.size / (1024 * 1024);
      const maxSizeMB = (fileType === 'image') ? 1 : 2;
      if (fileSizeMB > maxSizeMB) {
        inputElement.value = '';
        alert(`File size exceeds the maximum limit of ${maxSizeMB} MB.`);
        return;
      } 
      switch (property) {
        case 'photoFile':
          this.photoFile = selectedFile;
          break;
      }
      
    }
  };
}
