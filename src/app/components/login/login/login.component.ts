import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { NotificationsService } from 'src/app/services/notifications.service';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formValues: FormGroup;
  usersService =  inject(UsersService);
  notificacionesService = inject(NotificationsService);
  rolesService = inject(RolesService);
  router = inject(Router);

  constructor() {
    this.formValues = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  async onSubmit() {

    const response = await this.usersService.login(this.formValues.value);

    //Mensaje de error si no va bien
    if (response.fatal) {
      return this.notificacionesService.showError(response.fatal);
    } 

    //Mensaje de error si no va bien
    if (!response.token) {
      return this.notificacionesService.showError("No se ha recuperado el token");
    } 

    //Obtenemos rol
    const tokenDecode = 
      jwtDecode<{ user_role: string, 
        user_id: string, 
        iat: number, 
        exp: number 
      }>(response.token!);

    //Guardamos variables de entorno
    localStorage.setItem('token_requests_browser', response.token);
    localStorage.setItem('role_requests_browser', tokenDecode.user_role);
    localStorage.setItem('user_id', tokenDecode.user_id);

    //Actualizamos el obserbale de logged y role
    this.usersService.changeLogin(true);
    this.usersService.changeRole(tokenDecode.user_role);

    //Notificamps que ha ido bien y redirigimos a avisos
    this.router.navigate(['/avisos']);
  }

}