import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageModule } from './home-page/home-page.module';
import { ErrorPageModule } from './error-page/error-page.module';
import { LoginPageModule } from './login-page/login-page.module';
import { RestorePasswordPageModule } from './restore-password-page/restore-password-page.module';
import { TreeModule } from './tree/tree.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomePageModule,
    ErrorPageModule,
    LoginPageModule,
    RestorePasswordPageModule,
  ],
  exports: [
    HomePageModule,
    ErrorPageModule,
    LoginPageModule,
    RestorePasswordPageModule,
    TreeModule,
  ]
})
export class PagesModule { }
