import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  public showLoader: boolean = false;
  constructor (
    private authService: AuthService,
  ) {}
  
  ngOnInit(): void {
    this.authService.showLoader.subscribe((state: boolean) => this.showLoader = state);
  }
}
