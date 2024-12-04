import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { checkUserLogedInGuard } from './check-user-loged-in.guard';

describe('checkUserLogedInGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => checkUserLogedInGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
