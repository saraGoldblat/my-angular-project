import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { catchError, of, switchMap } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
 const isAdmin = localStorage.getItem('isAdmin');
  if (isAdmin === 'true') {
    return of(true);
  } else {
    // במידה ולא מנהל, ניתן לנתב לדף התחברות או להראות הודעת שגיאה
    return of(false);
  }
};