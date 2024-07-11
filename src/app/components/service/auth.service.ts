import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private apiUrlAuthRegister = `${environment.apiUrl}/register`;
  private apiUrlAuthLogin = `${environment.apiUrl}/login`;

  constructor() {}

  register(playload: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrlAuthRegister, playload);
  }

  login(email: string, password: string): Observable<any> {
    return this.httpClient
      .post<any>(this.apiUrlAuthLogin, { email, password })
      .pipe(
        map((response) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
          }
          return response;
        })
      );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
