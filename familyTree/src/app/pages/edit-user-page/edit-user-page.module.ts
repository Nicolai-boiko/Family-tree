import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserPageComponent } from './edit-user-page.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
    AngularFireStorageModule,
    MatProgressBarModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [EditUserPageComponent],
})
export class EditUserPageModule { }
