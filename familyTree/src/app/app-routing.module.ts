import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { TreeComponent } from './pages/tree/tree.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RestorePasswordPageComponent } from './pages/restore-password-page/restore-password-page.component';
import { AuthGuard } from './guards/auth.guard';
import { IsLoggedOutGuard } from './guards/is-logged-out.guard';

export enum RoutesEnum {
  LOG_IN = 'log-in',
  REGISTRATION = 'registration',
  RESTORE_PASSWORD = 'restore-password',
  TREE = 'tree',
}

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: RoutesEnum.TREE, component: TreeComponent, canActivate: [AuthGuard] },
  {
    path: RoutesEnum.LOG_IN,
    component: LoginPageComponent,
    canActivate: [IsLoggedOutGuard],
  },
  {
    path: RoutesEnum.REGISTRATION,
    component: LoginPageComponent,
    canActivate: [IsLoggedOutGuard],
  },
  {
    path: RoutesEnum.RESTORE_PASSWORD,
    component: RestorePasswordPageComponent,
    canActivate: [IsLoggedOutGuard],
  },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
