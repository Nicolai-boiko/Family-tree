import { Component, Output, EventEmitter } from '@angular/core';
import { RoutesEnum } from 'src/app/constants/Enums/common.enums';
 
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent {
  public routesEnum: typeof RoutesEnum = RoutesEnum;
  @Output() public sidenavClose: EventEmitter<void> = new EventEmitter();
 
  onSidenavClose(): void {
    this.sidenavClose.emit();
  }
}
