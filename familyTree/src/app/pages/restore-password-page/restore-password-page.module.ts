import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestorePasswordPageComponent } from './restore-password-page.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [RestorePasswordPageComponent],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    AppRoutingModule,
  ],
})
export class RestorePasswordPageModule {}
