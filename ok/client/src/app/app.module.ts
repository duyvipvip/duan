import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthService, AuthHttpInterceptorService } from './@http-service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Page404Component } from './page404/page404.component';
import { GlobalConfig, ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';

const toastConfig: Partial<GlobalConfig> = {
  timeOut: 10000,
  positionClass: 'toast-bottom-right',
  preventDuplicates: true,
};

const routes: Routes = [
  {
    path: '', component: AppComponent, children: [
      {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
      {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
      {path: 'user', loadChildren: './user/user.module#UserModule'}
    ]
  },
  { path: '**', component: Page404Component }
];

@NgModule({
  declarations: [
    AppComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ToastrModule.forRoot(toastConfig),
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBtHJaP8NyKmn0-sOaMS_WJ5lj8Hu2HrI0'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthHttpInterceptorService,
          multi: true
        },
        AuthService
      ],
    };
  }
 }
