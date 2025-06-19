import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule,  ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  userForm: FormGroup;
router: Router=new  Router();// הוספת Router
 // | undefined // הוספת Router
 

  constructor(private fb: FormBuilder,private userService:UserService) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;
      this.userService.addUser(newUser).subscribe({
        next: response => {
          console.log('User registered successfully:', response);
          alert('Registration successful! Redirecting to login...');
          this.router.navigate(['/login']); // ניווט לדף ההתחברות
        },
        error: err => {
          console.error('Error during registration:', err);
          alert('Registration failed. Please try again.');
        }
      });
    } else {
      console.log('Form is invalid');
    }
}
}
