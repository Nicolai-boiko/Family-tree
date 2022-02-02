import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'familyTree';
  static toastrSettings: Record<string, string> = {
    positionClass: 'toast-bottom-right',
  };
}
