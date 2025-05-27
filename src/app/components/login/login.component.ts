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
      this.userService.getUserByNameAndPassword(username, password).subscribe(
        (user) => {
          if (user) {
            this.userService.setCurrentUser(user); // כאן שמירת המשתמש!
            this.router.navigate(['/my-account']);
          } else {
            alert('שם משתמש או סיסמה לא נכונים');
          }
        },
        () => {
          alert('שגיאה בשרת');
        }
      );
    }
  }
}
