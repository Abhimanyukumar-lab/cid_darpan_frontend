import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

declare var window: any;

interface Model {
  model: string;
  title: string;
  backgrounds: string;
  count: number;
  url: string;
  extras: { title: string; count: number }[];
  color: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
Number(arg0: string): number {
throw new Error('Method not implemented.');
}
d: (value: any,index: number,obj: any[]) => value is any;
// onDistrictChange(arg0: any) {
// throw new Error('Method not implemented.');
// }
  subscription: any; 
  models: Model[];

  @Input('permissions')
  permissions: Permissions;

  // rows = new Array<DistrictMap>();

  language: string;
  preLanguage: string;
  firstTimeLang: BehaviorSubject<string>;

  currentDateAndTime: string = '';


selectedDistrictId: string = ''; // set type as string

  // rangeName: string = '';
// districtList: any[] = [];
//rangeName: string = '';
districtList: any[] = [];
//selectedDistrictId: string | null = null;
isLoading: boolean = true;

  VIEW_URL: boolean;
  rangeName: string = '';
  districtName: string = '';
  districtHead: string = '';
  districtContactNo: string = '';
  districtPersonImage: string = '';

  totalCases: number = 0;
  srCases: number = 0;
  nsrCases: number = 0;
  totalTrainees: number = 0;
  sdpo: number = 0;
  ci: number = 0;
  sho: number = 0;
  userRole: string = 'ADMIN';
  ipcAct: any = {};
  caseDetails: any = {};

  policeDistricts = [
    { id: 46, name: 'Naugachhia' },
    { id: 31, name: 'Bagaha' }
    // Add more districts here if needed
  ];

    railZones = [
    { id: 54, name: 'Patna Rail' },
    { id: 55, name: 'Jamalpur Rail' },
    { id: 56, name: 'Muzaffarpur Rail' },
    { id: 57, name: 'Katihar Rail' }
  ];
 // apiService: any;

  // isModalOpen: boolean = false;


  constructor(
    private appStore: Store<{ app: any }>,
    private global: GlobalFunctionsService,
    private router: Router,
    private apiCaller: ApiCallerService,
    private apiService: ApiCallerService, 
    private localStorage: LocalstorageService,
  ) {
    this.global.checkForUserPermission(this.router.url);

    // this.VIEW_URL = this.global.checkForUserButtonPermission(
    //   AppConstants.DistrictMap_MODULE.ADD_SUBMIT_DATA
    // );

    this.firstTimeLang = new BehaviorSubject<string>('');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
      if (this.language != this.preLanguage)
        this.firstTimeLang.next(this.language);
    });

    this.firstTimeLang.subscribe((newSelectedUser) => {
      // if (this.global.checkForUserButtonPermission('USRDSH')) this.fetchData();
      if (this.global.checkForUserButtonPermission('USRDSH')) this.preLanguage = this.language;;
    });

    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
  }
 

   ngOnInit(): void {
    // this.jsonData();
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const districtId = auth?.user?.districtId || 0;
    this.loadDistrictsBasedOnUser();
    if(this.userRole != 'ADMIN' && this.userRole != 'SUPER_ADMIN' && this.userRole!=null) {
      this.fetchForDistrictData(districtId);
      this.fetchDistrictData(districtId);
      this.districtName = auth?.user?.districtName || '';
      this.rangeName = auth?.user?.rangeName || '';
       //this.fetchRangeData();
     // this.loadRangeAndDistricts();
     this.fetchAndDisplayDistrictDetails(districtId);
     
    }

    if (this.userRole === 'DIG') {
      this.fetchRangeData(); // Loads districts under DIG's range
    } else if (this.userRole === 'ADMIN' || this.userRole === 'SUPER_ADMIN') {
      this.fetchRangeData(); // Loads all ranges & districts (for ADMIN/SUPER_ADMIN)
      // this.districtName = auth?.user?.districtName || '';
      // this.fetchDashboard();
      // this.fetchAndDisplayDistrictDetails(districtId);
    }
    if((this.userRole === 'ADMIN' || this.userRole === 'SUPER_ADMIN') && this.userRole!=null) {
        this.fetchDashboard();
      }
  } 

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goToPage = (url: string) => {
    this.router.navigate([url]);
  };

  // fetchData = () => {
  //   this.preLanguage = this.language;
  //   this.apiCaller
  //     .apiGetCall('getDashboard', true)
  //     .subscribe((response: any) => {
  //       this.models = response.dashboards;
  //       // this.dataDummy = response.dashboards[0].extras;
  //       // console.log("JSon " + JSON.stringify(this.dataDummy,null,2));
        
  //     });
  // };
 

  private updateDateTime() {
    const now = new Date();
    this.currentDateAndTime = now.toLocaleString(); // Adjust the format as needed
  }


  goToViewLink = (url: string, data: any) => {
    this.localStorage.setStoredValue('mapDataId', data);
    // this.router.navigate([url]);
    window.open('/official/dashboard/view', '_blank');
  };

  // Chat bot
  showChatbox = false;
  //isLoading = false;
  predefinedTemplates: string[] = [
    "Hi! Welcome to ICMS Portal.",
    "How can I help you today?",
    "Please ask me any questions you have.",
    "I'm here to assist you. What do you need?"
  ];
  currentTemplateIndex = 0;

  toggleChat(): void {
    this.showChatbox = !this.showChatbox;
    if (this.showChatbox) {
      this.loadTemplate();
    }
  }

  loadTemplate(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.getNextTemplate();
      // this.loadTemplate();
    }, 0);
  }

  getNextTemplate(): void {
    this.currentTemplateIndex = (this.currentTemplateIndex + 1) % this.predefinedTemplates.length;
    // this.loadTemplate();
  }

  get currentTemplate(): string {
    return this.predefinedTemplates[this.currentTemplateIndex];
  }

  
  openModal(n: number) {
    this.fetchAndDisplayDistrictDetails(n);
    const modal = new window.bootstrap.Modal(
      document.getElementById('districtDetailsModal')
    );
    modal.show();
  }

  closeModal() {
    const modal = new window.bootstrap.Modal(
      document.getElementById('districtDetailsModal')
    );
    modal.hide();
  }

   loadDistrictsBasedOnUser() {
      // const userDistrictId = localStorage.getItem('userDistrictId');
      // const userDistrictName = localStorage.getItem('userDistrict');
      this.userRole = localStorage.getItem('userRole');
      // const auth = JSON.parse(localStorage.getItem('auth'));
      // const userName = auth?.user?.firstName || '';
      // console.log(userDistrictId);
      // console.log(userName);
      console.log(this.rangeName);
      console.log(this.userRole);    
    
    }


  fetchDashboard(): void {
       this.apiCaller.apiGetCall('getCaseDetails', true)
    .subscribe(
      (response) => {
        this.caseDetails = response.data || {};
      }
    );
  }


// fetchRangeData(): void {
//   this.apiCaller.apiPostCall('getRange', {}, true)
//     .subscribe(
//       (response) => {
//         this.rangeName = response?.rangeName || '';
//          console.log("Range Name: ", this.rangeName);
//       }
//     );
// }


fetchRangeData(): void {
  const authData = JSON.parse(localStorage.getItem('auth') || '{}');
  const userRangeId = authData?.user?.rangeId;
  this.userRole = authData?.user?.roleName;

  if (!userRangeId) return;

  // Get range name
  this.apiCaller.apiPostCall('getRange', {}, true).subscribe((rangeRes) => {
    const userRange = rangeRes.rangeDTOs.find((r: any) => r.id == userRangeId);
    this.rangeName = userRange?.rangeName || '';

    // Get districts under this range
    this.apiService.apiGetCall('getDistricts', true).subscribe((distRes) => {
      this.districtList = (distRes.districtDTOs || []).filter(
        (d: any) => d.rangeId == userRangeId
      );

      if (this.districtList.length > 0) {
        this.selectedDistrictId = String(this.districtList[0].id);
        this.fetchDistrictData(Number(this.selectedDistrictId));
      }
    });
  });
}

onDistrictChange(): void {
  this.fetchDistrictData(Number(this.selectedDistrictId));
}

fetchDistrictData(districtId: number): void {
  const data = { districtId };

  this.apiCaller.apiPostCall('getDistrictMapCount', data, true).subscribe((res) => {
    this.totalCases = res?.totalCases || 0;
    this.srCases = res?.srCases || 0;
    this.nsrCases = res?.nsrCases || 0;
    this.totalTrainees = res?.totalTrainees || 0;
      this.sdpo = res?.sdpo || 0;
      this.ci = res?.ci || 0;
      this.sho = res?.sho || 0;
  });
}



fetchAndDisplayDistrictDetails(districtId: number): void {
  const numericDistrictId = Number(districtId);
  const requestData = { districtId: numericDistrictId };

  // First API - get district details
  this.apiCaller.apiPostCall('getDistrictById', requestData, true)
    .subscribe(
      (response) => {
        const district = response?.district;
        if (district) {
          this.districtName = district.districtName || '';
          this.districtHead = district.districtHead || '';
          this.districtContactNo = district.districtContactNo || '';
          this.districtPersonImage = district.districtPersonImage || '';
        }
      },
      (error) => {
        console.error('Error fetching district details:', error);
      }
    );

  // Second API - get district statistics
  this.apiCaller.apiPostCall('getDistrictMapCount', requestData, true)
    .subscribe(
      (response) => {
        this.totalCases = response?.totalCases || 0;
        this.srCases = response?.srCases || 0;
        this.nsrCases = response?.nsrCases || 0;
        this.totalTrainees = response?.totalTrainees || 0;
        this.sdpo = response?.sdpo || 0;
        this.ci = response?.ci || 0;
        this.sho = response?.sho || 0;
        console.log('District statistics fetched successfully:', this.sho);
      },
      (error) => {
        console.error('Error fetching district statistics:', error);
      }
      
    );
}



  fetchForDistrictData(id: number): void {
    const data = { districtId: id };
    this.apiCaller.apiPostCall('getDistrictTopCount', data, true)
    .subscribe(
      (response) => {
        this.ipcAct = response.top5SectionsByCount || {};
      },
    );
  }

  // closeModal(): void {
  //   this.isModalOpen = false;
  // }

  // dataDummy: any[] = [];
  // jsonData= () => {
  //   this.dataDummy = [
  //     { "office": "SP Araria", "serial": 1 },
  //     { "office": "SP Arwal", "serial": 2 },
  //     { "office": "SP Aurangabad", "serial": 3 },
  //     { "office": "SP Bagaha", "serial": 4 },
  //     { "office": "SP Banka", "serial": 5 },
  //     { "office": "SP Begusarai", "serial": 6 },
  //     { "office": "SP Bettiah", "serial": 7 },
  //     { "office": "SSP Bhagalpur", "serial": 8 },
  //     { "office": "SP Bhojpur", "serial": 9 },
  //     { "office": "SP Buxar", "serial": 10 },
  //     { "office": "SSP Darbhanga", "serial": 11 },
  //     { "office": "SSP Gaya", "serial": 12 },
  //     { "office": "SP Gopalganj", "serial": 13 },
  //     { "office": "SP Jamalpur Rail", "serial": 14 },
  //     { "office": "SP Jamui", "serial": 15 },
  //     { "office": "SP Jehanabad", "serial": 16 },
  //     { "office": "SP Kaimur", "serial": 17 },
  //     { "office": "SP Katihar", "serial": 18 },
  //     { "office": "SP Katihar Rail", "serial": 19 },
  //     { "office": "SP Khagaria", "serial": 20 },
  //     { "office": "SP Kishanganj", "serial": 21 },
  //     { "office": "SP Lakhisarai", "serial": 22 },
  //     { "office": "SP Madhepura", "serial": 23 },
  //     { "office": "SP Madhubani", "serial": 24 },
  //     { "office": "SP Motihari", "serial": 25 },
  //     { "office": "SP Munger", "serial": 26 },
  //     { "office": "SSP Muzaffarpur", "serial": 27 },
  //     { "office": "SP Muzaffarpur Rail", "serial": 28 },
  //     { "office": "SP Nalanda", "serial": 29 },
  //     { "office": "SP Naugachhia", "serial": 30 },
  //     { "office": "SP Nawada", "serial": 31 },
  //     { "office": "SSP Patna", "serial": 32 },
  //     { "office": "SP Patna Rail", "serial": 33 },
  //     { "office": "SP Purnea", "serial": 34 },
  //     { "office": "SP Rohtas", "serial": 35 },
  //     { "office": "SP Saharsa", "serial": 36 },
  //     { "office": "SP Samastipur", "serial": 37 },
  //     { "office": "SP Saran", "serial": 38 },
  //     { "office": "SP Sheikhpura", "serial": 39 },
  //     { "office": "SP Sheohar", "serial": 40 },
  //     { "office": "SP Sitamarhi", "serial": 41 },
  //     { "office": "SP Siwan", "serial": 42 },
  //     { "office": "SP Supaul", "serial": 43 },
  //     { "office": "SP Vaishali", "serial": 44 }
  //   ]
    
  // }
}
