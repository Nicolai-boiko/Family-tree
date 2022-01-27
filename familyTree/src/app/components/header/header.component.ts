import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RoutesEnum } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public routesEnum: typeof RoutesEnum = RoutesEnum;
  public isLoggedIn = false;

  @Output() public sidenavToggle = new EventEmitter();
  
  constructor(
    private authenticationService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {   
    this.authenticationService.userData.subscribe((user: firebase.User | null) => {    
      this.isLoggedIn = !!(user && user.uid)
    });
  }
  
  signOut(): void {
    this.authenticationService.signOut();
  }
  
  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }
}
