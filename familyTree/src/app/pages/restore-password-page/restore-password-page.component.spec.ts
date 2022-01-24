import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorePasswordPageComponent } from './restore-password-page.component';

describe('RestorePasswordPageComponent', () => {
  let component: RestorePasswordPageComponent;
  let fixture: ComponentFixture<RestorePasswordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestorePasswordPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorePasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
