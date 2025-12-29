import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionDenialComponent } from '../common/permission-denial/permission-denial.component';
import { UnderDevelopmentComponent } from '../common/under-development/under-development.component';
import { BaseComponent } from '../fragment/base/base.component';
import { AuthContainerComponent } from '../pages/auth-container/auth-container.component';
import { ForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';
import { LoginComponent } from '../pages/login/login.component';
import { VerifyUserComponent } from '../pages/verify-user/verify-user.component';
import { RouteGuardService } from '../services/route-guard.service';
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
import { AdminAssetProductComponent } from './admin-asset-product/admin-asset-product.component';
import { AdminAssetProductsViewComponent } from './admin-asset-product/admin-asset-products-view/admin-asset-products-view.component';
import { AdminAssetProductsComponent } from './admin-asset-product/admin-asset-products/admin-asset-products.component';
import { AssetStockComponent } from './admin-asset-stock/asset-stock.component';
import { AdminAssetSupliersComponent } from './admin-asset-supliers/admin-asset-supliers.component';
import { AdminAssetSupplierViewComponent } from './admin-asset-supliers/admin-asset-supplier-view/admin-asset-supplier-view.component';
import { AdminAssetSupplierComponent } from './admin-asset-supliers/admin-asset-supplier/admin-asset-supplier.component';
import { AdminAssetTypesComponent } from './admin-asset-types/admin-asset-types.component';
import { ModifyAssetTypeComponent } from './admin-asset-types/modify-asset-type/modify-asset-type.component';
import { AdminCitizenReportComponent } from './admin-citizen-report/admin-citizen-report.component';
import { ModifyCitizenReportComponent } from './admin-citizen-report/modify-citizen-report/modify-citizen-report.component';
import { ViewCitizenReportComponent } from './admin-citizen-report/view-citizen-report/view-citizen-report.component';
import { AdminCommissionBhrcComponent } from './admin-commission-bhrc/admin-commission-bhrc.component';
import { ModifyBhrcComponent } from './admin-commission-bhrc/modify-bhrc/modify-bhrc.component';
import { ViewBhrcComponent } from './admin-commission-bhrc/view-bhrc/view-bhrc.component';
import { AdminCommissionNcobcComponent } from './admin-commission-ncobc/admin-commission-ncobc.component';
import { ModifyNcobcComponent } from './admin-commission-ncobc/modify-ncobc/modify-ncobc.component';
import { ViewNcobcComponent } from './admin-commission-ncobc/view-ncobc/view-ncobc.component';
import { AdminCommissionNcpcrComponent } from './admin-commission-ncpcr/admin-commission-ncpcr.component';
import { ModifyNcpcrComponent } from './admin-commission-ncpcr/modify-ncpcr/modify-ncpcr.component';
import { ViewNcpcrComponent } from './admin-commission-ncpcr/view-ncpcr/view-ncpcr.component';
import { AdminCommissionNHRCComponent } from './admin-commission-nhrc/admin-commission-nhrc.component';
import { ModifyNHRCComponent } from './admin-commission-nhrc/modify-nhrc/modify-nhrc.component';
import { ViewNHRCComponent } from './admin-commission-nhrc/view-nhrc/view-nhrc.component';
import { AdminCommissionNscstComponent } from './admin-commission-nscst/admin-commission-nscst.component';
import { ModifyNscstComponent } from './admin-commission-nscst/modify-nscst/modify-nscst.component';
import { ViewNscstComponent } from './admin-commission-nscst/view-nscst/view-nscst.component';
import { AdminCommissionNwrcComponent } from './admin-commission-nwrc/admin-commission-nwrc.component';
import { ModifyNwrcComponent } from './admin-commission-nwrc/modify-nwrc/modify-nwrc.component';
import { ViewNwrcComponent } from './admin-commission-nwrc/view-nwrc/view-nwrc.component';
import { AdminCommissionShrcComponent } from './admin-commission-shrc/admin-commission-shrc.component';
import { ModifyShrcComponent } from './admin-commission-shrc/modify-shrc/modify-shrc.component';
import { ViewShrcComponent } from './admin-commission-shrc/view-shrc/view-shrc.component';
import { AdminCommissionSwrcComponent } from './admin-commission-swrc/admin-commission-swrc.component';
import { ModifySwrcComponent } from './admin-commission-swrc/modify-swrc/modify-swrc.component';
import { ViewSwrcComponent } from './admin-commission-swrc/view-swrc/view-swrc.component';
import { AdminComplaintComponent } from './admin-complaint/admin-complaint.component';
import { ViewComplaintComponent } from './admin-complaint/view-complaint/view-complaint.component';
import { AdminCourtHighComponent } from './admin-court-high/admin-court-high.component';
import { ModifyCourtHighComponent } from './admin-court-high/modify-court-high/modify-court-high.component';
import { ViewCourtHighComponent } from './admin-court-high/view-court-high/view-court-high.component';
import { AdminCourtLowerComponent } from './admin-court-lower/admin-court-lower.component';
import { ModifyCourtLowerComponent } from './admin-court-lower/modify-court-lower/modify-court-lower.component';
import { ViewCourtLowerComponent } from './admin-court-lower/view-court-lower/view-court-lower.component';
import { AdminCourtSupremeComponent } from './admin-court-supreme/admin-court-supreme.component';
import { ModifyCourtSupremeComponent } from './admin-court-supreme/modify-court-supreme/modify-court-supreme.component';
import { ViewCourtSupremeComponent } from './admin-court-supreme/view-court-supreme/view-court-supreme.component';
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
import { ModifyEcommDispatchComponent } from './admin-ecomm-dispatch/modify-ecomm-dispatch/modify-ecomm-dispatch.component';
import { ViewEcommDispatchComponent } from './admin-ecomm-dispatch/view-ecomm-dispatch/view-ecomm-dispatch.component';
import { AdminEcommReceiptComponent } from './admin-ecomm-receipt/admin-ecomm-receipt.component';
import { ModifyEcommReceiptComponent } from './admin-ecomm-receipt/modify-ecomm-receipt/modify-ecomm-receipt.component';
import { ViewEcommReceiptComponent } from './admin-ecomm-receipt/view-ecomm-receipt/view-ecomm-receipt.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { ModifyEventsComponent } from './admin-events/modify-events/modify-events.component';
import { AdminFeedbackComponent } from './admin-feedback/admin-feedback.component';
import { ViewFeedbackComponent } from './admin-feedback/view-feedback/view-feedback.component';
import { AdminFormsComponent } from './admin-forms/admin-forms.component';
import { ModifyFormsComponent } from './admin-forms/modify-forms/modify-forms.component';
import { AdminFoundPersonComponent } from './admin-found-person/admin-found-person.component';
import { ModifyFoundPersonComponent } from './admin-found-person/modify-found-person/modify-found-person.component';
import { ViewFoundPersonComponent } from './admin-found-person/view-found-person/view-found-person.component';
import { AdminGrSectionDetailsComponent } from './admin-gr-section-details/admin-gr-section-details.component';
import { ModifyGrSectionComponent } from './admin-gr-section/modify-gr-section/modify-gr-section.component';
import { ViewGrSectionComponent } from './admin-gr-section/view-gr-section/view-gr-section.component';
import { AdminHolidayComponent } from './admin-holiday/admin-holiday.component';
import { ModifyHolidayComponent } from './admin-holiday/modify-holiday/modify-holiday.component';
import { AdminImageGalleryComponent } from './admin-image-gallery/admin-image-gallery.component';
import { ModifyImageGalleryComponent } from './admin-image-gallery/modify-image-gallery/modify-image-gallery.component';
import { AdminLeaveApplicationComponent } from './admin-leave-application/admin-leave-application.component';
import { ViewLeaveApplicationComponent } from './admin-leave-application/view-leave-application/view-leave-application.component';
import { AdminLeaveTypeComponent } from './admin-leave-type/admin-leave-type.component';
import { ModifyLeaveTypeComponent } from './admin-leave-type/modify-leave-type/modify-leave-type.component';
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
import { AdminProcecutionDetailsComponent } from './admin-procecution-details/admin-procecution-details.component';
import { ModifyProcecutionComponent } from './admin-procecution/modify-procecution/modify-procecution.component';
import { ViewProcecutionComponent } from './admin-procecution/view-procecution/view-procecution.component';
import { AdminQuestionsComponent } from './admin-questions/admin-questions.component';
import { ModifyQuestionsComponent } from './admin-questions/modify-questions/modify-questions.component';
import { AdminResourceComponent } from './admin-resource/admin-resource.component';
import { ModifyResourceComponent } from './admin-resource/modify-resource/modify-resource.component';
import { AdminRtiComponent } from './admin-rti/admin-rti.component';
import { ModifyRtiComponent } from './admin-rti/modify-rti/modify-rti.component';
import { ViewRtiComponent } from './admin-rti/view-rti/view-rti.component';
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
import { ViewVisitorRegisterComponent } from './admin-visitor-register/view-visitor-register/view-visitor-register.component';
import { BannerComponent } from './banner/banner.component';
import { ModifyBannerComponent } from './banner/modify-banner/modify-banner.component';
import { CircleInspectorComponent } from './circle-inspector/circle-inspector.component';
import { ModifyCircleInspectorComponent } from './circle-inspector/modify-circle-inspector/modify-circle-inspector.component';
import { CourtDetailsFormComponent } from './common/court-details-form/court-details-form.component';
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
import { NotificationUserListComponent } from './notification-user-list/notification-user-list.component';
import { NotificationComponent } from './notification/notification.component';
import { ModifyOptionsComponent } from './options/modify-options/modify-options.component';
import { OptionsComponent } from './options/options.component';
import { ModifyPermissionComponent } from './permission/modify-permission/modify-permission.component';
import { PermissionComponent } from './permission/permission.component';
import { ModifyReplyComplaintComponent } from './reply-complaint/modify-reply-complaint/modify-reply-complaint.component';
import { ReplyComplaintComponent } from './reply-complaint/reply-complaint.component';
import { ModifyResourceTransferComponent } from './resource-trasnfer/modify-resource-transfer/modify-resource-transfer.component';
import { ResourceTrasnferComponent } from './resource-trasnfer/resource-trasnfer.component';
import { ViewResourceTransferComponent } from './resource-trasnfer/view-resource-transfer/view-resource-transfer.component';
import { ModifyRoleComponent } from './role/modify-role/modify-role.component';
import { RoleComponent } from './role/role.component';
import { ViewRoleComponent } from './role/view-role/view-role.component';
import { ModifySdpoComponent } from './sdpo/modify-sdpo/modify-sdpo.component';
import { SdpoComponent } from './sdpo/sdpo.component';
import { ModifySectionsComponent } from './sections/modify-sections/modify-sections.component';
import { SectionsComponent } from './sections/sections.component';
import { ModifySmsModuleComponent } from './sms-module/modify-sms-module/modify-sms-module.component';
import { SmsModuleComponent } from './sms-module/sms-module.component';
import { SmsSchedularComponent } from './sms-schedular/sms-schedular.component';
import { ModifySmsServiceProviderComponent } from './sms-service-provider/modify-sms-service-provider/modify-sms-service-provider.component';
import { SmsServiceProviderComponent } from './sms-service-provider/sms-service-provider.component';
import { ModifySmsTemplateComponent } from './sms-template/modify-sms-template/modify-sms-template.component';
import { SmsTemplateComponent } from './sms-template/sms-template.component';
import { ModifySubmenuComponent } from './submenu/modify-submenu/modify-submenu.component';
import { SubmenuComponent } from './submenu/submenu.component';
import { ModifySystemConfigComponent } from './system-config/modify-system-config/modify-system-config.component';
import { ModifySystemModuleComponent } from './system-config/modify-system-module/modify-system-module.component';
import { SystemConfigComponent } from './system-config/system-config.component';
import { NotificationListViewComponent } from './notification-lists/notification-list-view/notification-list-view.component';
import { NotificationListsComponent } from './notification-lists/notification-lists.component';
import { NotificationListModifyComponent } from './notification-lists/notification-list-modify/notification-list-modify.component';
import { NotificationHistoryComponent } from './notification-history/notification-history.component';
import { SummonComponent } from './admin-procecution/summon/summon.component';
import { AttachmentComponent } from './admin-procecution/proc-attachment/attachment.component';
import { ProclaimComponent } from './admin-procecution/proc-proclaim/proclaim.component';
import { WarrentComponent } from './admin-procecution/proc-warrent/warrent.component';
import { GrSummonComponent } from './admin-gr-section/gr-summon/gr-summon.component';
import { GrWarrentComponent } from './admin-gr-section/gr-warrent/gr-warrent.component';
import { GrProclaimComponent } from './admin-gr-section/gr-proclaim/gr-proclaim.component';
import { GrAttachmentComponent } from './admin-gr-section/gr-attachment/gr-attachment.component';
import { ViewSectionComponent } from './sections/view-section/view-section.component';
import { ViewDspComponent } from './admin-about-dsp/view-dsp/view-dsp.component';
import { ViewSubdivisionComponent } from './admin-subdivision/view-subdivision/view-subdivision.component';
import { ViewCircleInspectorComponent } from './circle-inspector/view-circle-inspector/view-circle-inspector.component';
import { ViewSdpoComponent } from './sdpo/view-sdpo/view-sdpo.component';
import { ViewAdminAssetTypesComponent } from './admin-asset-types/view-admin-asset-types/view-admin-asset-types.component';
import { ViewStocksComponent } from './admin-asset-stock/view-stocks/view-stocks.component';
import { AdminBestOurTeamComponent } from './admin-best-our-team/admin-best-our-team.component';
import { ModifyOurTeamComponent as ModifyBestOurTeamComponent } from './admin-best-our-team/modify-best-our-team/modify-our-team.component';
import { AdminGrievancePoliceOfficialComponent } from './admin-gpo/admin-gpo.component';
import { ModifyGrievancePoliceOfficialComponent } from './admin-gpo/modify-gpo/modify-gpo.component';
import { ViewGrievancePoliceOfficialComponent } from './admin-gpo/view-gpo/view-gpo.component';
import { ModifyGrievanceFemalePoliceOfficialComponent } from './admin-gfpo/modify-gfpo/modify-gfpo.component';
import { ViewGrievanceFemalePoliceOfficialComponent } from './admin-gfpo/view-gfpo/view-gfpo.component';
import { AdminGrievanceFemalePoliceOfficialComponent } from './admin-gfpo/admin-gfpo.component';
import { HolydayListComponent } from '../public/holyday-list/holyday-list.component';
import { ModifyStateComponent } from './state/modify-state/modify-state.component';
import { StateComponent } from './state/state.component';
import { DistrictComponent } from './district/district.component';
import { ModifyDistrictComponent } from './district/modify-district/modify-district.component';
import { ModifyRangeComponent } from './range/modify-range/modify-range.component';
import { RangeComponent } from './range/range.component';
import { SrNsrCasesTrailComponent } from './sr-nsr-cases-trail/sr-nsr-cases-trail.component';
import { AdminCidExcelComponent } from './admin-cid-excel/admin-cid-excel.component';
import { AdminCidUploadCasesComponent } from './admin-cid-upload-cases/admin-cid-upload-cases.component';
import { ViewCidUploadComponent } from './admin-cid-upload-cases/view-cid-upload/view-cid-upload.component';
import { AdminCidUploadCasesReportComponent } from './admin-cid-upload-cases-report/admin-cid-upload-cases-report.component';
import { ModifyCaseUploadComponent } from './admin-cid-upload-cases/modify-case-upload/modify-case-upload.component';
import { DistrictStatisticsReportComponent } from './admin-cid-upload-cases-report/district-statistics-report/district-statistics-report.component';
import { DeveloperTeamComponent } from '../common/public-popup/developer-team/developer-team.component';
import { DistrictStatisticsSummeryReportComponent } from './admin-cid-upload-cases-report/district-statistics-summery-report/district-statistics-summery-report.component';
const routes: Routes = [
  {
    path: '',
    component: AuthContainerComponent,
    canActivateChild: [RouteGuardService],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'verify-user',
        component: VerifyUserComponent,
      },
    ],
  },
  {
    path: '',
    component: BaseComponent,
    canActivateChild: [RouteGuardService],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'role',
        component: RoleComponent,
      },
      {
        path: 'role/view',
        component: ViewRoleComponent,
      },
      {
        path: 'role/add',
        component: ModifyRoleComponent,
      },
      {
        path: 'role/edit',
        component: ModifyRoleComponent,
      },
      {
        path: 'menu',
        component: MenuComponent,
      },
      {
        path: 'menu/add',
        component: ModifyMenuComponent,
      },
      {
        path: 'menu/edit',
        component: ModifyMenuComponent,
      },
      {
        path: 'submenu',
        component: SubmenuComponent,
      },
      {
        path: 'submenu/add',
        component: ModifySubmenuComponent,
      },
      {
        path: 'submenu/edit',
        component: ModifySubmenuComponent,
      },
      {
        path: 'permission',
        component: PermissionComponent,
      },
      {
        path: 'developerTeam',
        component: DeveloperTeamComponent,
      },
      {
        path: 'permission/add',
        component: ModifyPermissionComponent,
      },
      {
        path: 'permission/edit',
        component: ModifyPermissionComponent,
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'character',
        loadChildren: () =>
          import('./admin-character/admin-character.module').then(
            (m) => m.AdminCharacterModule
          ),
      },
      {
        path: 'links',
        component: LinksComponent,
      },
      {
        path: 'links/add',
        component: ModifyLinksComponent,
      },
      {
        path: 'links/edit',
        component: ModifyLinksComponent,
      },
      {
        path: 'banner',
        component: BannerComponent,
      },
      {
        path: 'banner/add',
        component: ModifyBannerComponent,
      },
      {
        path: 'banner/edit',
        component: ModifyBannerComponent,
      },
      {
        path: 'districtDetails',
        component: DistrictDetailsComponent,
      },
      {
        path: 'districtDetails/add',
        component: ModifyDistrictDetailsComponent,
      },
      {
        path: 'districtDetails/edit',
        component: ModifyDistrictDetailsComponent,
      },
      {
        path: 'headlines',
        component: HeadlinesComponent,
      },
      {
        path: 'headlines/add',
        component: ModifyHeadlinesComponent,
      },
      {
        path: 'headlines/edit',
        component: ModifyHeadlinesComponent,
      },
      {
        path: 'pressRelease/edit',
        component: ModifyPressReleaseComponent,
      },
      {
        path: 'pressRelease',
        component: AdminPressReleaseComponent,
      },
      {
        path: 'pressRelease/add',
        component: ModifyPressReleaseComponent,
      },
      {
        path: 'pressRelease/edit',
        component: ModifyPressReleaseComponent,
      },
      {
        path: 'newsEvent',
        component: AdminNewsEventComponent,
      },
      {
        path: 'newsEvent/add',
        component: ModifyNewsEventComponent,
      },
      {
        path: 'newsEvent/edit',
        component: ModifyNewsEventComponent,
      },
      {
        path: 'events',
        component: AdminEventsComponent,
      },
      {
        path: 'events/add',
        component: ModifyEventsComponent,
      },
      {
        path: 'events/edit',
        component: ModifyEventsComponent,
      },
      {
        path: 'imageGallery',
        component: AdminImageGalleryComponent,
      },
      {
        path: 'imageGallery/add',
        component: ModifyImageGalleryComponent,
      },
      {
        path: 'imageGallery/edit',
        component: ModifyImageGalleryComponent,
      },
      {
        path: 'videoGallery',
        component: AdminVideoGalleryComponent,
      },
      {
        path: 'videoGallery/add',
        component: ModifyVideoGalleryComponent,
      },
      {
        path: 'videoGallery/edit',
        component: ModifyVideoGalleryComponent,
      },
      {
        path: 'forms',
        component: AdminFormsComponent,
      },
      {
        path: 'forms/add',
        component: ModifyFormsComponent,
      },
      {
        path: 'forms/edit',
        component: ModifyFormsComponent,
      },
      {
        path: 'acts',
        component: AdminActsComponent,
      },
      {
        path: 'acts/add',
        component: ModifyActsComponent,
      },
      {
        path: 'acts/edit',
        component: ModifyActsComponent,
      },
      {
        path: 'rules',
        component: AdminRulesComponent,
      },
      {
        path: 'rules/add',
        component: ModifyRulesComponent,
      },
      {
        path: 'rules/edit',
        component: ModifyRulesComponent,
      },
      {
        path: 'postingList',
        component: AdminPostingListComponent,
      },
      {
        path: 'postingList/add',
        component: ModifyPostingListComponent,
      },
      {
        path: 'postingList/edit',
        component: ModifyPostingListComponent,
      },
      {
        path: 'announcement',
        component: AdminAnnouncementComponent,
      },
      {
        path: 'announcement/add',
        component: ModifyAnnouncementComponent,
      },
      {
        path: 'announcement/edit',
        component: ModifyAnnouncementComponent,
      },
      {
        path: 'criminalList',
        component: AdminCriminalListComponent,
      },
      {
        path: 'criminalList/add',
        component: ModifyCriminalListComponent,
      },
      {
        path: 'criminalList/edit',
        component: ModifyCriminalListComponent,
      },
      {
        path: 'peaceCommity',
        component: AdminPeaceCommityComponent,
      },
      {
        path: 'peaceCommity/add',
        component: ModifyPeaceCommityComponent,
      },
      {
        path: 'peaceCommity/edit',
        component: ModifyPeaceCommityComponent,
      },
      {
        path: 'holydayList',
        component: HolydayListComponent,
      },
      {
        path: 'permissionDenial',
        component: PermissionDenialComponent,
      },
      {
        path: 'underDevelopment',
        component: UnderDevelopmentComponent,
      },
      {
        path: 'helpline',
        component: HelplineComponent,
      },
      {
        path: 'helpline/add',
        component: ModifyHelplinesComponent,
      },
      {
        path: 'helpline/edit',
        component: ModifyHelplinesComponent,
      },
      {
        path: 'transferList',
        component: AdminTransferListComponent,
      },
      {
        path: 'transferList/add',
        component: ModifyTransferListComponent,
      },
      {
        path: 'transferList/edit',
        component: ModifyTransferListComponent,
      },
      {
        path: 'ourTeam',
        component: AdminOurTeamComponent,
      },
      {
        path: 'ourTeam/add',
        component: ModifyOurTeamComponent,
      },
      {
        path: 'ourTeam/edit',
        component: ModifyOurTeamComponent,
      },
      {
        path: 'mostwanted',
        loadChildren: () =>
          import('./admin-most-wanted/admin-most-wanted.module').then(
            (m) => m.AdminMostWantedModule
          ),
      },
      {
        path: 'importantAchievement',
        loadChildren: () =>
          import(
            './admin-important-achievement/admin-important-achievement.module'
          ).then((m) => m.AdminImportantAchievementModule),
      },
      {
        path: 'bestOurTeam',
        component: AdminBestOurTeamComponent,
      },
      {
        path: 'bestOurTeam/add',
        component: ModifyBestOurTeamComponent,
      },
      {
        path: 'bestOurTeam/edit',
        component: ModifyBestOurTeamComponent,
      },
      {
        path: 'successionList',
        component: AdminSuccessionListComponent,
      },
      {
        path: 'successionList/add',
        component: ModifySuccessionListComponent,
      },
      {
        path: 'successionList/edit',
        component: ModifySuccessionListComponent,
      },
      {
        path: 'options',
        component: OptionsComponent,
      },
      {
        path: 'options/add',
        component: ModifyOptionsComponent,
      },
      {
        path: 'options/edit',
        component: ModifyOptionsComponent,
      },
      {
        path: 'sections',
        component: SectionsComponent,
      },
      {
        path: 'sections/add',
        component: ModifySectionsComponent,
      },
      {
        path: 'sections/edit',
        component: ModifySectionsComponent,
      },
      {
        path: 'sections/view',
        component: ViewSectionComponent,
      },
      {
        path: 'sdpo',
        component: SdpoComponent,
      },
      {
        path: 'sdpo/add',
        component: ModifySdpoComponent,
      },
      {
        path: 'sdpo/edit',
        component: ModifySdpoComponent,
      },
      {
        path: 'sdpo/view',
        component: ViewSdpoComponent,
      },
      {
        path: 'circle',
        component: CircleInspectorComponent,
      },
      {
        path: 'circle/add',
        component: ModifyCircleInspectorComponent,
      },
      {
        path: 'circle/edit',
        component: ModifyCircleInspectorComponent,
      },
      {
        path: 'circleInspector',
        component: CircleInspectorComponent,
      },
      {
        path: 'circleInspector/add',
        component: ModifyCircleInspectorComponent,
      },
      {
        path: 'circleInspector/edit',
        component: ModifyCircleInspectorComponent,
      },
      {
        path: 'circleInspector/view',
        component: ViewCircleInspectorComponent,
      },
      {
        path: 'policeStation',
        component: AdminPoliceStationComponent,
      },
      {
        path: 'policeStation/add',
        component: ModifyPoliceStationComponent,
      },
      {
        path: 'policeStation/edit',
        component: ModifyPoliceStationComponent,
      },
      {
        path: 'policeStation/view',
        component: ViewPoliceStationComponent,
      },
      {
        path: 'systemConfig',
        component: SystemConfigComponent,
      },
      {
        path: 'systemConfig/add',
        component: ModifySystemConfigComponent,
      },
      {
        path: 'systemConfig/edit',
        component: ModifySystemConfigComponent,
      },
      {
        path: 'module/add',
        component: ModifySystemModuleComponent,
      },
      {
        path: 'module/edit',
        component: ModifySystemModuleComponent,
      },
      {
        path: 'smsSchedular',
        component: SmsSchedularComponent,
      },
      {
        path: 'passport',
        component: AdminPassportComponent,
      },
      {
        path: 'passport/view',
        component: ViewPassportComponent,
      },
      {
        path: 'citizenReport',
        component: AdminCitizenReportComponent,
      },
      {
        path: 'citizenReport/add',
        component: ModifyCitizenReportComponent,
      },
      {
        path: 'citizenReport/edit',
        component: ModifyCitizenReportComponent,
      },
      {
        path: 'citizenReport/view',
        component: ViewCitizenReportComponent,
      },
      {
        path: 'question',
        component: AdminQuestionsComponent,
      },
      {
        path: 'question/add',
        component: ModifyQuestionsComponent,
      },
      {
        path: 'question/edit',
        component: ModifyQuestionsComponent,
      },
      {
        path: 'missingPerson',
        component: AdminMissingPersonComponent,
      },
      {
        path: 'missingPerson/add',
        component: ModifyMissingPersonComponent,
      },
      {
        path: 'missingPerson/edit',
        component: ModifyMissingPersonComponent,
      },
      {
        path: 'missingPerson/view',
        component: ViewMissingPersonComponent,
      },
      {
        path: 'foundPerson',
        component: AdminFoundPersonComponent,
      },
      {
        path: 'foundPerson/add',
        component: ModifyFoundPersonComponent,
      },
      {
        path: 'foundPerson/edit',
        component: ModifyFoundPersonComponent,
      },
      {
        path: 'foundPerson/view',
        component: ViewFoundPersonComponent,
      },
      {
        path: 'deadPerson',
        component: AdminDeadPersonComponent,
      },
      {
        path: 'deadPerson/add',
        component: ModifyDeadPersonComponent,
      },
      {
        path: 'deadPerson/edit',
        component: ModifyDeadPersonComponent,
      },
      {
        path: 'deadPerson/view',
        component: ViewDeadPersonComponent,
      },
      {
        path: 'appointment',
        component: AdminAppointmentComponent,
      },
      {
        path: 'appointment/view',
        component: ViewAppointmentComponent,
      },
      {
        path: 'complaint',
        component: AdminComplaintComponent,
      },
      {
        path: 'complaint/view',
        component: ViewComplaintComponent,
      },
      {
        path: 'grievancePoliceOfficial',
        component: AdminGrievancePoliceOfficialComponent,
      },
      {
        path: 'grievancePoliceOfficial/view',
        component: ViewGrievancePoliceOfficialComponent,
      },
      {
        path: 'grievancePoliceOfficial/add',
        component: ModifyGrievancePoliceOfficialComponent,
      },
      {
        path: 'grievancePoliceOfficial/edit',
        component: ModifyGrievancePoliceOfficialComponent,
      },
      {
        path: 'grievanceFemalePoliceOfficial',
        component: AdminGrievanceFemalePoliceOfficialComponent,
      },
      {
        path: 'grievanceFemalePoliceOfficial/view',
        component: ViewGrievanceFemalePoliceOfficialComponent,
      },
      {
        path: 'grievanceFemalePoliceOfficial/add',
        component: ModifyGrievanceFemalePoliceOfficialComponent,
      },
      {
        path: 'grievanceFemalePoliceOfficial/edit',
        component: ModifyGrievanceFemalePoliceOfficialComponent,
      },
      {
        path: 'importantPlaces',
        component: AdminLocationsComponent,
      },
      {
        path: 'importantPlaces/add',
        component: ModifyLocationsComponent,
      },
      {
        path: 'importantPlaces/edit',
        component: ModifyLocationsComponent,
      },
      {
        path: 'designations',
        component: AdminDesignationComponent,
      },
      {
        path: 'designations/add',
        component: ModifyDesignationComponent,
      },
      {
        path: 'designations/edit',
        component: ModifyDesignationComponent,
      },
      {
        path: 'resources',
        component: AdminResourceComponent,
      },
      {
        path: 'resources/add',
        component: ModifyResourceComponent,
      },
      {
        path: 'resources/edit',
        component: ModifyResourceComponent,
      },
      {
        path: 'aboutDSP',
        component: AdminAboutDspComponent,
      },
      {
        path: 'aboutDSP/add',
        component: ModifyAboutDspComponent,
      },
      {
        path: 'aboutDSP/edit',
        component: ModifyAboutDspComponent,
      },
      {
        path: 'aboutDSP/view',
        component: ViewDspComponent,
      },
      {
        path: 'subdivision',
        component: AdminSubdivisionComponent,
      },
      {
        path: 'subdivision/add',
        component: ModifySubdivisionComponent,
      },
      {
        path: 'subdivision/edit',
        component: ModifySubdivisionComponent,
      },
      {
        path: 'subdivision/view',
        component: ViewSubdivisionComponent,
      },
      {
        path: 'leaveApplication',
        component: AdminLeaveApplicationComponent,
      },
      {
        path: 'leaveApplication/view',
        component: ViewLeaveApplicationComponent,
      },
      {
        path: 'holiday',
        component: AdminHolidayComponent,
      },
      {
        path: 'holiday/add',
        component: ModifyHolidayComponent,
      },
      {
        path: 'holiday/edit',
        component: ModifyHolidayComponent,
      },
      {
        path: 'leaveType',
        component: AdminLeaveTypeComponent,
      },
      {
        path: 'leaveType/add',
        component: ModifyLeaveTypeComponent,
      },
      {
        path: 'leaveType/edit',
        component: ModifyLeaveTypeComponent,
      },
      {
        path: 'feedback',
        component: AdminFeedbackComponent,
      },
      {
        path: 'feedback/view',
        component: ViewFeedbackComponent,
      },
      {
        path: 'questions',
        component: AdminQuestionsComponent,
      },
      {
        path: 'questions/add',
        component: ModifyQuestionsComponent,
      },
      {
        path: 'questions/edit',
        component: ModifyQuestionsComponent,
      },
      {
        path: 'visitorRegister',
        component: AdminVisitorRegisterComponent,
      },
      {
        path: 'visitorRegister/view',
        component: ViewVisitorRegisterComponent,
      },
      {
        path: 'procecution',
        redirectTo: 'procecution/summon',
        pathMatch: 'full',
      },
      {
        path: 'procecution/summon',
        component: SummonComponent,
      },
      {
        path: 'procecution/attachment',
        component: AttachmentComponent,
      },
      {
        path: 'procecution/proclaim',
        component: ProclaimComponent,
      },
      {
        path: 'procecution/warrent',
        component: WarrentComponent,
      },
      {
        path: 'procecution/add',
        component: ModifyProcecutionComponent,
      },
      {
        path: 'procecution/edit',
        component: ModifyProcecutionComponent,
      },
      {
        path: 'procecution/view',
        component: ViewProcecutionComponent,
      },
      {
        path: 'procecutionDetails/add',
        component: AdminProcecutionDetailsComponent,
      },
      {
        path: 'procecutionDetails/edit',
        component: AdminProcecutionDetailsComponent,
      },
      {
        path: 'rti',
        component: AdminRtiComponent,
      },
      {
        path: 'rti/add',
        component: ModifyRtiComponent,
      },
      {
        path: 'rti/edit',
        component: ModifyRtiComponent,
      },
      {
        path: 'rti/view',
        component: ViewRtiComponent,
      },
      {
        path: 'grSection/summon',
        component: GrSummonComponent,
      },
      {
        path: 'grSection/warrent',
        component: GrWarrentComponent,
      },
      {
        path: 'grSection/proclaim',
        component: GrProclaimComponent,
      },
      {
        path: 'grSection/attachment',
        component: GrAttachmentComponent,
      },
      {
        path: 'grSection/add',
        component: ModifyGrSectionComponent,
      },
      {
        path: 'grSection/edit',
        component: ModifyGrSectionComponent,
      },
      {
        path: 'grSection/view',
        component: ViewGrSectionComponent,
      },
      {
        path: 'grSectionDetails/add',
        component: AdminGrSectionDetailsComponent,
      },
      {
        path: 'grSectionDetails/edit',
        component: AdminGrSectionDetailsComponent,
      },
      {
        path: 'crimeType',
        component: AdminCrimeTypeComponent,
      },
      {
        path: 'crimeReport',
        component: AdminCrimeReportComponent,
      },
      {
        path: 'SHRC',
        component: AdminCommissionShrcComponent,
      },
      {
        path: 'SHRC/view',
        component: ViewShrcComponent,
      },
      {
        path: 'SHRC/add',
        component: ModifyShrcComponent,
      },
      {
        path: 'SHRC/edit',
        component: ModifyShrcComponent,
      },
      {
        path: 'SWRC',
        component: AdminCommissionSwrcComponent,
      },
      {
        path: 'SWRC/view',
        component: ViewSwrcComponent,
      },
      {
        path: 'SWRC/add',
        component: ModifySwrcComponent,
      },
      {
        path: 'SWRC/edit',
        component: ModifySwrcComponent,
      },
      {
        path: 'NWRC',
        component: AdminCommissionNwrcComponent,
      },
      {
        path: 'NWRC/view',
        component: ViewNwrcComponent,
      },
      {
        path: 'NWRC/add',
        component: ModifyNwrcComponent,
      },
      {
        path: 'NWRC/edit',
        component: ModifyNwrcComponent,
      },
      {
        path: 'NCOBC',
        component: AdminCommissionNcobcComponent,
      },
      {
        path: 'NCOBC/view',
        component: ViewNcobcComponent,
      },
      {
        path: 'NCOBC/add',
        component: ModifyNcobcComponent,
      },
      {
        path: 'NCOBC/edit',
        component: ModifyNcobcComponent,
      },
      {
        path: 'NHRC',
        component: AdminCommissionNHRCComponent,
      },
      {
        path: 'NHRC/view',
        component: ViewNHRCComponent,
      },
      {
        path: 'NHRC/add',
        component: ModifyNHRCComponent,
      },
      {
        path: 'NHRC/edit',
        component: ModifyNHRCComponent,
      },
      {
        path: 'NSCST',
        component: AdminCommissionNscstComponent,
      },
      {
        path: 'NSCST/view',
        component: ViewNscstComponent,
      },
      {
        path: 'NSCST/add',
        component: ModifyNscstComponent,
      },
      {
        path: 'NSCST/edit',
        component: ModifyNscstComponent,
      },
      {
        path: 'NCPCR',
        component: AdminCommissionNcpcrComponent,
      },
      {
        path: 'NCPCR/view',
        component: ViewNcpcrComponent,
      },
      {
        path: 'NCPCR/add',
        component: ModifyNcpcrComponent,
      },
      {
        path: 'NCPCR/edit',
        component: ModifyNscstComponent,
      },
      {
        path: 'BHRC',
        component: AdminCommissionBhrcComponent,
      },
      {
        path: 'BHRC/view',
        component: ViewBhrcComponent,
      },
      {
        path: 'BHRC/add',
        component: ModifyBhrcComponent,
      },
      {
        path: 'BHRC/edit',
        component: ModifyNscstComponent,
      },
      {
        path: 'supremeCourt',
        component: AdminCourtSupremeComponent,
      },
      {
        path: 'supremeCourt/add',
        component: ModifyCourtSupremeComponent,
      },
      {
        path: 'supremeCourt/edit',
        component: ModifyCourtSupremeComponent,
      },
      {
        path: 'supremeCourt/view',
        component: ViewCourtSupremeComponent,
      },
      {
        path: 'highCourt',
        component: AdminCourtHighComponent,
      },
      {
        path: 'highCourt/add',
        component: ModifyCourtHighComponent,
      },
      {
        path: 'highCourt/edit',
        component: ModifyCourtHighComponent,
      },
      {
        path: 'highCourt/view',
        component: ViewCourtHighComponent,
      },
      {
        path: 'lowerCourt',
        component: AdminCourtLowerComponent,
      },
      {
        path: 'lowerCourt/add',
        component: ModifyCourtLowerComponent,
      },
      {
        path: 'lowerCourt/edit',
        component: ModifyCourtLowerComponent,
      },
      {
        path: 'lowerCourt/view',
        component: ViewCourtLowerComponent,
      },
      {
        path: 'courtDetails/add',
        component: CourtDetailsFormComponent,
      },
      {
        path: 'courtDetails/edit',
        component: CourtDetailsFormComponent,
      },
      {
        path: 'ecommunicationReceipt',
        component: AdminEcommReceiptComponent,
      },
      {
        path: 'ecommunicationReceipt/add',
        component: ModifyEcommReceiptComponent,
      },
      {
        path: 'ecommunicationReceipt/edit',
        component: ModifyEcommReceiptComponent,
      },
      {
        path: 'ecommunicationReceipt/view',
        component: ViewEcommReceiptComponent,
      },
      {
        path: 'ecommunicationDispatch',
        component: AdminEcommDispatchComponent,
      },
      {
        path: 'ecommunicationDispatch/add',
        component: ModifyEcommDispatchComponent,
      },
      {
        path: 'ecommunicationDispatch/edit',
        component: ModifyEcommDispatchComponent,
      },
      {
        path: 'ecommunicationDispatch/view',
        component: ViewEcommDispatchComponent,
      },
      {
        path: 'notification',
        component: NotificationComponent,
      },
      {
        path: 'notificationList',
        component: NotificationListsComponent,
      },
      {
        path: 'notificationList/add',
        component: NotificationListModifyComponent,
      },
      {
        path: 'notificationList/edit',
        component: NotificationListModifyComponent,
      },
      {
        path: 'notificationList/view',
        component: NotificationListViewComponent,
      },
      {
        path: 'notificationUser/add',
        component: NotificationListViewComponent,
      },
      {
        path: 'notificationUser/edit',
        component: NotificationUserListComponent,
      },
      {
        path: 'notificationHistory',
        component: NotificationHistoryComponent,
      },
      {
        path: 'assetStock',
        component: AssetStockComponent,
      },
      {
        path: 'assetSuppliers',
        component: AdminAssetSupliersComponent,
      },
      {
        path: 'assetSuppliers/add',
        component: AdminAssetSupplierComponent,
      },
      {
        path: 'assetSuppliers/edit',
        component: AdminAssetSupplierComponent,
      },
      {
        path: 'assetSuppliers/view',
        component: AdminAssetSupplierViewComponent,
      },
      {
        path: 'products',
        component: AdminAssetProductComponent,
      },
      {
        path: 'products/add',
        component: AdminAssetProductsComponent,
      },
      {
        path: 'products/edit',
        component: AdminAssetProductsComponent,
      },
      {
        path: 'products/view',
        component: AdminAssetProductsViewComponent,
      },
      {
        path: 'assetType',
        component: AdminAssetTypesComponent,
      },
      {
        path: 'assetType/add',
        component: ModifyAssetTypeComponent,
      },
      {
        path: 'assetType/edit',
        component: ModifyAssetTypeComponent,
      },
      {
        path: 'assetType/view',
        component: ViewAdminAssetTypesComponent,
      },
      {
        path: 'assetDetails',
        component: AdminAssetDetailsComponent,
      },
      {
        path: 'allocation/add',
        component: ModifyAssetDetailsComponent,
      },
      {
        path: 'allocation/edit',
        component: ModifyAssetDetailsComponent,
      },
      {
        path: 'allocation/view',
        component: ViewStocksComponent,
      },
      {
        path: 'smsServiceProvider',
        component: SmsServiceProviderComponent,
      },
      {
        path: 'smsServiceProvider/add',
        component: ModifySmsServiceProviderComponent,
      },
      {
        path: 'smsServiceProvider/edit',
        component: ModifySmsServiceProviderComponent,
      },
      {
        path: 'smsTemplate',
        component: SmsTemplateComponent,
      },
      {
        path: 'smsTemplate/add',
        component: ModifySmsTemplateComponent,
      },
      {
        path: 'smsTemplate/edit',
        component: ModifySmsTemplateComponent,
      },
      {
        path: 'smsModule',
        component: SmsModuleComponent,
      },
      {
        path: 'smsModule/add',
        component: ModifySmsModuleComponent,
      },
      {
        path: 'smsModule/edit',
        component: ModifySmsModuleComponent,
      },
      {
        path: 'transfer',
        component: ResourceTrasnferComponent,
      },
      {
        path: 'transfer/add',
        component: ModifyResourceTransferComponent,
      },
      {
        path: 'transfer/view',
        component: ViewResourceTransferComponent,
      },
      {
        path: 'replyComplaint',
        component: ReplyComplaintComponent,
      },
      {
        path: 'replyComplaint/edit',
        component: ModifyReplyComplaintComponent,
      },
      {
        path: 'policeDiary',
        loadChildren: () =>
          import('./police-diary/police-diary.module').then(
            (m) => m.PoliceDiaryModule
          ),
      },
      {
        path: 'sr_nsr',
        loadChildren: () =>
          import('./sr-nsr/sr-nsr.module').then((m) => m.SrNsrModule),
      },
      {
        path: 'officers',
        loadChildren: () =>
          import('./admin-police-officer/admin-police-officer.module').then(
            (m) => m.AdminPoliceOfficerModule
          ),
      },
      {
        path: 'srsNsrsCases',
        loadChildren: () =>
          import('./sr-nsr-cases/sr-nsr-cases.module').then(
            (m) => m.SrNsrCasesModule
          ),
      },
      // {
      //   path: 'trail',
      //   loadChildren: () =>
      //     import('./sr-nsr-cases/sr-nsr-cases.module').then(
      //       (m) => m.SrNsrCasesModule
      //     ),
      // },

      {
        path: 'state',
        component: StateComponent,
      },
      {
        path: 'state/add',
        component: ModifyStateComponent,
      },
      {
        path: 'state/edit',
        component: ModifyStateComponent,
      },
      // {
      //   path: 'state/view',
      //   component: ViewStateComponent,
      // },

      {
        path: 'district',
        component: DistrictComponent,
      },
      {
        path: 'district/add',
        component: ModifyDistrictComponent
      },
      {
        path: 'district/edit',
        component: ModifyDistrictComponent
      },
      // {
      //   path: 'district/view',
      //   component: ViewDistrictComponent,
      // },
      {
        path: 'range',
        component: RangeComponent,
      },
      {
        path: 'range/add',
        component: ModifyRangeComponent
      },
      {
        path: 'range/edit',
        component: ModifyRangeComponent
      },
      {
        path: 'trail',
        component: SrNsrCasesTrailComponent,
      },
      {
        path: 'caseUpload',
        component: AdminCidUploadCasesComponent,
        // component: AdminCidExcelComponent,
      },
      {
        path: 'caseUpload/view',
        component: ViewCidUploadComponent,
      },
      {
        path: 'caseUpload/add',
        component: ModifyCaseUploadComponent,
      },
      {
        path: 'caseUpload/edit',
        component: ModifyCaseUploadComponent,
      },
      {
        path: 'caseUploadReport',
        component: AdminCidUploadCasesReportComponent,
      },
      {
        path: 'districtAllReport',
        component: DistrictStatisticsReportComponent,
      },
      {
        path: 'districtSummeryReport',
        component: DistrictStatisticsSummeryReportComponent,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
