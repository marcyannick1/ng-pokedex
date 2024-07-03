import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private localStorageKey = 'users';

  constructor() { }

  register(username: string | undefined, password: string | undefined): boolean {
    const users = this.getUsers();
    if (users.find(user => user.username === username)) {
      return false; // User already exists
    }
    users.push({ username, password });
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    return true;
  }

  login(username: string | undefined, password: string | undefined): boolean {
    const users = this.getUsers();
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): any {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  private getUsers(): any[] {
    // @ts-ignore
    return JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
  }
}
