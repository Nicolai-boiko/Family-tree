import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RoutesEnum } from 'src/app/constants/Enums/common.enums';
import { LoginPageComponent } from './login-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CoreActions } from 'src/app/store/actions/auth-state.actions';
import { IUser } from 'src/app/constants/Interfaces/common.interfaces';
import Spy = jasmine.Spy;
import createSpy = jasmine.createSpy;

class MockStore {
  dispatch = createSpy();
}

const mockFormControl: FormControl = new FormControl('mock');

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AppRoutingModule,
      ],
      declarations: [
        LoginPageComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { url: { [0]: { path: 'dummyPath' } } } } },
        { provide: Store, useClass: MockStore }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  describe('get firstNameControl', () => {
    it('should return proper value', () => {
      component.authForm = new FormGroup({ firstName: mockFormControl });
      
      expect(component.firstNameControl).toEqual(mockFormControl);
    });
  });

  describe('get secondNameControl', () => {
    it('should return proper value', () => {
      component.authForm = new FormGroup({ secondName: mockFormControl });
      
      expect(component.secondNameControl).toEqual(mockFormControl);
    });
  });

  describe('get emailControl', () => {
    it('should return proper value', () => {
      component.authForm = new FormGroup({ email: mockFormControl });
      
      expect(component.emailControl).toEqual(mockFormControl);
    });
  });

  describe('get passwordControl', () => {
    it('should return proper value', () => {
      component.authForm = new FormGroup({ password: mockFormControl });
      
      expect(component.passwordControl).toEqual(mockFormControl);
    });
  });

  describe('get genderControl', () => {
    it('should return proper value', () => {
      component.authForm = new FormGroup({ gender: mockFormControl });
      
      expect(component.genderControl).toEqual(mockFormControl);
    });
  });

  describe('ngOnInit', () => {
    it('should be defined', () => {
      expect(component.ngOnInit).toBeDefined();
    });

    it('should create proper FormGroup for login page', () => {
      component.pageURL = RoutesEnum.LOG_IN;

      component.ngOnInit();

      expect(Object.keys(component.authForm.controls)).toEqual(
        [
          'email',
          'password',
        ]);
    });
  
    it('should create proper FormGroup for registration page', () => {
      component.pageURL = RoutesEnum.REGISTRATION;
    
      component.ngOnInit();
    
      expect(Object.keys(component.authForm.controls)).toEqual(
        [
          'email',
          'password',
          'firstName',
          'secondName',
          'gender',
        ]);
    });
  });

  describe('onSubmit', () => {
    let authFormValidationSpy: Spy;
    let authFormValueSpy: Spy;
    let MockIUser: IUser;

    beforeEach(() => {
      authFormValidationSpy = spyOnProperty(component.authForm, 'valid', 'get');
      MockIUser = { email: 'dummyEmail', password: 'dummyPassword' } as IUser;
      authFormValueSpy = spyOn(component.authForm, 'getRawValue').and.returnValue(MockIUser);
    });

    it('should be defined', () => {
      expect(component.onSubmit).toBeDefined();
    });

    it('should not be called if form is invalid', () => {
      authFormValidationSpy.and.returnValue(false);

      component.onSubmit();

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should be called if form is valid', () => {
      authFormValidationSpy.and.returnValue(true);
      component.pageURL = RoutesEnum.REGISTRATION;

      component.onSubmit();

      expect(store.dispatch).toHaveBeenCalledWith(CoreActions.signUpWithEmail({ user: MockIUser }));
    });

    it('should be called if form is valid', () => {
      authFormValidationSpy.and.returnValue(true);
      component.pageURL = RoutesEnum.LOG_IN;

      component.onSubmit();

      expect(store.dispatch).toHaveBeenCalledWith(CoreActions.signInWithEmail({ user: MockIUser }));
    });
  });
});
