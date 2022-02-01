import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { isAuthLoading } from '../../store/selectors/auth.state.selectors';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  public isAuthLoading$: Observable<boolean> = this.store.pipe(select(isAuthLoading));
  constructor (private readonly store: Store<IAppState>) {}
}
