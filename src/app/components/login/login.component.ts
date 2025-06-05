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
    const { username, password } = this.loginForm.value;
    this.userService.getUserByNagmeAndPassword(username, password).subscribe(
      (user) => {
        this.userService.isManager(user,password).subscribe(
          (isManager: boolean) => {
            this.flag = isManager; // עדכון המשתנה עם התוצאה
            console.log('Is manager:', this.flag);
            if( this.flag) {

              // Change '/app-admin-dashboard' to the correct route, e.g., '/admin-dashboard'
              this.router.navigate(['/admin-dashboard']);
            }
          },
          (error) => {
            if (user) {
              this.userService.setCurrentUser(user); // כאן שמירת המשתמש!
              this.router.navigate(['/my-account']);
            } else {
              alert('שם משתמש או סיסמה לא נכונים');
            }
          }
        );
      }
    );
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


