import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { SidenavListModule } from './sidenav-list/sidenav-list.module';
import { LoaderModule } from './loader/loader.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    SidenavListModule,
    LoaderModule,
  ], exports: [
    HeaderModule,
    FooterModule,
    SidenavListModule,
    LoaderModule,
  ]
})
export class ComponentsModule { }
