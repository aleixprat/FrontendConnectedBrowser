import { Component,inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UsersService } from 'src/app/services/users.service';
import { confirmPasswordValidator } from 'src/app/validator/confirm-password.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formValues: FormGroup;
  usersService = inject(UsersService);
  notificationsService = inject(NotificationsService);
  router = inject(Router);

  constructor(){
    this.formValues = new FormGroup({
      id: new FormControl('', []),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      repeat: new FormControl('',[Validators.required]),
      telephone: new FormControl('',[Validators.required])
    }, {validators: [confirmPasswordValidator]});
  }

  async onSubmit() {
    const user = this.formValues.value;
    delete user.repeat;
    const response = await this.usersService.register(user);

    console.log(response);
    //Comprobamos que se ha insertado
    if (!response.insertId) {
      return this.notificationsService.showError("Registro erroneo");
    }
    
    //Mensaje de error si no va bien
    if (response.fatal) {
      return this.notificationsService.showError(response.fatal);
    } 

    //Lanzamos mensaje de que todo ha ido bien
    Swal.fire(
      'Enhorabuena!',
      'Se ha registrado correctamente ' + user.username + ', procede a logearse.',
      'success'
    )
    this.router.navigate(['/login']);
  }

    // Control de errores en formulario
    controlError(nombreCampo: string, tipoError: string): boolean {
      if (this.formValues.get(nombreCampo)?.hasError(tipoError) && 
          this.formValues.get(nombreCampo)?.touched) 
      {
        return true
      }
      return false
    }
}
