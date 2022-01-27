import { TestBed } from '@angular/core/testing';

import { notAuth } from './notAuth.guard';

describe('LoggedInUsersGuard', () => {
  let guard: notAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(notAuth);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
