import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const blockLoginRegisterGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLogedIn()) {
    // If the user is logged in, redirect them to the landing page or dashboard
    router.navigate(['/landing']);
    return false;
  }
  
  // If the user is not logged in, allow access to login/register pages
  return true;
};
