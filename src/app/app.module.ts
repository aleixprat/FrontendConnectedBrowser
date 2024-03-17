import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home/home.component';
import { HeaderComponent } from './components/header/header/header.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { ViewProfileComponent } from './components/profile/view-profile/view-profile.component';
import { UpdateProfileComponent } from './components/profile/update-profile/update-profile.component';
import { ViewUserComponent } from './components/user/view-user/view-user.component';
import { UpsertUserComponent } from './components/user/upsert-user/upsert-user.component';
import { TableUserComponent } from './components/user/table-user/table-user.component';
import { ViewCompanyComponent } from './components/company/view-company/view-company.component';
import { UpsertCompanyComponent } from './components/company/upsert-company/upsert-company.component';
import { TableCompanyComponent } from './components/company/table-company/table-company.component';
import { RegisterComponent } from './components/register/register/register.component';
import { LoginComponent } from './components/login/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ViewProfileComponent,
    UpdateProfileComponent,
    ViewUserComponent,
    UpsertUserComponent,
    TableUserComponent,
    ViewCompanyComponent,
    UpsertCompanyComponent,
    TableCompanyComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
