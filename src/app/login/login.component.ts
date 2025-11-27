import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';  
  private correctUsername: string = 'Vibha'; //  predefined correct username

  constructor(private router: Router) { }

  login() {
    if(this.username.trim() === this.correctUsername) {
      localStorage.setItem('user', this.username.trim());
      this.router.navigate(['/login']);
    } else {
      alert('Wrong username! Please enter the correct username.');
    }
  }
}
