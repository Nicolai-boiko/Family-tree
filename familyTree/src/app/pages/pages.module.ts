import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageModule } from './home-page/home-page.module';
import { ErrorPageModule } from './error-page/error-page.module';
import { LoginPageModule } from './login-page/login-page.module';
import { RestorePasswordPageModule } from './restore-password-page/restore-password-page.module';
import { TreeModule } from './tree/tree.module';
import { EditUserPageModule } from './edit-user-page/edit-user-page.module';

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
    EditUserPageModule,
  ]
})
export class PagesModule { }
