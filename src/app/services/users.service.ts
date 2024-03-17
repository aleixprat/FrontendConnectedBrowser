import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string;
  private _logged: BehaviorSubject<boolean>;
  private _role: BehaviorSubject<String>;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.apiUrl + '/api/user';
    this._logged = new BehaviorSubject(
                    localStorage.getItem('token_requests_browser') ? true : false);
    
    let roleValue : String | any;
    roleValue = new BehaviorSubject(
      localStorage.getItem('role_requests_browser'));
    this._role = roleValue;
  }

  get logged() {
    return this._logged.asObservable();
  }

  changeLogin(logged: boolean) {
    this._logged.next(logged);
  }

  get role() {
    return this._role.asObservable();
  }
  changeRole (updateRole: String) : void {
    this._role.next(updateRole);
  }

  register(values: { username: string, email: string, password: string }) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/register`, values)
    )
  }

  login(values: { email: string, password: string }) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/login`, values)
    )
  }

  isLogged(): boolean {
    return localStorage.getItem('token_requests_browser') ? true : false;
  }

  
}
