import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from './layout/layout.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToastrModule } from 'ngx-toastr';
import { TOASTR_CONFIG } from './constants/common.settings';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from './store/reducers/app.reducer';
import { getInitialState } from './store/state/app.state';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(appReducer, { initialState: getInitialState() }),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    LayoutModule,
    MatSidenavModule,
    ComponentsModule,
    PagesModule,
    ToastrModule.forRoot(TOASTR_CONFIG),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
