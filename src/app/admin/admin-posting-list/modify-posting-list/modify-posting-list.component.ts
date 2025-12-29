import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { CircleInspector } from 'src/app/models/CircleInspector';
import { LangModule } from 'src/app/models/LangModule';
import { PoliceStation } from 'src/app/models/PoliceStation';
import { StationUser } from 'src/app/models/StationUser';
import { Subdivision } from 'src/app/models/Subdivision';
import { User } from 'src/app/models/user';
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
  selector: 'app-modify-posting-list',
  templateUrl: './modify-posting-list.component.html',
  styleUrls: ['./modify-posting-list.component.scss'],
})
export class ModifyPostingListComponent implements OnInit, OnDestroy {
  
  selectedRange: string;
  selectedDistrict: string;
  selectedCrimeHead: string;
  selectedCrimeSubHead: string;

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

  ENTRY_PARAMS = {
    
    id: null,
    prisonerName: null,
    fatherName: null,
    gender: null,
    age: null,
    firNoDate: null,
    policeStation: null,
    presentAddress: null,
    permanentAddress: null,
    district: null,
    releaseDate: null,
    sectionAct: null,
    jailId: null,
    prisonId: null,
    
    SUBDIV_ID: null,
    CIRCLE_INSPECTOR_ID: null,
    STATION_ID: null,
    IoDesignation: null,
    

  };
  
  isCollapsed = true;
  isCollapsed1 = true;
  isCollapsed2 = true;
  isCollapsed3 = true;

  majorHeads: any[] = [];
  subMajorHeads: any[] = [];
  selectedSubMajerHead: any[] = [];
  modusOperandis: any[] = [];
  selectedModusOperandi: any[] = [];
  subMajorHead: any;

  subdivisionList: Subdivision[];
  circleInspectorList: CircleInspector[];
  stationList: PoliceStation[];
  IoOfficers: StationUser[] = [];

  selectedCircle: CircleInspector[] = [];
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
    breakpointObserver: BreakpointObserver,
    private router: Router,
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
        
        this.ENTRY_PARAMS.id = this.entry.id;
      this.ENTRY_PARAMS.prisonerName = this.entry.prisonerName;
      this.ENTRY_PARAMS.fatherName = this.entry.fatherName;
      this.ENTRY_PARAMS.gender = this.entry.gender;
      this.ENTRY_PARAMS.age = this.entry.age;
      this.ENTRY_PARAMS.firNoDate = this.entry.firNoDate;
      this.ENTRY_PARAMS.policeStation = this.entry.policeStation;
      this.ENTRY_PARAMS.presentAddress = this.entry.presentAddress;
      this.ENTRY_PARAMS.permanentAddress = this.entry.permanentAddress;
      this.ENTRY_PARAMS.district = this.entry.district;
      this.ENTRY_PARAMS.releaseDate = this.entry.releaseDate;
      this.ENTRY_PARAMS.sectionAct = this.entry.sectionAct;
      this.ENTRY_PARAMS.jailId = this.entry.jailId;
      this.ENTRY_PARAMS.prisonId = this.entry.prisonId;
      

    }
    // console.log("Ranggggggggge ",this.entryForm.get('range').value);


    this.apiService
      .apiGetCall(AppConstants.USER_MODULE.FETCH_SUBDIV, true)
      .subscribe((data) => {
        this.subdivisionList = data.subdivisionDTOs;
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

    this.ADD_ENTRY = this.global.checkForUserButtonPermission(
      AppConstants.SR_NSR_CASES_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_ENTRY = this.global.checkForUserButtonPermission(
      AppConstants.SR_NSR_CASES_MODULE.EDIT_SUBMIT_DATA
    );

    // this.ADD_URL = AppConstants.PrisonerReleased_MODULE.ADD_SUBMIT_URL;
    // this.EDIT_URL = AppConstants.PrisonerReleased_MODULE.EDIT_SUBMIT_URL;

    // if (this.entryForm.value['id']){
    // if (this.EDIT_URL){
      // this.fetchDeceaseds();
      // this.fetchVictims();
      // this.fetchDeceaseds();
      // this.fetchAccuseds();
      // this.fetchCaseProceeding();
      // this.fetchRunningStatus();
    // }
    
    // this.fetchMajorHead();
    // this.fetchSubMajorHead();
    // this.fetchModusOperandi();
  }
  toggle = () => {
    this.isCollapsed = !this.isCollapsed;
    this.isCollapsed1 = false;
    this.isCollapsed2 = false;
    this.isCollapsed3 = false;
    // this.fetchDeceaseds();
  };
  toggle1 = () => {
    this.isCollapsed = false;
    this.isCollapsed1 = !this.isCollapsed1;
    this.isCollapsed2 = false;
    this.isCollapsed3 = false;
    // this.fetchVictims();
    // this.fetchDeceaseds();
  };
  toggle2 = () => {
    this.isCollapsed = false;
    this.isCollapsed1 = false;
    this.isCollapsed2 = !this.isCollapsed2;
    this.isCollapsed3 = false;
    // this.fetchAccuseds();
  };
  toggle3 = () => {
    this.isCollapsed = false;
    this.isCollapsed1 = false;
    this.isCollapsed2 = false;
    this.isCollapsed3 = !this.isCollapsed3;
    
    if(this.router.url=="/official/prisonerReleased/edit"){
      // console.log("prisonerReleased");
      
      this.fetchRunningStatus();
    }
  };

  ngOnInit(): void {
    
    
    this.initiateForm();
    this.initRunningStatusForm(null);
  }

  initiateForm = () => {
    this.entryForm = this.fb.group({
      id: this.ENTRY_PARAMS.id,
      prisonerName: [this.ENTRY_PARAMS.prisonerName],
      fatherName: [this.ENTRY_PARAMS.fatherName],
      gender: [this.ENTRY_PARAMS.gender],
      age: [this.ENTRY_PARAMS.age],
      firNoDate: [this.ENTRY_PARAMS.firNoDate],
      policeStation: [this.ENTRY_PARAMS.policeStation],
      presentAddress: [this.ENTRY_PARAMS.presentAddress],
      permanentAddress: [this.ENTRY_PARAMS.permanentAddress],
      district: [this.ENTRY_PARAMS.district],
      releaseDate: [this.ENTRY_PARAMS.releaseDate],
      sectionAct: [this.ENTRY_PARAMS.sectionAct],
      jailId: [this.ENTRY_PARAMS.jailId],
      prisonId: [this.ENTRY_PARAMS.prisonId],

      // cidDistrictId: this.districtId,

      // cidCrimeCategoryId: [
      //   this.ENTRY_PARAMS.cidCrimeCategoryId,
      //   // Validators.compose([Validators.required]),
      // ],
      // cidCrimeCategoryTypeId: [
      //   this.ENTRY_PARAMS.cidCrimeCategoryTypeId,
      //   // Validators.compose([Validators.required]),
      // ],

      // trial
      // firNo: [this.ENTRY_PARAMS.FIRNO],
      //   firDate: [this.ENTRY_PARAMS.FIRDATE],
      //   section: [
      //     this.ENTRY_PARAMS.section,
      //     Validators.compose([Validators.required]),
      //   ],
        // location: [this.ENTRY_PARAMS.name],
        // placeOfOccurance: [
        //   this.ENTRY_PARAMS.fatherHusbandName,
        //   // Validators.compose([Validators.required]),
        // ],
        // date: [
        //   this.ENTRY_PARAMS.date,
        //   // Validators.compose([Validators.required]),
        // ],
        // noOfKnownAccused: [this.ENTRY_PARAMS.motherName],
        // noOfUnnownAccused: [this.ENTRY_PARAMS.husbandWifeName],
        // ioName: [this.ENTRY_PARAMS.IoName],
        ioDesignation: [this.ENTRY_PARAMS.IoDesignation],
        // ioMobile: [this.ENTRY_PARAMS.IoMobile],
      
      
      cidDistrictId: this.districtId,
      cidSubDivisionId: [
        this.ENTRY_PARAMS.SUBDIV_ID,
      ],
      circleInspectorId: [
        this.ENTRY_PARAMS.CIRCLE_INSPECTOR_ID,
      ],
      cidPoliceStationId: [
        this.ENTRY_PARAMS.STATION_ID,
      ],
      // srsNsrsType: [
      //   this.ENTRY_PARAMS.SRSNSRSTYPE,
      //   Validators.compose([Validators.required]),
      // ],
      // caseDetails: this.fb.group({
      //   cidCrimeModusId: [
      //     this.ENTRY_PARAMS.CidCrimeModusId,
      //     Validators.compose([Validators.required]),
      //   ],
      //   firNo: [this.ENTRY_PARAMS.FIRNO],
      //   firDate: [this.ENTRY_PARAMS.FIRDATE],
      //   section: [
      //     this.ENTRY_PARAMS.section,
      //     Validators.compose([Validators.required]),
      //   ],
      //   location: [this.ENTRY_PARAMS.LOCATION],
      //   placeOfOccurance: [
      //     this.ENTRY_PARAMS.placeOfOccurance,
      //     Validators.compose([Validators.required]),
      //   ],
      //   date: [
      //     this.ENTRY_PARAMS.date,
      //     Validators.compose([Validators.required]),
      //   ],
      //   noOfKnownAccused: [this.ENTRY_PARAMS.NoOfKnownAccused],
      //   noOfUnnownAccused: [this.ENTRY_PARAMS.NoOfUnnownAccused],
      //   ioName: [this.ENTRY_PARAMS.IoName],
        // ioDesignation: [this.ENTRY_PARAMS.IoDesignation],
      //   ioMobile: [this.ENTRY_PARAMS.IoMobile],
      // }),
    });
    // this.selectSubDivision();
    // this.selectCircle();
      // this.fetchVictims();
      // this.fetchDeceaseds();
      // this.fetchAccuseds();
      // this.fetchCaseProceeding();
      // this.fetchRunningStatus();
  };
  



  saveBasicDetails(): void {
    
    
    const obj = this.entryForm.value;
    
    
    const controls = this.entryForm.controls;
    
    this.appStore.dispatch(new AppLoadderShow({}));
    
    if (this.entryForm.invalid && !this.entryForm.valid) {
      
      Object.keys(controls).forEach((controlName) => {
        
        var subControlls = (this.entryForm.controls[controlName] as FormGroup)
          .controls;

        if (subControlls)
          Object.keys(subControlls).forEach((subControlName) => {
            
            subControlls[subControlName].markAsTouched();
          });
        else controls[controlName].markAsTouched();
      });
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;
    

    // if (this.entryForm.value['id'])
    //   this.apiService
    //     .apiFormDataPostCall(this.EDIT_URL, formData, true)
    //     .subscribe(
    //       (data) => {
    //         this.toaster.getToastMessage(
    //           data.message,
    //           'success',
    //           3000,
    //           'top-end'
    //         );
            
    //         this.initVictimsForm(null);
    //         this.initDeceassedForm(null);
    //         this.initCaseProceeding(null);
    //         this.initAccusedForm(null);
    //         this.initRunningStatusForm(null);
    //         this.fetchDeceaseds();
    //         this.fetchVictims();
    //         this.fetchAccuseds();
    //         this.fetchCaseProceeding();
    //         this.fetchRunningStatus();

    //         // stepper.next();
    //         this.loading = false;
    //       },
    //       (error) => {
    //         this.toaster.getToastMessage(
    //           error.message,
    //           'error',
    //           3000,
    //           'top-end'
    //         );
    //         this.loading = false;
    //         this.appStore.dispatch(new AppLoadderHide({}));
    //       }
    //     );
    // else
    // // console.log("Success");
    // // console.log("FOrmdata ",JSON.stringify(formData,null,2));
    
    //   this.apiService
    //     .apiFormDataPostCall(this.ADD_URL, formData, true)
    //     .subscribe(
    //       (data) => {
    //         this.toaster.getToastMessage(
    //           data.message,
    //           'success',
    //           3000,
    //           'top-end'
    //         );
    //         this.entryForm.patchValue({
    //           id: data.dataId,
    //         });
    //         this.fetchVictims();
    //         this.initVictimsForm(null);
    //         this.initDeceassedForm(null);
    //         this.initAccusedForm(null);
    //         this.initCaseProceeding(null);
    //         this.initRunningStatusForm(null);
    //         // stepper.next();
    //         this.loading = false;
    //       },
    //       (error) => {
    //         this.loading = false;
    //         this.appStore.dispatch(new AppLoadderHide({}));
    //         this.toaster.getToastMessage(
    //           error.message,
    //           'error',
    //           3000,
    //           'top-end'
    //         );
    //       }
    //     );

    
    this.apiService
    .apiPostCall(this.ADD_URL, this.entryForm.value, true)
    .subscribe(
      (data) => {
          // console.log("DAta ",JSON.stringify(data,null,2));
          this.toaster.getToastMessage(
            data.message,
            'success',
            3000,
            'top-end'
          );
          this.entryForm.patchValue({
            id: data.dataId,
          });
          
            this.entryForm.reset();
            this.initRunningStatusForm(null);
          
          this.loading = false;

        },
        (error) => {
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
          this.toaster.getToastMessage(
            error.message,
            'error',
            3000,
            'top-end'
          );
        }
      );
      // console.log("after api hit")
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


  personImage: File = null;
  confessionStatement: File = null;

  handleFileChange = (file: FileList) => {
    this.personImage = file.item(0);
  };

  handleFileStatementChange = (file: FileList) => {
    this.confessionStatement = file.item(0);
  };


  caseProceeding: FormGroup;
  verifications: any[] = [];


  forensicReport: File = null;
  postmortem: File = null;
  caseDocument: File = null;
  photo : File = null;
  Attachment : File = null;
  photograph : File = null;
  attachment : File = null;

  handleForensicFileChange = (file: FileList) => {
    this.forensicReport = file.item(0);
  };

  handlePostmortemFileChange = (file: FileList) => {
    this.postmortem = file.item(0);
  };

  handleCaseDocumentsFileChange = (file: FileList) => {
    this.caseDocument = file.item(0);
  };

  // ============

  runningStatusForm : FormGroup;
  runningStatuses: any[] = [];

  initRunningStatusForm = (data: any) => {
    this.runningStatusForm = this.fb.group({
      id: data && data.id ? data.id : null,
      cidCrimeDataId: [
        this.entryForm.controls['id'].value,
        // Validators.compose([Validators.required]),
      ],
      date: [data && data.date ? data.date : ''],
      details: [data && data.details ? data.details : ''],
      source: [data && data.source ? data.source : ''],
      remarksRS: [data && data.remarks ? data.remarks : ''],
    });
  };

  saveRunningStatus = () => {
    // alert("Here")
    // const runningStatusForm = this.runningStatusForm.value;
    // console.log("runningStatusForm "+JSON.stringify(this.runningStatusForm.value,null,2));
    
    const controls = this.runningStatusForm.controls;
    var id = this.runningStatusForm.get('id').value;

    this.appStore.dispatch(new AppLoadderShow({}));
    if (this.runningStatusForm.invalid && !this.runningStatusForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      // console.log("return running Status");
      
      return;
    }

    this.loading = true;
    
    this.apiService
      .apiPostCall('addPrisonerReleasedMonitoringRunningStatus', this.runningStatusForm.value, true)
      .subscribe(
        (data) => {
          this.toaster.getToastMessage(
            data.message,
            'success',
            3000,
            'top-end'
          );

          this.fetchRunningStatus();
          this.runningStatusForm.reset();
          this.loading = false;
          this.initRunningStatusForm(null);
        },
        (error) => {
          this.toaster.getToastMessage(
            error.message,
            'error',
            3000,
            'top-end'
          );
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  deactivateCIDCrimeDataRunningStatus = (id: number) => {
    this.apiService
      .apiPostCall(
        'deactivatePrisonerReleasedRunningStatus',
        { runningStatusId: id },
        true
      )
      .subscribe(
        (data) => {
          // console.log("Delete", JSON.stringify(data,null,2));
          this.toaster.getToastMessage(
            data.message,
            'success',
            3000,
            'top-end'
          );
          this.fetchRunningStatus();
          // this.fetchRunningStatus.reset();
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  fetchRunningStatus = () => {
    this.apiService
      .apiPostCall(
        'getPrisonerReleasedRunningStatus',
        {cidCrimeDataId: this.entryForm.controls['id'].value},
        true
      )
      .subscribe(
        (data) => {
          // console.log("Running Status Fetched ", JSON.stringify(data,null,2));
          
          this.runningStatuses = data.prisonerReleasedRunningStatus;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };


  handleFileChangeNew = (file: FileList, property: string, inputElement: HTMLInputElement) => {
    const selectedFile = file.item(0);
  // console.log("selectedFile ",selectedFile);
  
    // Check if a file is selected
    if (selectedFile) {
      // Check file type
      const fileType = selectedFile.type.split('/')[0]; // 'image', 'application', etc.
  
      // console.log("fileType ",fileType);
      
      // Check file size in megabytes
      const fileSizeMB = selectedFile.size / (1024 * 1024);
      // console.log("fileSizeMB ",fileSizeMB);
      // Define max sizes based on file type
      const maxSizeMB = (fileType === 'image') ? 1 : 2;
      // console.log("maxSizeMB ",maxSizeMB);
      if (fileSizeMB > maxSizeMB) {
        // Display an alert or modal for exceeding the size limit
        inputElement.value = '';
        alert(`File size exceeds the maximum limit of ${maxSizeMB} MB.`);
        return;
      }
  
      // Further processing based on property (e.g., assign to a property)
      switch (property) {
        case 'forensicReport':
          this.forensicReport = selectedFile;
          break;
        case 'postmortem':
          this.postmortem = selectedFile;
          break;
        case 'caseDocument':
          this.caseDocument = selectedFile;
        case 'photo':
          this.photo = selectedFile;
        case 'Attachment':
          this.Attachment = selectedFile;
          break;
        case 'photograph':
          this.photograph = selectedFile;
          break;
        case 'attachment':
          this.attachment = selectedFile;
          break;
      }
    }
  };

  
  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

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

}
