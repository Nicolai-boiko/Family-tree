import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';
import Spy = jasmine.Spy;
import createSpy = jasmine.createSpy;

class MockAngularFireAuth {
  onIdTokenChanged = createSpy();
  createUserWithEmailAndPassword = createSpy();
  signInWithEmailAndPassword = createSpy();
  signOut = createSpy();
  sendPasswordResetEmail = createSpy();
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
  let angularFireAuth: AngularFireAuth;
  let afs: AngularFirestore;
  let storage: AngularFireStorage;
  let store: Store;

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
    angularFireAuth = TestBed.inject(AngularFireAuth);
    afs = TestBed.inject(AngularFirestore);
    storage = TestBed.inject(AngularFireStorage);
    store = TestBed.inject(Store);
  });
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
