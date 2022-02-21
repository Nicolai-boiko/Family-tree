import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserPageComponent } from './edit-user-page.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [EditUserPageComponent],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    AppRoutingModule,
  ],
  exports: [EditUserPageComponent],
})
export class EditUserPageModule {}