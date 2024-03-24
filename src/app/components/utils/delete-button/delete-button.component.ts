import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { NotificationsService } from 'src/app/services/notifications.service';
import { TablaRefreshService } from 'src/app/services/tabla-refresh.service';
import { RequestsService } from 'src/app/services/requests.service';
import { CompaniesService } from 'src/app/services/companies.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})

export class DeleteButtonComponent {

  @Input() url_param : string = "";
  @Input() id : number | undefined;
  @Input() isIcon : boolean = false;

  notificationsService = inject(NotificationsService);
  tablaRefreshService = inject(TablaRefreshService);
  location = inject(Location);
  activatedRoute= inject(ActivatedRoute);
  requestsService = inject(RequestsService);
  companiesService = inject(CompaniesService);
  usersService = inject(UsersService);
  nombreMensaje : string = "";


  modalDelete(url_name:string,id: number | undefined) : void {
    Swal.fire({
      title: 'Deseas borrar el ' + url_name + ' ' + id + ' ?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        //consultar al servicio para hacer el borrado.
        this.deleteInstance(url_name,id);
      } 
    })
  }

  async deleteInstance(url_name: string, id: number | undefined): Promise<void> {
    
    if (id == undefined) {
      return;
    }
    
    try {
      
      //Miramos que servicio debemos consultar
      let response : any;
      switch (url_name) {
        case 'requests':
          response = await this.requestsService.delete(id);
          this.nombreMensaje = "la petición";
          break;
        case 'companies':
          response = await this.companiesService.delete(id);
          this.nombreMensaje = "la empresa";
          break;
        case 'users':
          response = await this.usersService.delete(id);
          this.nombreMensaje = "el usuario";
          break;
        default: 
          this.notificationsService.showError("no esta bien programado error con el parametro url_param");
      }

      if (!response) {
        this.notificationsService.showError("no esta bien programado error con el parametro url_param");
        return;
      }
      if(response.fatal) {
        this.notificationsService.showError(response.fatal);
        return;
      }
      
      //Lanzamos mensaje de que todo ha ido bien
      Swal.fire(
        'Borrado!',
        'Se a borrado ' + this.nombreMensaje + ' ' + response.id + ' correctamente.',
        'success'
      )
      
      //Si tiene params significara que esta en la vista editar,sino en la tabla
      this.activatedRoute.params.subscribe( async (params: any) : Promise<void> => {
        if (params.id) {
          this.location.back();
        } else {
          //Actualizamos la tabla ya que no lo hace de por si solo
          console.log("componente boton delete");
          this.tablaRefreshService.refreshTabla();
        }
      });

    } catch (err) {
      return this.notificationsService.showError("Algo ha ido mal");
      console.log(err);
    }
  }
}
