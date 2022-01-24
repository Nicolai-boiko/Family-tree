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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomePageModule,
    HeaderModule,
    FooterModule,
    ErrorPageModule,
    LoginPageModule,
    RestorePasswordPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
