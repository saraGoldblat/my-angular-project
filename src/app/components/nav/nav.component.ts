import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from "../login/login.component";
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';
import { CommonModule, NgIf } from '@angular/common';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { TooltipComponent } from "../tooltip/tooltip.component";

@Component({
  selector: 'app-nav',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf, CommonModule, MatMenu, MatToolbar, MatIcon, MatMenuModule, TooltipComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  ifUser: boolean = false
  user: User | null = null;
  name: string = ''; // משתנה לאחסון שם המשתמש

  @Output() wishListClicked: EventEmitter<void> = new EventEmitter<void>();

  showTooltip: boolean = false;
  showCartTooltip: boolean = false;
  showWishTooltip: boolean = false;

  searchText: string = '';
  showSearch: boolean = false;

  isAdmin: boolean = false; // משתנה לבדיקת אם המשתמש הוא אדמין


  constructor(public userService: UserService, private router: Router) { }
  ngOnInit() {
    this.userService.currentUserSubject.subscribe((userData) => {
      if (userData == null)
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
        userData!.email,
        userData!.password
      );
      console.log('User from service:', this.user);
      console.log('User name:', this.user.username);
    });

  }
  onWishListClick(): void {
    this.wishListClicked.emit();
  }

  goToAccount() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.router.navigate(['/admin-dashboard']);
      this.isAdmin=true;
    }
    else if (this.user) {
      this.router.navigate(['/my-account']);
    } else {
      this.router.navigate(['/login']);
    }
  }
  
  // בתוך NavComponent, הוסיפי את ה-getter:
  get displayedUsername(): string {
    if (this.user && this.user.username === 'aaa') {
      return 'admin';
    }
    return this.user ? this.user.username : '';
  }
  onLogout(): void {
    // טיפול בהתנתקות – למשל לשדר אירוע ולהפנות לדף כניסה
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    window.location.reload();
    window.location.href = '/';
  }
   toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

}
