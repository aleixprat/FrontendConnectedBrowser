import { Component, inject } from '@angular/core';
import { CompaniesService } from 'src/app/services/companies.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { RolesService } from 'src/app/services/roles.service';
import { TablaRefreshService } from 'src/app/services/tabla-refresh.service';

@Component({
  selector: 'app-table-company',
  templateUrl: './table-company.component.html',
  styleUrls: ['./table-company.component.css']
})
export class TableCompanyComponent {
  companies: any[];
  companiesService = inject(CompaniesService);
  notificationService = inject(NotificationsService); 
  url_param : string = "companies";
  deleteAllowed: boolean = false;
  
  constructor(private tablaRefreshService: TablaRefreshService) {
    this.companies = [];
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
      let response = await this.companiesService.getAll();
      if (response.fatal) {
        return this.notificationService.showError(response.fatal);
      }
      this.companies= response;
    } catch(error){
      this.notificationService.showError("Algo ha ido mal al cargar la tabla, mira el error en la consola");
      console.log(error)
    }
  }
  
}
