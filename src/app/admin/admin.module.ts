import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../fragment/header/header.component';
import { SidebarComponent } from '../fragment/sidebar/sidebar.component';
import { BaseComponent } from '../fragment/base/base.component';
import { PermissionDenialComponent } from '../common/permission-denial/permission-denial.component';
import { UnderDevelopmentComponent } from '../common/under-development/under-development.component';
import { AuthContainerComponent } from '../pages/auth-container/auth-container.component';
import { ForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';
import { LoginComponent } from '../pages/login/login.component';
import { VerifyUserComponent } from '../pages/verify-user/verify-user.component';
import { DashboardComponent } from '../views/dashboard/dashboard.component';
import { ProfileComponent } from '../views/profile/profile.component';
import { AdminAboutDspComponent } from './admin-about-dsp/admin-about-dsp.component';
import { ModifyAboutDspComponent } from './admin-about-dsp/modify-about-dsp/modify-about-dsp.component';
import { AdminActsComponent } from './admin-acts/admin-acts.component';
import { ModifyActsComponent } from './admin-acts/modify-acts/modify-acts.component';
import { AdminAnnouncementComponent } from './admin-announcement/admin-announcement.component';
import { ModifyAnnouncementComponent } from './admin-announcement/modify-announcement/modify-announcement.component';
import { AdminAppointmentComponent } from './admin-appointment/admin-appointment.component';
import { ViewAppointmentComponent } from './admin-appointment/view-appointment/view-appointment.component';
import { AdminAssetDetailsComponent } from './admin-asset-details/admin-asset-details.component';
import { ModifyAssetDetailsComponent } from './admin-asset-details/modify-asset-details/modify-asset-details.component';
import { AdminAssetTypesComponent } from './admin-asset-types/admin-asset-types.component';
import { ModifyAssetTypeComponent } from './admin-asset-types/modify-asset-type/modify-asset-type.component';
import { AdminCitizenReportComponent } from './admin-citizen-report/admin-citizen-report.component';
import { ModifyCitizenReportComponent } from './admin-citizen-report/modify-citizen-report/modify-citizen-report.component';
import { ViewCitizenReportComponent } from './admin-citizen-report/view-citizen-report/view-citizen-report.component';
import { AdminComplaintComponent } from './admin-complaint/admin-complaint.component';
import { ViewComplaintComponent } from './admin-complaint/view-complaint/view-complaint.component';
import { AdminCrimeReportComponent } from './admin-crime-report/admin-crime-report.component';
import { AdminCrimeTypeComponent } from './admin-crime-type/admin-crime-type.component';
import { AdminCriminalListComponent } from './admin-criminal-list/admin-criminal-list.component';
import { ModifyCriminalListComponent } from './admin-criminal-list/modify-criminal-list/modify-criminal-list.component';
import { AdminDeadPersonComponent } from './admin-dead-person/admin-dead-person.component';
import { ModifyDeadPersonComponent } from './admin-dead-person/modify-dead-person/modify-dead-person.component';
import { ViewDeadPersonComponent } from './admin-dead-person/view-dead-person/view-dead-person.component';
import { AdminDesignationComponent } from './admin-designation/admin-designation.component';
import { ModifyDesignationComponent } from './admin-designation/modify-designation/modify-designation.component';
import { AdminEcommDispatchComponent } from './admin-ecomm-dispatch/admin-ecomm-dispatch.component';
import { AdminEcommReceiptComponent } from './admin-ecomm-receipt/admin-ecomm-receipt.component';
import { AdminFeedbackComponent } from './admin-feedback/admin-feedback.component';
import { AdminFormsComponent } from './admin-forms/admin-forms.component';
import { ModifyFormsComponent } from './admin-forms/modify-forms/modify-forms.component';
import { AdminFoundPersonComponent } from './admin-found-person/admin-found-person.component';
import { ModifyFoundPersonComponent } from './admin-found-person/modify-found-person/modify-found-person.component';
import { ViewFoundPersonComponent } from './admin-found-person/view-found-person/view-found-person.component';
import { AdminHolidayComponent } from './admin-holiday/admin-holiday.component';
import { AdminImageGalleryComponent } from './admin-image-gallery/admin-image-gallery.component';
import { ModifyImageGalleryComponent } from './admin-image-gallery/modify-image-gallery/modify-image-gallery.component';
import { AdminLeaveApplicationComponent } from './admin-leave-application/admin-leave-application.component';
import { AdminLeaveTypeComponent } from './admin-leave-type/admin-leave-type.component';
import { AdminLocationsComponent } from './admin-locations/admin-locations.component';
import { ModifyLocationsComponent } from './admin-locations/modify-locations/modify-locations.component';
import { AdminMissingPersonComponent } from './admin-missing-person/admin-missing-person.component';
import { ModifyMissingPersonComponent } from './admin-missing-person/modify-missing-person/modify-missing-person.component';
import { ViewMissingPersonComponent } from './admin-missing-person/view-missing-person/view-missing-person.component';
import { AdminNewsEventComponent } from './admin-news-event/admin-news-event.component';
import { ModifyNewsEventComponent } from './admin-news-event/modify-news-event/modify-news-event.component';
import { AdminOurTeamComponent } from './admin-our-team/admin-our-team.component';
import { ModifyOurTeamComponent } from './admin-our-team/modify-our-team/modify-our-team.component';
import { AdminPassportComponent } from './admin-passport/admin-passport.component';
import { ViewPassportComponent } from './admin-passport/view-passport/view-passport.component';
import { AdminPeaceCommityComponent } from './admin-peace-commity/admin-peace-commity.component';
import { ModifyPeaceCommityComponent } from './admin-peace-commity/modify-peace-commity/modify-peace-commity.component';
import { AdminPoliceStationComponent } from './admin-police-station/admin-police-station.component';
import { ModifyPoliceStationComponent } from './admin-police-station/modify-police-station/modify-police-station.component';
import { ViewPoliceStationComponent } from './admin-police-station/view-police-station/view-police-station.component';
import { AdminPostingListComponent } from './admin-posting-list/admin-posting-list.component';
import { ModifyPostingListComponent } from './admin-posting-list/modify-posting-list/modify-posting-list.component';
import { AdminPressReleaseComponent } from './admin-press-release/admin-press-release.component';
import { ModifyPressReleaseComponent } from './admin-press-release/modify-press-release/modify-press-release.component';
import { AdminProcecutionComponent } from './admin-procecution/admin-procecution.component';
import { AdminQuestionsComponent } from './admin-questions/admin-questions.component';
import { AdminResourceComponent } from './admin-resource/admin-resource.component';
import { ModifyResourceComponent } from './admin-resource/modify-resource/modify-resource.component';
import { AdminRtiComponent } from './admin-rti/admin-rti.component';
import { AdminRulesComponent } from './admin-rules/admin-rules.component';
import { ModifyRulesComponent } from './admin-rules/modify-rules/modify-rules.component';
import { AdminSubdivisionComponent } from './admin-subdivision/admin-subdivision.component';
import { ModifySubdivisionComponent } from './admin-subdivision/modify-subdivision/modify-subdivision.component';
import { AdminSuccessionListComponent } from './admin-succession-list/admin-succession-list.component';
import { ModifySuccessionListComponent } from './admin-succession-list/modify-succession-list/modify-succession-list.component';
import { AdminTransferListComponent } from './admin-transfer-list/admin-transfer-list.component';
import { ModifyTransferListComponent } from './admin-transfer-list/modify-transfer-list/modify-transfer-list.component';
import { AdminVideoGalleryComponent } from './admin-video-gallery/admin-video-gallery.component';
import { ModifyVideoGalleryComponent } from './admin-video-gallery/modify-video-gallery/modify-video-gallery.component';
import { AdminVisitorRegisterComponent } from './admin-visitor-register/admin-visitor-register.component';
import { BannerComponent } from './banner/banner.component';
import { ModifyBannerComponent } from './banner/modify-banner/modify-banner.component';
import { CircleInspectorComponent } from './circle-inspector/circle-inspector.component';
import { ModifyCircleInspectorComponent } from './circle-inspector/modify-circle-inspector/modify-circle-inspector.component';
import { DistrictDetailsComponent } from './district-details/district-details.component';
import { ModifyDistrictDetailsComponent } from './district-details/modify-district-details/modify-district-details.component';
import { HeadlinesComponent } from './headlines/headlines.component';
import { ModifyHeadlinesComponent } from './headlines/modify-headlines/modify-headlines.component';
import { HelplineComponent } from './helpline/helpline.component';
import { ModifyHelplinesComponent } from './helpline/modify-helplines/modify-helplines.component';
import { LinksComponent } from './links/links.component';
import { ModifyLinksComponent } from './links/modify-links/modify-links.component';
import { MenuComponent } from './menu/menu.component';
import { ModifyMenuComponent } from './menu/modify-menu/modify-menu.component';
import { ModifyOptionsComponent } from './options/modify-options/modify-options.component';
import { OptionsComponent } from './options/options.component';
import { ModifyPermissionComponent } from './permission/modify-permission/modify-permission.component';
import { PermissionComponent } from './permission/permission.component';
import { ModifyRoleComponent } from './role/modify-role/modify-role.component';
import { RoleComponent } from './role/role.component';
import { ViewRoleComponent } from './role/view-role/view-role.component';
import { ModifySdpoComponent } from './sdpo/modify-sdpo/modify-sdpo.component';
import { SdpoComponent } from './sdpo/sdpo.component';
import { ModifySectionsComponent } from './sections/modify-sections/modify-sections.component';
import { SectionsComponent } from './sections/sections.component';
import { SmsSchedularComponent } from './sms-schedular/sms-schedular.component';
import { ModifySubmenuComponent } from './submenu/modify-submenu/modify-submenu.component';
import { SubmenuComponent } from './submenu/submenu.component';
import { ModifySystemConfigComponent } from './system-config/modify-system-config/modify-system-config.component';
import { SystemConfigComponent } from './system-config/system-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { InlineSVGModule } from 'ng-inline-svg';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { StationUserFormComponent } from './common/station-user-form/station-user-form.component';
import { StationUserComponent } from './common/station-user/station-user.component';
import { AdminCommissionNHRCComponent } from './admin-commission-nhrc/admin-commission-nhrc.component';
import { ModifyNHRCComponent } from './admin-commission-nhrc/modify-nhrc/modify-nhrc.component';
import { ViewNHRCComponent } from './admin-commission-nhrc/view-nhrc/view-nhrc.component';
import { AdminCourtSupremeComponent } from './admin-court-supreme/admin-court-supreme.component';
import { ModifyCourtSupremeComponent } from './admin-court-supreme/modify-court-supreme/modify-court-supreme.component';
import { CourtDetailsFormComponent } from './common/court-details-form/court-details-form.component';
import { CourtDetailsComponent } from './common/court-details/court-details.component';
import { AdminCourtHighComponent } from './admin-court-high/admin-court-high.component';
import { ModifyCourtHighComponent } from './admin-court-high/modify-court-high/modify-court-high.component';
import { AdminCourtLowerComponent } from './admin-court-lower/admin-court-lower.component';
import { ModifyCourtLowerComponent } from './admin-court-lower/modify-court-lower/modify-court-lower.component';
import { ViewCourtHighComponent } from './admin-court-high/view-court-high/view-court-high.component';
import { ViewCourtLowerComponent } from './admin-court-lower/view-court-lower/view-court-lower.component';
import { ViewCourtSupremeComponent } from './admin-court-supreme/view-court-supreme/view-court-supreme.component';
import { AdminCommissionShrcComponent } from './admin-commission-shrc/admin-commission-shrc.component';
import { ModifyShrcComponent } from './admin-commission-shrc/modify-shrc/modify-shrc.component';
import { ViewShrcComponent } from './admin-commission-shrc/view-shrc/view-shrc.component';
import { AdminCommissionSwrcComponent } from './admin-commission-swrc/admin-commission-swrc.component';
import { ModifySwrcComponent } from './admin-commission-swrc/modify-swrc/modify-swrc.component';
import { ViewSwrcComponent } from './admin-commission-swrc/view-swrc/view-swrc.component';
import { AdminCommissionNwrcComponent } from './admin-commission-nwrc/admin-commission-nwrc.component';
import { ModifyNwrcComponent } from './admin-commission-nwrc/modify-nwrc/modify-nwrc.component';
import { ViewNwrcComponent } from './admin-commission-nwrc/view-nwrc/view-nwrc.component';
import { AdminCommissionNcobcComponent } from './admin-commission-ncobc/admin-commission-ncobc.component';
import { ViewNcobcComponent } from './admin-commission-ncobc/view-ncobc/view-ncobc.component';
import { ModifyNcobcComponent } from './admin-commission-ncobc/modify-ncobc/modify-ncobc.component';
import { ModifyProcecutionComponent } from './admin-procecution/modify-procecution/modify-procecution.component';
import { ViewProcecutionComponent } from './admin-procecution/view-procecution/view-procecution.component';
import { ModifyRtiComponent } from './admin-rti/modify-rti/modify-rti.component';
import { ViewRtiComponent } from './admin-rti/view-rti/view-rti.component';
import { AdminGrSectionComponent } from './admin-gr-section/admin-gr-section.component';
import { ModifyGrSectionComponent } from './admin-gr-section/modify-gr-section/modify-gr-section.component';
import { ViewGrSectionComponent } from './admin-gr-section/view-gr-section/view-gr-section.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminGrSectionDetailsComponent } from './admin-gr-section-details/admin-gr-section-details.component';
import { AdminProcecutionDetailsComponent } from './admin-procecution-details/admin-procecution-details.component';
import { GrSectionDetailsTableComponent } from './common/gr-section-details-table/gr-section-details-table.component';
import { ProcecutionDetailsTableComponent } from './common/procecution-details-table/procecution-details-table.component';
import { AdminCommissionNscstComponent } from './admin-commission-nscst/admin-commission-nscst.component';
import { AdminCommissionNcpcrComponent } from './admin-commission-ncpcr/admin-commission-ncpcr.component';
import { AdminCommissionBhrcComponent } from './admin-commission-bhrc/admin-commission-bhrc.component';
import { ModifyNscstComponent } from './admin-commission-nscst/modify-nscst/modify-nscst.component';
import { ViewNscstComponent } from './admin-commission-nscst/view-nscst/view-nscst.component';
import { ModifyBhrcComponent } from './admin-commission-bhrc/modify-bhrc/modify-bhrc.component';
import { ViewBhrcComponent } from './admin-commission-bhrc/view-bhrc/view-bhrc.component';
import { ModifyNcpcrComponent } from './admin-commission-ncpcr/modify-ncpcr/modify-ncpcr.component';
import { ViewNcpcrComponent } from './admin-commission-ncpcr/view-ncpcr/view-ncpcr.component';
import { AppointmentHistoryComponent } from './common/appointment-history/appointment-history.component';
import { ViewEcommReceiptComponent } from './admin-ecomm-receipt/view-ecomm-receipt/view-ecomm-receipt.component';
import { ModifyEcommReceiptComponent } from './admin-ecomm-receipt/modify-ecomm-receipt/modify-ecomm-receipt.component';
import { ModifyQuestionsComponent } from './admin-questions/modify-questions/modify-questions.component';
import { ViewQuestionsComponent } from './admin-questions/view-questions/view-questions.component';
import { ModelModule } from '../common/popup/model/model.module';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { ModifyEventsComponent } from './admin-events/modify-events/modify-events.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationUserListComponent } from './notification-user-list/notification-user-list.component';
import { ViewVisitorRegisterComponent } from './admin-visitor-register/view-visitor-register/view-visitor-register.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ModifyHolidayComponent } from './admin-holiday/modify-holiday/modify-holiday.component';
import { ModifyLeaveTypeComponent } from './admin-leave-type/modify-leave-type/modify-leave-type.component';
import { AdminAssetSupplierComponent } from './admin-asset-supliers/admin-asset-supplier/admin-asset-supplier.component';
import { AdminAssetSupplierViewComponent } from './admin-asset-supliers/admin-asset-supplier-view/admin-asset-supplier-view.component';
import { AdminAssetProductsComponent } from './admin-asset-product/admin-asset-products/admin-asset-products.component';
import { AdminAssetProductsViewComponent } from './admin-asset-product/admin-asset-products-view/admin-asset-products-view.component';
import { SuppliersProductsTableComponent } from './common/suppliers-products-table/suppliers-products-table.component';
import { ViewStocksComponent } from './admin-asset-stock/view-stocks/view-stocks.component';
import { SmsServiceProviderComponent } from './sms-service-provider/sms-service-provider.component';
import { ModifySmsServiceProviderComponent } from './sms-service-provider/modify-sms-service-provider/modify-sms-service-provider.component';
import { SmsTemplateComponent } from './sms-template/sms-template.component';
import { ModifySmsTemplateComponent } from './sms-template/modify-sms-template/modify-sms-template.component';
import { ModifySystemModuleComponent } from './system-config/modify-system-module/modify-system-module.component';
import { SmsModuleComponent } from './sms-module/sms-module.component';
import { ModifySmsModuleComponent } from './sms-module/modify-sms-module/modify-sms-module.component';
import { ModifyEcommDispatchComponent } from './admin-ecomm-dispatch/modify-ecomm-dispatch/modify-ecomm-dispatch.component';
import { ViewEcommDispatchComponent } from './admin-ecomm-dispatch/view-ecomm-dispatch/view-ecomm-dispatch.component';
import { ViewLeaveApplicationComponent } from './admin-leave-application/view-leave-application/view-leave-application.component';
import { UploadCertComponent } from './common/upload-cert/upload-cert.component';
import { ResourceTrasnferComponent } from './resource-trasnfer/resource-trasnfer.component';
import { ModifyResourceTransferComponent } from './resource-trasnfer/modify-resource-transfer/modify-resource-transfer.component';
import { ViewResourceTransferComponent } from './resource-trasnfer/view-resource-transfer/view-resource-transfer.component';
import { FileSaverModule } from 'ngx-filesaver';
import { ReplyComplaintComponent } from './reply-complaint/reply-complaint.component';
import { ModifyReplyComplaintComponent } from './reply-complaint/modify-reply-complaint/modify-reply-complaint.component';
import { AssetStockComponent } from './admin-asset-stock/asset-stock.component';
import { AdminAssetProductComponent } from './admin-asset-product/admin-asset-product.component';
import { AdminAssetSupliersComponent } from './admin-asset-supliers/admin-asset-supliers.component';
import { SummonComponent } from './admin-procecution/summon/summon.component';
import { WarrentComponent } from './admin-procecution/proc-warrent/warrent.component';
import { ProclaimComponent } from './admin-procecution/proc-proclaim/proclaim.component';
import { AttachmentComponent } from './admin-procecution/proc-attachment/attachment.component';
import { NotificationListViewComponent } from './notification-lists/notification-list-view/notification-list-view.component';
import { NotificationListsComponent } from './notification-lists/notification-lists.component';
import { NotificationListModifyComponent } from './notification-lists/notification-list-modify/notification-list-modify.component';
import { NotificationUserComponent } from './notification-user-list/notification-user/notification-user.component';
import { NotificationHistoryComponent } from './notification-history/notification-history.component';
import { TableDataModule } from '../common/table-data/table-data.module';
import { ImageViewerModule } from '../fragment/image-viewer/image-viewer.module';
import { SafeModule } from '../pipe/safe/safe.module';
import { DownloadModule } from './admin-character/download/download.module';
import { Sms } from '../models/Sms';
import { ForwardModule } from './common/forward/forward.module';
import { AssignToOfficerModule } from './common/assign-to-officer/assign-to-officer.module';
import { ChangeStatusModule } from './common/change-status/change-status.module';
import { UploadCertModule } from './common/upload-cert/upload-cert.module';
import { SmsModule } from './common/sms/sms.module';
import { GrSummonComponent } from './admin-gr-section/gr-summon/gr-summon.component';
import { GrAttachmentComponent } from './admin-gr-section/gr-attachment/gr-attachment.component';
import { GrWarrentComponent } from './admin-gr-section/gr-warrent/gr-warrent.component';
import { GrProclaimComponent } from './admin-gr-section/gr-proclaim/gr-proclaim.component';
import { ViewSectionComponent } from './sections/view-section/view-section.component';
import { SectionUserComponent } from './common/section-user/section-user.component';
import { SectionUserFormComponent } from './common/section-user-form/section-user-form.component';
import { DspUserComponent } from './common/dsp-user/dsp-user.component';
import { DspUserFormComponent } from './common/dsp-user-form/dsp-user-form.component';
import { ViewDspComponent } from './admin-about-dsp/view-dsp/view-dsp.component';
import { ViewSdpoComponent } from './sdpo/view-sdpo/view-sdpo.component';
import { ViewSubdivisionComponent } from './admin-subdivision/view-subdivision/view-subdivision.component';
import { ViewCircleInspectorComponent } from './circle-inspector/view-circle-inspector/view-circle-inspector.component';
import { SdpoUserFormComponent } from './common/sdpo-user-form/sdpo-user-form.component';
import { SdpoUserComponent } from './common/sdpo-user/sdpo-user.component';
import { SubdivisionUserComponent } from './common/subdivision-user/subdivision-user.component';
import { SubdivisionUserFormComponent } from './common/subdivision-user-form/subdivision-user-form.component';
import { CircleUserComponent } from './common/circle-user/circle-user.component';
import { CircleUserFormComponent } from './common/circle-user-form/circle-user-form.component';
import { ViewAdminAssetTypesComponent } from './admin-asset-types/view-admin-asset-types/view-admin-asset-types.component';
import { ViewFeedbackComponent } from './admin-feedback/view-feedback/view-feedback.component';
import { AdminBestOurTeamComponent } from './admin-best-our-team/admin-best-our-team.component';
import { ModifyOurTeamComponent as ModifyBestOurTeamComponent } from './admin-best-our-team/modify-best-our-team/modify-our-team.component';
import { AdminGrievancePoliceOfficialComponent } from './admin-gpo/admin-gpo.component';
import { ModifyGrievancePoliceOfficialComponent } from './admin-gpo/modify-gpo/modify-gpo.component';
import { ViewGrievancePoliceOfficialComponent } from './admin-gpo/view-gpo/view-gpo.component';
import { AdminGrievanceFemalePoliceOfficialComponent } from './admin-gfpo/admin-gfpo.component';
import { ModifyGrievanceFemalePoliceOfficialComponent } from './admin-gfpo/modify-gfpo/modify-gfpo.component';
import { ViewGrievanceFemalePoliceOfficialComponent } from './admin-gfpo/view-gfpo/view-gfpo.component';
import { StateComponent } from './state/state.component';
import { ModifyStateComponent } from './state/modify-state/modify-state.component';
import { RangeComponent } from './range/range.component';
import { ModifyRangeComponent } from './range/modify-range/modify-range.component';
import { ModifyDistrictComponent } from './district/modify-district/modify-district.component';
import { DistrictComponent } from './district/district.component';
import { SrNsrCasesTrailComponent } from './sr-nsr-cases-trail/sr-nsr-cases-trail.component';
import { AdminCidExcelComponent } from './admin-cid-excel/admin-cid-excel.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
// import { StateComponent } from './state/state.component';
// import { ModifyStateComponent } from './state/modify-state/modify-state.component';
// import { ViewStateComponent } from './state/view-state/view-state.component';
// import { ModifyDistrictComponent } from './district/modify-district/modify-district.component';
// import { RangeComponent } from './range/range.component';
// import { ModifyRangeComponent } from './range/modify-range/modify-range.component';
// import { DistrictComponent } from './district/district.component';
import { MatCardModule } from '@angular/material/card';
import { AdminCidUploadCasesComponent } from './admin-cid-upload-cases/admin-cid-upload-cases.component';
import { ViewCidUploadComponent } from './admin-cid-upload-cases/view-cid-upload/view-cid-upload.component';
import { AdminCidUploadCasesReportComponent } from './admin-cid-upload-cases-report/admin-cid-upload-cases-report.component';
import { ModifyCaseUploadComponent } from './admin-cid-upload-cases/modify-case-upload/modify-case-upload.component';
import { MatIconModule } from "@angular/material/icon";
import { DistrictStatisticsReportComponent } from './admin-cid-upload-cases-report/district-statistics-report/district-statistics-report.component';
import { DistrictStatisticsSummeryReportComponent } from './admin-cid-upload-cases-report/district-statistics-summery-report/district-statistics-summery-report.component';
// import { FilterDialogComponent } from './admin-cid-upload-cases/admin-cid-upload-cases-report/filter-dialog/filter-dialog.component';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BaseComponent,
    AuthContainerComponent,
    LoginComponent,
    ForgotPasswordComponent,
    VerifyUserComponent,
    BaseComponent,
    DashboardComponent,
    ProfileComponent,
    RoleComponent,
    ViewRoleComponent,
    ModifyRoleComponent,
    MenuComponent,
    ModifyMenuComponent,
    SubmenuComponent,
    ModifySubmenuComponent,
    PermissionComponent,
    ModifyPermissionComponent,
    LinksComponent,
    ModifyLinksComponent,
    BannerComponent,
    ModifyBannerComponent,
    DistrictDetailsComponent,
    ModifyDistrictDetailsComponent,
    HeadlinesComponent,
    ModifyHeadlinesComponent,
    ModifyPressReleaseComponent,
    AdminPressReleaseComponent,
    ModifyPressReleaseComponent,
    AdminNewsEventComponent,
    ModifyNewsEventComponent,
    AdminImageGalleryComponent,
    ModifyImageGalleryComponent,
    AdminVideoGalleryComponent,
    ModifyVideoGalleryComponent,
    AdminFormsComponent,
    ModifyFormsComponent,
    AdminActsComponent,
    ModifyActsComponent,
    AdminRulesComponent,
    ModifyRulesComponent,
    AdminPostingListComponent,
    ModifyPostingListComponent,
    AdminAnnouncementComponent,
    ModifyAnnouncementComponent,
    AdminCriminalListComponent,
    ModifyCriminalListComponent,
    AdminPeaceCommityComponent,
    ModifyPeaceCommityComponent,
    PermissionDenialComponent,
    UnderDevelopmentComponent,
    HelplineComponent,
    ModifyHelplinesComponent,
    AdminTransferListComponent,
    ModifyTransferListComponent,
    AdminOurTeamComponent,
    ModifyOurTeamComponent,
    AdminSuccessionListComponent,
    ModifySuccessionListComponent,
    OptionsComponent,
    ModifyOptionsComponent,
    SectionsComponent,
    ModifySectionsComponent,
    SdpoComponent,
    ModifySdpoComponent,
    CircleInspectorComponent,
    ModifyCircleInspectorComponent,
    AdminPoliceStationComponent,
    ModifyPoliceStationComponent,
    ViewPoliceStationComponent,
    SystemConfigComponent,
    ModifySystemConfigComponent,
    SmsSchedularComponent,
    AdminPassportComponent,
    ViewPassportComponent,
    AdminCitizenReportComponent,
    ModifyCitizenReportComponent,
    ViewCitizenReportComponent,
    AdminMissingPersonComponent,
    ModifyMissingPersonComponent,
    ViewMissingPersonComponent,
    AdminFoundPersonComponent,
    ModifyFoundPersonComponent,
    ViewFoundPersonComponent,
    AdminDeadPersonComponent,
    ModifyDeadPersonComponent,
    ViewDeadPersonComponent,
    AdminAppointmentComponent,
    ViewAppointmentComponent,
    AdminComplaintComponent,
    ViewComplaintComponent,
    AdminLocationsComponent,
    ModifyLocationsComponent,
    AdminDesignationComponent,
    ModifyDesignationComponent,
    AdminResourceComponent,
    ModifyResourceComponent,
    AdminAboutDspComponent,
    ModifyAboutDspComponent,
    AdminSubdivisionComponent,
    ModifySubdivisionComponent,
    AdminLeaveApplicationComponent,
    AdminHolidayComponent,
    AdminLeaveTypeComponent,
    AdminFeedbackComponent,
    AdminQuestionsComponent,
    AdminAssetTypesComponent,
    ModifyAssetTypeComponent,
    AdminAssetDetailsComponent,
    ModifyAssetDetailsComponent,
    AdminVisitorRegisterComponent,
    AdminEcommReceiptComponent,
    AdminEcommDispatchComponent,
    AdminRtiComponent,
    AdminProcecutionComponent,
    AdminCrimeTypeComponent,
    AdminCrimeReportComponent,
    StationUserFormComponent,
    StationUserComponent,
    AdminCommissionNHRCComponent,
    ModifyNHRCComponent,
    ViewNHRCComponent,
    AdminCourtSupremeComponent,
    ModifyCourtSupremeComponent,
    AdminCourtHighComponent,
    ModifyCourtHighComponent,
    AdminCourtLowerComponent,
    ModifyCourtLowerComponent,
    CourtDetailsFormComponent,
    CourtDetailsComponent,
    ViewCourtHighComponent,
    ViewCourtLowerComponent,
    ViewCourtSupremeComponent,
    AdminCommissionShrcComponent,
    ModifyShrcComponent,
    ViewShrcComponent,
    AdminCommissionSwrcComponent,
    ModifySwrcComponent,
    ViewSwrcComponent,
    AdminCommissionNwrcComponent,
    ModifyNwrcComponent,
    ViewNwrcComponent,
    AdminCommissionNcobcComponent,
    ViewNcobcComponent,
    ModifyNcobcComponent,
    ModifyProcecutionComponent,
    ViewProcecutionComponent,
    ModifyRtiComponent,
    ViewRtiComponent,
    AdminGrSectionComponent,
    ModifyGrSectionComponent,
    ViewGrSectionComponent,
    AdminGrSectionDetailsComponent,
    AdminProcecutionDetailsComponent,
    GrSectionDetailsTableComponent,
    ProcecutionDetailsTableComponent,
    AdminCommissionNscstComponent,
    AdminCommissionNcpcrComponent,
    AdminCommissionBhrcComponent,
    ModifyNscstComponent,
    ViewNscstComponent,
    ModifyBhrcComponent,
    ViewBhrcComponent,
    ModifyNcpcrComponent,
    ViewNcpcrComponent,
    AppointmentHistoryComponent,
    ViewEcommReceiptComponent,
    ModifyEcommReceiptComponent,
    ModifyQuestionsComponent,
    ViewQuestionsComponent,
    AdminEventsComponent,
    ModifyEventsComponent,
    NotificationComponent,
    NotificationUserListComponent,
    NotificationListViewComponent,
    NotificationListsComponent,
    ViewVisitorRegisterComponent,
    ModifyHolidayComponent,
    ModifyLeaveTypeComponent,
    AdminAssetSupplierComponent,
    AdminAssetSupplierViewComponent,
    AdminAssetProductsComponent,
    AdminAssetProductsViewComponent,
    SuppliersProductsTableComponent,
    ViewStocksComponent,
    SmsServiceProviderComponent,
    ModifySmsServiceProviderComponent,
    SmsTemplateComponent,
    ModifySmsTemplateComponent,
    ModifySystemModuleComponent,
    SmsModuleComponent,
    ModifySmsModuleComponent,
    ModifyEcommDispatchComponent,
    ViewEcommDispatchComponent,
    ViewLeaveApplicationComponent,
    ResourceTrasnferComponent,
    ModifyResourceTransferComponent,
    ViewResourceTransferComponent,
    ReplyComplaintComponent,
    ModifyReplyComplaintComponent,
    AdminAssetProductComponent,
    AdminAssetSupliersComponent,
    AssetStockComponent,
    SummonComponent,
    WarrentComponent,
    ProclaimComponent,
    AttachmentComponent,
    NotificationListModifyComponent,
    NotificationUserComponent,
    NotificationHistoryComponent,
    GrSummonComponent,
    GrAttachmentComponent,
    GrWarrentComponent,
    GrProclaimComponent,
    ViewSectionComponent,
    SectionUserComponent,
    SectionUserFormComponent,
    DspUserComponent,
    DspUserFormComponent,
    ViewDspComponent,
    ViewSdpoComponent,
    ViewSubdivisionComponent,
    ViewCircleInspectorComponent,
    SdpoUserFormComponent,
    SdpoUserComponent,
    SubdivisionUserComponent,
    SubdivisionUserFormComponent,
    CircleUserComponent,
    CircleUserFormComponent,
    ViewAdminAssetTypesComponent,
    ViewFeedbackComponent,
    AdminBestOurTeamComponent,
    ModifyBestOurTeamComponent,
    AdminGrievancePoliceOfficialComponent,
    ModifyGrievancePoliceOfficialComponent,
    ViewGrievancePoliceOfficialComponent,
    AdminGrievanceFemalePoliceOfficialComponent,
    ModifyGrievanceFemalePoliceOfficialComponent,
    ViewGrievanceFemalePoliceOfficialComponent,
    StateComponent,
    ModifyStateComponent,
    RangeComponent,
    ModifyRangeComponent,
    DistrictComponent,
    ModifyDistrictComponent,
    SrNsrCasesTrailComponent,
    AdminCidExcelComponent,
    AdminCidUploadCasesComponent,
    ViewCidUploadComponent,
    AdminCidUploadCasesReportComponent,
    ModifyCaseUploadComponent,
    DistrictStatisticsReportComponent,
    DistrictStatisticsSummeryReportComponent,
  ],
  imports: [
    CommonModule,
    AngularMultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminRoutingModule,
    TranslateModule,
    NgxDatatableModule,
    InlineSVGModule,
    AngularDualListBoxModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule,
    ModelModule,
    NgbDatepickerModule,
    FileSaverModule,
    TableDataModule,
    ImageViewerModule,
    SafeModule,
    DownloadModule,
    ForwardModule,
    SmsModule,
    AssignToOfficerModule,
    ChangeStatusModule,
    UploadCertModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,

  ],
})
export class AdminModuleModule { }
