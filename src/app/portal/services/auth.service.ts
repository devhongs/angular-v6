import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';


@Injectable()
export class AuthService {
    private BASE_URL = 'http://localhost:1337';

    constructor(private http: HttpClient) {}

    setToken(token: string) {
        console.log('setToken', token)
        localStorage.setItem('token', token);
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    removeToken() {
        localStorage.removeItem('token');
    }

    logIn(id: string, password: string): Observable<User> {
        const user: User = {
            id: id,
            password:password,
            email: 'red@google.com',
            token: 'tokenstringvalue',
        };
        return Observable.of(user);
        // const url = `${this.BASE_URL}/login`;
        // return this.http.post<User>(url, {email, password});
    }

    signUp(email: string, password: string): Observable<User> {
        const url = `${this.BASE_URL}/register`;
        return this.http.post<User>(url, {email, password});
    }

    getStatus(): Observable<User> {
        const url = `${this.BASE_URL}/status`;
        return this.http.get<User>(url);
    }
}
