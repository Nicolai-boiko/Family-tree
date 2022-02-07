import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { TreeComponent } from './pages/tree/tree.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RestorePasswordPageComponent } from './pages/restore-password-page/restore-password-page.component';
import { RoutesEnum } from './constants/Enums/common.enums';
import { EditUserPageComponent } from './pages/edit-user-page/edit-user-page.component';
import { canActivate } from '@angular/fire/compat/auth-guard';
import { redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([RoutesEnum.LOG_IN]);
const redirectLoggedInToHomePage = () => redirectLoggedInTo([RoutesEnum.HOME]);

const routes: Routes = [
  { path: '', redirectTo: `/${RoutesEnum.HOME}`, pathMatch: 'full' },
  { path: RoutesEnum.HOME, component: HomePageComponent },
  { path: RoutesEnum.TREE, component: TreeComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: RoutesEnum.EDIT_USER, component: EditUserPageComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: RoutesEnum.LOG_IN, component: LoginPageComponent, ...canActivate(redirectLoggedInToHomePage) },
  { path: RoutesEnum.REGISTRATION, component: LoginPageComponent, ...canActivate(redirectLoggedInToHomePage) },
  { path: RoutesEnum.RESTORE_PASSWORD, component: RestorePasswordPageComponent, ...canActivate(redirectLoggedInToHomePage) },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
