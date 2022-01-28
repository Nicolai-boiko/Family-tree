import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavListComponent } from './sidenav-list.component';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
  declarations: [SidenavListComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    AppRoutingModule,
  ],
  exports: [SidenavListComponent],
})
export class SidenavListModule {}
