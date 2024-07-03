import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../services/auth.service';
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string | undefined;
  password: string | undefined;
  errorMessage: string | undefined;

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    if (this.authService.register(this.username, this.password)) {
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Email deja utilisé';
    }
  }
}
