import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree.component';
import { TreeUserModule } from './tree-user/tree-user.module';

@NgModule({
  declarations: [TreeComponent],
  imports: [
    CommonModule,
    TreeUserModule,
  ],
  exports: [TreeComponent]
})
export class TreeModule { }
