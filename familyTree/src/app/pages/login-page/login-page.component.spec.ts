import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { LoginPageComponent } from './login-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class MockStore {
  dispatch() {}
}

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

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
        { provide: ActivatedRoute, useValue: { snapshot: { url: { [0]: { path: '' } } } } },
        { provide: Store, useClass: MockStore }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
