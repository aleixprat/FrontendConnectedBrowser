import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../interfaces/company.–type=interface';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  baseUrl: string = '';

  constructor(private httpClient: HttpClient) { 

     // URL
     this.baseUrl = environment.apiUrl + '/api/company';
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
  getById(pId: number) : Promise<Company> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token_requests_browser')!
      })
    }
    return lastValueFrom(this.httpClient.get<Company>(`${this.baseUrl}/${pId}`, httpOptions))
  }

  // Crear un nuevo camión
  create(company: Company): Promise <Company>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Authorization': localStorage.getItem('token_requests_browser')!
      })
    }
    return lastValueFrom(this.httpClient.post<Company>(`${this.baseUrl}/nuevo`, company, httpOptions))
  }

  // Actualizar un nuevo camión
  update(company: Company, id : number): Promise<Company | any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Authorization': localStorage.getItem('token_requests_browser')!
      })
    }
    return lastValueFrom(this.httpClient.put<Company>(`${this.baseUrl}/${id}`, company, httpOptions))
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
