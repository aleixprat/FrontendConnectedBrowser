import { Component, inject } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { RequestsService } from 'src/app/services/requests.service';
import { RolesService } from 'src/app/services/roles.service';
import { TablaRefreshService } from 'src/app/services/tabla-refresh.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-table-request',
  templateUrl: './table-request.component.html',
  styleUrls: ['./table-request.component.css']
})
export class TableRequestComponent {
  requests: any[];
  requestsService = inject(RequestsService);
  notificationService = inject(NotificationsService); 
  url_param : string = "requests";
  deleteAllowed: boolean = false;
  
  constructor(private tablaRefreshService: TablaRefreshService) {
    this.requests = [];
    //Pintamos la tabla con los datos
    this.tablaRefreshService.refreshTablaSubject.subscribe(value => {
      this.printTable()
    });
  }

  async ngOnInit(): Promise<void> {
    //Si es admin permitimos eliminar
    var getRole : any = localStorage.getItem('role_requests_browser');
    if (getRole == RolesService.roleAdmin) {
      this.deleteAllowed = true;
    } 
  }
 
  async printTable() :Promise<void> {
    try{
      let response = await this.requestsService.getAll();
      if (response.fatal) {
        return this.notificationService.showError(response.fatal);
      }
      this.requests= response;
    } catch(error){
      this.notificationService.showError("Algo ha ido mal al cargar la tabla, mira el error en la consola");
      console.log(error)
    }
  }
}
