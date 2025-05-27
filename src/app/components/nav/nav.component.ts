import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from "../login/login.component";
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [RouterOutlet, RouterLink, RouterLinkActive,NgIf,CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit{
ifUser:boolean = false
  user: User | null = null;
  name: string = ''; // משתנה לאחסון שם המשתמש
  constructor(public userService: UserService,private router: Router) { }
  ngOnInit() {
    this.userService.currentUserSubject.subscribe((userData) => {
      if(userData == null  )
        this.ifUser = false
      else
      this.ifUser = true;
    })
   
   
   
      this.userService.currentUserSubject.subscribe((userData) => {
      if (!userData) {
        console.log('User is null or undefined');
        return;
      }
    
      console.log('User raw from service:', userData);
      if (typeof userData === 'string') {
        userData = JSON.parse(userData);
      }
      this.user = new User(
        userData!.userId,
  userData!.username,
  userData!.lastName,
  userData!.phone,
  userData!.address,
  userData!.email
      );
      console.log('User from service:', this.user);
      console.log('User name:', this.user.username);
    });
   
  }
 
}
