import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomePageModule } from './pages/home-page/home-page.module';
import { HeaderModule } from './components/header/header.module';
import { FooterModule } from './components/footer/footer.module';
import { ErrorPageModule } from './pages/error-page/error-page.module';
import { LoginPageModule } from './pages/login-page/login-page.module';
import { RestorePasswordPageModule } from './pages/restore-password-page/restore-password-page.module';
import { LayoutModule } from './layout/layout.module';
import { SidenavListModule } from './components/sidenav-list/sidenav-list.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoaderModule } from './components/loader/loader.module';
import { ToastrModule } from 'ngx-toastr';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from './store/reducers/app.reducer';
import { getInitialState } from './store/state/app.state';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(appReducer, { initialState: getInitialState() }),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    HomePageModule,
    HeaderModule,
    FooterModule,
    ErrorPageModule,
    LoginPageModule,
    RestorePasswordPageModule,
    LayoutModule,
    MatSidenavModule,
    SidenavListModule,
    LoaderModule,
    ToastrModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
