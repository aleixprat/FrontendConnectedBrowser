import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Request } from '../interfaces/request.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  baseUrl: string = '';

  constructor(private httpClient: HttpClient) { 

     // URL
     this.baseUrl = environment.apiUrl + '/api/request';
  }

  //Obtención de todos los requests
  getAll() : Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_requests_browser')!
      })
    }
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`,httpOptions)) 
  }

  //Obtener mediante el ID
  getById(pId: number) : Promise<Request> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_requests_browser')!
      })
    }
    return lastValueFrom(this.httpClient.get<Request>(`${this.baseUrl}/${pId}`, httpOptions))
  }

  // Crear un nuevo camión
  create(request: Request): Promise <Request | any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Authorization': localStorage.getItem('token_requests_browser')!
      })
    }
    return lastValueFrom(this.httpClient.post<Request>(`${this.baseUrl}`, request, httpOptions))
  }

  // Actualizar un nuevo camión
  update(request: Request, id : number): Promise<Request | any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Authorization': localStorage.getItem('token_requests_browser')!
      })
    }
    return lastValueFrom(this.httpClient.put<Request>(`${this.baseUrl}/${id}`, request, httpOptions))
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
