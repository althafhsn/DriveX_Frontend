import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const checkUserLogedInGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const router =inject(Router)

  if (!auth.isLogedIn()){
    router.navigate(['/login']);
    return false;
  }
  return true;
};
