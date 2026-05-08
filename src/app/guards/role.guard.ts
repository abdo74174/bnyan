import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard = (allowedRole: 'investor' | 'developer'): CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isLoggedIn) {
      router.navigate(['/login']);
      return false;
    }

    if (auth.currentUser?.userType === allowedRole) {
      return true;
    }

    // Redirect to correct dashboard
    if (auth.currentUser?.userType === 'developer') {
      router.navigate(['/developer']);
    } else {
      router.navigate(['/dashboard']);
    }
    return false;
  };
};
