import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { CircleInspector } from 'src/app/models/CircleInspector';
import { Dsp } from 'src/app/models/Dsp';
import { Dig } from 'src/app/models/Dig';
import { LangModule } from 'src/app/models/LangModule';
import { PoliceStation } from 'src/app/models/PoliceStation';
import { Role } from 'src/app/models/Role';
import { Sdpo } from 'src/app/models/Sdpo';
import { Sections } from 'src/app/models/Sections';
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
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.scss'],
})
export class ModifyUserComponent implements OnInit, OnDestroy {
  subscription: any;
  user: any;
  loading = false;
  userForm: UntypedFormGroup;

  ADD_USER: boolean;
  EDIT_USER: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  roleList: Role[];
  sectionList: Sections[];
  sdpoList: Sdpo[];
  subdivisionList: Subdivision[];
  selectedSubDivisoin : Subdivision[] = [];
  selectedRange:Range[] = [];
  circleInspectorList: CircleInspector[];
  selectedCircle: CircleInspector[] = [];
  stationList: PoliceStation[];
  selectedStations: PoliceStation[] = [];
  dspList: Dsp[];
  digList: Dig[];
  rangeList: Range[]; // Assuming you will fetch ranges later
  subdivList: Subdivision[];
  districtList: any[];

  isDisabled: boolean = false;

  isDistrictShow: boolean = false;
  isStationList: boolean = false;
  isCircleListShow: boolean = false;
  isSectionShow: boolean = false;
  isSDPOShow: boolean = false;
  isDSPShow: boolean = false;
  isDIGShow: boolean = false;
  isSubdivisionShow: boolean = false;
  isRangeShow: boolean = false;
  passwordIcon: string = 'VISIBLE';

  USER_IMAGE: File = null;

  language: string;

  USER_PARAMS = {
    ID: null,
    ROLE_ID: null,
    ROLE_NAME: '',
    SECTION_ID: null,
    SECTION_NAME: '',
    DSP_ID: null,
    DSP_NAME: '',
    DIG_ID: null,
    DIG_NAME: '',
    SDPO_ID: null,
    SDPO_NAME: '',
    SUBDIV_ID: null,
    SUBDIV_NAME: '',
    CIRCLE_INSPECTOR_ID: null,
    CIRCLE_INSPECTOR_NAME: '',
    STATION_ID: null,
    RANGE_ID: null,
    DISTRICT_ID: null,
    STATION_NAME: '',
    RANGE_NAME: '',
    DISTRICT_NAME: '',
    FIRST_NAME: '',
    LAST_NAME: '',
    PASSWORD: '',
    EMAIL: '',
    MOBILE: '',
    USER_IMAGE: '',
  };
  filteredDistricts: any;
  cidExcelForm: any;
  toast: any;
  filterOptions: any;
  selectedDistrict: any;
  form: any;

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
    this.user = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.user) {
      this.USER_PARAMS.ID = this.user.id;
      this.USER_PARAMS.SECTION_ID = this.user.sectionId;
      this.USER_PARAMS.SECTION_NAME = this.user.sectionName;
      this.USER_PARAMS.DSP_ID = this.user.dspId;
      this.USER_PARAMS.DSP_NAME = this.user.dspName;
      this.USER_PARAMS.DIG_ID = this.user.digId;
      this.USER_PARAMS.DIG_NAME = this.user.digName;
      this.USER_PARAMS.ROLE_ID = this.user.roleId;
      this.USER_PARAMS.ROLE_NAME = this.user.roleName;
      this.USER_PARAMS.SDPO_ID = this.user.sdpoId;
      this.USER_PARAMS.SDPO_NAME = this.user.sdpoName;
      this.USER_PARAMS.SUBDIV_ID = this.user.subdivId;
      this.USER_PARAMS.SUBDIV_NAME = this.user.subdivName;
      this.USER_PARAMS.CIRCLE_INSPECTOR_ID = this.user.circleInspectorId;
      this.USER_PARAMS.CIRCLE_INSPECTOR_NAME = this.user.circleInspectorName;
      this.USER_PARAMS.STATION_ID = this.user.stationId;
      this.USER_PARAMS.RANGE_ID = this.user.rangeId;
      this.USER_PARAMS.RANGE_NAME = this.user.rangeName;
      this.USER_PARAMS.DISTRICT_ID = this.user.districtId;
      this.USER_PARAMS.DISTRICT_NAME = this.user.districtName;
      this.USER_PARAMS.STATION_NAME = this.user.stationName;
      this.USER_PARAMS.FIRST_NAME = this.user.firstName;
      this.USER_PARAMS.LAST_NAME = this.user.lastName;
      this.USER_PARAMS.PASSWORD = this.user.password;
      this.USER_PARAMS.EMAIL = this.user.email;
      this.USER_PARAMS.MOBILE = this.user.mobileNo;

      // if (this.user.sectionId) {
      //   this.isSectionShow = true;
      //   this.isDSPShow = false;
      //   this.isCircleListShow = false;
      //   this.isStationList = false;
      //   this.isSDPOShow = false;
      //   this.isSubdivisionShow = false;
      // } else if (this.user.dspId) {
      //   this.isDSPShow = true;
      //   this.isCircleListShow = false;
      //   this.isStationList = false;
      //   this.isSDPOShow = false;
      //   this.isSubdivisionShow = false;
      //   this.isSectionShow = false;
      // } else if (this.user.circleInspectorId) {
      //   this.isCircleListShow = true;
      //   this.isStationList = false;
      //   this.isSubdivisionShow = false;
      //   this.isSDPOShow = false;
      //   this.isSectionShow = false;
      //   this.isDSPShow = false;
      // } else if (this.user.stationId) {
      //   this.isStationList = true;
      //   this.isSubdivisionShow = false;
      //   this.isSectionShow = false;
      //   this.isSDPOShow = false;
      //   this.isDSPShow = false;
      //   this.isCircleListShow = false;
      // } else if (this.user.sdpoId) {
      //   this.isSubdivisionShow = false;
      //   this.isSectionShow = false;
      //   this.isSDPOShow = true;
      //   this.isDSPShow = false;
      //   this.isCircleListShow = false;
      //   this.isStationList = false;
      // } else {
      //   this.isSectionShow = false;
      //   this.isSDPOShow = false;
      //   this.isDSPShow = false;
      //   this.isCircleListShow = false;
      //   this.isStationList = false;
      //   this.isSubdivisionShow = false;
      // }
    }

    this.ADD_USER = this.global.checkForUserButtonPermission(
      AppConstants.USER_MODULE.ADD_SUBMIT_DATA
    );

    this.EDIT_USER = this.global.checkForUserButtonPermission(
      AppConstants.USER_MODULE.EDIT_SUBMIT_DATA
    );
    this.ADD_URL = AppConstants.USER_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.USER_MODULE.EDIT_SUBMIT_URL;

    // this.apiService
    //   .apiGetCall(AppConstants.USER_MODULE.FETCH_SECTION, true)
    //   .subscribe((data) => {
    //     this.sectionList = data.sectionsDTOs;
    //   });

    this.apiService
      .apiGetCall(AppConstants.USER_MODULE.FETCH_ROLE, true)
      .subscribe((data) => {
       // console.log("Here "+JSON.stringify(data,null,2))
        this.roleList = data.roleDTOs;
      });

    // this.apiService
    //   .apiGetCall(AppConstants.PUBLIC_APIS.FETCHDSP, true)
    //   .subscribe((data) => {
    //     this.dspList = data.dspDTOs;
    //   });

    // this.apiService
    //   .apiGetCall(AppConstants.USER_MODULE.FETCH_SDPO, true)
    //   .subscribe((data) => {
    //     this.sdpoList = data.sdpoDTO;
    //   });

    this.apiService
      .apiGetCall(AppConstants.USER_MODULE.FETCH_SUBDIV, true)
      .subscribe((data) => {
       // console.log("Here "+JSON.stringify(data,null,2))
        this.subdivisionList = data.subdivisionDTOs;
      });
    this.apiService
      .apiGetCall(AppConstants.USER_MODULE.FETCH_RANGE, true)
      .subscribe((data) => {
        //console.log("Here "+JSON.stringify(data,null,2))
        this.rangeList = data.rangeDTOs;
      });

    this.apiService
      .apiGetCall(AppConstants.USER_MODULE.FETCH_CIRCLE_INSPCTOR, true)
      .subscribe((data) => {
        this.circleInspectorList = data.circleInspectorDTO;
      });
    // this.apiService
    //   .apiGetCall(AppConstants.USER_MODULE.FETCH_DIG, true)
    //   .subscribe((data) => {
    //     this.digList = data.digDtos;
    //   });

    this.apiService
      .apiGetCall(AppConstants.USER_MODULE.FETCH_STATION, true)
      .subscribe((data) => {
        this.stationList = data.stationDtos;
      });

    // this.apiService
    //   .apiGetCall(AppConstants.PUBLIC_APIS.FETCHSUBDIVISION, true)
    //   .subscribe((data) => {
    //     this.subdivList = data.subdivisionDTOs;
    //   });

    // this.apiService
    //   .apiGetCall(AppConstants.PUBLIC_APIS.DISTRICTSFETCH, false)
    //   .subscribe((data) => {
    //     this.districtList = data.districtDTOs;
    //   });
    
    this.apiService
      .apiGetCall('getDistricts',true)
      .subscribe((data) => {
        this.districtList = data.districtDTOs;
      });

  }

  ngOnInit(): void {
    this.initiateUserForm();
     this.loadDistrictsBasedOnUser();
  }





  
   loadDistrictsBasedOnUser() {
      const userDistrictId = localStorage.getItem('userDistrictId');
      const userDistrictName = localStorage.getItem('userDistrict');
      const userRole = localStorage.getItem('userRole');
  
      // console.log(userDistrictId);
      // console.log(userDistrictName);
      // console.log(userRole);
  
      this.appStore.dispatch(new AppLoadderShow({}));
  
      this.apiService.apiGetCall('getDistricts', true).subscribe({
        next: (data) => {
          // Admin sees all districts
          if (userRole === 'ADMIN') {
            this.filteredDistricts = data.districtDTOs;
          } 
          // Regular user sees filtered districts
          else {
            // First try to filter by ID
            if (userDistrictId) {
              this.filteredDistricts = data.districtDTOs.filter(d => 
                d.id.toString() === userDistrictId
              );
            }
  
            // If no match by ID, try by name
            if (this.filteredDistricts.length === 0 && userDistrictName) {
              this.filteredDistricts = data.districtDTOs.filter(d => 
                d.districtName === userDistrictName
              );
            }
  
            // Fallback if no matches found
            if (this.filteredDistricts.length === 0) {
              console.warn('No matching district found for user');
              this.filteredDistricts = data.districtDTOs;
            }
          }
  
          // Update district name in storage if it was missing
          if (this.filteredDistricts.length > 0 && !userDistrictName) {
            localStorage.setItem('userDistrict', this.filteredDistricts[0].districtName);
          }
  
           this.updateDistrictFilterOptions();
  
  
  
            // Auto-select if only one district available
        if (this.filteredDistricts.length === 1) {
          this.cidExcelForm.patchValue({
            districtName: this.filteredDistricts[0].districtName
          });
        }
           
        },
        error: (err) => {
          console.error('Error loading districts:', err);
          this.toast.getToastMessage('Failed to load districts', 'error', 3000);
        },
        complete: () => {
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      });
    }
  
    updateDistrictFilterOptions() {
      const districtFilter = this.filterOptions.find(f => f.data === 'districtName');
      if (!districtFilter) return;
  
      // Update options while keeping the disabled option
      districtFilter.options = [
        districtFilter.options[0], // Keep the disabled option
        ...this.filteredDistricts.map(d => ({
          key: d.districtName,
          value: d.districtName
        }))
      ];
  
      // Auto-select if only one real option is available
  if (this.filteredDistricts.length === 1) {
    this.selectedDistrict = this.filteredDistricts[0].districtName;
  }
  
  
  if (this.filteredDistricts.length === 1) {
    this.form.get('district')?.setValue(this.filteredDistricts[0].districtName);
  }
  
  
       // Auto-select if only one district available
    //     if (this.filteredDistricts.length === 1) {
    //       this.cidExcelForm.patchValue({
    //         districtName: this.filteredDistricts[0].districtName
    //       });
    //     }
    }


  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initiateUserForm = () => {
    this.userForm = this.fb.group({
      id: this.USER_PARAMS.ID,
      roleId: [
        this.USER_PARAMS.ROLE_ID,
        Validators.compose([Validators.required]),
      ],
      sectionId: [this.USER_PARAMS.SECTION_ID],
      dspId: [this.USER_PARAMS.DSP_ID],
      digId: [this.USER_PARAMS.DSP_ID],
      sdpoId: [this.USER_PARAMS.SDPO_ID],
      subdivId: [this.USER_PARAMS.SUBDIV_ID],
      circleInspectorId: [this.USER_PARAMS.CIRCLE_INSPECTOR_ID],
      stationId: [this.USER_PARAMS.STATION_ID],
      rangeId: [this.USER_PARAMS.RANGE_ID],
      districtId: [this.USER_PARAMS.DISTRICT_ID],
      firstName: [
        this.USER_PARAMS.FIRST_NAME,
        Validators.compose([Validators.required]),
        // Validators.pattern(/^[a-zA-Z]+-\d+$/)
      ],
      lastName: [
        this.USER_PARAMS.LAST_NAME,
        Validators.compose([Validators.required]),
      ],
      password: [this.USER_PARAMS.PASSWORD],
      email: [
        this.USER_PARAMS.EMAIL,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
      mobileNo: [
        this.USER_PARAMS.MOBILE,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(13),
        ]),
      ],
      // contactNo: [this.USER_PARAMS.CONTACT],
      userImage: [this.USER_PARAMS.USER_IMAGE],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.userForm.controls;
    if (this.userForm.invalid && !this.userForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.user) formData.append('id', this.userForm.value['id']);
    formData.append('firstName', this.userForm.value['firstName']);
    formData.append('lastName', this.userForm.value['lastName']);
    formData.append('email', this.userForm.value['email']);
    formData.append('roleId', this.userForm.value['roleId']);
    formData.append('roleName', this.userForm.value['roleName']);
    if (this.userForm.value['sectionId'])
      formData.append('sectionId', this.userForm.value['sectionId']);
    formData.append('sectionName', this.userForm.value['sectionName']);
    if (this.userForm.value['dspId'])
      formData.append('dspId', this.userForm.value['dspId']);
    formData.append('dspName', this.userForm.value['dspName']);
    if (this.userForm.value['digId'])
      formData.append('digId', this.userForm.value['digId']);
    formData.append('digName', this.userForm.value['digName']);
    if (this.userForm.value['sdpoId'])
      formData.append('sdpoId', this.userForm.value['sdpoId']);
    formData.append('sdpoName', this.userForm.value['sdpoName']);
    if (this.userForm.value['rangeId'])
      formData.append('rangeId', this.userForm.value['rangeId']);
    formData.append('rangeName', this.userForm.value['rangeName']);
    if (this.userForm.value['subdivId'])
      formData.append('subdivId', this.userForm.value['subdivId']);
    formData.append('subdivName', this.userForm.value['subdivName']);
    if (this.userForm.value['circleInspectorId'])
      formData.append(
        'circleInspectorId',
        this.userForm.value['circleInspectorId']
      );
    formData.append(
      'circleInspectorName',
      this.userForm.value['circleInspectorName']
    );
    if (this.userForm.value['stationId'])
      formData.append('stationId', this.userForm.value['stationId']);
    formData.append('stationName', this.userForm.value['stationName']);
    if (this.userForm.value['districtId'])
      formData.append('districtId', this.userForm.value['districtId']);
    formData.append('districtName', this.userForm.value['districtName']);

    formData.append('mobileNo', this.userForm.value['mobileNo']);
    // formData.append('contactNo', this.userForm.value['contactNo']);
    formData.append('password', this.userForm.value['password']);

    if (this.USER_IMAGE) {
      formData.append('userImage', this.USER_IMAGE, this.USER_IMAGE.name);
    }

    var email = this.userForm.value['email'];
    var pass = this.userForm.value['password'];

    if (email != null) {
      this.userForm.controls.email.disable();
    }
    if (pass != null) {
      this.userForm.controls.password.disable();
    }

    if (this.userForm.value['id']) {
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
    } else {
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
    }
  };

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.userForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.userForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  goBack() {
    this._location.back();
    // window.close();
  }

  doUserRoleSelected = (value) => {
    var role = value.options[value.selectedIndex].text;

    if (role == 'SECTION') {
      this.isSectionShow = true;
      this.isDSPShow = false;
      this.isCircleListShow = false;
      this.isStationList = false;
      this.isSDPOShow = false;
      this.isSubdivisionShow = false;
      this.isDistrictShow = false;
    } else if (role == 'DSP') {
      this.isDSPShow = true;
      this.isCircleListShow = false;
      this.isStationList = false;
      this.isSDPOShow = false;
      this.isSubdivisionShow = false;
      this.isSectionShow = false;
      this.isDistrictShow = false;
    } else if (role == 'CI') {
      this.isCircleListShow = true;
      this.isStationList = false;
      this.isSubdivisionShow = false;
      this.isSDPOShow = false;
      this.isSectionShow = false;
      this.isDSPShow = false;
      this.isDistrictShow = true;
    } else if (role == 'POLICE_STATION') {
      this.isStationList = true;
      this.isSubdivisionShow = false;
      this.isSectionShow = false;
      this.isSDPOShow = false;
      this.isDSPShow = false;
      this.isCircleListShow = false;
      this.isDistrictShow = false;
    } else if (role == 'SHO') {
      this.isStationList = true;
      this.isSubdivisionShow = false;
      this.isSDPOShow = false;
      this.isSectionShow = false;
      this.isDSPShow = false;
      this.isCircleListShow = false;
      this.isDistrictShow = true;
    } else if (role == 'SDPO') {
      this.isSubdivisionShow = false;
      this.isSectionShow = false;
      this.isSDPOShow = true;
      this.isDSPShow = false;
      this.isCircleListShow = false;
      this.isStationList = false;
      this.isDistrictShow = true;
    } else if (role == 'SP') {
      this.isSubdivisionShow = false;
      this.isSectionShow = false;
      this.isSDPOShow = false;
      this.isDSPShow = false;
      this.isCircleListShow = false;
      this.isStationList = false;
      this.isDistrictShow = true;
    } else if (role == 'DIG') {
      this.isSubdivisionShow = false;
      this.isSectionShow = false;
      this.isSDPOShow = false;
      this.isDSPShow = false;
      this.isCircleListShow = false;
      this.isStationList = false;
      this.isDistrictShow = true;
      this.isRangeShow = true;
    } else {
      this.isSectionShow = false;
      this.isSDPOShow = false;
      this.isDSPShow = false;
      this.isCircleListShow = false;
      this.isStationList = false;
      this.isSubdivisionShow = false;
      this.isDistrictShow = false;
    }
  };

  doSectionSelected = (value) => {
    var type = value.options[value.selectedIndex].text;
    if (type != null) {
      this.isSectionShow = true;
    } else {
      this.isSectionShow = false;
      this.userForm.patchValue({
        sectionId: null,
      });
    }
  };

  doDspSelected = (value) => {
    var type = value.options[value.selectedIndex].text;
    if (type != null) {
      this.isDSPShow = true;
    } else {
      this.isDSPShow = false;
      this.userForm.patchValue({
        dspId: null,
      });
    }
  };
  doDigSelected = (value) => {
    var type = value.options[value.selectedIndex].text;
    if (type != null) {
      this.isDIGShow = true;
    } else {
      this.isDIGShow = false;
      this.userForm.patchValue({
        digId: null,
      });
    }
  };

  doPoliceSelected = (value) => {
    var type = value.options[value.selectedIndex].text;
    if (type != null) {
      this.isStationList = true;
    } else {
      this.isStationList = false;
      this.userForm.patchValue({
        stationId: null,
      });
    }
  };

  doDistrictSelected = (value) => {
    var type = value.options[value.selectedIndex].text;
    if (type != null) {
      this.isDistrictShow = true;
    } else {
      this.isDistrictShow = false;
      this.userForm.patchValue({
        districtId: null,
      });
    }
  };
  doRangeSelected = (value) => {
    var type = value.options[value.selectedIndex].text;
    if (type != null) {
      this.isRangeShow = true;
    } else {
      this.isRangeShow = false;
      this.userForm.patchValue({
        rangeId: null,
      });
    }
  };

  doSDPOSelected = (value) => {
    var type = value.options[value.selectedIndex].text;
    if (type != null) {
      this.isSDPOShow = true;
    } else {
      this.isSDPOShow = false;
      this.userForm.patchValue({
        sdpoId: null,
      });
    }
  };

  doCircleSelected = (value) => {
    var type = value.options[value.selectedIndex].text;
    if (type != null) {
      this.isCircleListShow = true;
    } else {
      this.isCircleListShow = false;
      this.userForm.patchValue({
        circleInspectorId: null,
      });
    }
  };


  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  // validAplpha(event) {
  //   const charCode = event.which ? event.which : event.KeyCode;

  //   if (
  //     (charCode >= 65 && charCode <= 90) ||
  //     (charCode >= 97 && charCode <= 122) ||
  //     charCode == 32
  //   ) {
  //     return true;
  //   } else return false;
  // }


validAplpha(event: KeyboardEvent) {
  const charCode = event.key.charCodeAt(0);
  if (
    !(charCode >= 48 && charCode <= 57) &&  
    !(charCode >= 65 && charCode <= 90) &&  
    !(charCode >= 97 && charCode <= 122) && 
    charCode !== 32 &&                      
    charCode !== 45                         
  ) {
    event.preventDefault();
  }
}


  handleFileChange = (file: FileList) => {
    this.USER_IMAGE = file.item(0);
  };

  focusOut = (event, name) => {
    this.userForm.patchValue({
      [name]: event.target.value,
    });
  };


  showPass() {
    var element = document.getElementById('password');
    if (element.getAttribute('type') == 'text') {
      element.setAttribute('type', 'password');
      this.passwordIcon = 'VISIBLE';
    } else {
      element.setAttribute('type', 'text');
      this.passwordIcon = 'HIDDEN';
    }
  }

  // selectDistrict = () => {
  //   var districtID = this.userForm.value['districtId'];
  //   if (districtID)
  //     this.selectedSubDivisoin = this.subdivisionList?.filter(
  //       (a) => a.districtId == districtID
  //     );
  //     // console.log("selectDistrict " +JSON.stringify(this.selectedSubDivisoin,null,2));
  //     if (districtID)
  //     this.selectedCircle = this.circleInspectorList?.filter(
  //       (a) => a.districtId == districtID
  //     );
  //     if (districtID)
  //     this.selectedStations = this.stationList?.filter(
  //       (a) => a.districtId == districtID
  //     );
  // };
  selectRange = () => {
    var rangeID = this.userForm.value['rangeId'];
    if (rangeID)
      this.selectedDistrict = this.districtList?.filter(
        (a) => a.rangeId == rangeID
      );
      // console.log("selectRange " +JSON.stringify(this.selectedSubDivisoin,null,2));
      // if (rangeID)
      // this.selectedCircle = this.circleInspectorList?.filter(
      //   (a) => a.rangeId == rangeID
      // );
      // if (rangeID)
      // this.selectedStations = this.stationList?.filter(
      //   (a) => a.rangeId == rangeID
      // );
  };



// Modified selectDistrict function
selectDistrict(type: 'range' | 'district') {
  if (type === 'range') {
    const rangeId = this.userForm.get('rangeId')?.value;
    if (rangeId) {
      this.filteredDistricts = this.districtList?.filter(
        (d) => d.rangeId == rangeId
      );
      // Reset district selection when range changes
      this.userForm.get('districtId')?.reset();
    } else {
      this.filteredDistricts = [];
    }
  } else if (type === 'district') {
    // Your existing district selection logic
    const districtID = this.userForm.get('districtId')?.value;
    if (districtID) {
      this.selectedSubDivisoin = this.subdivisionList?.filter(
        (a) => a.districtId == districtID
      );
      this.selectedCircle = this.circleInspectorList?.filter(
        (a) => a.districtId == districtID
      );
      this.selectedStations = this.stationList?.filter(
        (a) => a.districtId == districtID
      );
    }
  }
}

}
