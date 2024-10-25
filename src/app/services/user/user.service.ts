import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthRequest } from 'src/app/models/interfaces/auth/AuthRequest';
import { AuthResponse } from 'src/app/models/interfaces/auth/AuthResponse';
import { SingnupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { SingnupUserResponse } from 'src/app/models/interfaces/user/SingnupUserResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.API_URL;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  signupUser(requestData: SingnupUserRequest): Observable<SingnupUserResponse> {
    return this.http.post<SingnupUserResponse>(
      `${this.API_URL}/user`, requestData
    );
  }

  authUser(requestData: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth`, requestData);
  }

  isLoggedIn(): boolean {
    const JWT_TOKEN = this.cookieService.get('USER_INFO');
    return JWT_TOKEN ? true : false;
  }

}
