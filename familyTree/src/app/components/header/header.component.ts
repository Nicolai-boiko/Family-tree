import { Component, OnInit } from '@angular/core';
import { RoutesEnum } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public routesEnum: typeof RoutesEnum = RoutesEnum;

  constructor(private authenticationService: AuthService, private router: Router) {}

  public userState = this.authenticationService.userData;
  public isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.authenticationService.userData.subscribe((res) => {
      res && res.uid ? (this.isLoggedIn = true) : (this.isLoggedIn = false);
    });
  }

  signOut(): void {
    this.authenticationService.signOut();
    this.router.navigate(['/', this.routesEnum.LOG_IN]);
  }
}
