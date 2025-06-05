import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
 console.log('Admin Guard Activated');
   const token = localStorage.getItem('jwt');
   console.log('Token:', token); // הדפסת הטוקן לבדיקה
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload['role'] === 'manager') {
      return true;
    }
  }
  // אפשר גם לנתב ל-login:
  window.location.href = '/register';
  return false;
  };
