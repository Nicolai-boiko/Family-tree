import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { authFeature } from 'src/app/store/reducers/auth-state.reducer';

import { LoaderComponent } from './loader.component';

class MockStore {
  showLoader$: Observable<boolean> = new BehaviorSubject(false);
  select(selector: any) {
    switch (selector) {
      case authFeature.selectIsLoading:
        return this.showLoader$;
      default:
        return;
    }
  }
}

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderComponent ],
      providers: [
        { provide: Store, useClass: MockStore },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
