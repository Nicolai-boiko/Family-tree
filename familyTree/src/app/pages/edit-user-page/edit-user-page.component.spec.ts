import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IUser } from 'src/app/constants/Interfaces/common.interfaces';
import { authFeature } from 'src/app/store/reducers/auth-state.reducer';
import { EditUserPageComponent } from './edit-user-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { CoreActions } from 'src/app/store/actions/auth-state.actions';
import { YesOrNoEnum } from 'src/app/constants/Enums/common.enums';
import Spy = jasmine.Spy;
import createSpy = jasmine.createSpy;
import anything = jasmine.anything;

class MockToastrService {
  error() { }
}

class MockStore {
  storeUser$: Observable<IUser> = new BehaviorSubject({} as IUser);
  loadProgress$: Observable<number> = new BehaviorSubject(50);
  dispatch = createSpy();
  select(selector: any) {
    switch (selector) {
      case authFeature.selectUser:
        return this.storeUser$;
      case authFeature.selectLoadProgress:
        return this.loadProgress$;
      default:
        return;
    }
  }
}

class MockMatDialog {
  open() { };
  afterClosed() { };
}

describe('EditUserPageComponent', () => {
  let component: EditUserPageComponent;
  let fixture: ComponentFixture<EditUserPageComponent>;
  let store: Store;
  let toastr: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        ReactiveFormsModule,
      ],
      declarations: [EditUserPageComponent],
      providers: [
        { provide: ToastrService, useClass: MockToastrService },
        { provide: Store, useClass: MockStore },
        { provide: MatDialog, useClass: MockMatDialog },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    toastr = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    let profileFormValidationSpy: Spy;
    let formValueSpy: Spy;

    beforeEach(() => {
      profileFormValidationSpy = spyOnProperty(component.profileForm, 'valid', 'get');
      formValueSpy = spyOn(component.profileForm, 'getRawValue');
    });

    it('should be defined', () => {
      expect(component.onSubmit).toBeDefined();
    });

    it('should not call if profileForm is not valid', () => {
      profileFormValidationSpy.and.returnValue(false);
      component.onSubmit();

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should call if profileForm is valid', () => {
      const MockIUser: IUser = { email: 'dummyEmail', firstName: 'dummyName' } as IUser;
      profileFormValidationSpy.and.returnValue(true);
      formValueSpy.and.returnValue(MockIUser);
      component.onSubmit();

      expect(store.dispatch).toHaveBeenCalledWith(CoreActions.updateUserCollection({ user: MockIUser }));
    });
  });

  describe('uploadPhoto', () => {
    let toastrSpy: Spy;
    let MockFile: File;
    let fileSizeSpy: Spy;

    beforeEach(() => {
      toastrSpy = spyOn(component.toastr, 'error');
      MockFile = new File(['dummyData'], 'dummyFile');
      fileSizeSpy = spyOnProperty(MockFile, 'size', 'get');
    });
    it('should be defined', () => {
      expect(component.uploadPhoto).toBeDefined();
    });

    it('should not to be called if file size > 5mb', () => {
      fileSizeSpy.and.returnValue(6 * 1024 * 1024);
      const MockEvent: Event = {
        target: {
          files: [MockFile],
        }
      } as unknown as Event;
      component.uploadPhoto(MockEvent);

      expect(toastrSpy).toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should to be called if file size <= 5mb', () => {
      fileSizeSpy.and.returnValue(4 * 1024 * 1024);
      const MockEvent: Event = {
        target: {
          files: [MockFile],
        }
      } as unknown as Event;
      component.uploadPhoto(MockEvent);

      expect(toastrSpy).not.toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(CoreActions.uploadUserPhoto({ file: MockFile }));
    });
  });

  describe('deletePhoto', () => {
    let dialogOpenSpy: Spy;

    beforeEach(() => {
      dialogOpenSpy = spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(YesOrNoEnum.YES) } as MatDialogRef<YesOrNoEnum>);
    });

    it('should call dialog.open with needed params', () => {
      component.deletePhoto();

      expect(component.dialog.open).toHaveBeenCalledWith(anything(), {
        width: '18.75rem',
        disableClose: true,
        autoFocus: true,
        data: { text: 'Are you sure to delete this photo?' },
      });
    });

    it('should dispatch CoreActions.clearPhotoUserURL if afterClosed send YES', () => {
      component.deletePhoto();

      expect(store.dispatch).toHaveBeenCalledWith(CoreActions.clearPhotoUserURL());
    });

    it('should not dispatch CoreActions.clearPhotoUserURL if afterClosed send NO', () => {
      dialogOpenSpy.and.returnValue({ afterClosed: () => of(YesOrNoEnum.NO) } as MatDialogRef<YesOrNoEnum>);

      component.deletePhoto();

      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('canDeactivate', () => {
    let dialogOpenSpy: Spy;

    beforeEach(() => {
      dialogOpenSpy = spyOn(component.dialog, 'open').and
        .returnValue({ afterClosed: () => of(YesOrNoEnum.YES) } as MatDialogRef<YesOrNoEnum>);
      component.isFormChanged = true;
    });

    it('should call dialog.open with needed params', () => {
      component.canDeactivate();

      expect(component.dialog.open).toHaveBeenCalledWith(anything(), {
        width: '18.75rem',
        disableClose: true,
        autoFocus: true,
        data: { text: 'Are you sure to exit WITHOUT saving?' },
      });
    });

    it('should not call dialog open if isFormChanged = false', () => {
      component.isFormChanged = false;

      component.canDeactivate();

      expect(component.dialog.open).not.toHaveBeenCalled();
    });

    it('should return true if modal return YES', (done: DoneFn) => {
      (component.canDeactivate() as Observable<boolean>).subscribe(result => {
        expect(result).toBeTrue();
        done();
      });
    });

    it('should return false if modal return NO', (done: DoneFn) => {
      dialogOpenSpy.and.returnValue({ afterClosed: () => of(YesOrNoEnum.NO) } as MatDialogRef<YesOrNoEnum>);

      (<Observable<boolean>>component.canDeactivate()).subscribe(result => {
        expect(result).toBeFalse();
        done();
      });
    });
  });

  describe('ngOnInit', () => {
    it('should be defined', () => {
      expect(component.ngOnInit).toBeDefined();
    });

    it('should create FormGroup with needed controls', () => {
      component.ngOnInit();
      expect(Object.keys(component.profileForm.controls)).toEqual(
        [
          'firstName',
          'secondName',
          'gender',
          'birthday',
          'country',
          'city',
          'postcode',
          'telephone',
          'registrationDate',
          'photoUrl',
        ]);
    });
  });

});

