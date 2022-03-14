import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
        { provide: ActivatedRoute, useValue: { snapshot: { url: { [0]: { path: RoutesEnum.LOG_IN } } } } },
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

  describe('getter formControl', () => {
    let MockFormControl: FormControl;
    let authFormGetControlSpy: Spy;

    beforeEach(() => {
      MockFormControl = new FormControl();
      authFormGetControlSpy = spyOnProperty(component, 'firstNameControl');
    });

    it('should return needed form control', () => {
      authFormGetControlSpy.and.returnValue(MockFormControl);

      expect(component.firstNameControl).toBe(MockFormControl);
      expect(authFormGetControlSpy).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('should be defined', () => {
      expect(component.ngOnInit).toBeDefined();
    });

    it('should create FormGroup with needed controls', () => {

      component.ngOnInit();

      expect(Object.keys(component.authForm.controls)).toEqual(
        [
          'email',
          'password',
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
