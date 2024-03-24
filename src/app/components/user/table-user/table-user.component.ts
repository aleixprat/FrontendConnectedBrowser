import { Component, inject } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { RolesService } from 'src/app/services/roles.service';
import { TablaRefreshService } from 'src/app/services/tabla-refresh.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css']
})
export class TableUserComponent {

  users: any[];
  usersService = inject(UsersService);
  notificationService = inject(NotificationsService); 
  url_param : string = "users";
  deleteAllowed: boolean = false;

  constructor(private tablaRefreshService: TablaRefreshService) {
    this.users = [];
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
      let response = await this.usersService.getAll();
      if (response.fatal) {
        return this.notificationService.showError(response.fatal);
      }
      this.users= response;
    } catch(error){
      this.notificationService.showError("Algo ha ido mal al cargar la tabla, mira el error en la consola");
      console.log(error)
    }
  }

}
