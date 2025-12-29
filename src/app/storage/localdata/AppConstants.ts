import { environment } from 'src/environments/environment';

export class AppConstants {
  public static baseURL: string = 'http://localhost:8081/api/';
  public static backServer: string = 'http://localhost:8081';

  public static titleDistrict: string = environment.titleDistrict;
  public static domain: string = environment.domain;

  public static LOGIN_PATH = '/official/login';
  public static RESOURCE_LOGIN_PATH = '/officialResource/login';
  public static DASHBOARD_PATH = '/official/dashboard';
  public static PERMISSION_DENIAL_PATH = '/official/permissionDenial';
  public static RESOURCE_PERMISSION_DENIAL_PATH = '/officialResource/permissionDenial';
  public static UPLOAD_FILE_URL = 'public/uploadFile';

  public static UNDER_DEVELOPMENT = '/official/underDevelopment';

  public static PENDING = 'PENDING';
  public static ACCEPT = 'ACCEPTED';
  public static REJECT = 'REJECTED';

  public static PUBLIC_APIS = {
    DISTRICTDETAILS: 'public/getDistrictDetails',
    GETPAGEDATA: 'public/getPageData',
    BANNERFETCH: 'public/getAllBanners',
    HEADLINESFETCH: 'public/getHeadlines',
    LINKFETCH: 'public/getLinks',
    CITIZENREPORTFETCH: 'public/getCitizenReportData',

    DISTRICTSFETCH: 'public/getDistricts',
    ONLYDISTFETCH: 'public/getOnlyDistrict',
    STATIONSFETCH: 'public/getPoliceStations',
    OPTIONSFETCH: 'public/getOptions',
    APPOINTMENTADD: 'public/addAppointment',
    PASSPORTADD: 'public/addPassport',
    CITIZENREPORTADD: 'public/addCitizenReport',
    COMPLAINTADD: 'public/addComplaint',
    CHARACTERADD: 'public/addCharacter',
    GETDEADPERSON: 'public/getDeadPerson',
    GETMISSINGPERSON: 'public/getMissingPerson',
    GETFOUNDPERSON: 'public/getFoundPerson',
    GETSENDSMS: 'public/sendOTP',
    GETSENDSMSFORAPP: 'public/sendOTPForApp',
    FEEDBACKADD: 'public/addFeedBack',
    GETQUESTIONS: 'public/getQuestions',

    FETCHSDPO: 'public/getSdpoData',
    FETCHDSP: 'public/getDsp',
    FETCHSUBDIVISION: 'public/getSubdivisionNames',
    FETCHCIRCLEINSPECTOR: 'public/getCircleInspector',
    FETCHSECTION: 'public/getsections',
    GETHELPLINE: 'public/getHelplineData',
    GETPOLICEDETAILS: 'public/getPoliceDetailsData',
    GETASSETTYPES: 'public/getAssetTypeForDetails',
    GETSHOPOLICEDETAILS: 'public/getShoDetails',
    GETINVESTIGATIONOFFICER: 'public/getInvestigationOfficer',
    GETLAWORDEROFFICER: 'public/getLawOrderOfficer',
    FETCHALLSTATIONUSERS: 'public/getPoliceStationUsers',

    //CheckStatus
    APPOINTMENT_CHECKSTATUS: 'public/appointmentCheckStatus',
    COMPLAINT_OTP_CHECKSTATUS: 'public/complaintCheckStatusOTP',
    COMPLAINT_CHECKSTATUS: 'public/complaintCheckStatus',
    CHARACTER_OTP_CHECKSTATUS: 'public/characterCheckStatusOTP',
    CHARACTER_DOWNLOAD: 'public/downloadCharacterCert',
    CHARACTER_CHECKSTATUS: 'public/characterCheckStatus',
    PASSPORT_OTP_CHECKSTATUS: 'public/passportCheckStatusOTP',
    PASSPORT_CHECKSTATUS: 'public/passportCheckStatus',
    CITIZEN_REPORT_OTP_CHECKSTATUS: 'public/citizenReportCheckStatusOTP',
    CITIZEN_REPORT_CHECKSTATUS: 'public/citizenReportCheckStatus',

    GETIMPORTANTPLACES: 'public/getImportantPlaces',

    GPO_COMPLAINTADD: 'public/addGpoComplaint',
    GPO_COMPLAINT_OTP_CHECKSTATUS: 'public/gpoComplaintCheckStatusOTP',
    GPO_COMPLAINT_CHECKSTATUS: 'public/gpoComplaintCheckStatus',

    GFPO_COMPLAINTADD: 'public/addGfpoComplaint',
    GFPO_COMPLAINT_OTP_CHECKSTATUS: 'public/gfpoComplaintCheckStatusOTP',
    GFPO_COMPLAINT_CHECKSTATUS: 'public/gfpoComplaintCheckStatus',
  };

  public static PAGE_URLS = {
    '/official/dashboard': 'SHDASH',
    '/official/role': 'RLVIUS',
    '/official/role/add': 'ROLADD',
    '/official/role/edit': 'ROLEDT',
    '/official/role/view': 'ROLVIE',
    '/official/permission': 'PGPERS',
    '/official/permission/add': 'PERADD',
    '/official/permission/edit': 'PEREDT',
    '/official/menu': 'SEMENU',
    '/official/menu/add': 'ADDMDT',
    '/official/menu/edit': 'EDMEDT',
    '/official/submenu': 'SESBMN',
    '/official/submenu/add': 'ADSMNT',
    '/official/submenu/edit': 'EDSMNT',
    '/official/districtDetails': 'PGDIDT',
    '/official/districtDetails/add': 'DSDADD',
    '/official/districtDetails/edit': 'DSDEDT',
    '/official/banner': 'GETBNR',
    '/official/banner/add': 'ADDBNR',
    '/official/banner/edit': 'EDTBNR',
    '/official/links': 'PGLINK',
    '/official/links/add': 'ADDLNK',
    '/official/links/edit': 'EDTLNK',
    '/official/headlines': 'PGHDLN',
    '/official/headlines/add': 'HLDADD',
    '/official/headlines/edit': 'EDTHDS',

    '/official/helpline': 'PGHELP',
    '/official/helpline/add': 'ADDHLP',
    '/official/helpline/edit': 'EDTHLP',
    '/official/pressRelease': 'PSRLPE',
    '/official/pressRelease/add': 'PRLADD',
    '/official/pressRelease/edit': 'PRLEDT',
    '/official/newsEvent': 'NSETPE',
    '/official/newsEvent/add': 'ADDNSE',
    '/official/newsEvent/edit': 'EDTNSE',
    '/official/imageGallery': 'IMGRPE',
    '/official/imageGallery/add': 'ADDIMG',
    '/official/imageGallery/edit': 'EDTIMG',
    '/official/videoGallery': 'VDOGPE',
    '/official/videoGallery/add': 'ADDVDO',
    '/official/videoGallery/edit': 'EDTVDO',
    '/official/forms': 'FRMGPE',
    '/official/forms/add': 'ADDFRM',
    '/official/forms/edit': 'EDTFRM',
    '/official/rules': 'RULGPE',
    '/official/rules/add': 'ADDRUL',
    '/official/rules/edit': 'EDRUL',
    '/official/acts': 'ACTGPE',
    '/official/acts/add': 'ADDACT',
    '/official/acts/edit': 'EDTACT',
    '/official/postingList': 'PSLGPE',
    '/official/postingList/add': 'ADDPSL',
    '/official/postingList/edit': 'EDTPSL',
    '/official/announcement': 'AMTGPE',
    '/official/announcement/add': 'ADDAMT',
    '/official/announcement/edit': 'EDTAMT',
    '/official/criminalList': 'CRLGPE',
    '/official/criminalList/add': 'ADDCRL',
    '/official/criminalList/edit': 'EDTCRL',
    '/official/peaceCommity': 'PCMGPE',
    '/official/peaceCommity/add': 'ADDPCM',
    '/official/peaceCommity/edit': 'EDTPCM',
    '/official/transferList': 'TFRGPE',
    '/official/transferList/add': 'ADDTFR',
    '/official/transferList/edit': 'EDTTFR',
    '/official/ourTeam': 'ORTGPE',
    '/official/ourTeam/add': 'ADDORT',
    '/official/ourTeam/edit': 'EDTORT',
    '/official/successionList': 'SCLGPE',
    '/official/successionList/add': 'ADDSCL',
    '/official/successionList/edit': 'EDTSCL',
    '/official/options': 'PGOPTN',
    '/official/options/add': 'OPNADD',
    '/official/options/edit': 'OPNEDT',

    '/official/sections': 'PGSECT',
    '/official/sections/add': 'SCNADD',
    '/official/sections/edit': 'SCNEDT',
    '/official/sections/view': 'SCNEVW',

    '/official/sdpo': 'PGSDPO',
    '/official/sdpo/add': 'SDPOAD',
    '/official/sdpo/edit': 'SDPOED',
    '/official/sdpo/view': 'SDPOVW',

    '/official/circleInspector': 'PGCRIN',
    '/official/circleInspector/add': 'CRINAD',
    '/official/circleInspector/edit': 'CRINED',
    '/official/circleInspector/view': 'CRINVW',

    '/official/aboutDSP': 'PGADSP',
    '/official/aboutDSP/add': 'ADSPAD',
    '/official/aboutDSP/edit': 'ADSPED',
    '/official/aboutDSP/view': 'ADSPVW',

    '/official/subdivision': 'PGSUDV',
    '/official/subdivision/add': 'SUDVAD',
    '/official/subdivision/edit': 'SUDVED',
    '/official/subdivision/view': 'SUDVVW',

    '/official/user': 'PGUSER',
    '/official/user/add': 'USERAD',
    '/official/user/edit': 'USERED',
    '/official/policeStation': 'PGPLST',
    '/official/policeStation/add': 'PLSTAD',
    '/official/policeStation/edit': 'PLSTED',
    '/official/policeStation/view': 'PLSTVW',

    '/official/policeOfficerDetails': 'PGPLOD',
    '/official/policeOfficerDetails/add': 'PLODAD',
    '/official/policeOfficerDetails/edit': 'PLODED',
    '/official/policeStaffDetails': 'PGSTDT',
    '/official/policeStaffDetails/add': 'STDTAD',
    '/official/policeStaffDetails/edit': 'STDTED',
    '/official/otherDetails': 'PGOTDT',
    '/official/otherDetails/add': 'OTDTAD',
    '/official/otherDetails/edit': 'OTDTED',
    '/official/chaukidarDafadarDetails': 'PGCHDF',
    '/official/chaukidarDafadarDetails/add': 'CHDFAD',
    '/official/chaukidarDafadarDetails/edit': 'CHDFED',

    '/official/systemConfig': 'PGSYSC',
    '/official/systemConfig/add': 'SYSCAD',
    '/official/systemConfig/edit': 'SYSCED',
    '/official/smsSchedular': 'SMSRCH',

    '/official/questions': 'PGQUES',
    '/official/questions/add': 'ADDQUS',
    '/official/questions/edit': 'EDTQUS',
    '/official/passport': 'PASSTL',
    '/official/passport/view': 'PASSVW',
    '/official/appointment': 'PGAPPO',
    '/official/appointment/view': 'APPOVW',

    '/official/citizenReport': 'PGCZRT',
    '/official/citizenReport/add': 'CZRTAD',
    '/official/citizenReport/view': 'CZRTVW',
    '/official/missingPerson': 'PGMSPR',
    '/official/missingPerson/add': 'MSPRAD',
    '/official/missingPerson/edit': 'MSPRED',
    '/official/missingPerson/view': 'MSPRVW',
    '/official/foundPerson': 'PGFDPR',
    '/official/foundPerson/add': 'FDPRAD',
    '/official/foundPerson/edit': 'FDPRED',
    '/official/foundPerson/view': 'FDPRVW',
    '/official/deadPerson': 'PGDEAD',
    '/official/deadPerson/add': 'DEADAD',
    '/official/deadPerson/edit': 'DEADED',
    '/official/deadPerson/view': 'DEADVW',
    '/official/complaint': 'PGCOMP',
    '/official/complaint/view': 'COMPVW',
    '/official/character': 'PGCHAR',
    '/official/character/view': 'CHARVW',
    '/official/character/addForm': 'ADCOFR',
    '/official/character/editForm': 'EDCOFR',
    '/official/character/viewForm': 'COFRVW',

    '/official/feedback': 'FEEDTL',
    '/official/feedback/view': 'FEEDVW',
    '/official/importantPlaces': 'IMPGPE',
    '/official/importantPlaces/add': 'ADDIMP',
    '/official/importantPlaces/edit': 'EDTIMP',
    '/official/designations': 'PGDESG',
    '/official/designations/add': 'DESGAD',
    '/official/designations/edit': 'DESGED',
    '/official/resources': 'PGRSRC',
    '/official/resources/add': 'RSRCAD',
    '/official/resources/edit': 'RSRCED',

    '/official/supremeCourt': 'PGSCRT',
    '/official/supremeCourt/add': 'SCRTAD',
    '/official/supremeCourt/edit': 'SCRTET',
    '/official/supremeCourt/view': 'SUCTVW',

    '/official/highCourt': 'PGHCRT',
    '/official/highCourt/add': 'HCRTAD',
    '/official/highCourt/edit': 'HCRTET',
    '/official/highCourt/view': 'HUCTVW',

    '/official/lowerCourt': 'PGLCRT',
    '/official/lowerCourt/add': 'LCRTAD',
    '/official/lowerCourt/edit': 'LCRTET',
    '/official/lowerCourt/view': 'LUCTVW',

    '/official/procecution/summon': 'PROCSM',
    '/official/procecution/warrent': 'PROCWR',
    '/official/procecution/proclaim': 'PROCPL',
    '/official/procecution/attachment': 'PROCAT',
    '/official/procecution/add': 'PROCAD',
    '/official/procecution/edit': 'PROCET',
    '/official/procecution/view': 'PROCVW',

    '/official/grSection/summon': 'PRSCSM',
    '/official/grSection/warrent': 'PRSCWR',
    '/official/grSection/proclaim': 'PRSCPR',
    '/official/grSection/attachment': 'PRSCAT',
    '/official/grSection/add': 'GRSCAD',
    '/official/grSection/edit': 'GRSCET',
    '/official/grSection/view': 'GRSCVW',

    '/official/rti': 'PGRTIS',
    '/official/rti/add': 'RTIADD',
    '/official/rti/edit': 'RTIEDT',
    '/official/rti/view': 'RTIVEW',

    '/official/NHRC': 'PGNHRC',
    '/official/NHRC/add': 'NHRCAD',
    '/official/NHRC/edit': 'NHRCED',
    '/official/NHRC/view': 'NHRCVW',

    '/official/SHRC': 'PGSHRC',
    '/official/SHRC/add': 'SHRCAD',
    '/official/SHRC/edit': 'SHRCED',
    '/official/SHRC/view': 'SHRCVW',

    '/official/SWRC': 'PGSWRC',
    '/official/SWRC/add': 'SWRCAD',
    '/official/SWRC/edit': 'SWRCED',
    '/official/SWRC/view': 'SWRCVW',

    '/official/NWRC': 'PGNWRC',
    '/official/NWRC/add': 'NWRCAD',
    '/official/NWRC/edit': 'NWRCED',
    '/official/NWRC/view': 'NWRCVW',

    '/official/NCOBC': 'PGNCOB',
    '/official/NCOBC/add': 'NCOBAD',
    '/official/NCOBC/edit': 'NCOBED',
    '/official/NCOBC/view': 'NCOBVW',

    '/official/NSCST': 'PGNSCS',
    '/official/NSCST/add': 'NSCSAD',
    '/official/NSCST/edit': 'NSCSED',
    '/official/NSCST/view': 'NSCSVW',

    '/official/NCPCR': 'PGNCPR',
    '/official/NCPCR/add': 'NCPRAD',
    '/official/NCPCR/edit': 'NCPRED',
    '/official/NCPCR/view': 'NCPRVW',

    '/official/BHRC': 'PGBHRC',
    '/official/BHRC/add': 'BHRCAD',
    '/official/BHRC/edit': 'BHRCED',
    '/official/BHRC/view': 'BHRCVW',

    '/official/ecommunicationReceipt': 'PGECRC',
    '/official/ecommunicationReceipt/add': 'ECRCAD',
    '/official/ecommunicationReceipt/edit': 'ECRCET',
    '/official/ecommunicationReceipt/view': 'ECRCVW',

    '/official/ecommunicationDispatch': 'PGECDP',
    '/official/ecommunicationDispatch/add': 'ECDPAD',
    '/official/ecommunicationDispatch/edit': 'ECDPET',
    '/official/ecommunicationDispatch/view': 'ECDPVW',

    '/official/events': 'PGEVNT',
    '/official/events/add': 'EVNTAD',
    '/official/events/edit': 'EVNTED',

    '/official/visitorRegister': 'PGVSTR',
    '/official/visitorRegister/view': 'VSTRVW',

    '/officialResource/dashboard': 'RSDASH',
    '/officialResource/apply': 'RSLVAP',
    '/officialResource/history': 'RSHIST',
    '/officialResource/holiday': 'RSHOLI',

    '/official/holiday': 'OFHOLP',
    '/official/holiday/add': 'OFHOAD',
    '/official/holiday/edit': 'OFHOED',

    '/official/leaveType': 'OFVELT',
    '/official/leaveType/add': 'ADLETY',
    '/official/leaveType/edit': 'EDLETY',
    '/official/assetType': 'PGASTD',
    '/official/assetType/add': 'ADDAST',
    '/official/assetType/edit': 'EDTAST',
    '/official/assetType/view': 'VIEAST',

    '/official/assetSuppliers': 'ASTSUP',
    '/official/assetSuppliers/add': 'ASTSAD',
    '/official/assetSuppliers/edit': 'ASTSED',
    '/official/assetSuppliers/view': 'ASTSVW',

    '/official/products': 'ASTPRD',
    '/official/products/add': 'ASPRAD',
    '/official/products/edit': 'ASPRED',
    '/official/products/view': 'ASPRVW',

    '/official/assetStock': 'ASTSTK',
    '/official/assetDetails': 'PGASDT',
    '/official/allocation/add': 'ASALAD',
    '/official/allocation/edit': 'ASALED',
    '/official/allocation/view': 'ASALVI',

    '/official/smsServiceProvider': 'PGSSPR',
    '/official/smsServiceProvider/add': 'SSPRAD',
    '/official/smsServiceProvider/edit': 'SSPRED',

    '/official/smsTemplate': 'PGSMST',
    '/official/smsTemplate/add': 'SMSTAD',
    '/official/smsTemplate/edit': 'SMSTED',

    '/official/module': 'PGMODL',
    '/official/module/add': 'MODLAD',
    '/official/module/edit': 'MODLED',

    '/official/smsModule': 'PGSMSM',
    '/official/smsModule/add': 'SMSMAD',
    '/official/smsModule/edit': 'SMSMED',

    '/official/leaveApplication': 'PGLVAP',
    '/official/leaveApplication/view': 'VWLVAP',

    '/official/transfer': 'TRSNPG',
    '/official/transfer/add': 'TRNADD',
    '/official/transfer/view': 'TRNVIE',

    '/official/replyComplaint': 'RPLCMT',
    '/official/replyComplaint/edit': 'RPCEDT',

    '/official/notification': 'NTFNPG',

    '/official/notificationList': 'NTFLST',
    '/official/notificationList/add': 'NFLNAD',
    '/official/notificationList/edit': 'NFLNED',
    '/official/notificationList/view': 'NFLNVW',

    '/official/notificationUser': 'NTFUSR',
    '/official/notificationUser/add': 'NFULAD',
    '/official/notificationUser/edit': 'NFULED',

    '/official/notificationHistory': 'NTFHTR',
    '/official/policeDiary': 'PLDRUS',
    '/official/policeDiary/add': 'PLDRAD',
    '/official/policeDiary/edit': 'PLDRED',
    '/official/policeDiary/view': 'VEPLDR',

    '/official/sr_nsr': 'SRNSRF',
    '/official/sr_nsr/add': 'ADNSSR',
    '/official/sr_nsr/edit': 'EDNSSR',
    '/official/sr_nsr/view': 'VENSSR',

    '/official/officers': 'PSOFPG',
    '/official/officers/add': 'PSOFAD',
    '/official/officers/edit': 'PSOFED',
    // '/official/officers/view': 'VEPLDR',

    '/official/srsNsrsCases': 'SRNSRC',
    '/official/srsNsrsCases/add': 'ADSRNS',
    '/official/srsNsrsCases/edit': 'EDSRNS',
    '/official/srsNsrsCases/view': 'VISRNS',

    '/official/srsNsrsCases/majorHead': 'MJRHAD',
    '/official/srsNsrsCases/majorHead/add': 'ADMRHA',
    '/official/srsNsrsCases/majorHead/edit': 'EDMRHD',

    '/official/srsNsrsCases/subMajorHead': 'SUMJHD',
    '/official/srsNsrsCases/subMajorHead/add': 'ADSUHD',
    '/official/srsNsrsCases/subMajorHead/edit': 'EDSUHD',

    '/official/srsNsrsCases/modusOperation': 'GTMOOP',
    '/official/srsNsrsCases/modusOperation/add': 'MDOPAD',
    '/official/srsNsrsCases/modusOperation/edit': 'EDMOOP',

    '/official/mostwanted': 'MSTWNT',
    '/official/mostwanted/add': 'ADMAWT',
    '/official/mostwanted/edit': 'EDMAWT',

    '/official/importantAchievement': 'IPRTNT',
    '/official/importantAchievement/add': 'ADIPTN',
    '/official/importantAchievement/edit': 'EDIPTN',

    '/official/bestOurTeam': 'ORBGPE',
    '/official/bestOurTeam/add': 'ADBORT',
    '/official/bestOurTeam/edit': 'EDBORT',

    '/official/grievancePoliceOfficial': 'COMPPG',
    '/official/grievancePoliceOfficial/view': 'GPOPVW',
    '/official/grievancePoliceOfficial/add': 'GPOPAD',
    '/official/grievancePoliceOfficial/edit': 'GPOPED',

    '/official/grievanceFemalePoliceOfficial': 'COMPPF',
    '/official/grievanceFemalePoliceOfficial/view': 'GPOPVF',
    '/official/grievanceFemalePoliceOfficial/add': 'GPOPAF',
    '/official/grievanceFemalePoliceOfficial/edit': 'GPOPEF',

    '/official/state': 'STPAGE',
    '/official/state/add': 'SMPAGE',
    '/official/state/edit': 'EDSAPG',


    '/official/range': 'RNGPGE',
    '/official/range/add': 'ARNGPG',
    '/official/range/edit': 'ERNGPG',

    '/official/district': 'DTPAGE',
    '/official/district/add': 'DMPAGE',
    '/official/district/edit': 'DMPEGE',

    '/official/circle': 'CIRPGE',


    '/official/trail': 'TRAILC',

    '/official/caseUpload': 'CIDEXE',
    '/official/caseUpload/add': 'ADDEXC',
    '/official/caseUpload/edit': 'EDTEXE',
    '/official/caseUpload/view': 'VIWEXC',
    '/official/caseUploadReport': 'CIDRPT',

  };

  public static ROLE_MODULE = {
    ADD_BUTTON: 'ROLADD',
    VIEW_BUTTON: 'ROLVIE',
    EDIT_BUTTON: 'ROLEDT',
    DEACTIVATE_BUTTON: 'ROLDCT',
    ACTIVATE_BUTTON: 'ROLACT',

    ADD_SUBMIT_DATA: 'ADRLDT',
    EDIT_SUBMIT_DATA: 'EDRLDT',

    ADD_SUBMIT_URL: 'addRoleData',
    EDIT_SUBMIT_URL: 'editRoleData',

    FETCH_URL: 'getRolesData',
    ADD_URL: '/official/role/add',
    VIEW_URL: '/official/role/view',
    EDIT_URL: '/official/role/edit',
    DEACTIVATE_URL: 'deactivateRole',
    ACTIVATE_URL: 'activateRole',

    FETCH_VIEW_DATA: 'getAllBYRole',

    UPDATE_PERMISSION: 'USUPPR',
    UPDATE_MENU: 'UPUSME',
    UPDATE_SUBMENU: 'UDRLSM',

    UPDATE_PERMISSION_URL: 'updatePermissions',
    UPDATE_MENU_URL: 'updateMenus',
    UPDATE_SUBMENU_URL: 'updateSubMenus',

    SYSTEM_CONFIG_DATA: 'getSystemConfigData',
    UPDATE_SYSTEM_CONFIG_DATA: 'updateSystemConfigData',
  };

  public static PERMISSION_MODULE = {
    ADD_BUTTON: 'PERADD',
    EDIT_BUTTON: 'PEREDT',
    DEACTIVATE_BUTTON: 'PERDCT',
    ACTIVATE_BUTTON: 'PERACT',

    ADD_SUBMIT_DATA: 'ADPMDT',
    EDIT_SUBMIT_DATA: 'EDPMDT',

    ADD_SUBMIT_URL: 'addPermission',
    EDIT_SUBMIT_URL: 'editPermission',

    FETCH_URL: 'getPermissionsData',
    ADD_URL: '/official/permission/add',
    EDIT_URL: '/official/permission/edit',
    DEACTIVATE_URL: 'deactivatePermission',
    ACTIVATE_URL: 'activatePermission',
  };

  public static MENU_MODULE = {
    ADD_BUTTON: 'ADDMDT',
    EDIT_BUTTON: 'EDMEDT',
    DEACTIVATE_BUTTON: 'DTMBDT',
    ACTIVATE_BUTTON: 'ACTMDT',

    FETCH_URL: 'getMenuData',
    ADD_URL: '/official/menu/add',
    EDIT_URL: '/official/menu/edit',
    DEACTIVATE_URL: 'deactivateMenu',
    ACTIVATE_URL: 'activateMenu',

    ADD_SUBMIT_DATA: 'ADDMDT',
    EDIT_SUBMIT_DATA: 'EDTMDT',

    ADD_SUBMIT_URL: 'addMenu',
    EDIT_SUBMIT_URL: 'editMenu',
  };

  public static SUBMENU_MODULE = {
    ADD_BUTTON: 'ADSMNT',
    EDIT_BUTTON: 'EDSMNT',
    DEACTIVATE_BUTTON: 'DTSBDT',
    ACTIVATE_BUTTON: 'ATSMDT',

    ADD_SUBMIT_DATA: 'ADDSUM',
    EDIT_SUBMIT_DATA: 'EDTSUM',

    ADD_SUBMIT_URL: 'addSubmenu',
    EDIT_SUBMIT_URL: 'editSubmenu',

    FETCH_URL: 'getSubmenuData',
    ADD_URL: '/official/submenu/add',
    EDIT_URL: '/official/submenu/edit',
    DEACTIVATE_URL: 'deactivateSubMenu',
    ACTIVATE_URL: 'activateSubMenu',

    FTCH_MENU_DATA: 'getMenuActiveForSubMenu',
    FTCH_SUBMENU_DATA: 'getSubMenuForSubMenu',
  };

  public static OPTION_MODULE = {
    ADD_BUTTON: 'OPNADD',
    EDIT_BUTTON: 'EDTOPN',
    DELETE_BUTTON: 'DLTOPN',
    DEACTIVATE_BUTTON: 'DCTOPN',
    ACTIVATE_BUTTON: 'ACTOPN',

    ADD_SUBMIT_DATA: 'ADDOPN',
    EDIT_SUBMIT_DATA: 'EDTOPN',

    ADD_SUBMIT_URL: 'addOptions',
    EDIT_SUBMIT_URL: 'editOptions',

    FETCH_URL: 'getOptions',
    ADD_URL: '/official/options/add',
    EDIT_URL: '/official/options/edit',
    DELETE_URL: 'deleteOptions',
    DEACTIVATE_URL: 'deactivateOption',
    ACTIVATE_URL: 'activateOption',
  };

  public static LINKS_MODULE = {
    ADD_BUTTON: 'ADDLNK',
    EDIT_BUTTON: 'EDTLNK',
    DEACTIVATE_BUTTON: 'DCTLNK',
    ACTIVATE_BUTTON: 'ACTLNK',

    FETCH_URL: 'getLinks',
    ADD_URL: '/official/links/add',
    EDIT_URL: '/official/links/edit',
    DEACTIVATE_URL: 'deactivateLinks',
    ACTIVATE_URL: 'activateLinks',

    ADD_SUBMIT_DATA: 'ADDLKD',
    EDIT_SUBMIT_DATA: 'EDTLKD',

    ADD_SUBMIT_URL: 'addLinks',
    EDIT_SUBMIT_URL: 'editLinks',
  };

  public static DISTRICT_DETAILS_MODULE = {
    ADD_BUTTON: 'DSDADD',
    EDIT_BUTTON: 'DSDEDT',
    DEACTIVATE_BUTTON: 'DTDBDT',
    ACTIVATE_BUTTON: 'ACTDDT',

    ADD_SUBMIT_DATA: 'ADDSDT',
    EDIT_SUBMIT_DATA: 'EDTSDT',

    ADD_SUBMIT_URL: 'addDistrictDetails',
    EDIT_SUBMIT_URL: 'editDistrictDetails',

    FETCH_URL: 'getDistrictDetails',
    ADD_URL: '/official/districtDetails/add',
    EDIT_URL: '/official/districtDetails/edit',
    DEACTIVATE_URL: 'deactivateDetails',
    ACTIVATE_URL: 'activateDetails',
  };

  public static BANNER_MODULE = {
    ADD_BUTTON: 'ADDBNR',
    EDIT_BUTTON: 'EDTBNR',
    DEACTIVATE_BUTTON: 'DCTBNR',
    ACTIVATE_BUTTON: 'ACTBNR',

    ADD_SUBMIT_DATA: 'ADDSDB',
    EDIT_SUBMIT_DATA: 'EDTSDB',

    ADD_SUBMIT_URL: 'addBanners',
    EDIT_SUBMIT_URL: 'editBanners',

    FETCH_URL: 'getBanners',
    ADD_URL: '/official/banner/add',
    EDIT_URL: '/official/banner/edit',
    DEACTIVATE_URL: 'deactivateBanner',
    ACTIVATE_URL: 'activateBanner',
  };

  public static HEADLINES_MODULE = {
    ADD_BUTTON: 'HLDADD',
    EDIT_BUTTON: 'EDTHDS',
    DEACTIVATE_BUTTON: 'DCTHDS',
    ACTIVATE_BUTTON: 'ACTHDS',

    ADD_SUBMIT_DATA: 'ADDHDL',
    EDIT_SUBMIT_DATA: 'EDHLNS',

    ADD_SUBMIT_URL: 'addHeadlines',
    EDIT_SUBMIT_URL: 'editHeadlines',

    FETCH_URL: 'getHeadlines',
    ADD_URL: '/official/headlines/add',
    EDIT_URL: '/official/headlines/edit',
    DEACTIVATE_URL: 'deactivateHeadlines',
    ACTIVATE_URL: 'activateHeadlines',
  };

  public static HELPLINE_MODULE = {
    ADD_BUTTON: 'ADDHLP',
    EDIT_BUTTON: 'EDTHLP',
    DEACTIVATE_BUTTON: 'DCTHLP',
    ACTIVATE_BUTTON: 'ACTHLP',

    FETCH_URL: 'getHelplines',
    ADD_URL: '/official/helpline/add',
    EDIT_URL: '/official/helpline/edit',
    DEACTIVATE_URL: 'deactivateHelplines',
    ACTIVATE_URL: 'activateHelplines',

    ADD_SUBMIT_DATA: 'ADDSHL',
    EDIT_SUBMIT_DATA: 'EDTSHL',

    ADD_SUBMIT_URL: 'addHelplines',
    EDIT_SUBMIT_URL: 'editHelplines',
  };
  public static PRESS_RELEASE_MODULE = {
    ADD_BUTTON: 'PRLADD',
    EDIT_BUTTON: 'PRLEDT',
    DEACTIVATE_BUTTON: 'PRLDAC',
    ACTIVATE_BUTTON: 'PRLACT',

    ADD_SUBMIT_DATA: 'PRLAAP',
    EDIT_SUBMIT_DATA: 'PRLEAP',

    ADD_SUBMIT_URL: 'addPressReleaseData',
    EDIT_SUBMIT_URL: 'editPressReleaseData',

    FETCH_URL: 'getPressReleaseData',
    ADD_URL: '/official/pressRelease/add',
    EDIT_URL: '/official/pressRelease/edit',
    DEACTIVATE_URL: 'deactivatePressRelease',
    ACTIVATE_URL: 'activatePressRelease',
  };

  public static NEWS_EVENTS_MODULE = {
    ADD_BUTTON: 'ADDNSE',
    EDIT_BUTTON: 'EDTNSE',
    DEACTIVATE_BUTTON: 'DACNSE',
    ACTIVATE_BUTTON: 'ACTNSE',

    ADD_SUBMIT_DATA: 'AAPNSE',
    EDIT_SUBMIT_DATA: 'EAPNSE',

    ADD_SUBMIT_URL: 'addNewsEvent',
    EDIT_SUBMIT_URL: 'editNewsEvent',

    FETCH_URL: 'getNewsEvent',
    ADD_URL: '/official/newsEvent/add',
    EDIT_URL: '/official/newsEvent/edit',
    DEACTIVATE_URL: 'deactivateNewsEvent',
    ACTIVATE_URL: 'activateNewsEvent',
  };

  public static IMAGE_GALLERY_MODULE = {
    ADD_BUTTON: 'ADDIMG',
    EDIT_BUTTON: 'EDTIMG',
    DEACTIVATE_BUTTON: 'DACIMG',
    ACTIVATE_BUTTON: 'ACTIMG',

    ADD_SUBMIT_DATA: 'AAPIMG',
    EDIT_SUBMIT_DATA: 'EAPIMG',

    ADD_SUBMIT_URL: 'addImageData',
    EDIT_SUBMIT_URL: 'editImageData',

    FETCH_URL: 'getImageData',
    ADD_URL: '/official/imageGallery/add',
    EDIT_URL: '/official/imageGallery/edit',
    DEACTIVATE_URL: 'deactivateImageData',
    ACTIVATE_URL: 'activateImageData',

    FETCH_EVENTS_URL: 'getEvents',
  };

  public static HOLIDAY_MODULE = {
    ADD_BUTTON: 'ADDHOL',
    EDIT_BUTTON: 'EDTHOL',
    DEACTIVATE_BUTTON: 'DACHOL',
    ACTIVATE_BUTTON: 'ACTHOL',

    ADD_SUBMIT_DATA: 'ADDHOL',
    EDIT_SUBMIT_DATA: 'EDTHOL',

    ADD_SUBMIT_URL: 'addHolidayData',
    EDIT_SUBMIT_URL: 'editHolidayData',

    FETCH_URL: 'getHolidayData',
    ADD_URL: '/official/holiday/add',
    EDIT_URL: '/official/holiday/edit',
    DEACTIVATE_URL: 'deactivateHolidayData',
    ACTIVATE_URL: 'activateHolidayData',

    FETCH_USER_URL: 'holidayList',
  };

  public static LEAVE_TYPE_MODULE = {
    ADD_BUTTON: 'ADLETY',
    EDIT_BUTTON: 'EDLETY',
    DEACTIVATE_BUTTON: 'DALETY',
    ACTIVATE_BUTTON: 'ACLETY',

    ADD_SUBMIT_DATA: 'OFLTAD',
    EDIT_SUBMIT_DATA: 'OFLTED',

    ADD_SUBMIT_URL: 'addLeaveTypeData',
    EDIT_SUBMIT_URL: 'editLeaveTypeData',

    FETCH_URL: 'getLeaveTypeData',
    ADD_URL: '/official/leaveType/add',
    EDIT_URL: '/official/leaveType/edit',
    DEACTIVATE_URL: 'deactivateLeaveTypeData',
    ACTIVATE_URL: 'activateLeaveTypeData',
  };

  public static RESOURCE_LEAVE_MODULE = {
    ADD_SUBMIT_DATA: 'ADLEAP',
    ADD_SUBMIT_URL: 'applyLeave',
    FETCH_ALL_APPLIED_LEAVES: 'leaveDashboard',
    FETCH_ALL_HISTORY_LEAVES: 'leaveDetails',
  };

  public static VIDEO_GALLERY_MODULE = {
    ADD_BUTTON: 'ADDVDO',
    EDIT_BUTTON: 'EDTVDO',
    DEACTIVATE_BUTTON: 'DACVDO',
    ACTIVATE_BUTTON: 'ACTVDO',

    ADD_SUBMIT_DATA: 'AAPVDO',
    EDIT_SUBMIT_DATA: 'EAPVDO',

    ADD_SUBMIT_URL: 'addVideoData',
    EDIT_SUBMIT_URL: 'editVideoData',

    FETCH_URL: 'getVideoData',
    ADD_URL: '/official/videoGallery/add',
    EDIT_URL: '/official/videoGallery/edit',
    DEACTIVATE_URL: 'deactivateVideoData',
    ACTIVATE_URL: 'activateVideoData',
  };

  public static FORMS_MODULE = {
    ADD_BUTTON: 'ADDFRM',
    EDIT_BUTTON: 'EDTFRM',
    DEACTIVATE_BUTTON: 'DACFRM',
    ACTIVATE_BUTTON: 'ACTFRM',

    ADD_SUBMIT_DATA: 'AAPFRM',
    EDIT_SUBMIT_DATA: 'EAPFRM',

    ADD_SUBMIT_URL: 'addFormsData',
    EDIT_SUBMIT_URL: 'editFormsData',

    FETCH_URL: 'getFormsData',
    ADD_URL: '/official/forms/add',
    EDIT_URL: '/official/forms/edit',
    DEACTIVATE_URL: 'deactivateFormsData',
    ACTIVATE_URL: 'activateFormsData',
  };
  public static ACTS_MODULE = {
    ADD_BUTTON: 'ADDACT',
    EDIT_BUTTON: 'EDTACT',
    DEACTIVATE_BUTTON: 'DACACT',
    ACTIVATE_BUTTON: 'ACTACT',

    ADD_SUBMIT_DATA: 'AAPACT',
    EDIT_SUBMIT_DATA: 'EAPACT',

    ADD_SUBMIT_URL: 'addActsData',
    EDIT_SUBMIT_URL: 'editActsData',

    FETCH_URL: 'getActsData',
    ADD_URL: '/official/acts/add',
    EDIT_URL: '/official/acts/edit',
    DEACTIVATE_URL: 'deactivateActsData',
    ACTIVATE_URL: 'activateActsData',
  };
  public static RULES_MODULE = {
    ADD_BUTTON: 'ADDRUL',
    EDIT_BUTTON: 'EDTRUL',
    DEACTIVATE_BUTTON: 'DACRUL',
    ACTIVATE_BUTTON: 'ACTRUL',

    ADD_SUBMIT_DATA: 'AAPRUL',
    EDIT_SUBMIT_DATA: 'EAPRUL',

    ADD_SUBMIT_URL: 'addRulesData',
    EDIT_SUBMIT_URL: 'editRulesData',

    FETCH_URL: 'getRulesData',
    ADD_URL: '/official/rules/add',
    EDIT_URL: '/official/rules/edit',
    DEACTIVATE_URL: 'deactivateRulesData',
    ACTIVATE_URL: 'activateRulesData',
  };
  public static PEACE_COMMITY_MODULE = {
    ADD_BUTTON: 'ADDPCM',
    EDIT_BUTTON: 'EDTPCM',
    DEACTIVATE_BUTTON: 'DACPCM',
    ACTIVATE_BUTTON: 'ACTPCM',

    ADD_SUBMIT_DATA: 'AAPPCM',
    EDIT_SUBMIT_DATA: 'EAPPCM',

    ADD_SUBMIT_URL: 'addPeaceCommityData',
    EDIT_SUBMIT_URL: 'editPeaceCommityData',

    FETCH_URL: 'getActsData',
    ADD_URL: '/official/peaceCommity/add',
    EDIT_URL: '/official/peaceCommity/edit',
    DEACTIVATE_URL: 'deactivatePeaceCommityData',
    ACTIVATE_URL: 'activatePeaceCommityData',
  };
  public static CRIMINAL_LIST_MODULE = {
    ADD_BUTTON: 'ADDCRL',
    EDIT_BUTTON: 'EDTCRL',
    DEACTIVATE_BUTTON: 'DACCRL',
    ACTIVATE_BUTTON: 'ACTCRL',

    ADD_SUBMIT_DATA: 'AAPCRL',
    EDIT_SUBMIT_DATA: 'EAPCRL',

    ADD_SUBMIT_URL: 'addCriminalData',
    EDIT_SUBMIT_URL: 'editCriminalData',

    FETCH_URL: 'getCriminalData',
    ADD_URL: '/official/criminalList/add',
    EDIT_URL: '/official/criminalList/edit',
    DEACTIVATE_URL: 'deactivateCriminalData',
    ACTIVATE_URL: 'activateCriminalData',
  };

  public static TRANSFER_LIST_MODULE = {
    ADD_BUTTON: 'ADDTFR',
    EDIT_BUTTON: 'EDTTFR',
    DEACTIVATE_BUTTON: 'DACTFR',
    ACTIVATE_BUTTON: 'ACTTFR',

    ADD_SUBMIT_DATA: 'AAPTFR',
    EDIT_SUBMIT_DATA: 'EAPTFR',

    ADD_SUBMIT_URL: 'addTransferData',
    EDIT_SUBMIT_URL: 'editTransferData',

    FETCH_URL: 'getTransferData',
    ADD_URL: '/official/transferList/add',
    EDIT_URL: '/official/transferList/edit',
    DEACTIVATE_URL: 'deactivateTransferData',
    ACTIVATE_URL: 'activateTransferData',
  };

  public static ANNOUNCEMENT_MODULE = {
    ADD_BUTTON: 'ADDAMT',
    EDIT_BUTTON: 'EDTAMT',
    DEACTIVATE_BUTTON: 'DACAMT',
    ACTIVATE_BUTTON: 'ACTAMT',

    ADD_SUBMIT_DATA: 'AAPAMT',
    EDIT_SUBMIT_DATA: 'EAPAMT',

    ADD_SUBMIT_URL: 'addAnnouncementData',
    EDIT_SUBMIT_URL: 'editAnnouncementData',

    FETCH_URL: 'getAnnouncementData',
    ADD_URL: '/official/announcement/add',
    EDIT_URL: '/official/announcement/edit',
    DEACTIVATE_URL: 'deactivateAnnouncement',
    ACTIVATE_URL: 'activateAnnouncement',
  };

  public static POSTING_MODULE = {
    ADD_BUTTON: 'ADDPSL',
    EDIT_BUTTON: 'EDTPSL',
    DEACTIVATE_BUTTON: 'DACPSL',
    ACTIVATE_BUTTON: 'ACTPSL',

    ADD_SUBMIT_DATA: 'AAPPSL',
    EDIT_SUBMIT_DATA: 'EAPPSL',

    ADD_SUBMIT_URL: 'addPostingListData',
    EDIT_SUBMIT_URL: 'editPostingListData',

    FETCH_URL: 'getPostingListData',
    ADD_URL: '/official/postingList/add',
    EDIT_URL: '/official/postingList/edit',
    DEACTIVATE_URL: 'deactivatePostingListData',
    ACTIVATE_URL: 'activatePostingListData',
  };

  public static OUR_TEAM_MODULE = {
    ADD_BUTTON: 'ADDORT',
    EDIT_BUTTON: 'EDTORT',
    DEACTIVATE_BUTTON: 'DACORT',
    ACTIVATE_BUTTON: 'ACTORT',

    ADD_SUBMIT_DATA: 'AAPORT',
    EDIT_SUBMIT_DATA: 'EAPORT',

    ADD_SUBMIT_URL: 'addOurTeamData',
    EDIT_SUBMIT_URL: 'editOurTeamData',

    FETCH_URL: 'getOurTeamData',
    ADD_URL: '/official/ourTeam/add',
    EDIT_URL: '/official/ourTeam/edit',
    DEACTIVATE_URL: 'deactivateOurTeamData',
    ACTIVATE_URL: 'activateOurTeamData',
  };
  public static SUCCESSION_LIST_MODULE = {
    ADD_BUTTON: 'ADDSCL',
    EDIT_BUTTON: 'EDTSCL',
    DEACTIVATE_BUTTON: 'DACSCL',
    ACTIVATE_BUTTON: 'ACTSCL',

    ADD_SUBMIT_DATA: 'AAPSCL',
    EDIT_SUBMIT_DATA: 'EAPSCL',

    ADD_SUBMIT_URL: 'addSuccessionData',
    EDIT_SUBMIT_URL: 'editSuccessionData',

    FETCH_URL: 'getSuccessionData',
    ADD_URL: '/official/successionList/add',
    EDIT_URL: '/official/successionList/edit',
    DEACTIVATE_URL: 'deactivateSuccessionData',
    ACTIVATE_URL: 'activateSuccessionData',
  };

  public static SECTION_MODULE = {
    ADD_BUTTON: 'SCNADD',
    EDIT_BUTTON: 'SCNEDT',
    VIEW_BUTTON: 'SCNEVW',
    DEACTIVATE_BUTTON: 'DCTSCN',
    ACTIVATE_BUTTON: 'ACTSCN',

    ADD_SUBMIT_DATA: 'ADDSCN',
    EDIT_SUBMIT_DATA: 'EDTSCN',

    ADD_SUBMIT_URL: 'addSections',
    EDIT_SUBMIT_URL: 'editSections',
    FETCH_VIEW_DATA: 'viewSections',

    FETCH_URL: 'getSections',
    ADD_URL: '/official/sections/add',
    EDIT_URL: '/official/sections/edit',
    VIEW_URL: '/official/sections/view',
    DEACTIVATE_URL: 'deactivateSections',
    ACTIVATE_URL: 'activateSections',

    SECTION_USER_FORM: 'SCSRFR',
    SECTION_USER_FORM_EDIT: 'SCSRED',
    SECTION_USER_CURRENT_FORM_EDIT: 'SCSRED',
    SECTION_USER_TABLE: 'SCSRTL',
    DELETE_SECTION_USER_BUTTON: 'DLSCSR',

    FETCH_VIEW_SECTION_USERS: 'getSectionsUsers',
    DETELE_SECTION_USER_URL: 'deleteSectionsUser',
    SECTION_USER_SUBMIT: 'addSectionsUser',
    SECTION_USER_EDIT: 'editSectionsUser',
  };

  public static SDPO_MODULE = {
    ADD_BUTTON: 'SDPOAD',
    EDIT_BUTTON: 'SDPOED',
    VIEW_BUTTON: 'SDPOVW',
    DEACTIVATE_BUTTON: 'DCSDPO',
    ACTIVATE_BUTTON: 'ACSDPO',

    ADD_SUBMIT_DATA: 'ADSDPO',
    EDIT_SUBMIT_DATA: 'EDSDPO',
    VIEW_SUBMIT_DATA: 'VWSDPO',

    ADD_SUBMIT_URL: 'addSdpo',
    EDIT_SUBMIT_URL: 'editSdpo',
    FETCH_VIEW_DATA: 'viewSdpo',

    FETCH_URL: 'getSdpo',
    ADD_URL: '/official/sdpo/add',
    EDIT_URL: '/official/sdpo/edit',
    VIEW_URL: '/official/sdpo/view',
    DEACTIVATE_URL: 'deactivateSdpo',
    ACTIVATE_URL: 'activateSdpo',

    SDPO_USER_FORM: 'SDPRFR',
    SDPO_USER_FORM_EDIT: 'SDPRED',
    SDPO_USER_CURRENT_FORM_EDIT: 'SDPRED',
    SDPO_USER_TABLE: 'SDPRTL',
    DELETE_SDPO_USER_BUTTON: 'DLSDPR',

    FETCH_VIEW_SDPO_USERS: 'getSdpoUsers',
    DETELE_SDPO_USER_URL: 'deleteSdpoUser',
    SDPO_USER_SUBMIT: 'addSdpoUser',
    SDPO_USER_EDIT: 'editSdpoUser',
  };

  public static CIRCLE_INSPECTOR_MODULE = {
    ADD_BUTTON: 'CRINAD',
    EDIT_BUTTON: 'CRINED',
    VIEW_BUTTON: 'CRINVW',
    DEACTIVATE_BUTTON: 'DCCRIN',
    ACTIVATE_BUTTON: 'ACCRIN',

    ADD_SUBMIT_DATA: 'ADCRIN',
    EDIT_SUBMIT_DATA: 'EDCRIN',
    VIEW_SUBMIT_DATA: 'VWCRIN',

    ADD_SUBMIT_URL: 'addCircleInspector',
    EDIT_SUBMIT_URL: 'editCircleInspector',
    FETCH_VIEW_DATA: 'viewCircleInspector',

    FETCH_URL: 'getCircleInspector',
    ADD_URL: '/official/circleInspector/add',
    EDIT_URL: '/official/circleInspector/edit',
    VIEW_URL: '/official/circleInspector/view',
    DEACTIVATE_URL: 'deactivateCircleInspector',
    ACTIVATE_URL: 'activateCircleInspector',

    CIRCLE_USER_FORM: 'CRLRFR',
    CIRCLE_USER_FORM_EDIT: 'CRLRED',
    CIRCLE_USER_CURRENT_FORM_EDIT: 'CRLRED',
    CIRCLE_USER_TABLE: 'CRLRTL',
    DELETE_CIRCLE_USER_BUTTON: 'DLCRLR',

    FETCH_VIEW_CIRCLE_USERS: 'getCircleUsers',
    DETELE_CIRCLE_USER_URL: 'deleteCircleUser',
    CIRCLE_USER_SUBMIT: 'addCircleUser',
    CIRCLE_USER_EDIT: 'editCircleUser',
  };

  public static USER_MODULE = {
    ADD_BUTTON: 'USERAD',
    EDIT_BUTTON: 'USERED',
    DEACTIVATE_BUTTON: 'DCUSER',
    ACTIVATE_BUTTON: 'ACUSER',

    ADD_SUBMIT_DATA: 'ADUSER',
    EDIT_SUBMIT_DATA: 'EDUSER',

    ADD_SUBMIT_URL: 'addUser',
    // EDIT_SUBMIT_URL: 'updateUser',
    EDIT_SUBMIT_URL: 'editUser',

    FETCH_URL: 'getUsers',
    ADD_URL: '/official/user/add',
    EDIT_URL: '/official/user/edit',
    PROFILE_URL: '/official/updateProfile',
    DEACTIVATE_URL: 'deactivateUser',
    ACTIVATE_URL: 'activateUser',

    FETCH_SECTION: 'getSectionForUser',
    FETCH_ROLE: 'getRoleForUser',
    FETCH_SDPO: 'getSdpoForUser',
    FETCH_DIG: 'getDigForUser',// DIG - Deputy Inspector General
    FETCH_RANGE: 'getRangeForUser',// Range - Deputy Inspector General
    FETCH_SUBDIV: 'getSubdivisionForUser',
    FETCH_CIRCLE_INSPCTOR: 'getCircleInspectorForUser',
    FETCH_STATION: 'getStationForUser',
    FETCH_ALL_STATION_USER: 'getAllStationUsers',
  };

  public static POLICE_STATION_MODULE = {
    ADD_BUTTON: 'PLSTAD',
    EDIT_BUTTON: 'PLSTED',
    VIEW_BUTTON: 'PLSTVW',
    DEACTIVATE_BUTTON: 'DCPLST',
    ACTIVATE_BUTTON: 'ACPLST',

    ADD_SUBMIT_DATA: 'ADPLST',
    EDIT_SUBMIT_DATA: 'EDPLST',

    ADD_SUBMIT_URL: 'addStation',
    EDIT_SUBMIT_URL: 'editStation',

    FETCH_VIEW_DATA: 'viewPoliceStation',

    FETCH_URL: 'getStation',
    ADD_URL: '/official/policeStation/add',
    EDIT_URL: '/official/policeStation/edit',
    VIEW_URL: '/official/policeStation/view',
    DEACTIVATE_URL: 'deactivateStation',
    ACTIVATE_URL: 'activateStation',

    STATION_USER_FORM: 'SUSRFR',
    STATION_USER_FORM_EDIT: 'SUSRED',
    STATION_USER_CURRENT_FORM_EDIT: 'SUSRED',
    STATION_USER_TABLE: 'SUSRTL',
    DELETE_STATION_USER_BUTTON: 'DLSUSR',

    FETCH_VIEW_STATION_USERS: 'getStationUsers',
    DETELE_STATION_USER_URL: 'deleteStationUser',
    STATION_USER_SUBMIT: 'addStationUser',
    STATION_USER_EDIT: 'editStationUser',
  };

  public static SYS_CONFIG_MODULE = {
    ADD_BUTTON: 'SYSCAD',
    EDIT_BUTTON: 'SYSCED',

    ADD_SUBMIT_DATA: 'ADSYSC',
    EDIT_SUBMIT_DATA: 'EDSYSC',

    ADD_SUBMIT_URL: 'addSystemConfig',
    EDIT_SUBMIT_URL: 'editSystemConfig',

    FETCH_URL: 'getSystemConfig',
    ADD_URL: '/official/systemConfig/add',
    EDIT_URL: '/official/systemConfig/edit',
  };

  public static SMS_RESCHEDULAR_MODULE = {
    FETCH_URL: 'getSmsSchedular',
  };

  public static QUESTION_MODULE = {
    ADD_BUTTON: 'QUSADD',
    EDIT_BUTTON: 'QUSEDT',
    DEACTIVATE_BUTTON: 'DCTQUS',
    ACTIVATE_BUTTON: 'ACTQUS',

    FETCH_URL: 'getQuestionData',
    ADD_URL: '/official/questions/add',
    EDIT_URL: '/official/questions/edit',
    DEACTIVATE_URL: 'deactivateQuestion',
    ACTIVATE_URL: 'activateQuestion',

    ADD_SUBMIT_DATA: 'ADDQUS',
    EDIT_SUBMIT_DATA: 'EDTQUS',

    ADD_SUBMIT_URL: 'addQuestion',
    EDIT_SUBMIT_URL: 'editQuestion',
  };

  public static PASSPORT_MODULE = {
    VIEW_BUTTON: 'PASSVW',
    DELETE_BUTTON: 'DLPASS',
    DELETE_CHECK_STATUS_BUTTON: 'DLPSST',
    DELETE_FORWARD_TO_BUTTON: 'DLPSFR',

    CHANGE_STATUS_FORM: 'PSSTCH',
    ASSIGN_TO_OFFICER_FORM: 'PSASOF',
    FORWARD_TO_OFFICER_FORM: 'PSFRSB',
    SMS_TO_USER_FORM: 'PSSDSM',

    CHANGE_STATUS_TABLE: 'PSCGST',
    FORWARD_TO_OFFICER_TABLE: 'PSFRWD',
    SMS_TO_USER_TABLE: 'PSSMSD',

    VIEW_URL: '/official/passport/view',

    FETCH_URL: 'getPassportData',
    FETCH_VIEW_DATA: 'viewPassport',
    DELETE_URL: 'deletePassport',

    DETELE_CHECK_STATUS_URL: 'deletePassportCheckStatus',
    DETELE_FORWARD_URL: 'deletePassportForward',

    FETCH_VIEW_URL: 'getPassportChangeStatus',
    PASS_FORMWARD_LIST: 'getForwardList',

    FETCH_VIEW_FORWARDURL: 'getPassportForwards',
    FETCH_SMS_URL: 'getPassportSmsData',

    CHANGE_STATUS_SUBMIT: 'passportChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'passportAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'passportForwardToDestSubmit',
    SMS_SENDING_SUBMIT: 'passportSendSMS',

    COPM_REJECT: 'Passport Rejected',
    COPM_CLOSED: 'Passport Closed',
    COPM_ASSIGN: 'Passport Assign',
  };

  public static APPOINTMENT_MODULE = {
    VIEW_BUTTON: 'APPOVW',
    DELETE_BUTTON: 'APPODL',
    VIEW_URL: '/official/appointment/view',

    FETCH_URL: 'getAppointmentData',
    FETCH_VIEW_DATA: 'viewAppointment',
    DELETE_URL: 'deleteAppointment',

    FETCH_VIEW_URL: 'getAppointmentChangeStatus',
    FETCH_SMS_URL: 'getAppointmentSmsData',

    CHANGE_STATUS_SUBMIT: 'appointmentChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'appointmentAssignToOfficer',
    SMS_SENDING_SUBMIT: 'appointmentSendSMS',

    COPM_CANCELE: 'Appointment Cancelled',
    COPM_COMPLETE: 'Appointment Completed',

    DELETE_CHECK_STATUS_BUTTON: 'DLAPST',
    DETELE_CHECK_STATUS_URL: 'deleteAppointmentCheckStatus',

    CHANGE_STATUS_FORM: 'APCSSU',
    ASSIGN_TO_OFFICER_FORM: 'APSOSU',
    SMS_TO_USER_FORM: 'APSMSD',

    CHANGE_STATUS_TABLE: 'FTAPCS',
    SMS_TO_USER_TABLE: 'APSMLT',

    ACCEPT_REJECT: 'APACRJ',
    ACCEPT_REJECT_URL: 'acceptRejectAppointment',

    RESCHEDULE: 'APPRSD',
    RESCHEDULE_URL: 'rescheduleAppointment',

    APPOINTMENT_HISTORY: 'APHIDT',
    APPOINTMENT_HISTORY_URL: 'getAppointmentHistory',
  };

  public static CITIZEN_REPORT_MODULE = {
    ADD_BUTTON: 'CZRTAD',
    EDIT_BUTTON: 'CZRTED',
    DELETE_BUTTON: 'DLCTRP',
    VIEW_BUTTON: 'CZRTVW',
    ADD_SUBMIT_DATA: 'ADCZRT',
    EDIT_SUBMIT_DATA: 'EDCZRT',
    DELETE_CHECK_STATUS_BUTTON: 'DLCRST',
    DELETE_FORWARD_TO_BUTTON: 'DLCRFR',
    ACTIVE_BUTTON: 'ACINPC',

    CHANGE_STATUS_FORM: 'CRSTCH',
    ASSIGN_TO_OFFICER_FORM: 'CRASOF',
    FORWARD_TO_OFFICER_FORM: 'CRFRSB',
    SMS_TO_USER_FORM: 'CRSDSM',

    CHANGE_STATUS_TABLE: 'CRCGST',
    FORWARD_TO_OFFICER_TABLE: 'CRFRWD',
    SMS_TO_USER_TABLE: 'CRSMSD',

    ADD_SUBMIT_URL: 'addCitizenReport',
    EDIT_SUBMIT_URL: 'editCitizenReport',
    FETCH_URL: 'getCitizenReport',
    FETCH_VIEW_DATA: 'viewCitizenReport',
    ADD_URL: '/official/citizenReport/add',
    EDIT_URL: '/official/citizenReport/edit',
    VIEW_URL: '/official/citizenReport/view',
    DELETE_URL: 'deleteCitizenReport',

    DETELE_CHECK_STATUS_URL: 'deleteCitizenReportCheckStatus',
    DETELE_FORWARD_URL: 'deleteCitizenReportForward',

    FETCH_VIEW_URL: 'getCitizenReportChangeStatus',
    CZRT_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getCitizenReportForwards',
    FETCH_SMS_URL: 'getCitizenReportSmsData',

    CHANGE_STATUS_SUBMIT: 'citizenReportChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'citizenReportAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'citizenReportForwardToDestSubmit',
    SMS_SENDING_SUBMIT: 'citizenReportSendSMS',

    COPM_REJECT: 'Complaint Rejected',
    COPM_CLOSED: 'Complaint Closed',
    COPM_ASSIGN: 'Complaint Assign',
    ASSIGNED_TO_OFFICER: 'Complaint Assigned To Officer',

    SHO_HIDE_PUBLICE: 'publicSiteShowHide',
  };

  public static MISSING_PERSON_MODULE = {
    ADD_BUTTON: 'MSPRAD',
    EDIT_BUTTON: 'MSPRED',
    VIEW_BUTTON: 'MSPRVW',
    DELETE_BUTTON: 'MSPRDL',
    ACTIVE_BUTTON: 'ACINPM',

    ADD_SUBMIT_DATA: 'ADMSPR',
    EDIT_SUBMIT_DATA: 'EDMSPR',

    DELETE_CHECK_STATUS_BUTTON: 'MPDLCS',
    DELETE_FORWARD_TO_BUTTON: 'MPDLFR',

    CHANGE_STATUS_FORM: 'MPCGST',
    ASSIGN_TO_OFFICER_FORM: 'MPASOF',
    FORWARD_TO_OFFICER_FORM: 'MPFRSU',
    SMS_TO_USER_FORM: 'MPSDSM',

    CHANGE_STATUS_TABLE: 'MPCGDT',
    FORWARD_TO_OFFICER_TABLE: 'MPFRDT',
    SMS_TO_USER_TABLE: 'MPSMDT',

    ADD_SUBMIT_URL: 'addMissingPerson',
    EDIT_SUBMIT_URL: 'editMissingPerson',

    FETCH_URL: 'getMissingPerson',
    FETCH_VIEW_DATA: 'viewMissingPerson',
    ADD_URL: '/official/missingPerson/add',
    EDIT_URL: '/official/missingPerson/edit',
    VIEW_URL: '/official/missingPerson/view',
    DELETE_URL: 'deleteMissingPerson',

    DETELE_CHECK_STATUS_URL: 'deleteMissingPersonCheckStatus',
    DETELE_FORWARD_URL: 'deleteMissingPersonForward',

    FETCH_VIEW_URL: 'getMissingPersonChangeStatus',
    MSPR_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getMissingPersonForwards',
    FETCH_SMS_URL: 'getMissingPersonSmsData',

    CHANGE_STATUS_SUBMIT: 'missingPersonChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'missingPersonAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'missingPersonForwardToDestSubmit',
    SMS_SENDING_SUBMIT: 'missingPersonSendSMS',

    COPM_REJECT: 'Complaint Rejected',
    COPM_CLOSED: 'Complaint Closed',
    COPM_ASSIGN: 'Complaint Assign',

    SHO_HIDE_PUBLICE: 'publicSiteShowHideMissingPerson',
  };

  public static DEAD_PERSON_MODULE = {
    ADD_BUTTON: 'DEADAD',
    EDIT_BUTTON: 'DEADED',
    VIEW_BUTTON: 'DEADVW',
    DELETE_BUTTON: 'DEADDL',
    ACTIVE_BUTTON: 'ACINPD',

    ADD_SUBMIT_DATA: 'ADDEAD',
    EDIT_SUBMIT_DATA: 'EDDEAD',

    DELETE_CHECK_STATUS_BUTTON: 'DPDLCS',
    DELETE_FORWARD_TO_BUTTON: 'DPDLFR',

    CHANGE_STATUS_FORM: 'DPCGST',
    ASSIGN_TO_OFFICER_FORM: 'DPASOF',
    FORWARD_TO_OFFICER_FORM: 'DPFRDT',
    SMS_TO_USER_FORM: 'DPSDSM',

    CHANGE_STATUS_TABLE: 'DPCGDT',
    FORWARD_TO_OFFICER_TABLE: 'DPFWLD',
    SMS_TO_USER_TABLE: 'DPSMDT',

    ADD_SUBMIT_URL: 'addDeadPerson',
    EDIT_SUBMIT_URL: 'editDeadPerson',
    DELETE_URL: 'deleteDeadPerson',

    FETCH_URL: 'getDeadPerson',
    FETCH_VIEW_DATA: 'viewDeadPerson',
    ADD_URL: '/official/deadPerson/add',
    EDIT_URL: '/official/deadPerson/edit',
    VIEW_URL: '/official/deadPerson/view',

    DETELE_CHECK_STATUS_URL: 'deleteDeadPersonCheckStatus',
    DETELE_FORWARD_URL: 'deleteDeadPersonForward',

    FETCH_VIEW_URL: 'getDeadPersonChangeStatus',
    DDPR_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getDeadPersonForwards',

    CHANGE_STATUS_SUBMIT: 'deadPersonChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'deadPersonAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'deadPersonForwardToDestSubmit',

    COPM_REJECT: 'Complaint Rejected',
    COPM_CLOSED: 'Complaint Closed',
    COPM_ASSIGN: 'Complaint Assign',

    SHO_HIDE_PUBLICE: 'publicSiteShowHideDeadPerson',
  };

  public static FOUND_PERSON_MODULE = {
    ADD_BUTTON: 'FDPRAD',
    EDIT_BUTTON: 'FDPRED',
    VIEW_BUTTON: 'FDPRVW',
    DELETE_BUTTON: 'FDPRDL',
    ACTIVE_BUTTON: 'ACINPF',

    ADD_SUBMIT_DATA: 'ADFDPR',
    EDIT_SUBMIT_DATA: 'EDFDPR',

    DELETE_CHECK_STATUS_BUTTON: 'FPDLCS',
    DELETE_FORWARD_TO_BUTTON: 'FPDLFR',

    CHANGE_STATUS_FORM: 'FPCGST',
    ASSIGN_TO_OFFICER_FORM: 'FPASOF',
    FORWARD_TO_OFFICER_FORM: 'FPFRSU',
    SMS_TO_USER_FORM: 'FPSDSM',

    CHANGE_STATUS_TABLE: 'FPCGDT',
    FORWARD_TO_OFFICER_TABLE: 'FPFRDT',
    SMS_TO_USER_TABLE: 'FPSMDT',

    ADD_SUBMIT_URL: 'addFoundPerson',
    EDIT_SUBMIT_URL: 'editFoundPerson',

    FETCH_URL: 'getFoundPerson',
    FETCH_VIEW_DATA: 'viewFoundPerson',
    ADD_URL: '/official/foundPerson/add',
    EDIT_URL: '/official/foundPerson/edit',
    VIEW_URL: '/official/foundPerson/view',
    DELETE_URL: 'deleteFoundPerson',

    DETELE_CHECK_STATUS_URL: 'deleteFoundPersonCheckStatus',
    DETELE_FORWARD_URL: 'deleteFoundPersonForward',

    FETCH_VIEW_URL: 'getFoundPersonChangeStatus',
    FDPR_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getFoundPersonForwards',

    CHANGE_STATUS_SUBMIT: 'foundPersonChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'foundPersonAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'foundPersonForwardToDestSubmit',

    COPM_REJECT: 'Complaint Rejected',
    COPM_CLOSED: 'Complaint Closed',
    COPM_ASSIGN: 'Complaint Assign',

    SHO_HIDE_PUBLICE: 'publicSiteShowHideFoundPerson',
  };

  public static COMPLAINT_MODULE = {
    VIEW_BUTTON: 'COMPVW',
    DELETE_BUTTON: 'DLCOMP',
    DELETE_CHECK_STATUS_BUTTON: 'DLCHST',
    DELETE_FORWARD_TO_BUTTON: 'DLFRTO',

    FETCH_URL: 'getComplaintData',
    FETCH_VIEW_DATA: 'viewComplaint',
    VIEW_URL: '/official/complaint/view',
    DELETE_URL: 'deleteComplaint',
    DETELE_CHECK_STATUS_URL: 'deleteComplaintCheckStatus',
    DETELE_FORWARD_URL: 'deleteComplaintForward',

    FETCH_VIEW_URL: 'getComplaintChangeStatus',
    USER_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getComplaintForwards',
    FETCH_SMS_URL: 'getComplaintSmsData',

    CHANGE_STATUS_FORM: 'CMCSSU',
    ASSIGN_TO_OFFICER_FORM: 'CMSOSU',
    FORWARD_TO_OFFICER_FORM: 'CMFWSB',
    SMS_TO_USER_FORM: 'CMSMSD',

    CHANGE_STATUS_TABLE: 'FTCMCS',
    FORWARD_TO_OFFICER_TABLE: 'CMFWLD',
    SMS_TO_USER_TABLE: 'CMSMLT',

    CHANGE_STATUS_SUBMIT: 'complaintChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'complaintAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'complaintForwardToDestSubmit',
    SMS_SENDING_SUBMIT: 'complaintSendSMS',

    COPM_REJECT: 'Complaint Rejected',
    COPM_CLOSED: 'Complaint Closed',
    COPM_ASSIGN: 'Complaint Assign',
  };

  public static CHARACTER_MODULE = {
    VIEW_BUTTON: 'CHARVW',
    DELETE_BUTTON: 'CHARDL',
    DELETE_CHECK_STATUS_BUTTON: 'DLCHCS',
    DELETE_FORWARD_TO_BUTTON: 'DLCHFR',
    DONWLOAD_CERTIFICATE: 'DWCFUC',

    FETCH_URL: 'getCharacterData',
    FETCH_VIEW_DATA: 'viewCharacter',
    VIEW_URL: '/official/character/view',
    DELETE_URL: 'deleteCharacter',

    DETELE_CHECK_STATUS_URL: 'deleteCharacterCheckStatus',
    DETELE_FORWARD_URL: 'deleteCharacterForward',

    FETCH_VIEW_URL: 'getCharacterChangeStatus',
    USER_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getCharacterForwards',
    FETCH_SMS_URL: 'getCharacterSmsData',

    CHANGE_STATUS_FORM: 'CHCSSU',
    ASSIGN_TO_OFFICER_FORM: 'CHSOSU',
    FORWARD_TO_OFFICER_FORM: 'CHFWSB',
    SMS_TO_USER_FORM: 'CHSMSD',
    UPLOAD_CERT_FORM: 'CHUCFT',

    CHANGE_STATUS_TABLE: 'FTCHCS',
    FORWARD_TO_OFFICER_TABLE: 'CHFWLD',
    SMS_TO_USER_TABLE: 'CHSMLT',

    CHANGE_STATUS_SUBMIT: 'characterChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'characterAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'characterForwardToDestSubmit',
    SMS_SENDING_SUBMIT: 'characterSendSMS',
    UPLOADCERT_SUBMIT: 'characterUploadCert',

    COPM_REJECT: 'Character Rejected',
    COPM_CLOSED: 'Character Completed',
    COPM_ASSIGN: 'Character Assign',

    ACCEPT_REJECT: 'CHACRJ',
    ACCEPT_REJECT_URL: 'acceptRejectCharacter',

    ADD_CHAR_FORM: 'COFRAD',
    EDIT_CHAR_FORM: 'COFRED',
    VIEW_CHAR_FORM: 'VWCOFR',
    GET_CHAR_FORM: 'GEDCHF',

    ADD_CHAR_FORM_URL: 'addCharacterOfficerForm',
    EDIT_CHAR_FORM_URL: 'editCharacterOfficerForm',
    VIEW_CHAR_FORM_URL: 'viewCharacterOfficerForm',
    GET_CHAR_FORM_URL: 'getEditCharacterOfficerForm',
    GENERATE_SIGNED_CERT: 'characterGetSignedCert',
  };

  public static POLICE_OFFICER_DETAILS_MODULE = {
    ADD_BUTTON: 'PLODAD',
    EDIT_BUTTON: 'PLODED',
    DEACTIVATE_BUTTON: 'DCPLOD',
    ACTIVATE_BUTTON: 'ACPLOD',

    ADD_SUBMIT_DATA: 'ADPLOD',
    EDIT_SUBMIT_DATA: 'EDPLOD',

    ADD_SUBMIT_URL: 'addPoliceOfficerDetails',
    EDIT_SUBMIT_URL: 'editPoliceOfficerDetails',

    FETCH_URL: 'getPoliceOfficerDetails',
    ADD_URL: '/official/policeOfficerDetails/add',
    EDIT_URL: '/official/policeOfficerDetails/edit',
    DEACTIVATE_URL: 'deactivatePoliceOfficerDetails',
    ACTIVATE_URL: 'activatePoliceOfficerDetails',
  };

  public static STAFF_DETAILS_MODULE = {
    ADD_BUTTON: 'STDTAD',
    EDIT_BUTTON: 'STDTED',
    DEACTIVATE_BUTTON: 'DCSTDT',
    ACTIVATE_BUTTON: 'ACSTDT',

    ADD_SUBMIT_DATA: 'ADSTDT',
    EDIT_SUBMIT_DATA: 'EDSTDT',

    ADD_SUBMIT_URL: 'addStaffDetails',
    EDIT_SUBMIT_URL: 'editStaffDetails',

    FETCH_URL: 'getStaffDetails',
    ADD_URL: '/official/policeStaffDetails/add',
    EDIT_URL: '/official/policeStaffDetails/edit',
    DEACTIVATE_URL: 'deactivateStaffDetails',
    ACTIVATE_URL: 'activateStaffDetails',
  };

  public static OTHER_DETAILS_MODULE = {
    ADD_BUTTON: 'OTDTAD',
    EDIT_BUTTON: 'OTDTED',
    DEACTIVATE_BUTTON: 'DCOTDT',
    ACTIVATE_BUTTON: 'ACOTDT',

    ADD_SUBMIT_DATA: 'ADOTDT',
    EDIT_SUBMIT_DATA: 'EDOTDT',

    ADD_SUBMIT_URL: 'addOtherDetails',
    EDIT_SUBMIT_URL: 'editOtherDetails',

    FETCH_URL: 'getOtherDetails',
    ADD_URL: '/official/otherDetails/add',
    EDIT_URL: '/official/otherDetails/edit',
    DEACTIVATE_URL: 'deactivateOtherDetails',
    ACTIVATE_URL: 'activateOtherDetails',
  };

  public static CHAUKIDAR_DAFADAR_MODULE = {
    ADD_BUTTON: 'CHDFAD',
    EDIT_BUTTON: 'CHDFED',
    DEACTIVATE_BUTTON: 'DCCHDF',
    ACTIVATE_BUTTON: 'ACCHDF',

    ADD_SUBMIT_DATA: 'ADCHDF',
    EDIT_SUBMIT_DATA: 'EDCHDF',

    ADD_SUBMIT_URL: 'addChaukidarDafadar',
    EDIT_SUBMIT_URL: 'editChaukidarDafadar',

    FETCH_URL: 'getChaukidarDafadar',
    ADD_URL: '/official/chaukidarDafadarDetails/add',
    EDIT_URL: '/official/chaukidarDafadarDetails/edit',
    DEACTIVATE_URL: 'deactivateChaukidarDafadar',
    ACTIVATE_URL: 'activateChaukidarDafadar',
  };

  public static FEEDBACK_MODULE = {
    VIEW_BUTTON: 'FEEDVW',
    DELETE_BUTTON: 'FEEDDL',
    VIEW_URL: '/official/feedback/view',

    FETCH_URL: 'getFeedBackData',
    FETCH_VIEW_DATA: 'viewFeedBack',
    DELETE_URL: 'deleteFeedBack',
  };

  public static LOCATION_MODULE = {
    ADD_BUTTON: 'ADDIMP',
    EDIT_BUTTON: 'EDTIMP',
    DEACTIVATE_BUTTON: 'DACIMP',
    ACTIVATE_BUTTON: 'ACTIMP',

    ADD_SUBMIT_DATA: 'IMPADD',
    EDIT_SUBMIT_DATA: 'IMPEDT',

    ADD_SUBMIT_URL: 'addImportantPlaces',
    EDIT_SUBMIT_URL: 'editImportantPlaces',

    FETCH_URL: 'getImportantPlaces',
    ADD_URL: '/official/importantPlaces/add',
    EDIT_URL: '/official/importantPlaces/edit',
    DEACTIVATE_URL: 'deactivateImportantPlaces',
    ACTIVATE_URL: 'activateImportantPlaces',
  };

  public static DESIGNATION_MODULE = {
    ADD_BUTTON: 'DESGAD',
    EDIT_BUTTON: 'DESGED',
    DEACTIVATE_BUTTON: 'DCDESG',
    // ACTIVATE_BUTTON: 'ACDESG',

    ADD_SUBMIT_DATA: 'ADDESG',
    EDIT_SUBMIT_DATA: 'EDDESG',

    ADD_SUBMIT_URL: 'addDesignation',
    EDIT_SUBMIT_URL: 'editDesignation',

    FETCH_URL: 'getDesignation',
    ADD_URL: '/official/designations/add',
    EDIT_URL: '/official/designations/edit',
    DEACTIVATE_URL: 'deactivateDesignation',
    // ACTIVATE_URL: 'activateDesignation',
    GET_DESGN_LIST: 'getDesignationList',
  };

  public static RESOURCE_MODULE = {
    ADD_BUTTON: 'RSRCAD',
    EDIT_BUTTON: 'RSRCED',
    DEACTIVATE_BUTTON: 'DCRSRC',
    ACTIVATE_BUTTON: 'ACRSRC',

    ADD_SUBMIT_DATA: 'ADRSRC',
    EDIT_SUBMIT_DATA: 'EDRSRC',

    ADD_SUBMIT_URL: 'addResource',
    EDIT_SUBMIT_URL: 'editResource',

    FETCH_URL: 'getResource',
    ADD_URL: '/official/resources/add',
    EDIT_URL: '/official/resources/edit',
    DEACTIVATE_URL: 'deactivateResource',
    ACTIVATE_URL: 'activateResource',
  };

  public static DSP_MODULE = {
    ADD_BUTTON: 'ADSPAD',
    EDIT_BUTTON: 'ADSPED',
    VIEW_BUTTON: 'ADSPVW',
    DEACTIVATE_BUTTON: 'DCADSP',
    ACTIVATE_BUTTON: 'ACADSP',

    ADD_SUBMIT_DATA: 'ADADSP',
    EDIT_SUBMIT_DATA: 'EDADSP',
    VIEW_SUBMIT_DATA: 'VWADSP',

    ADD_SUBMIT_URL: 'addDSP',
    EDIT_SUBMIT_URL: 'editDSP',
    FETCH_VIEW_DATA: 'viewDSP',

    FETCH_URL: 'getDSP',
    ADD_URL: '/official/aboutDSP/add',
    EDIT_URL: '/official/aboutDSP/edit',
    VIEW_URL: '/official/aboutDSP/view',
    DEACTIVATE_URL: 'deactivateDSP',
    ACTIVATE_URL: 'activateDSP',

    DSP_USER_FORM: 'DSPRFR',
    DSP_USER_FORM_EDIT: 'DSPRED',
    DSP_USER_CURRENT_FORM_EDIT: 'DSPRED',
    DSP_USER_TABLE: 'DSPRTL',
    DELETE_DSP_USER_BUTTON: 'DLDSPR',

    FETCH_VIEW_DSP_USERS: 'getDspUsers',
    DETELE_DSP_USER_URL: 'deleteDspUser',
    DSP_USER_SUBMIT: 'addDspUser',
    DSP_USER_EDIT: 'editDspUser',
  };

  public static DIG_MODULE = {
    ADD_BUTTON: 'ADIGAD',
    EDIT_BUTTON: 'ADIGED',
    VIEW_BUTTON: 'ADIGVW',
    DEACTIVATE_BUTTON: 'DCADIG',
    ACTIVATE_BUTTON: 'ACADIG',

    ADD_SUBMIT_DATA: 'ADADIG',
    EDIT_SUBMIT_DATA: 'EDADIG',
    VIEW_SUBMIT_DATA: 'VWADIG',

    ADD_SUBMIT_URL: 'addDIG',
    EDIT_SUBMIT_URL: 'editDIG',
    FETCH_VIEW_DATA: 'viewDIG',

    FETCH_URL: 'getDIG',
    ADD_URL: '/official/aboutDIG/add',
    EDIT_URL: '/official/aboutDIG/edit',
    VIEW_URL: '/official/aboutDIG/view',
    DEACTIVATE_URL: 'deactivateDIG',
    ACTIVATE_URL: 'activateDIG',

    DIG_USER_FORM: 'DIGRFR',
    DIG_USER_FORM_EDIT: 'DIGRED',
    DIG_USER_CURRENT_FORM_EDIT: 'DIGRED',
    DIG_USER_TABLE: 'DIGRTL',
    DELETE_DIG_USER_BUTTON: 'DLDIGR',

    FETCH_VIEW_DIG_USERS: 'getDigUsers',
    DETELE_DIG_USER_URL: 'deleteDigUser',
    DIG_USER_SUBMIT: 'addDigUser',
    DIG_USER_EDIT: 'editDigUser',
  };

  public static SUBDIVISION_MODULE = {
    ADD_BUTTON: 'SUDVAD',
    EDIT_BUTTON: 'SUDVED',
    VIEW_BUTTON: 'SUDVVW',
    DEACTIVATE_BUTTON: 'DCSUDV',
    ACTIVATE_BUTTON: 'ACSUDV',

    ADD_SUBMIT_DATA: 'ADSUDV',
    EDIT_SUBMIT_DATA: 'EDSUDV',
    VIEW_SUBMIT_DATA: 'VWSUDV',

    ADD_SUBMIT_URL: 'addSubdivision',
    EDIT_SUBMIT_URL: 'editSubdivision',
    FETCH_VIEW_DATA: 'viewSubdivision',

    FETCH_URL: 'getSubdivision',
    ADD_URL: '/official/subdivision/add',
    EDIT_URL: '/official/subdivision/edit',
    VIEW_URL: '/official/subdivision/view',
    DEACTIVATE_URL: 'deactivateSubdivision',
    ACTIVATE_URL: 'activateSubdivision',

    SUBDIVISION_USER_FORM: 'SBDRFR',
    SUBDIVISION_USER_FORM_EDIT: 'SBDRED',
    SUBDIVISION_USER_CURRENT_FORM_EDIT: 'SBDRED',
    SUBDIVISION_USER_TABLE: 'SBDRTL',
    DELETE_SUBDIVISION_USER_BUTTON: 'DLSBDR',

    FETCH_VIEW_SUBDIVISION_USERS: 'getSubdivisionUsers',
    DETELE_SUBDIVISION_USER_URL: 'deleteSubdivisionUser',
    SUBDIVISION_USER_SUBMIT: 'addSubdivisionUser',
    SUBDIVISION_USER_EDIT: 'editSubdivisionUser',
  };

  public static SUPER_COURT_MODULE = {
    ADD_BUTTON: 'SCRTAD',
    EDIT_BUTTON: 'SCRTET',
    DELETE_BUTTON: 'DLSCRT',
    VIEW_BUTTON: 'SUCTVW',

    ADD_SUBMIT_DATA: 'ADSCRT',
    EDIT_SUBMIT_DATA: 'ETSCRT',

    ADD_SUBMIT_URL: 'addStationUserByTMS',    // hum air 24-05-2024
    EDIT_SUBMIT_URL: 'editStationUserByTMS',  // humair 24-05-2024
    // FETCH_VIEW_DATA: 'viewSupremeCourt',

    // FETCH_COURT_DETAILS_LIST: 'getCourtDetailsData',
    ADD_COURT_DETAILS: 'addCourtDetails',
    ADD_COURT_DETAILS_URL: '/official/courtDetails/add',

    FETCH_URL: 'getStationUsers', // humair 24-05-2024
    ADD_URL: '/official/supremeCourt/add',
    EDIT_URL: '/official/supremeCourt/edit',
    VIEW_URL: '/official/supremeCourt/view',
    // USER_FOFFICER_LIST: 'getOfficersList',
    DELETE_URL: 'deleteSupremeCourt',

    // FETCH_VIEW_URL: 'getSupremeCourtChangeStatus',
    // USER_FORMWARD_LIST: 'getForwardList',
    // FETCH_VIEW_FORWARDURL: 'getSupremeCourtForwards',

    CHANGE_STATUS_FORM: 'SCCGST',
    ASSIGN_TO_OFFICER_FORM: 'SCASOF',
    FORWARD_TO_OFFICER_FORM: 'SCFRDT',

    COURT_DETAILS_TABLE: 'SCCDTL',
    CHANGE_STATUS_TABLE: 'SCCGDT',
    FORWARD_TO_OFFICER_TABLE: 'SCFRDT',

    DELETE_CHECK_STATUS_BUTTON: 'SCDLCS',
    DELETE_FORWARD_TO_BUTTON: 'SCDLFR',

    DETELE_CHECK_STATUS_URL: 'deleteSupremeCourtCheckStatus',
    DETELE_FORWARD_URL: 'deleteSupremeCourtForward',

    CHANGE_STATUS_SUBMIT: 'supremeCourtChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'supremeCourtAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'supremeCourtForwardToDestSubmit',

    COPM_REJECT: 'Complaint Reject',
    COPM_CLOSED: 'Complaint Closed',
  };

  public static HIGH_COURT_MODULE = {
    ADD_BUTTON: 'HCRTAD',
    EDIT_BUTTON: 'HCRTET',
    DELETE_BUTTON: 'DLHCRT',
    VIEW_BUTTON: 'HUCTVW',

    ADD_SUBMIT_DATA: 'ADHCRT',
    EDIT_SUBMIT_DATA: 'ETHCRT',

    ADD_SUBMIT_URL: 'addTraining',
    // EDIT_SUBMIT_URL: 'editTraining',
    FETCH_VIEW_DATA: 'viewHighCourt',

    FETCH_COURT_DETAILS_LIST: 'getCourtDetailsData',
    ADD_COURT_DETAILS: 'addCourtDetails',
    ADD_COURT_DETAILS_URL: '/official/courtDetails/add',

    FETCH_URL: 'getTrainingsDetails',
    ADD_URL: '/official/highCourt/add',
    EDIT_URL: '/official/highCourt/edit',
    VIEW_URL: '/official/highCourt/view',
    USER_FOFFICER_LIST: 'getHighCourtOfficersList',
    DELETE_URL: 'deleteHighCourt',

    FETCH_VIEW_URL: 'getHighCourtChangeStatus',
    USER_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getHighCourtForwards',

    CHANGE_STATUS_FORM: 'HCCGST',
    ASSIGN_TO_OFFICER_FORM: 'HCASOF',
    FORWARD_TO_OFFICER_FORM: 'HCFRDT',

    COURT_DETAILS_TABLE: 'HCCDTL',
    CHANGE_STATUS_TABLE: 'HCCGDT',
    FORWARD_TO_OFFICER_TABLE: 'HCFRDT',

    DELETE_CHECK_STATUS_BUTTON: 'HCDLCS',
    DELETE_FORWARD_TO_BUTTON: 'HCDLFR',

    DETELE_CHECK_STATUS_URL: 'deleteHighCourtCheckStatus',
    DETELE_FORWARD_URL: 'deleteHighCourtForward',

    CHANGE_STATUS_SUBMIT: 'highCourtChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'highCourtAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'highCourtForwardToDestSubmit',

    COPM_REJECT: 'Complaint Reject',
    COPM_CLOSED: 'Complaint Closed',
  };

  public static LOWER_COURT_MODULE = {
    ADD_BUTTON: 'HCRTAD',
    EDIT_BUTTON: 'HCRTET',
    DELETE_BUTTON: 'DLHCRT',
    VIEW_BUTTON: 'HUCTVW',

    ADD_SUBMIT_DATA: 'ADHCRT',
    EDIT_SUBMIT_DATA: 'ETHCRT',

    ADD_SUBMIT_URL: 'addLowerCourt',
    EDIT_SUBMIT_URL: 'editLowerCourt',
    FETCH_VIEW_DATA: 'viewLowerCourt',

    FETCH_COURT_DETAILS_LIST: 'getCourtDetailsData',
    ADD_COURT_DETAILS: 'addCourtDetails',
    ADD_COURT_DETAILS_URL: '/official/courtDetails/add',

    FETCH_URL: 'getLowerCourtData',
    ADD_URL: '/official/lowerCourt/add',
    EDIT_URL: '/official/lowerCourt/edit',
    VIEW_URL: '/official/lowerCourt/view',
    USER_FOFFICER_LIST: 'getLowerCourtOfficersList',
    DELETE_URL: 'deleteLowerCourt',

    FETCH_VIEW_URL: 'getLowerCourtChangeStatus',
    USER_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getLowerCourtForwards',

    CHANGE_STATUS_FORM: 'LCCGST',
    ASSIGN_TO_OFFICER_FORM: 'LCASOF',
    FORWARD_TO_OFFICER_FORM: 'LCFRDT',

    COURT_DETAILS_TABLE: 'LCCDTL',
    CHANGE_STATUS_TABLE: 'LCCGDT',
    FORWARD_TO_OFFICER_TABLE: 'LCFRDT',

    DELETE_CHECK_STATUS_BUTTON: 'LCDLCS',
    DELETE_FORWARD_TO_BUTTON: 'LCDLFR',

    DETELE_CHECK_STATUS_URL: 'deleteLowerCourtCheckStatus',
    DETELE_FORWARD_URL: 'deleteLowerCourtForward',

    CHANGE_STATUS_SUBMIT: 'lowerCourtChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'lowerCourtAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'lowerCourtForwardToDestSubmit',

    COPM_REJECT: 'Complaint Reject',
    COPM_CLOSED: 'Complaint Closed',
  };

  public static COURT_DETAILS_MODULE = {
    FETCH_COURT_DETAILS_LIST: 'getCourtDetailsData',
    ADD_COURT_DETAILS: 'addCourtDetails',
    ADD_COURT_DETAILS_URL: '/official/courtDetails/add',
  };

  public static GR_DETAILS_MODULE = {
    FETCH_GR_DETAILS_LIST: 'getGrSectionDetailsData',
    ADD_GR_DETAILS: 'addGrSectionDetails',
    ADD_GR_DETAILS_URL: '/official/grSectionDetails/add',
  };

  public static PROCECUTION_DETAILS_MODULE = {
    FETCH_PROC_DETAILS_LIST: 'getProcecutionDetailsData',
    ADD_PROC_DETAILS: 'addProcecutionDetails',
    ADD_PROC_DETAILS_URL: '/official/procecutionDetails/add',

    PROC_DETAILS_TABLE: 'PRCDTL',
  };

  public static PROCECUTION_MODULE = {
    ADD_BUTTON: 'PROCAD',
    EDIT_BUTTON: 'PROCET',
    VIEW_BUTTON: 'PROCVW',
    DELETE_BUTTON: 'DLPROC',

    ADD_SUBMIT_DATA: 'ADPROC',
    EDIT_SUBMIT_DATA: 'ETPROC',

    ADD_SUBMIT_URL: 'addProcecution',
    EDIT_SUBMIT_URL: 'editProcecution',
    FETCH_VIEW_DATA: 'viewProcecution',

    FETCH_URL: 'getProcecutionData',
    ADD_URL: '/official/procecution/add',
    EDIT_URL: '/official/procecution/edit',
    VIEW_URL: '/official/procecution/view',
    DELETE_URL: 'deleteProcecution',

    DELETE_CHECK_STATUS_BUTTON: 'DLPRST',
    DELETE_FORWARD_TO_BUTTON: 'DLPRFR',

    CHANGE_STATUS_FORM: 'PRSTCH',
    ASSIGN_TO_OFFICER_FORM: 'PRASOF',
    FORWARD_TO_OFFICER_FORM: 'PRFRSB',

    CHANGE_STATUS_TABLE: 'PRCGST',
    FORWARD_TO_OFFICER_TABLE: 'PRFRWD',

    DETELE_CHECK_STATUS_URL: 'deleteProcecutionCheckStatus',
    DETELE_FORWARD_URL: 'deleteProcecutionForward',

    FETCH_VIEW_URL: 'getProcecutionChangeStatus',
    CZRT_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getProcecutionForwards',

    CHANGE_STATUS_SUBMIT: 'procecutionChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'procecutionAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'procecutionForwardToDestSubmit',

    FETCH_PROC_DETAILS_LIST: 'getProcecutionDetailsData',
    ADD_PROC_DETAILS: 'addProcecutionDetails',
    ADD_PROC_DETAILS_URL: '/official/procecutionDetails/add',

    PROC_DETAILS_TABLE: 'PRCDTL',

    COPM_REJECT: 'Complaint Reject',
    COPM_CLOSED: 'Complaint Closed',

    PROCESSED: 'Processed',
    WAITING: 'Waiting at Department',
    COURT: 'Sent To Court',

    SUBMIT_REC_NO: 'submitProcecutionReceiptNumber',
  };

  public static RTI_MODULE = {
    ADD_BUTTON: 'RTIADD',
    EDIT_BUTTON: 'RTIEDT',
    VIEW_BUTTON: 'RTIVEW',
    DELETE_BUTTON: 'DLTRTI',

    ADD_SUBMIT_DATA: 'ADDRTI',
    EDIT_SUBMIT_DATA: 'EDTRTI',

    ADD_SUBMIT_URL: 'addRti',
    EDIT_SUBMIT_URL: 'editRti',
    FETCH_VIEW_DATA: 'viewRti',

    FETCH_URL: 'getRtiData',
    ADD_URL: '/official/rti/add',
    EDIT_URL: '/official/rti/edit',
    VIEW_URL: '/official/rti/view',
    DELETE_URL: 'deleteRti',

    DELETE_CHECK_STATUS_BUTTON: 'DLRTST',
    DELETE_FORWARD_TO_BUTTON: 'DLRTFR',

    CHANGE_STATUS_FORM: 'RTSTCH',
    ASSIGN_TO_OFFICER_FORM: 'RTASOF',
    FORWARD_TO_OFFICER_FORM: 'RTFRSB',

    CHANGE_STATUS_TABLE: 'RTCGST',
    FORWARD_TO_OFFICER_TABLE: 'RTFRWD',

    DETELE_CHECK_STATUS_URL: 'deleteRtiCheckStatus',
    DETELE_FORWARD_URL: 'deleteRtiForward',

    FETCH_VIEW_URL: 'getRtiChangeStatus',
    CZRT_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getRtiForwards',

    CHANGE_STATUS_SUBMIT: 'rtiChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'rtiAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'rtiForwardToDestSubmit',

    COPM_REJECT: 'Complaint Reject',
    COPM_CLOSED: 'Complaint Closed',

    SUBMIT_REC_NO: 'submitRtiReceiptNumber',
  };

  public static GR_MODULE = {
    ADD_BUTTON: 'GRSCAD',
    EDIT_BUTTON: 'GRSCET',
    VIEW_BUTTON: 'GRSCVW',
    DELETE_BUTTON: 'DLGRSC',

    ADD_SUBMIT_DATA: 'ADGRSC',
    EDIT_SUBMIT_DATA: 'ETGRSC',

    ADD_SUBMIT_URL: 'addGrSection',
    EDIT_SUBMIT_URL: 'editGrSection',
    FETCH_VIEW_DATA: 'viewGrSection',

    FETCH_URL: 'getGrSectionData',
    ADD_URL: '/official/grSection/add',
    EDIT_URL: '/official/grSection/edit',
    VIEW_URL: '/official/grSection/view',
    DELETE_URL: 'deleteGrSection',

    DELETE_CHECK_STATUS_BUTTON: 'DLGRST',
    DELETE_FORWARD_TO_BUTTON: 'DLGRFR',

    CHANGE_STATUS_FORM: 'GRSTCH',
    ASSIGN_TO_OFFICER_FORM: 'GRASOF',
    FORWARD_TO_OFFICER_FORM: 'GRFRSB',

    CHANGE_STATUS_TABLE: 'GRCGST',
    FORWARD_TO_OFFICER_TABLE: 'GRFRWD',

    DETELE_CHECK_STATUS_URL: 'deleteGrSectionCheckStatus',
    DETELE_FORWARD_URL: 'deleteGrSectionForward',

    FETCH_VIEW_URL: 'getGrSectionChangeStatus',
    CZRT_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getGrSectionForwards',

    CHANGE_STATUS_SUBMIT: 'grSectionChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'grSectionAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'grSectionForwardToDestSubmit',

    FETCH_GR_DETAILS_LIST: 'getGrSectionDetailsData',
    ADD_GR_DETAILS: 'addGrSectionDetails',
    ADD_GR_DETAILS_URL: '/official/grSectionDetails/add',

    GR_DETAILS_TABLE: 'GRCDTL',

    COPM_REJECT: 'Complaint Reject',
    COPM_CLOSED: 'Complaint Closed',

    PROCESSED: 'Processed',
    WAITING: 'Waiting at Department',
    COURT: 'Sent To Court',

    SUBMIT_REC_NO: 'submitGrSectionReceiptNumber',
  };

  public static NHRC_MODULE = {
    ADD_BUTTON: 'NHRCAD',
    EDIT_BUTTON: 'NHRCET',
    VIEW_BUTTON: 'NHRCOM',
    DELETE_BUTTON: 'DLNHRC',

    ADD_SUBMIT_DATA: 'ADNHRC',
    EDIT_SUBMIT_DATA: 'ETNHRC',

    ADD_SUBMIT_URL: 'addCommission',
    EDIT_SUBMIT_URL: 'editCommission',

    FETCH_URL: 'getCommissionData',
    FETCH_VIEW_DATA: 'viewCommission',
    ADD_URL: '/official/NHRC/add',
    EDIT_URL: '/official/NHRC/edit',
    VIEW_URL: '/official/NHRC/view',
    DELETE_URL: 'deleteCommission',

    DELETE_CHECK_STATUS_BUTTON: 'DLNHST',
    DELETE_FORWARD_TO_BUTTON: 'DLNHFR',

    CHANGE_STATUS_FORM: 'NHSTCH',
    ASSIGN_TO_OFFICER_FORM: 'NHASOF',
    FORWARD_TO_OFFICER_FORM: 'NHFRSB',

    CHANGE_STATUS_TABLE: 'NHCGST',
    FORWARD_TO_OFFICER_TABLE: 'NHFRWD',

    DETELE_CHECK_STATUS_URL: 'deleteCommissionCheckStatus',
    DETELE_FORWARD_URL: 'deleteCommissionForward',

    FETCH_VIEW_URL: 'getCommissionChangeStatus',
    CZRT_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getCommissionForwards',

    CHANGE_STATUS_SUBMIT: 'commissionChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'commissionAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'commissionForwardToDestSubmit',

    COMM_FORMWARD_LIST: 'getOfficersForwardList',

    COPM_REJECT: 'Complaint Reject',
    COPM_CLOSED: 'Complaint Closed',
  };

  public static SHRC_MODULE = {
    ADD_BUTTON: 'SHRCAD',
    EDIT_BUTTON: 'SHRCET',
    VIEW_BUTTON: 'SHRCVW',
    DELETE_BUTTON: 'DLSHRC',

    ADD_SUBMIT_DATA: 'ADSHRC',
    EDIT_SUBMIT_DATA: 'ETSHRC',

    ADD_SUBMIT_URL: 'addSHRCCommission',
    EDIT_SUBMIT_URL: 'editSHRCCommission',

    FETCH_URL: 'getSHRCCommissionData',
    FETCH_VIEW_DATA: 'viewSHRCCommission',
    ADD_URL: '/official/SHRC/add',
    EDIT_URL: '/official/SHRC/edit',
    VIEW_URL: '/official/SHRC/view',
    DELETE_URL: 'deleteSHRCCommission',

    DELETE_CHECK_STATUS_BUTTON: 'DLSHST',
    DELETE_FORWARD_TO_BUTTON: 'DLSHFR',

    CHANGE_STATUS_FORM: 'SHSTCH',
    ASSIGN_TO_OFFICER_FORM: 'SHASOF',
    FORWARD_TO_OFFICER_FORM: 'SHFRSB',

    CHANGE_STATUS_TABLE: 'SHCGST',
    FORWARD_TO_OFFICER_TABLE: 'SHFRWD',

    DETELE_CHECK_STATUS_URL: 'deleteSHRCCommissionCheckStatus',
    DETELE_FORWARD_URL: 'deleteSHRCCommissionForward',

    FETCH_VIEW_URL: 'getSHRCCommissionChangeStatus',
    CZRT_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getSHRCCommissionForwards',

    CHANGE_STATUS_SUBMIT: 'shrcCommissionChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'shrcCommissionAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'shrcCommissionForwardToDestSubmit',

    COPM_REJECT: 'Complaint Reject',
    COPM_CLOSED: 'Complaint Closed',
  };

  public static SWRC_MODULE = {
    ADD_BUTTON: 'SWRCAD',
    EDIT_BUTTON: 'SWRCET',
    VIEW_BUTTON: 'SWRCVW',
    DELETE_BUTTON: 'DLSWRC',

    ADD_SUBMIT_DATA: 'ADSWRC',
    EDIT_SUBMIT_DATA: 'ETSWRC',

    ADD_SUBMIT_URL: 'addSWRCCommission',
    EDIT_SUBMIT_URL: 'editSWRCCommission',

    FETCH_URL: 'getSWRCCommissionData',
    FETCH_VIEW_DATA: 'viewSWRCCommission',
    ADD_URL: '/official/SWRC/add',
    EDIT_URL: '/official/SWRC/edit',
    VIEW_URL: '/official/SWRC/view',
    DELETE_URL: 'deleteSWRCCommission',

    DELETE_CHECK_STATUS_BUTTON: 'DLSWST',
    DELETE_FORWARD_TO_BUTTON: 'DLSWFR',

    CHANGE_STATUS_FORM: 'SWSTCH',
    ASSIGN_TO_OFFICER_FORM: 'SWASOF',
    FORWARD_TO_OFFICER_FORM: 'SWFRSB',

    CHANGE_STATUS_TABLE: 'SWCGST',
    FORWARD_TO_OFFICER_TABLE: 'SWFRWD',

    DETELE_CHECK_STATUS_URL: 'deleteSWRCCommissionCheckStatus',
    DETELE_FORWARD_URL: 'deleteSWRCCommissionForward',

    FETCH_VIEW_URL: 'getSWRCCommissionChangeStatus',
    CZRT_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getSWRCCommissionForwards',

    CHANGE_STATUS_SUBMIT: 'swrcCommissionChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'swrcCommissionAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'swrcCommissionForwardToDestSubmit',

    COPM_REJECT: 'Complaint Reject',
    COPM_CLOSED: 'Complaint Closed',
  };

  public static NWRC_MODULE = {
    ADD_BUTTON: 'NWRCAD',
    EDIT_BUTTON: 'NWRCET',
    VIEW_BUTTON: 'NWRCVW',
    DELETE_BUTTON: 'DLNWRC',

    ADD_SUBMIT_DATA: 'ADNWRC',
    EDIT_SUBMIT_DATA: 'ETNWRC',

    ADD_SUBMIT_URL: 'addNWRCCommission',
    EDIT_SUBMIT_URL: 'editNWRCCommission',

    FETCH_URL: 'getNWRCCommissionData',
    FETCH_VIEW_DATA: 'viewNWRCCommission',
    ADD_URL: '/official/NWRC/add',
    EDIT_URL: '/official/NWRC/edit',
    VIEW_URL: '/official/NWRC/view',
    DELETE_URL: 'deleteNWRCCommission',

    DELETE_CHECK_STATUS_BUTTON: 'DLNWST',
    DELETE_FORWARD_TO_BUTTON: 'DLNWFR',

    CHANGE_STATUS_FORM: 'NWSTCH',
    ASSIGN_TO_OFFICER_FORM: 'NWASOF',
    FORWARD_TO_OFFICER_FORM: 'NWFRSB',

    CHANGE_STATUS_TABLE: 'NWCGST',
    FORWARD_TO_OFFICER_TABLE: 'NWFRWD',

    DETELE_CHECK_STATUS_URL: 'deleteNWRCCommissionCheckStatus',
    DETELE_FORWARD_URL: 'deleteNWRCCommissionForward',

    FETCH_VIEW_URL: 'getNWRCCommissionChangeStatus',
    CZRT_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getNWRCCommissionForwards',

    CHANGE_STATUS_SUBMIT: 'nwrcCommissionChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'nwrcCommissionAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'nwrcCommissionForwardToDestSubmit',

    COPM_REJECT: 'Complaint Reject',
    COPM_CLOSED: 'Complaint Closed',
  };

  public static NCOBC_MODULE = {
    ADD_BUTTON: 'NCOBAD',
    EDIT_BUTTON: 'NCOBET',
    VIEW_BUTTON: 'NCOBVW',
    DELETE_BUTTON: 'DLNCOB',

    ADD_SUBMIT_DATA: 'ADNCOB',
    EDIT_SUBMIT_DATA: 'ETNCOB',

    ADD_SUBMIT_URL: 'addNCOBCCommission',
    EDIT_SUBMIT_URL: 'editNCOBCCommission',

    FETCH_URL: 'getNCOBCCommissionData',
    FETCH_VIEW_DATA: 'viewNCOBCCommission',
    ADD_URL: '/official/NCOBC/add',
    EDIT_URL: '/official/NCOBC/edit',
    VIEW_URL: '/official/NCOBC/view',
    DELETE_URL: 'deleteNCOBCCommission',

    DELETE_CHECK_STATUS_BUTTON: 'DLNCST',
    DELETE_FORWARD_TO_BUTTON: 'DLNCFR',

    CHANGE_STATUS_FORM: 'NCSTCH',
    ASSIGN_TO_OFFICER_FORM: 'NCASOF',
    FORWARD_TO_OFFICER_FORM: 'NCFRSB',

    CHANGE_STATUS_TABLE: 'NCCGST',
    FORWARD_TO_OFFICER_TABLE: 'NCFRWD',

    DETELE_CHECK_STATUS_URL: 'deleteNCOBCCommissionCheckStatus',
    DETELE_FORWARD_URL: 'deleteNCOBCCommissionForward',

    FETCH_VIEW_URL: 'getNCOBCCommissionChangeStatus',
    CZRT_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getNCOBCCommissionForwards',

    CHANGE_STATUS_SUBMIT: 'ncobcCommissionChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'ncobcCommissionAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'ncobcCommissionForwardToDestSubmit',

    COPM_REJECT: 'Complaint Reject',
    COPM_CLOSED: 'Complaint Closed',
  };

  public static NSCST_MODULE = {
    ADD_BUTTON: 'NSCSAD',
    EDIT_BUTTON: 'NSCSET',
    VIEW_BUTTON: 'NSCSVW',
    DELETE_BUTTON: 'DLNSCS',

    ADD_SUBMIT_DATA: 'ADNSCS',
    EDIT_SUBMIT_DATA: 'ETNSCS',

    ADD_SUBMIT_URL: 'addNSCSTCommission',
    EDIT_SUBMIT_URL: 'editNSCSTCommission',

    FETCH_URL: 'getNSCSTCommissionData',
    FETCH_VIEW_DATA: 'viewNSCSTCommission',
    ADD_URL: '/official/NSCST/add',
    EDIT_URL: '/official/NSCST/edit',
    VIEW_URL: '/official/NSCST/view',
    DELETE_URL: 'deleteNSCSTCommission',

    DELETE_CHECK_STATUS_BUTTON: 'DLNSST',
    DELETE_FORWARD_TO_BUTTON: 'DLNSFR',

    CHANGE_STATUS_FORM: 'NSSTCH',
    ASSIGN_TO_OFFICER_FORM: 'NSASOF',
    FORWARD_TO_OFFICER_FORM: 'NCFRSB',

    CHANGE_STATUS_TABLE: 'NSCGST',
    FORWARD_TO_OFFICER_TABLE: 'NSFRWD',

    DETELE_CHECK_STATUS_URL: 'deleteNSCSTCommissionCheckStatus',
    DETELE_FORWARD_URL: 'deleteNSCSTCommissionForward',

    FETCH_VIEW_URL: 'getNSCSTCommissionChangeStatus',
    CZRT_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getNSCSTCommissionForwards',

    CHANGE_STATUS_SUBMIT: 'nscstCommissionChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'nscstCommissionAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'nscstCommissionForwardToDestSubmit',

    COPM_REJECT: 'Complaint Reject',
    COPM_CLOSED: 'Complaint Closed',
  };

  public static NCPCR_MODULE = {
    ADD_BUTTON: 'NCPRAD',
    EDIT_BUTTON: 'NCPRET',
    VIEW_BUTTON: 'NCPRVW',
    DELETE_BUTTON: 'DLNPCS',

    ADD_SUBMIT_DATA: 'ADNPCS',
    EDIT_SUBMIT_DATA: 'ETNPCS',

    ADD_SUBMIT_URL: 'addNCPCRCommission',
    EDIT_SUBMIT_URL: 'editNCPCRCommission',

    FETCH_URL: 'getNCPCRCommissionData',
    FETCH_VIEW_DATA: 'viewNCPCRCommission',
    ADD_URL: '/official/NCPCR/add',
    EDIT_URL: '/official/NCPCR/edit',
    VIEW_URL: '/official/NCPCR/view',
    DELETE_URL: 'deleteNCPCRCommission',

    DELETE_CHECK_STATUS_BUTTON: 'DLNPST',
    DELETE_FORWARD_TO_BUTTON: 'DLNPFR',

    CHANGE_STATUS_FORM: 'NPSTCH',
    ASSIGN_TO_OFFICER_FORM: 'NPASOF',
    FORWARD_TO_OFFICER_FORM: 'NPFRSB',

    CHANGE_STATUS_TABLE: 'NPCGST',
    FORWARD_TO_OFFICER_TABLE: 'NPFRWD',

    DETELE_CHECK_STATUS_URL: 'deleteNCPCRCommissionCheckStatus',
    DETELE_FORWARD_URL: 'deleteNCPCRCommissionForward',

    FETCH_VIEW_URL: 'getNCPCRCommissionChangeStatus',
    CZRT_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getNCPCRCommissionForwards',

    CHANGE_STATUS_SUBMIT: 'ncpcrCommissionChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'ncpcrCommissionAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'ncpcrCommissionForwardToDestSubmit',

    COPM_REJECT: 'Complaint Reject',
    COPM_CLOSED: 'Complaint Closed',
  };

  public static BHRC_MODULE = {
    ADD_BUTTON: 'BHRCAD',
    EDIT_BUTTON: 'BHRCET',
    VIEW_BUTTON: 'BHRCVW',
    DELETE_BUTTON: 'DLBHCS',

    ADD_SUBMIT_DATA: 'ADBHRC',
    EDIT_SUBMIT_DATA: 'ETBHRC',

    ADD_SUBMIT_URL: 'addBHRCCommission',
    EDIT_SUBMIT_URL: 'editBHRCCommission',

    FETCH_URL: 'getBHRCCommissionData',
    FETCH_VIEW_DATA: 'viewBHRCCommission',
    ADD_URL: '/official/BHRC/add',
    EDIT_URL: '/official/BHRC/edit',
    VIEW_URL: '/official/BHRC/view',
    DELETE_URL: 'deleteBHRCCommission',

    DELETE_CHECK_STATUS_BUTTON: 'DLBHST',
    DELETE_FORWARD_TO_BUTTON: 'DLBHFR',

    CHANGE_STATUS_FORM: 'BHSTCH',
    ASSIGN_TO_OFFICER_FORM: 'BHASOF',
    FORWARD_TO_OFFICER_FORM: 'BHFRSB',

    CHANGE_STATUS_TABLE: 'BHCGST',
    FORWARD_TO_OFFICER_TABLE: 'BHFRWD',

    DETELE_CHECK_STATUS_URL: 'deleteBHRCCommissionCheckStatus',
    DETELE_FORWARD_URL: 'deleteBHRCCommissionForward',

    FETCH_VIEW_URL: 'getBHRCCommissionChangeStatus',
    CZRT_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getBHRCCommissionForwards',

    CHANGE_STATUS_SUBMIT: 'bhrcCommissionChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'bhrcCommissionAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'bhrcCommissionForwardToDestSubmit',

    COPM_REJECT: 'Complaint Reject',
    COPM_CLOSED: 'Complaint Closed',
  };

  public static ECOM_RECEIPT_MODULE = {
    ADD_BUTTON: 'ECRCAD',
    EDIT_BUTTON: 'ECRCET',
    VIEW_BUTTON: 'ECRCVW',
    DELETE_BUTTON: 'DLECRC',

    ADD_SUBMIT_DATA: 'ADECRC',
    EDIT_SUBMIT_DATA: 'ETECRC',

    ADD_SUBMIT_URL: 'addReceipt',
    EDIT_SUBMIT_URL: 'editReceipt',

    FETCH_URL: 'getReceiptData',
    FETCH_VIEW_URL: 'viewReceipt',
    ADD_URL: '/official/ecommunicationReceipt/add',
    EDIT_URL: '/official/ecommunicationReceipt/edit',
    VIEW_URL: '/official/ecommunicationReceipt/view',
    DELETE_URL: 'deleteReceipt',

    DELETE_CHECK_STATUS_BUTTON: 'ERDLCS',
    DELETE_FORWARD_TO_BUTTON: 'ERDLFR',

    ECOMM_RECIPT_ALLOWED: 'ERRRNO',
    CHANGE_STATUS_FORM_ALL: 'ERCGCT',
    CHANGE_STATUS_FORM: 'ERCGST',
    ASSIGN_TO_OFFICER_FORM: 'ERASOF',
    FORWARD_TO_OFFICER_FORM: 'ERFRSU',

    CHANGE_STATUS_TABLE: 'ERCGDT',
    FORWARD_TO_OFFICER_TABLE: 'ERFRDT',

    DETELE_CHECK_STATUS_URL: 'deleteReceiptCheckStatus',
    DETELE_FORWARD_URL: 'deleteReceiptForward',

    FETCH_CHANGE_STATUS_VIEW_URL: 'getReceiptChangeStatus',
    USER_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getReceiptForwards',

    CHANGE_STATUS_SUBMIT: 'receiptChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'receiptAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'receiptForwardToDestSubmit',

    SUBMIT_REC_NO: 'submitReceiptNumber',

    PROCESSED: 'ECOM_RECEIPT PROCESSED',
    WAITING: 'ECOM_RECEIPT WAITING',
  };

  public static ECOM_DISPATCH_MODULE = {
    ADD_BUTTON: 'ECDPAD',
    EDIT_BUTTON: 'ECDPET',
    VIEW_BUTTON: 'ECDPVW',
    DELETE_BUTTON: 'DLECDP',

    ADD_SUBMIT_DATA: 'ADECDP',
    EDIT_SUBMIT_DATA: 'ETECDP',

    ADD_SUBMIT_URL: 'addDispatch',
    EDIT_SUBMIT_URL: 'editDispatch',

    FETCH_URL: 'getDispatchData',
    FETCH_VIEW_URL: 'viewDispatch',
    ADD_URL: '/official/ecommunicationDispatch/add',
    EDIT_URL: '/official/ecommunicationDispatch/edit',
    VIEW_URL: '/official/ecommunicationDispatch/view',
    DELETE_URL: 'deleteDispatch',

    DELETE_CHECK_STATUS_BUTTON: 'EDDLCS',
    DELETE_FORWARD_TO_BUTTON: 'EDDLFR',

    CHANGE_STATUS_FORM: 'EDCGST',
    ASSIGN_TO_OFFICER_FORM: 'EDASOF',
    FORWARD_TO_OFFICER_FORM: 'EDFRSU',

    CHANGE_STATUS_TABLE: 'EDCGDT',
    FORWARD_TO_OFFICER_TABLE: 'EDFRDT',

    DETELE_CHECK_STATUS_URL: 'deleteDispatchCheckStatus',
    DETELE_FORWARD_URL: 'deleteDispatchForward',

    FETCH_CHANGE_STATUS_VIEW_URL: 'getDispatchChangeStatus',
    USER_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getDispatchForwards',

    CHANGE_STATUS_SUBMIT: 'dispatchChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'dispatchAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'dispatchForwardToDestSubmit',

    PROCESSED: 'ECOM_DISPATCH PROCESSED',
    WAITING: 'ECOM_DISPATCH WAITING',
  };

  public static EVENTS_MODULE = {
    ADD_BUTTON: 'EVNTAD',
    EDIT_BUTTON: 'EVNTET',
    DEACTIVATE_BUTTON: 'DAEVNT',
    ACTIVATE_BUTTON: 'ACEVNT',

    ADD_SUBMIT_DATA: 'ADEVNT',
    EDIT_SUBMIT_DATA: 'ETEVNT',

    ADD_SUBMIT_URL: 'addEvents',
    EDIT_SUBMIT_URL: 'editEvents',

    FETCH_URL: 'getEventsData',
    ADD_URL: '/official/events/add',
    EDIT_URL: '/official/events/edit',
    DEACTIVATE_URL: 'deactivateEvents',
    ACTIVATE_URL: 'activateEvents',
  };

  public static NOTIFICATION_MODULE = {
    ADD_BUTTON: 'NFLNAD',
    EDIT_BUTTON: 'NFLNED',
    VIEW_BUTTON: 'NFLNVW',
    ACTIVATE_BUTTON: 'ACNFLN',
    DEACTIVATE_BUTTON: 'DCNFLN',

    ADD_SUBMIT_DATA: 'ADNFLN',
    EDIT_SUBMIT_DATA: 'EDNFLN',
    VIEW_DATA: 'VWNFLN',

    ADD_SUBMIT_URL: 'addListName',
    EDIT_SUBMIT_URL: 'editListName',
    VIEW_URL: 'viewListData',

    FETCH_URL: 'getListData',
    ADD_LIST_URL: '/official/notificationList/add',
    EDIT_LIST_URL: '/official/notificationList/edit',
    VIEW_LIST_URL: '/official/notificationList/view',
    DEACTIVATE_URL: 'deactivateListName',
    ACTIVATE_URL: 'activateListName',

    SEND_NOTIFY_FORM: 'NTFCFM',
    SEND_NOTIFY_TABLE: 'NTFTBL',

    GT_LIST_NAME: 'getListOfListNames',
    GT_USER_LIST: 'getListOfUsers',

    SEND_NOTIFICATION: 'sendNotificationToUsers',
  };

  public static NOTIFICATION_USER_MODULE = {
    ADD_BUTTON: 'NFULAD',
    EDIT_BUTTON: 'NFULAT',
    DEACTIVATE_BUTTON: 'DANTUL',
    ACTIVATE_BUTTON: 'ACNTUL',

    ADD_SUBMIT_DATA: 'ADNTUL',
    EDIT_SUBMIT_DATA: 'ETNTUL',

    ADD_SUBMIT_URL: 'addNotificationUserList',
    EDIT_SUBMIT_URL: 'editNotificationUserList',

    FETCH_URL: 'getNotificationUserList',
    ADD_URL: '/official/notificationUser/add',
    EDIT_URL: '/official/notificationUser/edit',
    DEACTIVATE_URL: 'deactivateNotificationUserList',
    ACTIVATE_URL: 'activateNotificationUserList',

    GT_OFFICER_LIST: 'getPoliceStationName',
    GT_STN_USER_LIST: 'getPoliceStationUserData',
    USER_TABLE: 'GTNFHR',
    FETCH_HISTORY_URL: 'getNotificationHistory',
  };

  public static VISITORS_MODULE = {
    VIEW_BUTTON: 'VSTRVW',
    DELETE_BUTTON: 'DLVSTR',
    DELETE_CHECK_STATUS_BUTTON: 'DLCSVS',
    DELETE_FORWARD_TO_BUTTON: 'DLFRVS',

    FETCH_URL: 'getVisitorsData',
    FETCH_VIEW_DATA: 'viewVisitorsData',
    VIEW_URL: '/official/visitorRegister/view',
    DELETE_URL: 'deleteVisitors',
    DETELE_CHECK_STATUS_URL: 'deleteVisitorsCheckStatus',
    DETELE_FORWARD_URL: 'deleteVisitorsForward',

    FETCH_VIEW_URL: 'getVisitorsChangeStatus',
    USER_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getVisitorsForwards',
    FETCH_SMS_URL: 'getVisitorsSmsData',

    CHANGE_STATUS_FORM: 'VSCSSU',
    ASSIGN_TO_OFFICER_FORM: 'VSSOSU',
    FORWARD_TO_OFFICER_FORM: 'VSFWSB',
    SMS_TO_USER_FORM: 'VSSMSD',

    CHANGE_STATUS_TABLE: 'FTVSCS',
    FORWARD_TO_OFFICER_TABLE: 'VSFWLD',
    SMS_TO_USER_TABLE: 'VSSMLT',

    CHANGE_STATUS_SUBMIT: 'visitorsChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'visitorsAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'visitorsForwardToDestSubmit',
    SMS_SENDING_SUBMIT: 'visitorsSendSMS',

    COPM_REJECT: 'Complaint Rejected',
    COPM_CLOSED: 'Complaint Closed',
    COPM_ASSIGN: 'Complaint Assign',
  };

  public static ASSETTYPE_MODULE = {
    ADD_BUTTON: 'ADDAST',
    VIEW_BUTTON: 'VIEAST',
    EDIT_BUTTON: 'EDTAST',
    DEACTIVATE_BUTTON: 'DCTAST',
    ACTIVATE_BUTTON: 'ACTAST',

    ADD_SUBMIT_DATA: 'ADDASE',
    EDIT_SUBMIT_DATA: 'EDTASE',

    FETCH_URL: 'getAssetType',
    VIEW_URL: '/official/assetType/view',
    ADD_URL: '/official/assetType/add',
    EDIT_URL: '/official/assetType/edit',
    DEACTIVATE_URL: 'deactivateAssetType',
    ACTIVATE_URL: 'activateAssetType',

    ADD_SUBMIT_URL: 'addAssetType',
    EDIT_SUBMIT_URL: 'editAssetType',
  };

  public static ASSETSUPPLIERS_MODULE = {
    MAIN_PAGE: 'ASTSUP',
    ADD_BUTTON: 'ASTSAD',
    EDIT_BUTTON: 'ASTSED',
    VIEW_BUTTON: 'ASTSVW',
    DEACTIVATE_BUTTON: 'DLASSU',
    ACTIVATE_BUTTON: 'ACASTS',

    ADD_SUBMIT_DATA: 'ADASTS',
    EDIT_SUBMIT_DATA: 'ETASTS',

    FETCH_URL: 'getAssetSuppliers',
    ADD_SUBMIT_URL: 'addAssetSuppliers',
    EDIT_SUBMIT_URL: 'editAssetSuppliers',
    FETCH_VIEW_DATA: 'viewAssetSuppliers',

    MAIN_URL: '/official/assetSuppliers',
    ADD_URL: '/official/assetSuppliers/add',
    EDIT_URL: '/official/assetSuppliers/edit',
    VIEW_URL: '/official/assetSuppliers/view',
    DEACTIVATE_URL: 'deactivateAssetSuppliers',
    ACTIVATE_URL: 'activateAssetSuppliers',

    PRODUCTS_TABLE: 'ASSPTL',

    FETCH_VIEW_PRODUCTS: 'getProductsBySupplier',
  };

  public static ASSETPRODUCT_MODULE = {
    MAIN_PAGE: 'ASTPRD',
    ADD_BUTTON: 'ASPRAD',
    EDIT_BUTTON: 'ASPRED',
    DEACTIVATE_BUTTON: 'DCASPR',
    ACTIVATE_BUTTON: 'ACASPR',
    VIEW_BUTTON: 'ASPRVW',

    VIEW_URL: '/official/products/view',
    FETCH_URL: 'getSuppliersProducts',
    MAIN_URL: '/official/products',
    ADD_URL: '/official/products/add',
    EDIT_URL: '/official/products/edit',
    DEACTIVATE_URL: 'deactivateSuppliersProducts',
    ACTIVATE_URL: 'activateAssetsSuppliersProducts',

    ADD_SUBMIT_DATA: 'ADASPR',
    EDIT_SUBMIT_DATA: 'ETASPR',

    ADD_SUBMIT_URL: 'addSuppliersProducts',
    EDIT_SUBMIT_URL: 'editSuppliersProducts',

    ASSET_TYPE_LIST: 'getAssetTypeForDetails',
    SUPPLIERS_LIST: 'getSuppliersList',
  };

  public static ASSETALLOCATION_MODULE = {
    MAIN_PAGE: 'PGASDT',
    ADD_BUTTON: 'ASALAD',
    EDIT_BUTTON: 'ASALED',
    DEACTIVATE_BUTTON: 'DCASAL',
    ACTIVATE_BUTTON: 'ACASAL',

    FETCH_URL: 'getAllocationList',
    MAIN_URL: '/official/assetDetails',
    ADD_URL: '/official/allocation/add',
    EDIT_URL: '/official/allocation/edit',
    DEACTIVATE_URL: 'deactivateAllocation',
    ACTIVATE_URL: 'activateAllocation',

    ADD_SUBMIT_DATA: 'ADASAL',
    EDIT_SUBMIT_DATA: 'ETASAL',

    ADD_SUBMIT_URL: 'addAllocation',
    EDIT_SUBMIT_URL: 'editAllocation',

    //stocks
    STOCK_MAIN_PAGE: 'ASTSTK',
    STOCK_MAIN_URL: '/official/assetStock',
    FETCH_URL_STOCK: 'getStocksData',
    FETCH_BTN: 'GTASST',

    ALLOCATE_TO_LIST: 'getAllocateToList',
    PRODUCT_LIST: 'getProductList',

    VIEW_URL: '/official/allocation/view',
    VIEW: 'ASALVI',
  };

  public static SMS_SERVICE_PROVIDER_MODULE = {
    ADD_BUTTON: 'SSPRAD',
    EDIT_BUTTON: 'SSPRED',
    DEACTIVATE_BUTTON: 'DCSSPR',
    ACTIVATE_BUTTON: 'ACSSPR',

    ADD_SUBMIT_DATA: 'ADSSPR',
    EDIT_SUBMIT_DATA: 'EDSSPR',

    FETCH_URL: 'getSmsServiceProvider',
    ADD_URL: '/official/smsServiceProvider/add',
    EDIT_URL: '/official/smsServiceProvider/edit',
    DEACTIVATE_URL: 'deactivateSmsServiceProvider',
    ACTIVATE_URL: 'activateSmsServiceProvider',

    ADD_SUBMIT_URL: 'addSmsServiceProvider',
    EDIT_SUBMIT_URL: 'editSmsServiceProvider',
  };

  public static SMS_TEMPLATE_MODULE = {
    ADD_BUTTON: 'SMSTAD',
    EDIT_BUTTON: 'SMSTED',
    DEACTIVATE_BUTTON: 'DCSMST',
    ACTIVATE_BUTTON: 'ACSMST',

    ADD_SUBMIT_DATA: 'ADSMST',
    EDIT_SUBMIT_DATA: 'EDSMST',

    FETCH_URL: 'getSmsTemplate',
    ADD_URL: '/official/smsTemplate/add',
    EDIT_URL: '/official/smsTemplate/edit',
    DEACTIVATE_URL: 'deactivateSmsTemplate',
    ACTIVATE_URL: 'activateSmsTemplate',

    ADD_SUBMIT_URL: 'addSmsTemplate',
    EDIT_SUBMIT_URL: 'editSmsTemplate',
  };

  public static SYS_MODULE_MODULE = {
    ADD_BUTTON: 'MODLAD',
    EDIT_BUTTON: 'MODLET',
    DEACTIVATE_BUTTON: 'DCMODL',
    ACTIVATE_BUTTON: 'ACMODL',

    ADD_SUBMIT_DATA: 'ADMODL',
    EDIT_SUBMIT_DATA: 'ETMODL',

    FETCH_URL: 'getModule',
    ADD_URL: '/official/module/add',
    EDIT_URL: '/official/module/edit',
    DEACTIVATE_URL: 'deactivateModule',
    ACTIVATE_URL: 'activateModule',

    ADD_SUBMIT_URL: 'addModule',
    EDIT_SUBMIT_URL: 'editModule',
  };

  public static SMS_MODULE_MODULE = {
    ADD_BUTTON: 'SMSMAD',
    EDIT_BUTTON: 'SMSMED',

    ADD_SUBMIT_DATA: 'ADSMSM',
    EDIT_SUBMIT_DATA: 'EDSMSM',

    FETCH_URL: 'getSmsModule',
    ADD_URL: '/official/smsModule/add',
    EDIT_URL: '/official/smsModule/edit',

    ADD_SUBMIT_URL: 'addSmsModule',
    EDIT_SUBMIT_URL: 'editSmsModule',

    FETCH_SMS_PROVIDER: 'getAllSmsServiceProvider',
    FETCH_SMS_TEMP: 'getAllSmsTemplate',
  };

  public static LEAVE_APPLICATION_MODULE = {
    VIEW_BUTTON: 'VWLVAP',
    DELETE_BUTTON: 'DLLVAP',
    DELETE_CHECK_STATUS_BUTTON: 'DLCSLA',
    DELETE_FORWARD_TO_BUTTON: 'DLFTLA',

    FETCH_URL: 'getLeaveApplicationData',
    FETCH_VIEW_DATA: 'viewLeaveApplication',
    VIEW_URL: '/official/leaveApplication/view',
    DELETE_URL: 'deleteLeaveApplication',
    DETELE_CHECK_STATUS_URL: 'deleteLeaveApplicationCheckStatus',
    DETELE_FORWARD_URL: 'deleteLeaveApplicationForward',

    FETCH_VIEW_URL: 'getLeaveApplicationChangeStatus',
    USER_FORMWARD_LIST: 'getLeaveForwardList',
    FETCH_VIEW_FORWARDURL: 'getLeaveApplicationForwards',
    FETCH_SMS_URL: 'getLeaveApplicationSmsData',

    CHANGE_STATUS_FORM: 'LACSSU',
    ASSIGN_TO_OFFICER_FORM: 'LASOSU',
    FORWARD_TO_OFFICER_FORM: 'LAFWSB',
    SMS_TO_USER_FORM: 'LASMSD',

    CHANGE_STATUS_TABLE: 'FTLACS',
    FORWARD_TO_OFFICER_TABLE: 'LAFWLD',
    SMS_TO_USER_TABLE: 'LASMLT',

    CHANGE_STATUS_SUBMIT: 'leaveApplicationChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'leaveApplicationAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'leaveApplicationForwardToDestSubmit',
    SMS_SENDING_SUBMIT: 'leaveApplicationSendSMS',

    COPM_REJECT: 'Complaint Rejected',
    COPM_CLOSED: 'Complaint Closed',
    COPM_ASSIGN: 'Complaint Assign',

    ACCEPT_REJECT: 'LAACRJ',
    ACCEPT_REJECT_URL: 'acceptRejectLeaveApplication',

    ACCEPT_REJECT_WITH_CHNG: 'ACCLWT',
    ACCEPT_REJECT_WITH_CHNG_URL: 'acceptLeaveWithModification',
  };

  public static TRANSFER_MODULE = {
    ADD_BUTTON: 'TRNADD',
    ADD_URL: '/official/transfer/add',

    EDIT_BUTTON: 'TRNMOD',
    EDIT_URL: '/official/transfer/add',

    VIEW_BUTTON: 'TRNVIE',
    VIEW_URL: '/official/transfer/view',

    DELETE_BUTTON: 'TRNDLT',
    DELETE_URL: 'getTransferDelete',

    DOWNLOAD_BUTTON: 'DNTSFL',

    FETCH_URL: 'getResourceTransferData',
    RESOURCE_FETCH_URL: 'getResourceTransferResData',
    LOCATION_FETCH_URL: 'getResourceTransferLocationData',
  };

  public static REPLYCOMPLAINT_MODULE = {
    EDIT_BUTTON: 'RPCEDT',
    DELETE_BUTTON: 'RPCDLT',
    EDIT_SUBMIT_DATA: 'EDTRPC',
    EDIT_SUBMIT_URL: 'editReplyComplaint',
    FETCH_URL: 'getReplyComplaints',
    EDIT_URL: '/official/replyComplaint/edit',
    DELETE_URL: 'deleteReplyComplaint',
  };

  public static POLICE_DIARY_MODULE = {
    ADD_BUTTON: 'PLDRAD',
    EDIT_BUTTON: 'PLDRED',

    ADD_SUBMIT_DATA: 'STUSDR',
    EDIT_SUBMIT_DATA: 'PLDUPD',

    ADD_SUBMIT_URL: 'savePoliceDiary',
    EDIT_SUBMIT_URL: 'updatePoliceDiary',

    FETCH_URL: 'getPoliceDiaries',
    ADD_URL: '/official/policeDiary/add',
    EDIT_URL: '/official/policeDiary/edit',

    DELETE_BUTTON: 'PLDRDL',
    DELETE_URL: 'deletePoliceDiary',

    VIEW_BUTTON: 'VEPLDR',
    VIEW_URL: '/official/policeDiary/view',

    FETCH_VIEW_DATA: 'getPoliceDiary',
  };

  public static POLICE_OFFICER_MODULE = {
    ADD_BUTTON: 'PSOFAD',
    EDIT_BUTTON: 'PSOFED',

    ADD_SUBMIT_DATA: 'PFADSU',
    EDIT_SUBMIT_DATA: 'PFEDSU',

    ADD_SUBMIT_URL: 'savePoliceOfficer',
    EDIT_SUBMIT_URL: 'updatePoliceOfficer',

    FETCH_URL: 'getPoliceOfficers',
    ADD_URL: '/official/officers/add',
    EDIT_URL: '/official/officers/edit',

    DELETE_BUTTON: 'PSOFDL',
    DELETE_URL: 'deletePoliceOfficer',

    // VIEW_BUTTON: 'VEPLDR',
    // VIEW_URL: '/official/officers/view',

    // FETCH_VIEW_DATA: 'getPoliceDiary',
  };

  public static SR_NSR_MODULE = {
    ADD_BUTTON: 'ADNSSR',
    EDIT_BUTTON: 'EDNSSR',

    ADD_SUBMIT_DATA: 'STNSSR',
    EDIT_SUBMIT_DATA: 'ESNSSR',

    ADD_SUBMIT_URL: 'saveSrNsr',
    EDIT_SUBMIT_URL: 'updateSrNsr',

    FETCH_URL: 'getSrNsrs',
    ADD_URL: '/official/sr_nsr/add',
    EDIT_URL: '/official/sr_nsr/edit',

    DELETE_BUTTON: 'DLNSSR',
    DELETE_URL: 'deleteSrNsr',

    VIEW_BUTTON: 'VENSSR',
    VIEW_URL: '/official/sr_nsr/view',

    FETCH_VIEW_DATA: 'getSrNsr',
  };

  public static SR_NSR_CASES_MODULE = {
    ADD_BUTTON: 'ADSRNS',
    EDIT_BUTTON: 'EDSRNS',

    ADD_URL: '/official/srsNsrsCases/add',
    EDIT_URL: '/official/srsNsrsCases/edit',

    ADD_SUBMIT_DATA: 'ASSRNS',
    EDIT_SUBMIT_DATA: 'ESSRNS',

    ADD_SUBMIT_URL: 'addCIDCrimeData',
    EDIT_SUBMIT_URL: 'editCIDCrimeData',

    FETCH_URL: 'getCIDCrimeData',

    // DELETE_BUTTON: 'DLNSSR',
    // DELETE_URL: 'deleteSrNsr',

    DEACTIVATE_BUTTON: 'DCSRNS',
    ACTIVATE_BUTTON: 'ACSRNS',

    DEACTIVATE_URL: 'deactivateCIDCrimeData',
    ACTIVATE_URL: 'activateCIDCrimeData',

    VIEW_BUTTON: 'VISRNS',
    VIEW_URL: '/official/srsNsrsCases/view',

    // FETCH_VIEW_DATA: 'getSrNsr',
  };

  public static SRS_NSRS_MEJOR_HEAD_MODULE = {
    ADD_BUTTON: 'ADMRHA',
    EDIT_BUTTON: 'EDMRHD',

    ADD_SUBMIT_DATA: 'ASMRHA',
    EDIT_SUBMIT_DATA: 'ESMRHA',

    ADD_SUBMIT_URL: 'addCIDCrimeCategory',
    EDIT_SUBMIT_URL: 'editCIDCrimeCategory',

    FETCH_URL: 'getCIDCrimeCategory',
    ADD_URL: '/official/srsNsrsCases/majorHead/add',
    EDIT_URL: '/official/srsNsrsCases/majorHead/edit',

    // DELETE_BUTTON: 'DLNSSR',
    // DELETE_URL: 'deleteSrNsr',

    DEACTIVATE_BUTTON: 'DCMRHA',
    ACTIVATE_BUTTON: 'ACMRHA',

    DEACTIVATE_URL: 'deactivateCIDCrimeCategory',
    ACTIVATE_URL: 'activateCIDCrimeCategory',

    // VIEW_BUTTON: 'VIMRHA',
    // VIEW_URL: '/official/srsNsrsCases/majorHead/view',

    // FETCH_VIEW_DATA: 'getSrNsr',
  };

  public static SRS_NSRS_SUB_MEJOR_HEAD_MODULE = {
    ADD_BUTTON: 'ADSUHD',
    EDIT_BUTTON: 'EDSUHD',

    ADD_URL: '/official/srsNsrsCases/subMajorHead/add',
    EDIT_URL: '/official/srsNsrsCases/subMajorHead/edit',

    ADD_SUBMIT_DATA: 'ASSUHD',
    EDIT_SUBMIT_DATA: 'ESSUHD',

    ADD_SUBMIT_URL: 'addCIDCrimeCategoryType',
    EDIT_SUBMIT_URL: 'editCIDCrimeCategoryType',

    FETCH_URL: 'getCIDCrimeCategoryType',

    // DELETE_BUTTON: 'DLNSSR',
    // DELETE_URL: 'deleteSrNsr',

    DEACTIVATE_BUTTON: 'DCSUHD',
    ACTIVATE_BUTTON: 'ACSUHD',

    DEACTIVATE_URL: 'deactivateCIDCrimeCategoryType',
    ACTIVATE_URL: 'activateCIDCrimeCategoryType',

    // VIEW_BUTTON: 'VIMRHA',
    // VIEW_URL: '/official/srsNsrsCases/majorHead/view',

    // FETCH_VIEW_DATA: 'getSrNsr',
  };

  public static SRS_NSRS_MODUS_OPERATION_MODULE = {
    ADD_BUTTON: 'MDOPAD',
    EDIT_BUTTON: 'EDMOOP',

    ADD_URL: '/official/srsNsrsCases/modusOperation/add',
    EDIT_URL: '/official/srsNsrsCases/modusOperation/edit',

    ADD_SUBMIT_DATA: 'ASMOOP',
    EDIT_SUBMIT_DATA: 'ESMOOP',

    ADD_SUBMIT_URL: 'addCIDCrimeModus',
    EDIT_SUBMIT_URL: 'editCIDCrimeModus',

    FETCH_URL: 'getCIDCrimeModusData',

    // DELETE_BUTTON: 'DLNSSR',
    // DELETE_URL: 'deleteSrNsr',

    DEACTIVATE_BUTTON: 'DCMOOP',
    ACTIVATE_BUTTON: 'ACMOOP',

    DEACTIVATE_URL: 'deactivateCIDCrimeModus',
    ACTIVATE_URL: 'activateCIDCrimeModus',

    // VIEW_BUTTON: 'VIMRHA',
    // VIEW_URL: '/official/srsNsrsCases/majorHead/view',

    // FETCH_VIEW_DATA: 'getSrNsr',
  };

  public static MOST_WANTED_MODULE = {
    ADD_BUTTON: 'ADMAWT',
    EDIT_BUTTON: 'EDMAWT',
    DEACTIVATE_BUTTON: 'DACMWT',
    ACTIVATE_BUTTON: 'ACTMWT',

    ADD_SUBMIT_DATA: 'AAPMWT',
    EDIT_SUBMIT_DATA: 'EAPMWT',

    ADD_SUBMIT_URL: 'addMostWantedData',
    EDIT_SUBMIT_URL: 'editMostWantedData',

    FETCH_URL: 'getMostWantedData',
    ADD_URL: '/official/mostwanted/add',
    EDIT_URL: '/official/mostwanted/edit',
    DEACTIVATE_URL: 'deactivateMostWantedData',
    ACTIVATE_URL: 'activateMostWantedData',
  };

  public static IMPORTANT_ACHIEVEMENT_MODULE = {
    ADD_BUTTON: 'ADIPTN',
    EDIT_BUTTON: 'EDIPTN',
    DEACTIVATE_BUTTON: 'DAIPTN',
    ACTIVATE_BUTTON: 'ACIPTN',

    ADD_SUBMIT_DATA: 'AAIPTN',
    EDIT_SUBMIT_DATA: 'EAIPTN',

    ADD_SUBMIT_URL: 'addImportantAchievementData',
    EDIT_SUBMIT_URL: 'editImportantAchievementData',

    FETCH_URL: 'getImportantAchievementData',
    ADD_URL: '/official/importantAchievement/add',
    EDIT_URL: '/official/importantAchievement/edit',
    DEACTIVATE_URL: 'deactivateImportantAchievementData',
    ACTIVATE_URL: 'activateImportantAchievementData',
  };

  public static BEST_OUR_TEAM_MODULE = {
    ADD_BUTTON: 'ADBORT',
    EDIT_BUTTON: 'EDBORT',
    DEACTIVATE_BUTTON: 'DABORT',
    ACTIVATE_BUTTON: 'ACBORT',

    ADD_SUBMIT_DATA: 'AABORT',
    EDIT_SUBMIT_DATA: 'EABORT',

    ADD_SUBMIT_URL: 'addBestOurTeamData',
    EDIT_SUBMIT_URL: 'editBestOurTeamData',

    FETCH_URL: 'getBestOurTeamData',
    ADD_URL: '/official/bestOurTeam/add',
    EDIT_URL: '/official/bestOurTeam/edit',
    DEACTIVATE_URL: 'deactivateBestOurTeamData',
    ACTIVATE_URL: 'activateBestOurTeamData',
  };

  public static GrievancePoliceOfficial_MODULE = {
    ADD_BUTTON: 'GPOPAD',
    EDIT_BUTTON: 'GPOPED',
    VIEW_BUTTON: 'GPOPVW',
    DELETE_BUTTON: 'DLGPOP',
    DELETE_CHECK_STATUS_BUTTON: 'GPCHST',
    DELETE_FORWARD_TO_BUTTON: 'GPFRTO',

    ADD_SUBMIT_DATA: 'GPOAAD',
    EDIT_SUBMIT_DATA: 'GPOAED',

    ADD_SUBMIT_URL: 'addGrievancePoliceOfficialData',
    EDIT_SUBMIT_URL: 'editGrievancePoliceOfficialData',

    FETCH_URL: 'getGrievancePoliceOfficialData',
    FETCH_VIEW_DATA: 'viewGrievancePoliceOfficial',
    ADD_URL: '/official/grievancePoliceOfficial/add',
    EDIT_URL: '/official/grievancePoliceOfficial/edit',
    VIEW_URL: '/official/grievancePoliceOfficial/view',
    DELETE_URL: 'deleteGrievancePoliceOfficial',
    DETELE_CHECK_STATUS_URL: 'deleteGrievancePoliceOfficialCheckStatus',
    DETELE_FORWARD_URL: 'deleteGrievancePoliceOfficialForward',

    FETCH_VIEW_URL: 'getGrievancePoliceOfficialChangeStatus',
    USER_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getGrievancePoliceOfficialForwards',
    FETCH_SMS_URL: 'getGrievancePoliceOfficialSmsData',

    CHANGE_STATUS_FORM: 'CMCSGP',
    ASSIGN_TO_OFFICER_FORM: 'CMSOGP',
    FORWARD_TO_OFFICER_FORM: 'CMFWGP',
    SMS_TO_USER_FORM: 'CMSMGP',

    CHANGE_STATUS_TABLE: 'FTCMGP',
    FORWARD_TO_OFFICER_TABLE: 'CMFWGP',
    SMS_TO_USER_TABLE: 'CMSMGP',

    CHANGE_STATUS_SUBMIT: 'grievancePoliceOfficialChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'grievancePoliceOfficialAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT: 'grievancePoliceOfficialForwardToDestSubmit',
    SMS_SENDING_SUBMIT: 'grievancePoliceOfficialSendSMS',

    COPM_REJECT: 'Complaint Rejected',
    COPM_CLOSED: 'Complaint Closed',
    COPM_ASSIGN: 'Complaint Assign',
  };

  public static GrievanceFemalePoliceOfficial_MODULE = {
    ADD_BUTTON: 'GPOPAF',
    EDIT_BUTTON: 'GPOPEF',
    VIEW_BUTTON: 'GPOPVF',
    DELETE_BUTTON: 'DLGPOF',
    DELETE_CHECK_STATUS_BUTTON: 'GPCHSF',
    DELETE_FORWARD_TO_BUTTON: 'GPFRTF',

    ADD_SUBMIT_DATA: 'GPOAAF',
    EDIT_SUBMIT_DATA: 'GPOAEF',

    ADD_SUBMIT_URL: 'addGrievanceFemalePoliceOfficialData',
    EDIT_SUBMIT_URL: 'editGrievanceFemalePoliceOfficialData',

    FETCH_URL: 'getGrievanceFemalePoliceOfficialData',
    FETCH_VIEW_DATA: 'viewGrievanceFemalePoliceOfficial',
    ADD_URL: '/official/grievanceFemalePoliceOfficial/add',
    EDIT_URL: '/official/grievanceFemalePoliceOfficial/edit',
    VIEW_URL: '/official/grievanceFemalePoliceOfficial/view',
    DELETE_URL: 'deleteGrievanceFemalePoliceOfficial',
    DETELE_CHECK_STATUS_URL: 'deleteGrievanceFemalePoliceOfficialCheckStatus',
    DETELE_FORWARD_URL: 'deleteGrievanceFemalePoliceOfficialForward',

    FETCH_VIEW_URL: 'getGrievanceFemalePoliceOfficialChangeStatus',
    USER_FORMWARD_LIST: 'getForwardList',
    FETCH_VIEW_FORWARDURL: 'getGrievanceFemalePoliceOfficialForwards',
    FETCH_SMS_URL: 'getGrievanceFemalePoliceOfficialSmsData',

    CHANGE_STATUS_FORM: 'CMCSGF',
    ASSIGN_TO_OFFICER_FORM: 'CMSOGF',
    FORWARD_TO_OFFICER_FORM: 'CMFWGF',
    SMS_TO_USER_FORM: 'CMSMGF',

    CHANGE_STATUS_TABLE: 'FTCMGF',
    FORWARD_TO_OFFICER_TABLE: 'CMFGPF',
    SMS_TO_USER_TABLE: 'CMSGPF',

    CHANGE_STATUS_SUBMIT: 'grievanceFemalePoliceOfficialChangeStatus',
    ASSIGN_TO_OFFICER_SUBMIT: 'grievanceFemalePoliceOfficialAssignToOfficer',
    FORWARD_TO_DESTINATION_SUBMIT:
      'grievanceFemalePoliceOfficialForwardToDestSubmit',
    SMS_SENDING_SUBMIT: 'grievanceFemalePoliceOfficialSendSMS',

    COPM_REJECT: 'Complaint Rejected',
    COPM_CLOSED: 'Complaint Closed',
    COPM_ASSIGN: 'Complaint Assign',
  };

  // public static EXCEL_MODULE = {
  //   ADD_BUTTON: 'ADDEXE',
  //   EDIT_BUTTON: 'EDTEXE',
  //   DEACTIVATE_BUTTON: 'OCUDAS',
  //   ACTIVATE_BUTTON: 'OCUASS',
  //   VIEW_BUTTON: 'VIWEXC',


  //   ADD_SUBMIT_DATA: 'ADDCID',
  //   EDIT_SUBMIT_DATA: 'EDTCID',


  //   ADD_SUBMIT_URL: 'addCaseUploadExcel',
  //   EDIT_SUBMIT_URL: 'editcaseUpload',

  //   // ⭐ NEW API CONSTANT FOR COMPLETENESS CHECK
  //   COMPLETE_PERCENT_URL: 'getCaseCompleteness',

  //   //FETCH_URL: 'getAllExcelUploadData',
  //   FETCH_URL: 'getAllExcelUploadData',
  //   ADD_URL: '/official/caseUpload/add',
  //   VIEW_URL: '/official/caseUpload/view',
  //   EDIT_URL: '/official/caseUpload/edit',
  //   DEACTIVATE_URL: 'deletejkdata',
  //   ACTIVATE_URL: '/official/caseUpload/activate',
  // };


  public static EXCEL_MODULE = {
    ADD_BUTTON: 'ADDEXE',
    EDIT_BUTTON: 'EDTEXE',
    DEACTIVATE_BUTTON: 'OCUDAS',
    ACTIVATE_BUTTON: 'OCUASS',
    VIEW_BUTTON: 'VIWEXC',

    ADD_SUBMIT_DATA: 'ADDCID',
    EDIT_SUBMIT_DATA: 'EDTCID',

    ADD_SUBMIT_URL: 'addCaseUploadExcel',
    EDIT_SUBMIT_URL: 'editcaseUpload',

    // ⭐ DIRECT URL (no need API_MAPPER)
    //COMPLETE_PERCENT_URL: 'case/68285/completeness',
    COMPLETE_PERCENT_URL: 'completeness/summary',

    //FETCH_URL: 'getAllExcelUploadData',
    FETCH_URL: 'getAllExcelUploadData',
    ADD_URL: '/official/caseUpload/add',
    VIEW_URL: '/official/caseUpload/view',
    EDIT_URL: '/official/caseUpload/edit',
    DEACTIVATE_URL: 'deletejkdata',
    ACTIVATE_URL: '/official/caseUpload/activate',
  };






}
