import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  username: string | null = localStorage.getItem('user');

  constructor(private router: Router) { }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
