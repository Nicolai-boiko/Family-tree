import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { TreeComponent } from './pages/tree/tree.component';
import { LogComponent } from './pages/log/log.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'tree', component: TreeComponent },
  { path: 'log', component: LogComponent },
  { path: '**', component:  ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
