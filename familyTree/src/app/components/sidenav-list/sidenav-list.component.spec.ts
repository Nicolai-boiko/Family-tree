import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavListComponent } from './sidenav-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import Spy = jasmine.Spy;

describe('SidenavListComponent', () => {
  let component: SidenavListComponent;
  let fixture: ComponentFixture<SidenavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoutingModule],
      declarations: [SidenavListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSidenavClose', () => {
    it('should be defined', () => {
      expect(component.onSidenavClose).toBeDefined();
    });

    it('should call sidenavClose.emit', () => {
      const spy: Spy = spyOn(component.sidenavClose, 'emit');
      component.onSidenavClose();

      expect(spy).toHaveBeenCalled();
    });
  });
});
