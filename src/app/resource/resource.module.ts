import { NgModule } from '@angular/core';

import { ResourceRoutingModule } from './resource-routing.module';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardComponent as DashboardComponentPage } from './pages/dashboard/dashboard.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './fragments/header/header.component';
import { ApplyLeaveComponent } from './pages/apply-leave/apply-leave.component';
import { HistoryComponent } from './pages/history/history.component';
import { HolidaysComponent } from './pages/holidays/holidays.component';
import { ImageViewerComponent } from './fragments/image-viewer/image-viewer.component';
import { TranslateModule } from '@ngx-translate/core';
import { SafePipe } from './fragments/safe.pipe';
import { SidebarComponent } from './fragments/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableResourceDataComponent } from '../common/resource-table-data/table-resource-data.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    AuthComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    ApplyLeaveComponent,
    HistoryComponent,
    HolidaysComponent,
    ImageViewerComponent,
    SafePipe,
    TableResourceDataComponent,
    DashboardComponentPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ResourceRoutingModule,
    InlineSVGModule,
    TranslateModule,
    NgbModule,
    NgbDatepickerModule,
    NgxDatatableModule,
  ],
})
export class ResourceModule {}
