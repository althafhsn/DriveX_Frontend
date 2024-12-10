import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { blockLoginRegisterGuard } from './block-login-register-guard.guard';

describe('blockLoginRegisterGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => blockLoginRegisterGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
