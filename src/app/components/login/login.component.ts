import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginForm: FormGroup;
   flag:boolean | undefined;
    errorMessage: string = '';

  constructor(private fb: FormBuilder,
     private userService: UserService,
    private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    }

 onLogin(): void {
  if (this.loginForm.valid) {
    if (this.loginForm.valid) {
    const { username, password } = this.loginForm.value;
    this.userService.getUserByNagmeAndPassword(username, password).subscribe(
      (user) => {
        this.userService.isManager(user, password).subscribe(
          (isManager: boolean) => {
            this.flag = isManager; // עדכון המשתנה עם התוצאה
            console.log('Is manager:', this.flag);
            if (this.flag) {
              this.router.navigate(['/admin-dashboard']);
            } else {
              this.userService.setCurrentUser(user); // שמירת המשתמש הנוכחי
              localStorage.setItem('currentUser', JSON.stringify(user)); // שמירת המשתמש הנוכחי ב-localStorage
              this.router.navigate(['/my-account']);
            }
          },
          (error) => {
            // טיפול בשגיאה כאשר המשתמש אינו מנהל
            console.error('Error checking manager status:', error);
            this.errorMessage = 'You do not have permission to access this area.';
            alert(this.errorMessage);
          }
        );
      },
      (error) => {
        // טיפול בשגיאה כאשר שם המשתמש או הסיסמה אינם נכונים
        console.error('Login failed:', error);
        if (error.status === 401) {
          this.errorMessage = 'Invalid username or password.';
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
        alert(this.errorMessage);
      }
    );
  }
}

}
}

 
// onLogin(): void {
//   if (this.loginForm.valid) {
//     const { username, password } = this.loginForm.value;
//     this.userService.login(username, password).subscribe(
//       (res: any) => {
//         if (res && res.token) {
//           localStorage.setItem('jwt', res.token); // שמירת הטוקן
//           // בדיקת תפקיד מהטוקן
//           const payload = JSON.parse(atob(res.token.split('.')[1]));
//           if (payload['role'] === 'manager') {
//             this.router.navigate(['/admin-dashboard']);
//           } else {
//             this.router.navigate(['/my-account']);
//           }
//         } else {
//           alert('שם משתמש או סיסמה לא נכונים');
//         }
//       },
//       () => {
//         alert('שגיאה בשרת');
//       }
//     );
//   }
// }


