import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs/operators';
import { IUser } from './user.model';

@Injectable()
export class AuthService {
  currentUser: IUser;

  constructor(private http: HttpClient) { }

  loginUser(username: string, password: string) {
    const loginInfo = { username: username, password: password };
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    this.http.post('/api/login', loginInfo, options)
      .pipe(
        tap(data => {
          this.currentUser = <IUser>data['user'];
        }),
        catchError(err => {
          return of(false);
        })
      );
  }
}