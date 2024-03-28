import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
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
import { TableUserComponent } from './components/user/table-user/table-user.component';
import { ViewCompanyComponent } from './components/company/view-company/view-company.component';
import { TableCompanyComponent } from './components/company/table-company/table-company.component';
import { RegisterComponent } from './components/register/register/register.component';
import { LoginComponent } from './components/login/login/login.component';
import { TableRequestComponent } from './components/request/table-request/table-request.component';
import { ViewRequestComponent } from './components/request/view-request/view-request.component';
import { DeleteButtonComponent } from './components/utils/delete-button/delete-button.component';
import { TableAvisoComponent } from './components/aviso/table-aviso/table-aviso.component';
import { ViewAvisoComponent } from './components/aviso/view-aviso/view-aviso.component';
import { UpsertAvisoComponent } from './components/aviso/upsert-aviso/upsert-aviso.component';
import { EditButtonComponent } from './components/utils/edit-button/edit-button.component';
import { CreateButtonComponent } from './components/utils/create-button/create-button.component';
import { NoImageDirective } from './directives/no-image.directive';
import { ImageSelectorModalComponent } from './components/image-selector-modal/image-selector-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ViewProfileComponent,
    UpdateProfileComponent,
    ViewUserComponent,
    TableUserComponent,
    ViewCompanyComponent,
    TableCompanyComponent,
    RegisterComponent,
    LoginComponent,
    TableRequestComponent,
    ViewRequestComponent,
    DeleteButtonComponent,
    TableAvisoComponent,
    ViewAvisoComponent,
    UpsertAvisoComponent,
    EditButtonComponent,
    CreateButtonComponent,
    NoImageDirective,
    ImageSelectorModalComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
