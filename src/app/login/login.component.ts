import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../services/auth.service';
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;
  errorMessage: string | undefined;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
