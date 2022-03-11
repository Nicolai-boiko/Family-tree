import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorePasswordPageComponent } from './restore-password-page.component';
import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';
import { BehaviorSubject } from 'rxjs';
import { authFeature } from '../../store/reducers/auth-state.reducer';
import { Store } from '@ngrx/store';
import { CoreActions } from '../../store/actions/auth-state.actions';
import Spy = jasmine.Spy;
import createSpy = jasmine.createSpy;

class MockAuthService {
  resetPassword() {}
}

class MockToastrService {
  success() {}
  error() {}
}

class MockStore {
  selectIsEmailSend$ = new BehaviorSubject(false);
  dispatch = createSpy();
  select(selector: any) {
    switch (selector) {
      case authFeature.selectIsEmailSend:
        return this.selectIsEmailSend$;
      default:
        return;
    }
  }
}

describe('RestorePasswordPageComponent', () => {
  let component: RestorePasswordPageComponent;
  let fixture: ComponentFixture<RestorePasswordPageComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AppRoutingModule,
      ],
      declarations: [
        RestorePasswordPageComponent,
      ],
      providers: [
        { provide: ActivatedRoute,  useValue: { snapshot: { queryParams: { ['email']: 'dummyEmail' } } } },
        { provide: Store, useClass: MockStore },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorePasswordPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  describe('ngOnInit', () => {
    it('should ve defined', () => {
      expect(component.ngOnInit).toBeDefined();
    });
    
    it('should create FormGroup with email control and with validators', () => {
      component.ngOnInit();
      
      expect(Object.keys(component.resetForm.controls)).toEqual(['email']);
      expect(component.resetForm.controls['email'].validator).not.toBeNull();
    });
  });
  
  describe('resetPassword', () => {
    let resetFormValidationSpy: Spy;
    let emailControlSpy: Spy;
    
    beforeEach(() => {
      resetFormValidationSpy = spyOnProperty(component.resetForm, 'valid', 'get');
      emailControlSpy = spyOnProperty(component, 'emailControl', 'get');
    });
    
    it('should ve defined', () => {
      expect(component.resetPassword).toBeDefined();
    });
    
    it('should not call if resetForm is not valid', () => {
      resetFormValidationSpy.and.returnValue(false);
      
      component.resetPassword();
      
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  
    it('should call if resetForm is valid', () => {
      resetFormValidationSpy.and.returnValue(true);
      emailControlSpy.and.returnValue({ value: 'newDummyEmail' });
    
      component.resetPassword();
    
      expect(store.dispatch).toHaveBeenCalledWith(CoreActions.sendPasswordResetEmail({ email: 'newDummyEmail' }));
    });
  });
});
