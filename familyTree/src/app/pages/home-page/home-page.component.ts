import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Optional,
  Self,
  SkipSelf,
  ViewEncapsulation,
} from '@angular/core';
import { ConsoleService, CustomConsoleService, MY_VALUE } from '../../services/console.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [
    // ConsoleService,
    // { provide: ConsoleService, useClass: ConsoleService },
    // { provide: CustomConsoleService, useExisting: ConsoleService },
    { provide: MY_VALUE, useValue: 1 },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HomePageComponent implements OnInit {
  constructor(
    private consoleService: ConsoleService,
    // @Self() @Optional() private consoleService: ConsoleService,
    // @Self() @Optional() private customConsoleService: CustomConsoleService,
    // @SkipSelf() private globalConsoleService: ConsoleService,
    // @Inject(MY_VALUE) private value: number,
    // @SkipSelf() @Inject(MY_VALUE) private globalValue: number,
  ) {}
  
  ngOnInit(): void {
    // console.log('component service');
    this.consoleService?.show();
    // console.log('component custom service');
    // this.customConsoleService?.show();
    // console.log('global service');
    // this.globalConsoleService.show();
    // console.log('Token local value: ', this.value);
    // console.log('Token global value: ', this.globalValue);
  }
}
