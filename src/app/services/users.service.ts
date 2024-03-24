import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';


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

  register(values: { username: string, email: string, password: string, telephone: string }) {
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

  /** Basico CRUD ****************************/
  //Obtención de todos los usuarios
  getAll() : Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_requests_browser')!
      })
    }
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`,httpOptions)) 
  }

  //Obtener mediante el ID
  getById(pId: number) : Promise<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_requests_browser')!
      })
    }
    return lastValueFrom(this.httpClient.get<User>(`${this.baseUrl}/${pId}`, httpOptions))
  }

  // Crear un nuevo camión
  create(user: User): Promise <User | any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Authorization': localStorage.getItem('token_requests_browser')!
      })
    }
    return lastValueFrom(this.httpClient.post<User>(`${this.baseUrl}`, user, httpOptions))
  }

  // Actualizar un nuevo camión
  update(user: User, id : number): Promise<Request | any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Authorization': localStorage.getItem('token_requests_browser')!
      })
    }
    return lastValueFrom(this.httpClient.put<User>(`${this.baseUrl}/${id}`, user, httpOptions))
  }

  // Eliminar un camión
  delete(id: number): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_requests_browser')!
      })
    }
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/${id}`, httpOptions))
   
  }
  
}
