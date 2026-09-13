import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCreds, RegisterCreds, User } from '../../types/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/api/';
  currentUser = signal<User | null>(null);


  register(crds: RegisterCreds) {
    return this.http.post<User>(this.baseUrl + 'account/register', crds).pipe(
      tap(user => {
        if (user)
          this.setCurrentUser(user);
      })
    )
  }

  login(crds: LoginCreds) {
    return this.http.post<User>(this.baseUrl + 'account/login', crds).pipe(
      tap(user => {
        if (user)
          this.setCurrentUser(user);
      })
    );

  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user)
  }
}
