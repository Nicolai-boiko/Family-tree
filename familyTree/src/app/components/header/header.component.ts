import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RoutesEnum } from 'src/app/constants/Enums/common.enums';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import firebase from 'firebase/compat/app';
import { ModalComponent } from '../modal/modal.component';
import { take } from 'rxjs';
import { YesOrNoEnum } from 'src/app/constants/Enums/common.enums';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public routesEnum: typeof RoutesEnum = RoutesEnum;
  public eYesOrNo: typeof YesOrNoEnum = YesOrNoEnum;
  public isLoggedIn = false;

  @Output() public sidenavToggle: EventEmitter<void> = new EventEmitter();
  
  constructor(
    private authenticationService: AuthService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {   
    this.authenticationService.userData$.subscribe((user: firebase.User | null) => {    
      this.isLoggedIn = !!(user && user.uid)
    });
  }
  
  onLogout(): void {
    let dialogRef: MatDialogRef<ModalComponent> = this.dialog.open(ModalComponent, {
      width: '18.75rem',
      disableClose: true,
      autoFocus: true,
      data: { text: 'Are you sure to logout?' },
    });
    dialogRef.afterClosed().pipe(
      take(1)
    ).subscribe((data: YesOrNoEnum) => {
      if(data === YesOrNoEnum.YES) { 
        this.authenticationService.signOut(); 
      }
    });
  }
  
  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }
}
