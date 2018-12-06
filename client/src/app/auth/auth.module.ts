import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { DangkiComponent } from './dangki/dangki.component';


const routes: Routes = [
  {
    path: '', component: AuthComponent,
    children: [
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'dangki', component: DangkiComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [
    LoginComponent,
    AuthComponent,
    DangkiComponent]
})
export class AuthModule { }
