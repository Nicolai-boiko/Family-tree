import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { TreeComponent } from './pages/tree/tree.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RestorePasswordPageComponent } from './pages/restore-password-page/restore-password-page.component';
import { AuthGuard } from './guards/auth.guard';
import { notAuthGuard } from './guards/notAuth.guard';
import { ExitEditPageGuard } from './guards/exit-edit-page.guard';
import { RoutesEnum } from './constants/Enums/common.enums';
import { EditUserPageComponent } from './pages/edit-user-page/edit-user-page.component';

const routes: Routes = [
  { path: '', redirectTo: `/${RoutesEnum.HOME}`, pathMatch: 'full' },
  { path: RoutesEnum.HOME, component: HomePageComponent },
  { path: RoutesEnum.TREE, component: TreeComponent, canActivate: [AuthGuard] },
  { path: RoutesEnum.LOG_IN, component: LoginPageComponent, canActivate: [notAuthGuard] },
  { path: RoutesEnum.EDIT_USER, component: EditUserPageComponent, canActivate: [AuthGuard], canDeactivate: [ExitEditPageGuard] },
  { path: RoutesEnum.REGISTRATION, component: LoginPageComponent, canActivate: [notAuthGuard] },
  { path: RoutesEnum.RESTORE_PASSWORD, component: RestorePasswordPageComponent, canActivate: [notAuthGuard] },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
