import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../classes/user';

@Component({
  selector: 'app-my-account',
  imports: [RouterLink],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss'
})
export class MyAccountComponent {
  user: User | null = null;
  constructor(private userServiCe:UserService,private router:Router){

  }

  logout():void{
    console.log("enter logout")
    this.userServiCe.logout()
    this.router.navigate(['/']);
    
  }
  

  
}
