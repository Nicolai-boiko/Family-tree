import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { authFeature } from '../../store/reducers/auth-state.reducer';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  public isAuthLoading$ = this.store.pipe(select(authFeature.selectIsLoading));
  constructor(private readonly store: Store<IAppState>) {}
}
