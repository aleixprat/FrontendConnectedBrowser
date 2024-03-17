import { Component,inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formValues: FormGroup;
  usersService = inject(UsersService);
  notificacionesService = inject(NotificationsService);
  router = inject(Router);

  constructor(){
    this.formValues = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      telephone: new FormControl()
    });
  }

  async onSubmit() {
    const response = await this.usersService.register(this.formValues.value);

    if (!response.insertId) {
      return this.notificacionesService.showError("Registro erroneo");
    }
    
    //Mensaje de error si no va bien
    if (response.fatal) {
      return this.notificacionesService.showError(response.fatal);
    } 

    this.notificacionesService.showInfo("Se ha registrado correctamente, procede a logearse.");
    this.router.navigate(['/login']);
  }
}
