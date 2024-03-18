import { Component, inject } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { RequestsService } from 'src/app/services/requests.service';
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
  
  constructor(private tablaRefreshService: TablaRefreshService) {
    this.requests = [];
    //Pintamos la tabla con los datos
    this.tablaRefreshService.refreshTablaSubject.subscribe(value => {
      this.printTable()
    });
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
