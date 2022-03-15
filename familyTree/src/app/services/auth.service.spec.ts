import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';
import Spy = jasmine.Spy;
import createSpy = jasmine.createSpy;
import { HttpTestingController } from '@angular/common/http/testing';

class MockAngularFireAuth {
  onIdTokenChanged() {}
  createUserWithEmailAndPassword() {}
  signInWithEmailAndPassword() {}
  signOut() {}
  sendPasswordResetEmail() {}
}

class MockAngularFirestore {
  collection() {}
  doc() {}
}

class MockAngularFireStorage {
  upload() {}
  ref() {}
}

class MockStore {
  dispatch = createSpy();
}

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireAuth, useClass: MockAngularFireAuth },
        { provide: Store, useClass: MockStore },
        { provide: AngularFirestore, useClass: MockAngularFirestore },
        { provide: AngularFireStorage, useClass: MockAngularFireStorage },
      ]
    });
    service = TestBed.inject(AuthService);
  });
  
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  
  
  // describe('http example', () => {
  //   it('http example', () => {
  //     service.signOut().subscribe(result => {
  //       expect(result).toEqual({ someExpectedData: 'dummy'});
  //     });
  //
  //     const request = httpMock.expectOne('shapephase/dummyShapePhaseId');
  //     expect(request.request.method).toBe('GET');
  //
  //     request.flush({ someExpectedData: 'dummy'});
  //   });
  // });
});
