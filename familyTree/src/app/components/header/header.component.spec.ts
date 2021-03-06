import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { of } from 'rxjs';
import { authFeature, selectUserPhotoURL } from 'src/app/store/reducers/auth-state.reducer';
import { HeaderComponent } from './header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { YesOrNoEnum } from '../../constants/Enums/common.enums';
import { CoreActions } from '../../store/actions/auth-state.actions';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IUser } from '../../constants/Interfaces/common.interfaces';
import Spy = jasmine.Spy;
import anything = jasmine.anything;

class MockMatDialog {
  open() { };
  afterClosed() { };
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        MatMenuModule,
      ],
      declarations: [
        HeaderComponent,
      ],
      providers: [
        { provide: MatDialog, useClass: MockMatDialog },
        provideMockStore({
          selectors: [
            { selector: authFeature.selectUser, value: null },
          ],
        }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);

    spyOn(store, 'dispatch');
  });

  afterEach(() => {
    store?.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('userInitials$', () => {
    it('should not execute observable for user if it is null', () => {
      let invoked = 0;

      component.userInitials$.subscribe(() => {
        invoked++;
      });

      expect(invoked).toEqual(0);
    });

    it('should execute observable for user if it exists', () => {
      const mockUser: IUser = { firstName: 'aaaa', secondName: 'bbbbb' };
      store.overrideSelector(authFeature.selectUser, mockUser);
      let invoked = 0;

      component.userInitials$.subscribe(() => {
        invoked++;
      });

      expect(invoked).toEqual(1);
    });

    it('should create initials for user if first and second name exist', (done: DoneFn) => {
      const mockUser: IUser = { firstName: 'aaaa', secondName: 'bbbbb' };
      store.overrideSelector(authFeature.selectUser, mockUser);

      component.userInitials$.subscribe(result => {
        expect(result).toEqual('ab');
        done();
      });
    });

    it('should return "" for user if first name does not exist', (done: DoneFn) => {
      const mockUser: IUser = { firstName: '', secondName: 'bbbbb' };
      store.overrideSelector(authFeature.selectUser, mockUser);

      component.userInitials$.subscribe(result => {
        expect(result).toEqual('');
        done();
      });
    });

    it('should return "" for user if second name does not exist', (done: DoneFn) => {
      const mockUser: IUser = { firstName: 'aaaaa', secondName: '' };
      store.overrideSelector(authFeature.selectUser, mockUser);

      component.userInitials$.subscribe(result => {
        expect(result).toEqual('');
        done();
      });
    });
  });

  describe('userPhotoURL$', () => {
    const mockURL = 'dummyURL';
    
    it('should not execute observable for user photo if it is null', () => {
      let invoked = 0;

      component.userPhotoURL$.subscribe(() => {
        invoked++;
      });

      expect(invoked).toEqual(0);
    });

    it('should execute observable for user photo if it exists', () => {
      store.overrideSelector(selectUserPhotoURL, mockURL);
      let invoked = 0;

      component.userPhotoURL$.subscribe(() => {
        invoked++;
      });

      expect(invoked).toEqual(1);
    });

    it('should return photoUrl if it exists', (done: DoneFn) => {
      store.overrideSelector(selectUserPhotoURL, mockURL);

      component.userPhotoURL$.subscribe(result => {
        expect(result).toEqual('dummyURL');
        done();
      });
    });
  });

  describe('isLoggedIn$', () => {
    it('should return user if he exists', (done: DoneFn) => {
      const mockUser: IUser = { photoUrl: 'dummyURL' };
      store.overrideSelector(authFeature.selectUser, mockUser);
      component.isLoggedIn$.subscribe(result => {
        expect(result).toEqual(mockUser);
        done();
      });
    });

    it('should return null if user does not exist', (done: DoneFn) => {
      const mockUser = null;
      store.overrideSelector(authFeature.selectUser, mockUser);
      component.isLoggedIn$.subscribe(result => {
        expect(result).toBeNull();
        done();
      });
    });
  });

  describe('onLogout', () => {
    let dialogOpenSpy: Spy;

    beforeEach(() => {
      dialogOpenSpy = spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(YesOrNoEnum.YES) } as MatDialogRef<YesOrNoEnum>);
    });

    it('should be defined', () => {
      expect(component.onLogout).toBeDefined();
    });


    it('should call dialog.open with needed params', () => {
      component.onLogout();

      expect(component.dialog.open).toHaveBeenCalledWith(anything(), {
        width: '18.75rem',
        disableClose: true,
        autoFocus: true,
        data: { text: 'Are you sure to logout?' },
      });
    });

    it('should dispatch CoreActions.logoutStart if afterClosed send YES', () => {
      component.onLogout();

      expect(store.dispatch).toHaveBeenCalledWith(CoreActions.logoutStart());
    });

    it('should not dispatch CoreActions.logoutStart if afterClosed send NO', () => {
      dialogOpenSpy.and.returnValue({ afterClosed: () => of(YesOrNoEnum.NO) } as MatDialogRef<YesOrNoEnum>);

      component.onLogout();

      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('onToggleSidenav', () => {
    it('should be defined', () => {
      expect(component.onToggleSidenav).toBeDefined();
    });

    it('should call sidenavToggle.emit', () => {
      const spy: Spy = spyOn(component.sidenavToggle, 'emit');
      component.onToggleSidenav();

      expect(spy).toHaveBeenCalled();
    });
  });
});
