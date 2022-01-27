import { Component, Output, EventEmitter } from '@angular/core';
import { RoutesEnum } from 'src/app/app-routing.module';
 
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent {
  public routesEnum: typeof RoutesEnum = RoutesEnum;
  @Output() sidenavClose = new EventEmitter();
 
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}
