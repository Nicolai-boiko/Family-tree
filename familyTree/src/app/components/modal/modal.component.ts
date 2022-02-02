import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { YesOrNoEnum } from 'src/app/constants/Enums/common.enums';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  public result: typeof YesOrNoEnum = YesOrNoEnum;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {text: string},
    public dialogRef: MatDialogRef<ModalComponent>,
  ) {}
}
