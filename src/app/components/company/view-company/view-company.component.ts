import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/interfaces/company.interface';
import { CompaniesService } from 'src/app/services/companies.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { RolesService } from 'src/app/services/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent {
  companiesService = inject(CompaniesService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  notificationsService = inject(NotificationsService)

  companyForm: FormGroup;
  url_param = 'companies';
  id: number = 0;
  isUpdate : boolean = false;
  buttonName: string = '';
  img_value: string = '';

  deleteAllowed : boolean = false;

  constructor(){
        this.companyForm = new FormGroup({
          id: new FormControl('', []),
          name: new FormControl('', [Validators.required]),
          description: new FormControl(''),
          img: new FormControl(''),
          name_img: new FormControl('')
        }, []);
      }



  async ngOnInit(): Promise<void> {

    //Si es admin permitimos eliminar
    var getRole : any = localStorage.getItem('role_requests_browser');
    if (getRole == RolesService.roleAdmin) {
      this.deleteAllowed = true;
    } 

    const imgControl = this.companyForm.get('img');
    if (imgControl) {
      imgControl.valueChanges.subscribe((newValue) => {
        this.img_value = newValue; // Actualizar el campo 'name_img' con el mismo valor
      });
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
        let response: any = await this.companiesService.getById(this.id);
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
    const company: Company = response;

    this.companyForm = new FormGroup({
      id: new FormControl(company.id,[]),
      name: new FormControl(company.name,[Validators.required]),
      description: new FormControl(company.description),
      img: new FormControl(company.img),
      name_img: new FormControl(company.name_img)
    }, []);
   
  }
  
  async submitRequest(){
    //Creamos una nueva petición
    if (!this.isUpdate){
      try{
        const request = this.companyForm.value;
        const response = await this.companiesService.create(request);

        //Mensaje de error si no va bien
        if (response.fatal) {
          return this.notificationsService.showError(response.fatal);
        }

        //Lanzamos mensaje de que todo ha ido bien
        Swal.fire(
          'Enhorabuena!',
          'Se ha creado la empresa con ID ' + response.id + '.',
          'success'
        )
        this.router.navigate(['/' + this.url_param + '/' + response.id]);
        return;
      }catch(error){
        console.log(error);
        this.notificationsService.showError('No has rellenado los datos de la empresa');
      }
    }
    // Se actualiza la petición
    try{
      const request =  this.companyForm.value;
      delete request["id"];
      const response = await this.companiesService.update(request, this.id);
      
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
    if (this.companyForm.get(nombreCampo)?.hasError(tipoError) && 
        this.companyForm.get(nombreCampo)?.touched) 
    {
      return true
    }
    return false
  }
}
