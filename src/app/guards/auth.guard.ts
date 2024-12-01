import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { UserStoreService } from '../services/user-store.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toast = inject(NgToastService);
  const userStore = inject(UserStoreService);

  if (auth.isLogedIn()){

    // Attempt to retrieve the role
    return userStore.getRoleFromStore().pipe(
      map((role: string | undefined) => {
        if (!role) {
          // Fallback to extracting the role from the token
          role = auth.getRoleFromToken();
          if (role) {
            userStore.setRoleFromStore(role); // Save role in UserStoreService
          }
        }

        if (role && (role === 'Admin' || role === 'Manager')) {
          return true;
        } else {
          toast.warning(
            "Access Denied",
            "You do not have permission to access this page.",
            5000
          );
          router.navigate(['.././landing']);
          return false;
        }
      }),
      catchError(() => {
        toast.warning("Error", "An error occurred while verifying your role.", 5000);
        router.navigate(['./register']);
        return of(false);
      })
    );
  } else {
    toast.danger("ERROR", "Please Login First", 5000);
    router.navigate(['./login']);
    return of(false);
  }
};
