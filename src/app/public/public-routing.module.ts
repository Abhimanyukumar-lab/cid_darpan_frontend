import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicBaseComponent } from 'src/app/fragment/public-base/public-base.component';
import { environment } from 'src/environments/environment';
import { RouteGuardService } from '../services/route-guard.service';

const routes: Routes = [
  {
    path: '',
    component: PublicBaseComponent,
    canActivateChild: [RouteGuardService],
    children: [
      { path: '', redirectTo: '/official/login', pathMatch: 'full' },
      {
        path: '/official/login',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
        data: { title: 'Home' },
      },
      // {
      //   path: 'home',
      //   loadChildren: () =>
      //     import('./home/home.module').then((m) => m.HomeModule),
      //   data: { title: 'Home' },
      // },
      // {
      //   path: 'contact',
      //   loadChildren: () =>
      //     import('./contact/contact.module').then((m) => m.ContactModule),
      //   data: { title: 'Contact Us' },
      // },
      // {
      //   path: 'aboutUs',
      //   loadChildren: () =>
      //     import('./about-us/about-us.module').then((m) => m.AboutUsModule),
      //   data: { title: 'About Us' },
      // },
      // {
      //   path: 'messageFromSp',
      //   loadChildren: () =>
      //     import('./message-from-sp/message-from-sp.module').then(
      //       (m) => m.MessageFromSpModule
      //     ),
      //   data: { title: 'Message From ' + environment.IS_MAIN_DESIG },
      // },
      // {
      //   path: 'successionList',
      //   loadChildren: () =>
      //     import('./succession-list/succession-list.module').then(
      //       (m) => m.SuccessionListModule
      //     ),
      //   data: { title: 'Succession List' },
      // },
      // {
      //   path: 'appointment',
      //   loadChildren: () =>
      //     import('./appointment/appointment.module').then(
      //       (m) => m.AppointmentModule
      //     ),
      //   data: { title: 'Appointment with ' + environment.IS_MAIN_DESIG },
      // },
      // {
      //   path: 'citizenReport',
      //   loadChildren: () =>
      //     import('./citizen-report/citizen-report.module').then(
      //       (m) => m.CitizenReportModule
      //     ),
      //   data: { title: 'Citizen Report' },
      // },
      // {
      //   path: 'complaint',
      //   loadChildren: () =>
      //     import('./complaint/complaint.module').then((m) => m.ComplaintModule),
      //   data: { title: 'Complaint' },
      // },
      // {
      //   path: 'gpo-complaint',
      //   loadChildren: () =>
      //     import('./gpo-complaint/gpo-complaint.module').then(
      //       (m) => m.GpoComplaintModule
      //     ),
      //   data: { title: 'Grievance Police Official' },
      // },
      // {
      //   path: 'gfpo-complaint',
      //   loadChildren: () =>
      //     import('./gfpo-complaint/gfpo-complaint.module').then(
      //       (m) => m.GfpoComplaintModule
      //     ),
      //   data: { title: 'Grievance Female Police Official' },
      // },
      // {
      //   path: 'passport',
      //   loadChildren: () =>
      //     import('./passport/passport.module').then((m) => m.PassportModule),
      //   data: { title: 'Passport' },
      // },
      // {
      //   path: 'ourTeam',
      //   loadChildren: () =>
      //     import('./our-team/our-team.module').then((m) => m.OurTeamModule),
      //   data: { title: 'Our Team' },
      // },
      // {
      //   path: 'character',
      //   loadChildren: () =>
      //     import('./charatcer/charatcer.module').then((m) => m.CharatcerModule),
      //   data: { title: 'Character' },
      // },
      // {
      //   path: 'characterDownload',
      //   loadChildren: () =>
      //     import('./character-download/character-download.module').then(
      //       (m) => m.CharacterDownloadModule
      //     ),
      //   data: { title: 'Character Download' },
      // },
      // {
      //   path: 'policeStation',
      //   loadChildren: () =>
      //     import('./police-station/police-station.module').then(
      //       (m) => m.PoliceStationModule
      //     ),
      //   data: { title: 'Police Stations' },
      // },
      // {
      //   path: 'policeStationDetails',
      //   loadChildren: () =>
      //     import('./police-station-details/police-station-details.module').then(
      //       (m) => m.PoliceStationDetailsModule
      //     ),
      //   data: { title: 'Police Station Details' },
      // },
      // {
      //   path: 'lostFound',
      //   loadChildren: () =>
      //     import('./lost-found/lost-found.module').then(
      //       (m) => m.LostFoundModule
      //     ),
      //   data: { title: 'Lost Found' },
      // },
      // {
      //   path: 'missingPerson',
      //   loadChildren: () =>
      //     import('./missing-person/missing-person.module').then(
      //       (m) => m.MissingPersonModule
      //     ),
      //   data: { title: 'Missing Persons' },
      // },
      // {
      //   path: 'deadPerson',
      //   loadChildren: () =>
      //     import('./dead-person/dead-person.module').then(
      //       (m) => m.DeadPersonModule
      //     ),
      //   data: { title: 'Dead Persons' },
      // },
      // {
      //   path: 'foundPerson',
      //   loadChildren: () =>
      //     import('./found-person/found-person.module').then(
      //       (m) => m.FoundPersonModule
      //     ),
      //   data: { title: 'Found Persons' },
      // },
      // {
      //   path: 'feedback',
      //   loadChildren: () =>
      //     import('./feedback/feedback.module').then((m) => m.FeedbackModule),
      //   data: { title: 'Feedback' },
      // },
      // {
      //   path: 'helpLine',
      //   loadChildren: () =>
      //     import('./help-line/help-line.module').then((m) => m.HelpLineModule),
      //   data: { title: 'Helpline' },
      // },
      // {
      //   path: 'postingList',
      //   loadChildren: () =>
      //     import('./posting-list/posting-list.module').then(
      //       (m) => m.PostingListModule
      //     ),
      //   data: { title: 'Posting List' },
      // },
      // {
      //   path: 'transferList',
      //   loadChildren: () =>
      //     import('./transfer-list/transfer-list.module').then(
      //       (m) => m.TransferListModule
      //     ),
      //   data: { title: 'Transfer List' },
      // },
      // {
      //   path: 'announcement',
      //   loadChildren: () =>
      //     import('./announcement/announcement.module').then(
      //       (m) => m.AnnouncementModule
      //     ),
      //   data: { title: 'Announcements' },
      // },
      // {
      //   path: 'criminalList',
      //   loadChildren: () =>
      //     import('./criminal-list/criminal-list.module').then(
      //       (m) => m.CriminalListModule
      //     ),
      //   data: { title: 'Criminal List' },
      // },
      // {
      //   path: 'peaceCommity',
      //   loadChildren: () =>
      //     import('./peace-committee/peace-committee.module').then(
      //       (m) => m.PeaceCommitteeModule
      //     ),
      //   data: { title: 'Peace Commity' },
      // },
      // {
      //   path: 'holydayList',
      //   loadChildren: () =>
      //     import('./holyday-list/holyday-list.module').then((m) => m.HolydayListModule),
      //   data: { title: 'Holyday List' },
      // },
      // {
      //   path: 'forms',
      //   loadChildren: () =>
      //     import('./forms/forms.module').then((m) => m.FormsModule),
      //   data: { title: 'Forms' },
      // },
      // {
      //   path: 'acts',
      //   loadChildren: () =>
      //     import('./acts/acts.module').then((m) => m.ActsModule),
      //   data: { title: 'Acts' },
      // },
      // {
      //   path: 'rules',
      //   loadChildren: () =>
      //     import('./rules/rules.module').then((m) => m.RulesModule),
      //   data: { title: 'Rules' },
      // },
      // {
      //   path: 'newsEvent',
      //   loadChildren: () =>
      //     import('./news-events/news-events.module').then(
      //       (m) => m.NewsEventsModule
      //     ),
      //   data: { title: 'News Event' },
      // },
      // {
      //   path: 'photoGallery',
      //   loadChildren: () =>
      //     import('./photo-gallery/photo-gallery.module').then(
      //       (m) => m.PhotoGalleryModule
      //     ),
      //   data: { title: 'Photo Gallery' },
      // },
      // {
      //   path: 'pressRelease',
      //   loadChildren: () =>
      //     import('./press-release/press-release.module').then(
      //       (m) => m.PressReleaseModule
      //     ),
      //   data: { title: 'Press Release' },
      // },
      // {
      //   path: 'videoGallery',
      //   loadChildren: () =>
      //     import('./video-garrely/video-garrely.module').then(
      //       (m) => m.VideoGarrelyModule
      //     ),
      //   data: { title: 'Video Gallery' },
      // },
      // {
      //   path: 'importantPlaces',
      //   loadChildren: () =>
      //     import('./important-places/important-places.module').then(
      //       (m) => m.ImportantPlacesModule
      //     ),
      //   data: { title: 'Important places' },
      // },
      // {
      //   path: 'newsEventDetails',
      //   loadChildren: () =>
      //     import('./news-event-details/news-event-details.module').then(
      //       (m) => m.NewsEventDetailsModule
      //     ),
      // },
      // {
      //   path: 'pressReleaseDetails',
      //   loadChildren: () =>
      //     import('./press-release-details/press-release-details.module').then(
      //       (m) => m.PressReleaseDetailsModule
      //     ),
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
