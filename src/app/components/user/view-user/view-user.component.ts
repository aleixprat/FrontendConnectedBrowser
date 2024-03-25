import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { NotificationsService } from 'src/app/services/notifications.service';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';
import { confirmPasswordValidator } from 'src/app/validator/confirm-password.validator';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { ImageSelectorModalComponent } from '../../image-selector-modal/image-selector-modal.component';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {
  usersService = inject(UsersService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  notificationsService = inject(NotificationsService)

  userForm: FormGroup;
  url_param : string = "users";
  id: number = 0;
  isUpdate : boolean = false;
  buttonName: string = '';
  roleValue: string = '';
  deleteAllowed : boolean = false;
  img_selected_src : string = '';
  img_name_alt : string = '';
  rutasDeImagenes: string[] = [
    '/assets/images/avatars/hombre.png',
    '/assets/images/avatars/hombre_2.png',
    '/assets/images/avatars/hombre_3.png',
    '/assets/images/avatars/hombre_4.png',
    '/assets/images/avatars/hombre_5.png',
    '/assets/images/avatars/perfil.png',
    '/assets/images/avatars/perfil_2.png',
    '/assets/images/avatars/mujer.png',
    '/assets/images/avatars/mujer_2.png',
    '/assets/images/avatars/mujer_3.png'
  ];


  constructor(private modalService: BsModalService){
    this.userForm = new FormGroup({
      id: new FormControl('', []),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      repeat: new FormControl('',[Validators.required]),
      role: new FormControl('', [Validators.required]),
      telephone: new FormControl('', [Validators.required]),
      img: new FormControl(''),
      name_img: new FormControl(''),
    }, {validators: [confirmPasswordValidator]});
  }



  async ngOnInit(): Promise<void> {

    

    //Si es admin permitimos eliminar
    var getRole : any = localStorage.getItem('role_requests_browser');
    if (getRole == RolesService.roleAdmin) {
      this.deleteAllowed = true;
    } 

    //Recuperamos parametros
    this.activatedRoute.params.subscribe(async (params:any)=> {
      this.id = (params.id); 
      //Si no tiene id, significa que creamos
      console.log(this.id);
      if (!this.id) {
        this.isUpdate = false;
        this.buttonName = "Crear";
        return;
      } 
      //Si tiene id, recuperamos el user
      this.isUpdate = true;
      this.buttonName = "Actualizar";
      try {
        let response: any = await this.usersService.getById(this.id);
        if (response.fatal) {
          return this.notificationsService.showError(response.fatal);
        }
        
        this.rellenarCamposForm(response);
      } catch(err) {
        console.log(err);
        this.notificationsService.showError("No ha cargado correctamente la petición");
      };
    }
  )}



  // Rellena los campos si quiere actualizar el camión
  rellenarCamposForm(response : any) {
    const user: User = response;
    this.roleValue = user.role;
    this.img_selected_src = user.img;
    this.img_name_alt = user.name_img;

    this.userForm = new FormGroup({
      id: new FormControl(user.id,[]),
      username: new FormControl(user.username,[Validators.required]),
      email: new FormControl(user.email,[Validators.required]),
      role: new FormControl(user.role,[Validators.required]),
      telephone: new FormControl(user.telephone,[Validators.required]),
      img: new FormControl(user.img),
      name_img: new FormControl(user.name_img)
    }, []);
   
  }

  async submitUser(){
    //Creamos una nueva petición
    if (!this.isUpdate){
      try{
        const user = this.userForm.value;
        delete user.repeat;
        const response = await this.usersService.create(user);
        console.log(response);

        //Mensaje de error si no va bien
        if (response.fatal) {
          return this.notificationsService.showError(response.fatal);
        }

        //Lanzamos mensaje de que todo ha ido bien
        Swal.fire(
          'Enhorabuena!',
          'Se ha creado el usuario con ID ' + response.id + '.',
          'success'
        )
        this.router.navigate(['/' + this.url_param + '/' + response.id]);
        return;
      }catch(error){
        console.log(error);
        this.notificationsService.showError('No has rellenado los datos del usuario');
      }
    }
    // Se actualiza la petición
    try{
      const user =  this.userForm.value;
      delete user["id"];
      const response = await this.usersService.update(user, this.id);
      
      //Mensaje de error si no va bien
      if (response.fatal) {
        return this.notificationsService.showError(response.fatal);
      }

      this.notificationsService.showInfo("Se ha actualizado correctamente el usuario");
    }catch(error){
      console.log(error);
      this.notificationsService.showError('No se ha actualizado correctamente el usuario.');
    }
  };

  //Para seleccionar la imágen
  openImageSelectorModal() {
    const initialState = {
      images: this.rutasDeImagenes
    };
    const modalRef: BsModalRef = this.modalService.show(ImageSelectorModalComponent, { initialState });
    modalRef.content.imageSelected.subscribe((imageSrc: string) => {
      this.img_selected_src = imageSrc;
      this.userForm.get('img')?.setValue(imageSrc);
    });
  }

  // Botón "Cancelar"
  back(){
    this.router.navigate(['/' + this.url_param]);
  }

  // Control de errores en formulario
  controlError(nombreCampo: string, tipoError: string): boolean {
    if (this.userForm.get(nombreCampo)?.hasError(tipoError) && 
        this.userForm.get(nombreCampo)?.touched) 
    {
      return true
    }
    return false
  }
}
