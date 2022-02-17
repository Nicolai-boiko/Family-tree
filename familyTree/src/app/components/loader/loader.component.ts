import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthState } from '../../store/state/auth.state';
import { Store } from '@ngrx/store';
import { authFeature } from 'src/app/store/reducers/auth-state.reducer';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  public showLoader$: Observable<boolean> = this.store.select(authFeature.selectIsLoading);
  constructor (
    private store: Store<IAuthState>,
  ) {}
}
