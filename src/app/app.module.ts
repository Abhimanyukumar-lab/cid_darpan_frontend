import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';

//Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbModule,
  NgbDateParserFormatter,
  NgbDateAdapter,
} from '@ng-bootstrap/ng-bootstrap';
import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  StoreModule,
} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ErrorComponent } from './common/error/error.component';

//Scroll Back Package
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MomentDateFormatterService } from './services/moment-date-formatter.service';
import { AuthReducer } from './storage/reducer/auth.reducer';
import { AppReducer } from './storage/reducer/app.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { LangModule } from './models/LangModule';
import { HttpconfigService } from './services/httpconfig.service';
import { DateAdapterService } from './services/date-adapter.service';
import { AuthResourceReducer } from './storage/reducer/auth-resource.reducer';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FloatingIconsComponent } from './fragment/floating-icons/floating-icons.component';
import { PublicModelComponent } from './fragment/public-model/public-model.component';
import { DeveloperTeamComponent } from './common/public-popup/developer-team/developer-team.component';

declarations: [
  // Other components
  FloatingIconsComponent,
]


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: true,
};

const reducers: ActionReducerMap<any> = {
  auth: AuthReducer,
  app: AppReducer,
  resouce: AuthResourceReducer,
};

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [
      {
        auth: {
          encrypt: (state) => btoa(unescape(encodeURIComponent(state))),
          decrypt: (state) => atob(state),
        },
      },
      {
        resouce: {
          encrypt: (state) => btoa(unescape(encodeURIComponent(state))),
          decrypt: (state) => atob(state),
        },
      },
      {
        app: {
          encrypt: (state) => btoa(unescape(encodeURIComponent(state))),
          decrypt: (state) => atob(state),
        },
      },
    ],
    rehydrate: true,
  })(reducer);
}

export function localNgStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['auth', 'app', 'resouce'],
    rehydrate: true,
  })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localNgStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    PageNotFoundComponent,
    PrivacyPolicyComponent,
    FloatingIconsComponent,
    PublicModelComponent,
    DeveloperTeamComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    PerfectScrollbarModule,
    MatSlideToggleModule,
    NgIdleKeepaliveModule.forRoot(),
    TranslateModule.forRoot({}),
    NgxWebstorageModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpconfigService,
      multi: true,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: NgbDateParserFormatter,
      useValue: new MomentDateFormatterService(),
    },
    LangModule,
    { provide: NgbDateAdapter, useClass: DateAdapterService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
