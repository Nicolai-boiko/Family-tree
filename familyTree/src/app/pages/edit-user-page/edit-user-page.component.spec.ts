import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from 'src/app/constants/Interfaces/common.interfaces';
import { authFeature } from 'src/app/store/reducers/auth-state.reducer';
import { EditUserPageComponent } from './edit-user-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import createSpy = jasmine.createSpy;

class MockToastrService {
  error() {}
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
  open() {}
}

describe('EditUserPageComponent', () => {
  let component: EditUserPageComponent;
  let fixture: ComponentFixture<EditUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        ReactiveFormsModule,
      ],
      declarations: [ EditUserPageComponent ],
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  
});

