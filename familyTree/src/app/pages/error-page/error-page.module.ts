import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './error-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule, 
    AppRoutingModule,
  ],
})
export class ErrorPageModule {}
