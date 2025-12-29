import { DistrictDetail } from './districtDetails';
import { Headlines } from './Headlines';
import { ImageGallery } from './ImageGallery';
import { Helpline } from './helpline';
import { Links } from './links';
import { Menu } from './Menu';
import { NewsEvents } from './NewsEvents';
import { Permission } from './Permission';
import { PressRelease } from './pressRelease';
import { Role } from './Role';
import { SubMenu } from './SubMenu';
import { VideoGallery } from './VideoGallery';
import { Options } from './Options';
import { Sections } from './Sections';
import { Sdpo } from './Sdpo';
import { CircleInspector } from './CircleInspector';
import { UserData } from './UserData';
import { PoliceStation } from './PoliceStation';
import { SystemConfig } from './SystemConfig';
import { SmsSchedular } from './SmsSchedular';
import { Question } from './question';
import { Passport } from './Passport';
import { CitizenReport } from './CitizenReport';
import { MissingPerson } from './MissingPerson';
import { DeadPerson } from './DeadPerson';
import { FoundPerson } from './FoundPerson';
import { Complaint } from './Complaint';
import { FeedBack } from './FeedBack';
import { Locations } from './Locations';
import { AssetType } from './AssetType';
import { Dsp } from './Dsp';
import { Subdivision } from './Subdivision';
import { Banners } from './Banner';
import { Appointment } from './Appointment';
import { CharacterDetails } from './CharacterDetails';
import { ReplyComplaint } from './ReplyComplaint';
import { SmsSending } from './SmsSending';
import { ReplyComment } from './ReplyComment';
import { Court } from './Court';
import { StationUser } from './StationUser';
import { Commission } from './Commission';
import { CourtDetails } from './CourtDetails';
import { Rti } from './Rti';
import { Procecution } from './Procecution';
import { ProcecutionDetails } from './ProcecutionDetails';
import { GrSection } from './GrSection';
import { GrSectionDetails } from './GrSectionDetails';
import { AppointmentHistory } from './AppointmentHistory';
import { EcommunicationReceipt } from './EcommunicationReceipt';
import { Events } from './Events';
import { NotificationList } from './NotificationList';
import { NotificationUserList } from './NotificationUserList';
import { VisitorsMaster } from './VisitorsMaster';
import { Holiday } from './Holiday';
import { LeaveType } from './LeaveType';
import { LeaveResource } from './LeaveResource';
import { Leave } from './Leave';
import { AssetSupplier } from './AssetSupplier';
import { AssetStock } from './AssetStock';
import { SupplierProducts } from './SupplierProducts';
import { AssetDetails } from './AssetDetails';
import { SmsTemplate } from './SmsTemplate';
import { SmsServiceProvider } from './SmsServiceProvider';
import { Module } from './Module';
import { Sms } from './Sms';
import { EcommunicationDispatch } from './EcommunicationDispatch';
import { Designation } from './Designation';
import { Transfer } from './Transfer';
import { TransferResource } from './TransferResource';
import { TransferLocation } from './TransferLocation';
import { NotificationHistory } from './NotificationHistory';
import { PoliceDiary } from './PoliceDiary';
import { PoliceOfficer } from './PoliceOfficer';
import { MajorHead } from './MajorHead';
import { SubMajorHead } from './SubMajorHead';
import { ModusOperation } from './ModusOperation';
import { SrsNsrsCases } from './SrsNsrsCases';
import { GrievancePoliceOfficial } from './GrievancePoliceOfficial';
import { GrievanceFemalePoliceOfficial } from './GrievanceFemalePoliceOfficial';
import { SrsNsrsCasesTrail } from './SrsNsrsCasesTrail';
import { CIDCrimeData } from './CIDCrimeData';
import { CIDUploadCase } from './CIDUploadCase';
import { District } from './District';
import { Dig } from './Dig';
import { Completeness } from './Completeness';

export class Page {
  data: any;
  constructor(
    public size: number,
    public totalElements: number,
    public totalPages: number,
    public pageNumber: number,
    public sort: boolean,
    public prop: any,
    public filter:
      | Permission
      | Menu
      | Role
      | SubMenu
      | Headlines
      | Links
      | DistrictDetail
      | Helpline
      | PressRelease
      | NewsEvents
      | ImageGallery
      | VideoGallery
      | Options
      | Sections
      | Sdpo
      | CircleInspector
      | UserData
      | PoliceStation
      | SystemConfig
      | SmsSchedular
      | Question
      | Passport
      | CitizenReport
      | MissingPerson
      | DeadPerson
      | FoundPerson
      | Complaint
      | FeedBack
      | Locations
      | AssetType
      | AssetDetails
      | Dsp
      | Dig
      | Subdivision
      | Banners
      | Appointment
      | CharacterDetails
      | ReplyComplaint
      | SmsSending
      | ReplyComment
      | Court
      | StationUser
      | Commission
      | CourtDetails
      | Rti
      | Procecution
      | ProcecutionDetails
      | GrSection
      | GrSectionDetails
      | AppointmentHistory
      | EcommunicationReceipt
      | EcommunicationDispatch
      | Events
      | NotificationList
      | NotificationUserList
      | VisitorsMaster
      | Holiday
      | LeaveType
      | LeaveResource
      | Leave
      | AssetSupplier
      | AssetStock
      | SupplierProducts
      | SmsTemplate
      | SmsServiceProvider
      | Module
      | Sms
      | Designation
      | Transfer
      | TransferResource
      | TransferLocation
      | NotificationHistory
      | PoliceDiary
      | PoliceOfficer
      | MajorHead
      | SubMajorHead
      | ModusOperation
      | SrsNsrsCases
      | GrievancePoliceOfficial
      | GrievanceFemalePoliceOfficial
      | SrsNsrsCasesTrail
      | CIDCrimeData
      | CIDUploadCase
      | District
      | Completeness
  ) { }
}
