import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { TreeComponent } from './pages/tree/tree.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RestorePasswordPageComponent } from './pages/restore-password-page/restore-password-page.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInUsersGuard } from './guards/logged-in-users.guard';

export enum RoutesEnum {
  LOG_IN = 'log-in',
  REGISTRATION = 'registration',
  RESTORE_PASSWORD = 'restore-password',
  TREE = 'tree',
}

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: RoutesEnum.TREE, component: TreeComponent, canActivate: [AuthGuard] },
  { path: RoutesEnum.LOG_IN, component: LoginPageComponent, canActivate: [LoggedInUsersGuard] },
  { path: RoutesEnum.REGISTRATION, component: LoginPageComponent, canActivate: [LoggedInUsersGuard] },
  { path: RoutesEnum.RESTORE_PASSWORD, component: RestorePasswordPageComponent, canActivate: [LoggedInUsersGuard] },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
