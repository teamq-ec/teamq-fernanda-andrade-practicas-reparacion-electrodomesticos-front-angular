import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private apiUrlAuth = `${environment.apiUrl}/register`;

  constructor() {}

  register(playload: User) : Observable<User> {
    return this.httpClient.post<User>(this.apiUrlAuth , playload);
  }
}
