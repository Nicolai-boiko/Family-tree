import { Component, Output, EventEmitter } from '@angular/core';
import { RoutesEnum } from 'src/app/constants/Enums/common.enums';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { filter, map, Observable, take } from 'rxjs';
import { YesOrNoEnum } from 'src/app/constants/Enums/common.enums';
import { IAuthState } from '../../store/state/auth.state';
import { Store } from '@ngrx/store';
import { CoreActions } from 'src/app/store/actions/auth-state.actions';
import { authFeature, selectUserPhotoURL } from 'src/app/store/reducers/auth-state.reducer';
import { IUser } from 'src/app/constants/Interfaces/common.interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public userInitials$: Observable<string> = this.store.select(authFeature.selectUser).pipe(
    filter(Boolean),
    map((user: IUser) => user.firstName && user.secondName ? `${user.firstName[0]}${user.secondName[0]}` : '')
  );
  public userPhotoURL$: Observable<string> = this.store.select(selectUserPhotoURL).pipe(filter(Boolean));
  public routesEnum: typeof RoutesEnum = RoutesEnum;
  public eYesOrNo: typeof YesOrNoEnum = YesOrNoEnum;
  public isLoggedIn$: Observable<IUser | null> = this.store.select(authFeature.selectUser);

  @Output() public sidenavToggle: EventEmitter<void> = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private store: Store<IAuthState>,
  ) { }

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
      if (data === YesOrNoEnum.YES) {
        this.store.dispatch(CoreActions.logoutStart());
      }
    });
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }
}
