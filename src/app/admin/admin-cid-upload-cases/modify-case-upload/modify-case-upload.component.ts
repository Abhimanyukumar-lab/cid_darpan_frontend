import { BreakpointObserver } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { CircleInspector } from 'src/app/models/CircleInspector';
import { District } from 'src/app/models/District';
import { PoliceStation } from 'src/app/models/PoliceStation';
import { StationUser } from 'src/app/models/StationUser';
import { Subdivision } from 'src/app/models/Subdivision';
import { User } from 'src/app/models/user';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { AppLoadderHide, AppLoadderShow } from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-modify-case-upload',
  templateUrl: './modify-case-upload.component.html',
  styleUrls: ['./modify-case-upload.component.scss']
})
export class ModifyCaseUploadComponent {
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


  isCollapsed = false;
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
    // if(this.entry){
    //   this.fetchAccuseds();
    //   // this.fetchcriminalHistory();
    // }
  };
  toggle2 = () => {
    this.isCollapsed = false;
    this.isCollapsed1 = false;
    this.isCollapsed2 = !this.isCollapsed2;
    this.isCollapsed3 = false;
    if (this.entry) {
      this.fetchCaseProceeding();
    }
    // this.showDossier =false;
    // if(this.entry)this.fetchRecoveryDetails();
  };
  toggle3 = () => {
    this.isCollapsed = false;
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
    srsNsrsType: null,
    CidCrimeModusId: null,
    FIRNO: null,
    FIRDATE: null,
    LOCATION: null,
    village: null,
    street: null,
    placeOfOccurance: null,
    date: null,
    NoOfKnownAccused: null,
    NoOfUnnownAccused: null,
    ioName: null,
    ioDesignationName: null,
    IoMobile: null,



    srsNsrNo: null,
    majorHead: null,
    subHead: null,
    districtName: null,
    subdivisionName: null,
    circleName: null,
    policestationName: null,
    yearOfCase: null,
    caseNo: null,
    caseDate: null,
    section: null,
    maxPunishment: null,
    fslVisit: null,
    eSakshyaVideo: null,
    nameComplainant: null,
    comAge: null,
    specialReportNoYear: null,



    // Case procceding
    basicId: null,
    supervisionDate: null,
    supervisionNoteDate: null,
    supervisoryOfficerName: null,
    supervisoryOfficerDesignation: null,
    nameOfAccuseFoundTinSupervision: null,
    specialReportIssueDate: null,
    nameOfAccusedFoundTInSpecialReport: null,
    progressReportDate: null,
    nameOfOfficerIssuingPR: null,
    designationOfIssuingPR: null,
    lastReviewDate: null,
    nameOfOfficerOfLstReview: null,
    designationOfOfficerOfLastReview: null,
    noOfLastCaseDiary: null,
    dateOfLastCaseDiary: null,
    reviewNoteDate: null,
    chargeSheetedFinalReportStatus: null,
    remarks: null,
    uploadDocs: null,

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

  selectedDistrict: District[] = [];
  selectedSubDivisoin: Subdivision[] = [];
  selectedCircle: CircleInspector[] = [];

  subdivisionList: Subdivision[];
  stationList: PoliceStation[];
  IoOfficers: StationUser[] = [];

  selectedStations: PoliceStation[] = [];
  selectedIo: StationUser[] = [];



  designationList: any[] = [];
  router: any;
  route: any;

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


    this.subscriptionDistrict = this.userStore
      .pipe(select('auth'))
      .subscribe((data) => {
        this.districtId = data.user.districtId;
      });

    if (this.entry) {
      console.log(this.entry);

      this.ENTRY_PARAMS.ID = this.entry.id;
      this.ENTRY_PARAMS.srsNsrsType = this.entry.srsNsrsType;
      this.ENTRY_PARAMS.srsNsrNo = this.entry.srsNsrNo;
      this.ENTRY_PARAMS.majorHead = this.entry.majorHead;
      this.ENTRY_PARAMS.subHead = this.entry.subHead;
      this.ENTRY_PARAMS.districtName = this.entry.districtName;
      this.ENTRY_PARAMS.subdivisionName = this.entry.subdivisionName;
      this.ENTRY_PARAMS.circleName = this.entry.circleName;
      this.ENTRY_PARAMS.policestationName = this.entry.policestationName;
      this.ENTRY_PARAMS.yearOfCase = this.entry.yearOfCase;
      this.ENTRY_PARAMS.caseNo = this.entry.caseNo;
      this.ENTRY_PARAMS.specialReportNoYear = this.entry.specialReportNoYear;

      const date = this.entry.caseDate
        ? this.entry.caseDate.split('T')[0].split('-')
        : null;
      this.ENTRY_PARAMS.caseDate = this.entry.caseDate
        ? date[0] + '-' + date[1] + '-' + date[2]
        : null;

      this.ENTRY_PARAMS.section = this.entry.section;
      this.ENTRY_PARAMS.maxPunishment = this.entry.maxPunishment;
      this.ENTRY_PARAMS.ioName = this.entry.ioName;
      this.ENTRY_PARAMS.ioDesignationName = this.entry.ioDesignationName;
      this.ENTRY_PARAMS.fslVisit = this.entry.fslVisit;
      this.ENTRY_PARAMS.eSakshyaVideo = this.entry.eSakshyaVideo;
      this.ENTRY_PARAMS.nameComplainant = this.entry.nameComplainant;


      this.accuseds = this.entry.accused;
      // this.caseProceedingEntry = this.entry.caseProceeding;
      // Mapping from entry.caseProceeding to ENTRY_PARAMS
      this.ENTRY_PARAMS.supervisionDate = this.entry.caseProceeding.supervisionDate;
      this.ENTRY_PARAMS.supervisionNoteDate = this.entry.caseProceeding.supervisionNoteDate;
      this.ENTRY_PARAMS.supervisoryOfficerName = this.entry.caseProceeding.supervisoryOfficerName;
      this.ENTRY_PARAMS.supervisoryOfficerDesignation = this.entry.caseProceeding.supervisoryOfficerDesignation;
      this.ENTRY_PARAMS.nameOfAccuseFoundTinSupervision = this.entry.caseProceeding.nameOfAccuseFoundTinSupervision;
      this.ENTRY_PARAMS.specialReportIssueDate = this.entry.caseProceeding.specialReportIssueDate;
      this.ENTRY_PARAMS.nameOfAccusedFoundTInSpecialReport = this.entry.caseProceeding.nameOfAccusedFoundTInSpecialReport;
      this.ENTRY_PARAMS.progressReportDate = this.entry.caseProceeding.progressReportDate;
      this.ENTRY_PARAMS.nameOfOfficerIssuingPR = this.entry.caseProceeding.nameOfOfficerIssuingPR;
      this.ENTRY_PARAMS.designationOfIssuingPR = this.entry.caseProceeding.designationOfIssuingPR;
      this.ENTRY_PARAMS.lastReviewDate = this.entry.caseProceeding.lastReviewDate;
      this.ENTRY_PARAMS.nameOfOfficerOfLstReview = this.entry.caseProceeding.nameOfOfficerOfLstReview;
      this.ENTRY_PARAMS.designationOfOfficerOfLastReview = this.entry.caseProceeding.designationOfOfficerOfLastReview;
      this.ENTRY_PARAMS.noOfLastCaseDiary = this.entry.caseProceeding.noOfLastCaseDiary;
      this.ENTRY_PARAMS.dateOfLastCaseDiary = this.entry.caseProceeding.dateOfLastCaseDiary;
      this.ENTRY_PARAMS.reviewNoteDate = this.entry.caseProceeding.reviewNoteDate;
      this.ENTRY_PARAMS.chargeSheetedFinalReportStatus = this.entry.caseProceeding.chargeSheetedFinalReportStatus;
      this.ENTRY_PARAMS.remarks = this.entry.caseProceeding.remarks;
      this.ENTRY_PARAMS.uploadDocs = this.entry.caseProceeding.uploadDocs;

    }

    this.ADD_ENTRY = this.global.checkForUserButtonPermission(
      AppConstants.SR_NSR_CASES_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_ENTRY = this.global.checkForUserButtonPermission(
      AppConstants.SR_NSR_CASES_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.SR_NSR_CASES_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.SR_NSR_CASES_MODULE.EDIT_SUBMIT_URL;

    // this.apiService
    //   .apiGetCall('getDistricts',true)
    //   .subscribe((data) => {
    //     this.DistrictList = data.districtDTOs;
    //     // this.selectRange();
    //   });

    // this.apiService
    //   .apiGetCall(AppConstants.PUBLIC_APIS.FETCHSUBDIVISION, true)
    //   .subscribe((data) => {
    //     this.SubDivisionList = data.subdivisionDTOs;
    //     this.selectDistrict();
    //   });

    // this.apiService
    //   .apiGetCall(AppConstants.USER_MODULE.FETCH_CIRCLE_INSPCTOR, true)
    //   .subscribe((data) => {
    //     this.circleInspectorList = data.circleInspectorDTO;
    //     this.selectSubDivision();
    //   });

    // this.apiService
    //   .apiGetCall(AppConstants.USER_MODULE.FETCH_STATION, true)
    //   .subscribe((data) => {
    //     this.stationList = data.stationDtos;
    //     // console.log(JSON.stringify(data,null,2));

    //     this.selectCircle();
    //   });

    // this.apiService
    //   .apiGetCall(AppConstants.USER_MODULE.FETCH_ALL_STATION_USER, true)
    //   .subscribe((data) => {
    //     this.IoOfficers = data.stationUserDTOs;
    //     // console.log(JSON.stringify(data,null,2));

    //     this.selectIoDes();
    //   });

    // this.apiService
    //   .apiGetCall(AppConstants.DESIGNATION_MODULE.GET_DESGN_LIST, true)
    //   .subscribe((data) => {
    //     this.designationList = data.designationDTOs;
    //   });

    // this.fetchMajorHead();
    // this.fetchSubMajorHead();
    // this.fetchModusOperandi();
  }

  ngOnInit(): void {
    this.initiateForm();
    this.initAccusedForm(null);
    this.initCaseProceeding(null);
    this.initTrailForm(null);
  }

  initiateForm = () => {
    // console.log("this.districtId " + this.districtId);

    this.entryForm = this.fb.group({
      id: this.ENTRY_PARAMS.ID,

      srsNsrsType: [this.ENTRY_PARAMS.srsNsrsType],
      srsNsrNo: [this.ENTRY_PARAMS.srsNsrNo],
      majorHead: [this.ENTRY_PARAMS.majorHead],
      subHead: [this.ENTRY_PARAMS.subHead],
      districtName: [this.ENTRY_PARAMS.districtName],
      subdivisionName: [this.ENTRY_PARAMS.subdivisionName],
      circleName: [this.ENTRY_PARAMS.circleName],
      specialReportNoYear: [this.ENTRY_PARAMS.specialReportNoYear],
      policestationName: [this.ENTRY_PARAMS.policestationName],
      yearOfCase: [this.ENTRY_PARAMS.yearOfCase],
      caseNo: [this.ENTRY_PARAMS.caseNo],
      caseDate: [this.ENTRY_PARAMS.caseDate],
      section: [this.ENTRY_PARAMS.section],
      maxPunishment: [this.ENTRY_PARAMS.maxPunishment],
      ioName: [this.ENTRY_PARAMS.ioName],
      ioDesignationName: [this.ENTRY_PARAMS.ioDesignationName],
      fslVisit: [this.ENTRY_PARAMS.fslVisit],
      eSakshyaVideo: [this.ENTRY_PARAMS.eSakshyaVideo],

      nameComplainant: [this.ENTRY_PARAMS.nameComplainant],

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
        .apiPostCall('addCaseUploadExcelBasic', this.entryForm.value, true)
        .subscribe(
          (data) => {
            this.toaster.getToastMessage(
              data.message,
              'success',
              3000,
              'top-end'
            );

            this.initCaseProceeding(null);
            this.initAccusedForm(null);

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
        .apiPostCall('addCaseUploadExcelBasic', this.entryForm.value, true)
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
    // this.localStorage.destroyStoredValue('editData');
    this._location.back();
  }



  // goBack() {
  //   console.log('Button clicked!'); // Ye add karein
  //   console.log('localStorage service:', this.localStorage); // Check service
  //   this.localStorage.destroyStoredValue('editData');
  //   this._location.back();
  // }

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


  accusedForm: FormGroup;
  accuseds: any[] = [];
  caseProceedingEntry: any;

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
      userId: [
        1
      ],
      basicId: [
        this.entryForm.controls['id'].value,
        Validators.compose([Validators.required]),
      ],
      accusedName: [
        data && data.accusedName ? data.accusedName : '',
      ],
      firNonFir: [
        data && data.firNonFir ? data.firNonFir : null,
      ],
      supervisionOfficerName: [
        data && data.supervisionOfficerName ? data.supervisionOfficerName : '',
      ],
      supervisionOfficerDate: [
        data && data.supervisionOfficerDate ? data.supervisionOfficerDate : '',
      ],
      supervisionOfficerRemarks: [
        data && data.supervisionOfficerRemarks ? data.supervisionOfficerRemarks : '',
      ],
      createdBy: [
        data && data.createdBy ? data.createdBy : null,
      ],
      createdDate: [
        data && data.createdDate ? data.createdDate : null,
      ],
      active: [
        data && data.active !== undefined ? data.active : true,
      ]
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
          this.accuseds = data.listData;
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
    this.apiService
      .apiPostCall('addCaseUploadExcelAccused', this.accusedForm.value, true)
      .subscribe(
        (data) => {
          this.toaster.getToastMessage(
            data.message,
            'success',
            3000,
            'top-end'
          );
          this.accusedForm.reset();
          this.loading = false;
          this.initAccusedForm(null);
          this.fetchAccuseds();
          this.loading = false;
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
      basicId: [
        this.entryForm.controls['id'].value,
        Validators.compose([Validators.required]),
      ],
      supervisionDate: [this.ENTRY_PARAMS.supervisionDate],
      supervisionNoteDate: [this.ENTRY_PARAMS.supervisionNoteDate],
      supervisoryOfficerName: [this.ENTRY_PARAMS.supervisoryOfficerName],
      supervisoryOfficerDesignation: [this.ENTRY_PARAMS.supervisoryOfficerDesignation],
      nameOfAccuseFoundTinSupervision: [this.ENTRY_PARAMS.nameOfAccuseFoundTinSupervision],
      specialReportIssueDate: [this.ENTRY_PARAMS.specialReportIssueDate],
      nameOfAccusedFoundTInSpecialReport: [this.ENTRY_PARAMS.nameOfAccusedFoundTInSpecialReport],
      progressReportDate: [this.ENTRY_PARAMS.progressReportDate],
      nameOfOfficerIssuingPR: [this.ENTRY_PARAMS.nameOfOfficerIssuingPR],
      designationOfIssuingPR: [this.ENTRY_PARAMS.designationOfIssuingPR],
      lastReviewDate: [this.ENTRY_PARAMS.lastReviewDate],
      nameOfOfficerOfLstReview: [this.ENTRY_PARAMS.nameOfOfficerOfLstReview],
      designationOfOfficerOfLastReview: [this.ENTRY_PARAMS.designationOfOfficerOfLastReview],
      noOfLastCaseDiary: [this.ENTRY_PARAMS.noOfLastCaseDiary],
      dateOfLastCaseDiary: [this.ENTRY_PARAMS.dateOfLastCaseDiary],
      reviewNoteDate: [this.ENTRY_PARAMS.reviewNoteDate],
      chargeSheetedFinalReportStatus: [this.ENTRY_PARAMS.chargeSheetedFinalReportStatus],
      remarks: [this.ENTRY_PARAMS.remarks],
      uploadDocs: [null]
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
          this.initCaseProceeding(data.data);
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

    this.apiService
      .apiPostCall('addCaseUploadExcelCaseProceeding', this.caseProceeding.value, true)
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

  //   uploadDocs: File = null;

  // handleFileUpload = (file: FileList) => {
  //   this.uploadDocs = file.item(0);
  // };

  // saveCaseProceeding = () => {
  //   this.appStore.dispatch(new AppLoadderShow({}));
  //   const controls = this.caseProceeding.controls;
  //   if (this.caseProceeding.invalid && !this.caseProceeding.valid) {
  //     Object.keys(controls).forEach((controlName) =>
  //       controls[controlName].markAsTouched()
  //     );
  //     this.loading = false;
  //     this.appStore.dispatch(new AppLoadderHide({}));
  //     return;
  //   }

  //   this.loading = true;

  //   // Create FormData if you need to handle file upload
  //   const formData = new FormData();

  //   // Append all fields to formData
  //   Object.keys(this.caseProceeding.value).forEach(key => {
  //     if (key !== 'uploadDocs' && this.caseProceeding.value[key] !== null) {
  //       formData.append(key, this.caseProceeding.value[key]);
  //     }
  //   });

  //   // Handle file upload separately if needed
  //   if (this.uploadDocs) {
  //     formData.append('uploadDocs', this.uploadDocs, this.uploadDocs.name);
  //   }

  //   this.apiService
  //     .apiPostCall('addCaseUploadExcelCaseProceeding', formData, true)
  //     .subscribe(
  //       (data) => {
  //         this.toaster.getToastMessage(
  //           data.message,
  //           'success',
  //           3000,
  //           'top-end'
  //         );
  //         this.loading = false;
  //       },
  //       (error) => {
  //         this.loading = false;
  //         this.appStore.dispatch(new AppLoadderHide({}));
  //       }
  //     );
  // };

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

    console.log("trail form " + this.TrailForm.value['id']);
    console.log("trail form " + this.TrailForm.value['cidCrimeDataId']);
    console.log("trail form " + this.TrailForm.value['courtName']);
    console.log("trail form " + this.TrailForm.value['courtSupervisedBy']);
    console.log("trail form " + this.TrailForm.value['trialDate']);
    console.log("trail form " + this.TrailForm.value['nextTrialDate']);
    console.log("trail form " + this.TrailForm.value['remarks']);
    return;

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
