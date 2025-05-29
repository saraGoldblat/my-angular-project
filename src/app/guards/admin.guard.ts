import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
   const token = localStorage.getItem('jwt');
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload['role'] === 'manager') {
      return true;
    }
  }
  // אפשר גם לנתב ל-login:
  window.location.href = '/login';
  return false;
  };
