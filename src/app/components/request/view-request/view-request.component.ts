import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from 'src/app/interfaces/request.interface';
import { NotificationsService } from 'src/app/services/notifications.service';
import { RequestsService } from 'src/app/services/requests.service';
import { RolesService } from 'src/app/services/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent {

  requestService = inject(RequestsService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  notificationsService = inject(NotificationsService)

  requestForm: FormGroup;
  requestExist: boolean = false; 
  url_param = 'users';
  id: number = 0;
  isUpdate : boolean = false;
  buttonName: string = '';
  sizeValue: string = '';
  userIdValue: string = '';

  deleteAllowed : boolean = false;

  constructor(){
        this.requestForm = new FormGroup({
          id: new FormControl('', []),
          name: new FormControl('', [Validators.required]),
          description: new FormControl(''),
          url: new FormControl('', [Validators.required]),
          size: new FormControl('', [Validators.required]),
          is_exist: new FormControl('0', [Validators.required]),
          is_stock: new FormControl('0', [Validators.required]),
          user_id: new FormControl('', [Validators.required]),
          company_id: new FormControl('', [Validators.required])
        }, []);
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
      if (!this.id) {
        this.isUpdate = false;
        this.buttonName = "Crear";
        return;
      } 
      //Si tiene id, recuperamos la request
      this.isUpdate = true;
      this.buttonName = "Actualizar";
      try {
        let response: any = await this.requestService.getById(this.id);
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
    const request: Request = response;
    console.log(request); 
    this.sizeValue = request.size;
    this.userIdValue = request.user_id.toString();

    this.requestForm = new FormGroup({
      id: new FormControl(request.id,[]),
      name: new FormControl(request.name,[Validators.required]),
      description: new FormControl(request.description),
      url: new FormControl(request.url,[Validators.required]),
      size: new FormControl(request.size,[Validators.required]),
      is_exist: new FormControl(request.is_exist,[Validators.required]),
      is_stock: new FormControl(request.is_stock,[Validators.required]),
      user_id: new FormControl(request.user_id,[Validators.required]),
      company_id: new FormControl(request.company_id,[Validators.required])
    }, []);
   
  }


  
  async submitRequest(){
    //Creamos una nueva petición
    if (!this.isUpdate){
      try{
        const request = this.requestForm.value;
        const response = await this.requestService.create(request);

        //Mensaje de error si no va bien
        if (response.fatal) {
          return this.notificationsService.showError(response.fatal);
        }

        //Lanzamos mensaje de que todo ha ido bien
        Swal.fire(
          'Enhorabuena!',
          'Se ha creado la petición con ID ' + response.id + '.',
          'success'
        )
        this.router.navigate(['/'+ this.url_param + '/' + response.id]);
        return;
      }catch(error){
        console.log(error);
        this.notificationsService.showError('No has rellenado los datos de la request');
      }
    }
    // Se actualiza la petición
    try{
      const request =  this.requestForm.value;
      delete request["id"];
      const response = await this.requestService.update(request, this.id);
      
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

  // Botón "Cancelar"
  back(){
    this.router.navigate(['/' + this.url_param]);
  }

  // Control de errores en formulario
  controlError(nombreCampo: string, tipoError: string): boolean {
    if (this.requestForm.get(nombreCampo)?.hasError(tipoError) && 
        this.requestForm.get(nombreCampo)?.touched) 
    {
      return true
    }
    return false
  }
}
