import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  usuariosService = inject(UsersService); 
  router = inject(Router);

  loggedIn: boolean = false;
  roleValue: String = "";
  roleAdminKey: String = RolesService.roleAdmin;
  roleRegularKey: String = RolesService.roleRegular;

  searchQuery: string = '';
  iconColorBefore: string = 'black';
  iconColorAfter: string = '#fff';
  showSearchIconBefore: boolean = true;
  showSearchIconAfter: boolean = false;

  ngOnInit() {
    this.usuariosService.logged.subscribe(value => {
      console.log(`Observable: ${value}`);
      this.loggedIn = value;
    });
    this.usuariosService.role.subscribe(value => {
      console.log(`Observable: ${value}`);
      this.roleValue = value;
    });
  }

  updateIconColor(): void {
    if (this.searchQuery.trim() !== '') {
        this.iconColorBefore = '#fff';
        this.iconColorAfter = 'black';
        this.showSearchIconBefore = false;
        this.showSearchIconAfter = true;
    } else {
        this.iconColorBefore = 'black';
        this.iconColorAfter = '#fff';
        this.showSearchIconBefore = true;
        this.showSearchIconAfter = false;
    }
  }
  

  onClickLogout() {
    localStorage.removeItem('token_requests_browser');
    this.usuariosService.changeLogin(false);
    this.router.navigate(['/login']);
  }
}
