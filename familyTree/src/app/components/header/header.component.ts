import { Component, OnInit } from '@angular/core';
import { RoutesEnum } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public routesEnum: typeof RoutesEnum = RoutesEnum;
  public userState: Observable<firebase.User | null> = this.authenticationService.userData;
  public isLoggedIn = false;

  constructor(
    private authenticationService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {   
    this.authenticationService.userData.subscribe((res: firebase.User | null) => {    
      this.isLoggedIn = !!(res && res.uid)
    });
  }

  signOut(): void {
    this.authenticationService.signOut();
  }
}
