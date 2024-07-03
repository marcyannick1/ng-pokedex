import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements  OnInit{
  isLoggedIn: boolean | undefined;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn()
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/login']);
  }
}
