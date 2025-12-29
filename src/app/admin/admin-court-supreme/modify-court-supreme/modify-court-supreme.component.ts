import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { DatePipe, formatDate, Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { CircleInspector } from 'src/app/models/CircleInspector';
import { District } from 'src/app/models/District';
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
  selector: 'app-modify-court-supreme',
  templateUrl: './modify-court-supreme.component.html',
  styleUrls: ['./modify-court-supreme.component.scss'],
})
export class ModifyCourtSupremeComponent implements OnInit, OnDestroy {
  
  selectedRange: string;
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

  rangeId: number;
  districtId: number;
  subDivisionId: number;
  circleId: number;
  stationId: number;

  today = new Date();
  TrainingList :any;
  ENTRY_PARAMS = {
    
    id: null,
    name: null,
    email: null,
    mobileNo: null,
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
    designationId: null,
    districtId: null,
    rangeId: null,
    type: null,
    image: null,
    

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

  RangeList: Range[];
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
        this.rangeId = data.user.rangeId;
        this.districtId = data.user.districtId;
        this.subDivisionId = data.user.subdivisionId;
        this.circleId = data.user.circleInspectorId;
        this.stationId = data.user.stationId;
        // console.log("data.user  " + JSON.stringify(data.user,null,2));
        
      });
      
    if (this.entry) {
        
        this.ENTRY_PARAMS.id = this.entry.id;
        this.ENTRY_PARAMS.rangeId = this.entry.rangeId;
        this.ENTRY_PARAMS.districtId = this.entry.districtId;
      this.ENTRY_PARAMS.SUBDIV_ID = this.entry.subdivisionId;
      this.ENTRY_PARAMS.CIRCLE_INSPECTOR_ID = this.entry.circleId;
      this.ENTRY_PARAMS.STATION_ID = this.entry.stationId;
      this.ENTRY_PARAMS.name = this.entry.name;
      this.ENTRY_PARAMS.email = this.entry.email;
      this.ENTRY_PARAMS.mobileNo = this.entry.mobileNo;
      this.ENTRY_PARAMS.designationId = this.entry.designationId;
      this.ENTRY_PARAMS.type = this.entry.type;
      // this.ENTRY_PARAMS.districtId = this.entry.districtId;
      // this.ENTRY_PARAMS.photoFile = this.entry.photoFile;
      

    }
    

    // this.apiService
    //   .apiGetCall(AppConstants.USER_MODULE.FETCH_SUBDIV, true)
    //   .subscribe((data) => {
    //     this.subdivisionList = data.subdivisionDTOs;
    //   });
     
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
  
    // this.apiService
    //   .apiGetCall(AppConstants.USER_MODULE.FETCH_ALL_STATION_USER, true)
    //   .subscribe((data) => {
    //     this.IoOfficers = data.stationUserDTOs;
    //     // console.log(JSON.stringify(data,null,2));
        
    //     this.selectIoDes();
    //   });

    this.apiService
      .apiGetCall(AppConstants.DESIGNATION_MODULE.GET_DESGN_LIST, true)
      .subscribe((data) => {
        this.designationList = data.designationDTOs;
      });

    this.apiService
      .apiGetCall('getAllTrainings', true)
      .subscribe((data) => {
        this.TrainingList = data.trainingList;
      });

    this.ADD_ENTRY = this.global.checkForUserButtonPermission(
      AppConstants.SR_NSR_CASES_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_ENTRY = this.global.checkForUserButtonPermission(
      AppConstants.SR_NSR_CASES_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.SUPER_COURT_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.SUPER_COURT_MODULE.EDIT_SUBMIT_URL;

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
      
      // rangeId : null,
      // districtId : null,
      // subdivisionId : null,
      // circleId : null,
      // stationId : null,

      // rangeId: [
      //   this.ENTRY_PARAMS.rangeId,
      //   // Validators.compose([Validators.required]),
      // ],
      // districtId: [
      //   this.ENTRY_PARAMS.districtId,
      //   // Validators.compose([Validators.required]),
      // ],
      // subdivisionId: [
      //   this.ENTRY_PARAMS.SUBDIV_ID,
      //   // Validators.compose([Validators.required]),
      // ],
      // circleId: [
      //   this.ENTRY_PARAMS.CIRCLE_INSPECTOR_ID,
      //   // Validators.compose([Validators.required]),
      // ],
      // stationId: [
      //   this.ENTRY_PARAMS.STATION_ID,
      //   // Validators.compose([Validators.required]),
      // ],
      type: [
        this.ENTRY_PARAMS.type,
        Validators.compose([Validators.required]),
      ],
      name: [this.ENTRY_PARAMS.name],
      email: [this.ENTRY_PARAMS.email],
      mobileNo: [
        this.ENTRY_PARAMS.mobileNo,
        Validators.compose([Validators.required]),
      ],
      
      designationId: [
        this.ENTRY_PARAMS.designationId,
        Validators.compose([Validators.required]),
      ],
      
      image: [this.ENTRY_PARAMS.image],

      // districtId: this.districtId,
      
    });
    
    // this.selectRange();
    // this.selectDistrict();
    // this.selectSubDivision();
    // this.selectCircle();
  
  };
  


  image: File = null;

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

    var formData = new FormData();

    if (this.entry && this.entryForm.value['id']) {
      formData.append('id', this.entryForm.value['id']);
    }
    
    if (this.rangeId) {
      formData.append('rangeId', this.rangeId.toString() );
    }
    
    if (this.districtId) {
      formData.append('districtId', this.districtId.toString() );
    }
    
    if (this.subDivisionId ) {
      formData.append('subdivisionId', this.subDivisionId.toString() );
    }
    
    if (this.circleId) {
      formData.append('circleId', this.circleId.toString() );
    }
    
    if (this.stationId) {
      formData.append('stationId', this.stationId.toString() );
    }
    
    if (this.entryForm.value['name']) {
      formData.append('name', this.entryForm.value['name']);
    }
    
    if (this.entryForm.value['email']) {
      formData.append('email', this.entryForm.value['email']);
    }
    
    if (this.entryForm.value['mobileNo']) {
      formData.append('mobileNo', this.entryForm.value['mobileNo']);
    }
    
    if (this.entryForm.value['type']) {
      formData.append('type', this.entryForm.value['type']);
    }
    if(this.entryForm.value['designationId']){
      formData.append('designationId', this.entryForm.value['designationId']);
    }
    if (this.image) {
      formData.append('image', this.image, this.image.name);
    }

    
    this.apiService
    .apiFormDataPostCall(this.ADD_URL, formData, true)
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
          
          this.initRunningStatusForm(null);
          // this.entryForm.reset();
          
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


  confessionStatement: File = null;

  handleFileChange = (file: FileList) => {
    this.image = file.item(0);
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
    // console.log("iddddd "+ this.entryForm.controls['id'].value);
    
    this.runningStatusForm = this.fb.group({
      id: data && data.id ? data.id : null,
      tmsId: [
        this.entryForm.controls['id'].value,
        // Validators.compose([Validators.required]),
      ],
      trainingId: [data && data.trainingId ? data.trainingId : ''],
      awardReward: [data && data.awardReward ? data.awardReward : ''],
      startDate: [data && data.startDate ? data.startDate : ''],
      endDate: [data && data.endDate ? data.endDate : ''],
      document: [null],
      remarks: [data && data.remarks ? data.remarks : ''],
    });
  };

  saveRunningStatus = () => {
    // alert("Here")
    const runningStatusForm = this.runningStatusForm.value;
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
      .apiPostCall('addUserTrainingType', this.runningStatusForm.value, true)
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

  // deactivateCIDCrimeDataRunningStatus = (id: number) => {
  //   this.apiService
  //     .apiPostCall(
  //       'deactivatePrisonerReleasedRunningStatus',
  //       { runningStatusId: id },
  //       true
  //     )
  //     .subscribe(
  //       (data) => {
  //         // console.log("Delete", JSON.stringify(data,null,2));
  //         this.toaster.getToastMessage(
  //           data.message,
  //           'success',
  //           3000,
  //           'top-end'
  //         );
  //         this.fetchRunningStatus();
  //         // this.fetchRunningStatus.reset();
  //         this.loading = false;
  //       },
  //       (error) => {
  //         this.loading = false;
  //         this.appStore.dispatch(new AppLoadderHide({}));
  //       }
  //     );
  // };

  fetchRunningStatus = () => {
    this.apiService
      .apiPostCall(
        'getUserTrainingTypeList',
        {id: this.entryForm.controls['id'].value},
        true
      )
      .subscribe(
        (data) => {
          // console.log("Running Status Fetched ", JSON.stringify(data,null,2));
          
          this.runningStatuses = data.userTrainingTypeList;
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

  
  selectRange = () => {
    var rangeID = this.entryForm.value['rangeId'];
    if (rangeID)
      this.selectedDistrict = this.DistrictList?.filter(
        (a) => a.rangeId == rangeID
      );
      // console.log("selectRange " +JSON.stringify(this.selectedDistrict,null,2));
  };

  selectDistrict = () => {
    var districtID = this.entryForm.value['districtId'];
    if (districtID)
      this.selectedSubDivisoin = this.SubDivisionList?.filter(
        (a) => a.districtId == districtID
      );
      // console.log("selectDistrict " +JSON.stringify(this.selectedSubDivisoin,null,2));
      
  };

  selectSubDivision = () => {
    var subDivisionID = this.entryForm.value['subdivisionId'];
    if (subDivisionID)
      this.selectedCircle = this.circleInspectorList?.filter(
        (a) => a.subdivisionId == subDivisionID
      );
      
      // console.log("selectSubDivision " +JSON.stringify(this.selectedCircle,null,2));
  };


  selectCircle = () => {
    var circleId = this.entryForm.value['circleId'];
    if (circleId)
      this.selectedStations = this.stationList?.filter(
        (a) => a.circleId == circleId
      );
      // console.log("selectCircle " +JSON.stringify(this.selectedStations,null,2));
  };

  selectIoDes = () => {
    var stationId = this.entryForm.value['stationId'];
    if (stationId)
      this.selectedIo = this.IoOfficers?.filter(
        (a) => a.stationId == stationId
      );
  };

}
