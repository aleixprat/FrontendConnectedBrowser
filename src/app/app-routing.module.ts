import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { ViewProfileComponent } from './components/profile/view-profile/view-profile.component';
import { LoginGuard } from './guards/login.guard';
import { TableCompanyComponent } from './components/company/table-company/table-company.component';
import { RoleGuard } from './guards/role.guard';
import { RolesService } from './services/roles.service';
import { ViewCompanyComponent } from './components/company/view-company/view-company.component';
import { UpsertCompanyComponent } from './components/company/upsert-company/upsert-company.component';
import { UpsertUserComponent } from './components/user/upsert-user/upsert-user.component';
import { TableUserComponent } from './components/user/table-user/table-user.component';
import { ViewUserComponent } from './components/user/view-user/view-user.component';
import { RegisterComponent } from './components/register/register/register.component';
import { LoginComponent } from './components/login/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home',component: HomeComponent},
  { path: 'register', 
    component: RegisterComponent,
    canActivate: [LoginGuard],
    data: {pantallaLogin : true}
  },
  { path: 'login', 
    component: LoginComponent,
    canActivate: [LoginGuard],
    data: {pantallaLogin : true}
  },
  { path: 'companies', 
    component: TableCompanyComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [RolesService.roleRegular, RolesService.roleAdmin]}
  },
  { path: 'company/:id', 
    component: ViewCompanyComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [ RolesService.roleAdmin]}
  },
  { path: 'company/new', 
    component: UpsertCompanyComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [ RolesService.roleAdmin]}
  },
  { path: 'users', 
    component: TableUserComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [ RolesService.roleAdmin]}
  },
  { path: 'user/:id', 
    component: ViewUserComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [ RolesService.roleAdmin]}
  },
  { path: 'user/new', 
    component: UpsertUserComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [ RolesService.roleAdmin]}
  },
  { path: 'profile', 
    component: ViewProfileComponent,
    canActivate: [LoginGuard,RoleGuard],
    data: {role : [ RolesService.roleAdmin]}
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
