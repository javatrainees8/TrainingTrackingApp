import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  private apiUrl = 'http://localhost:4444';
  private tokenKey = 'jwt_token'; // Key for storing JWT token in local storage
  private roleKey = 'user_role'; // Key for storing user role in local storage

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, { username, password }).pipe(
      tap(response => {
        const token = response.token;
        const role = response.role;
        this.setToken(token);
        this.setRole(role);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  getToken(): any {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token:any): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getRole(): any {
    return localStorage.getItem(this.roleKey);
  }

  setRole(role: string): void {
    localStorage.setItem(this.roleKey, role);
  }

  isAdmin(): boolean {
    const role = this.getRole();
    return role === 'admin';
  }

  isTeacher(): boolean {
    const role = this.getRole();
    return role === 'teacher';
  }
}
  

