import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  static roleAdmin : String = "admin"; 
  static roleRegular : String = "regular";   

  constructor() { }
}
