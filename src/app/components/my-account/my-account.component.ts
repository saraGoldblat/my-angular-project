import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../classes/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-my-account',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss'
})
export class MyAccountComponent implements OnInit {
  user: User | null = null;
  profileForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      lastName: [''],
      phone: [''],
      address: [''],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
   this.userService.currentUser$.subscribe(user => {
    if (typeof user === 'string') {
      this.user = JSON.parse(user);
    } else {
      this.user = user;
    }
    // אם יש משתמש, נעדכן את ערכי הטופס
    if (this.user) {
      this.profileForm.patchValue({
        username: this.user.username,
        lastName: this.user.lastName,
        phone: this.user.phone,
        address: this.user.address,
        email: this.user.email
      });
    }
  });
  }
  saveProfile() {
    console.log("enter")
    if (this.user && this.profileForm.valid) {
      const updatedUser = {  ...this.profileForm.value };
      updatedUser.userId=this.user .userId;
      this.userService.editUser(updatedUser.userId, updatedUser).subscribe(() => {
        alert('Profile updated!');
        this.userService.setCurrentUser(updatedUser);
      });
    }
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}


