import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { RoutesEnum } from 'src/app/app-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
  public routesEnum: typeof RoutesEnum = RoutesEnum;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private authenticationService: AuthService,
  private router: Router) {}
  @Output() onAgreePopup = new EventEmitter<boolean>();
  agree() {
    this.onAgreePopup.emit();
}

signOut() {
  this.authenticationService.signOut();
  this.router.navigate(['/', this.routesEnum.LOG_IN]);
}
}
