import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from 'src/app/constants/Interfaces/common.interfaces';
import { authFeature, selectUserPhotoURL } from 'src/app/store/reducers/auth-state.reducer';
import { HeaderComponent } from './header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import Spy = jasmine.Spy;
import createSpy = jasmine.createSpy;
import anything = jasmine.anything;

class MockMatDialog {
  open() {}
  afterClosed() {};
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
        AppRoutingModule,
        MatMenuModule,
      ],
      declarations: [
        HeaderComponent,
      ],
      providers: [
        { provide: MatDialog, useClass: MockMatDialog },
        { provide: Store, useClass: MockStore },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    // .overrideModule(BrowserDynamicTestingModule, {
    //   set: {
    //     entryComponents: [ModalComponent],
    //   },
    // })
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
  
  describe('onLogout', () => {
    it('should be defined', () => {
      expect(component.onLogout).toBeDefined();
    });
    
    // ToDo need to be resolved
    xit('should call dialog.open with needed params', () => {
      const spy: Spy = spyOn(component.dialog, 'open');
      
      component.onLogout();
      
      expect(spy).toHaveBeenCalledWith(anything(), {
        width: '18.75rem',
        disableClose: true,
        autoFocus: true,
        data: { text: 'Are you sure to logout?' },
      });
    })
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
