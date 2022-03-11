import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from 'src/app/constants/Interfaces/common.interfaces';
import { authFeature, selectUserPhotoURL } from 'src/app/store/reducers/auth-state.reducer';
import { HeaderComponent } from './header.component';
import Spy = jasmine.Spy;
import createSpy = jasmine.createSpy;

class MockMatDialog {
  open() {}
}

class MockStore {
  storeUser$: Observable<IUser> = new BehaviorSubject({} as IUser);
  userPhotoURL$: Observable<string> = new BehaviorSubject('');
  dispatch = createSpy();
  select(selector: any) {
    switch (selector) {
      case authFeature.selectUser:
        return this.storeUser$;
      case selectUserPhotoURL:
        return this.userPhotoURL$;
      default:
        return;
    }
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatMenuModule,
      ],
      declarations: [
        HeaderComponent,
      ],
      providers: [
        { provide: MatDialog, useClass: MockMatDialog },
        { provide: Store, useClass: MockStore },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
