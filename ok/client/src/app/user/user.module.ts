import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { AgmComponent } from './agm/agm.component';
import { ChuxeComponent } from './chuxe/chuxe.component';
import { KhachhangComponent } from './khachhang/khachhang.component';
import { AgmCoreModule } from '@agm/core';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      {
        path: 'home', component: HomeComponent
        // canActivate: [AuthGuard],
        // data: { roles: [ROLES.SUPER_ADMIN] },
      },
      {
        path: 'chuxe', component: ChuxeComponent
      },
      {
        path: 'khachhang', component: KhachhangComponent
      },
      {
        path: 'profile/:id', component: ProfileComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgmCoreModule,
    AngularDateTimePickerModule
  ],
  declarations: [
    UserComponent,
    HomeComponent,
    AgmComponent,
    ChuxeComponent,
    KhachhangComponent,
    ProfileComponent]
})
export class UserModule { }
