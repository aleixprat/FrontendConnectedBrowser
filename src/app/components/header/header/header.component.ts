import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
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

  ngOnInit() {
    this.usuariosService.logged.subscribe(value => {
      console.log(`Observable: ${value}`);
      this.loggedIn = value;
    });
  }

  onClickLogout() {
    localStorage.removeItem('token_requests_browser');
    this.usuariosService.changeLogin(false);
    this.router.navigate(['/login']);
  }
}
