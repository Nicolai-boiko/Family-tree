import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeUserComponent } from './tree-user.component';

describe('TreeUserComponent', () => {
  let component: TreeUserComponent;
  let fixture: ComponentFixture<TreeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
