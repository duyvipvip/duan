import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG } from './config/api.config';
import { STATUS } from './config/status.config';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  response: any;
  hasCheckToken: boolean = false;
  private header = {headers: {'x-access-token': localStorage.getItem('token')}}
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }

  public login (payload) {
    return this.http.post(`${APICONFIG.BASEPOINT}${APICONFIG.AUTH.LOGIN}`, payload);
  }

  public dangki (payload){
    return this.http.post(`${APICONFIG.BASEPOINT}${APICONFIG.AUTH.DANGKI}`, payload);
  }

  get token() {
    return localStorage.getItem('token');
}
  public getToken(){
    return localStorage.getItem('token');
  }

public getResponse(response) {
    this.response = response;
    localStorage.setItem('token', this.response.token);
    this.storeUser(this.response.payload);
    this.hasCheckToken = true;
}
private storeUser(payload) {
  // this.storeService.dispatcher({ type: 'STORE_USER', payload });
}

  // public getInforByToken(){
  //   return this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.USER.GETINFOBYTOKEN}`,{headers: {'x-access-token': localStorage.getItem('token')}})
  // }

  public checkLogin() {
    const urlCurrent =this.router.url;
    
    this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.USER.GETINFOBYTOKEN}`, this.header).subscribe((data: any) =>{
      if(data.result.user.Role === STATUS.ROLE.ADMIN) {
        
        this.router.navigate(['/admin']);
      }
      else if (data.result.user.Role === STATUS.ROLE.KHACHHANG) {
        const temp = urlCurrent.split('/');
        temp.forEach((element: string) => {
          if(element === 'chuxe' || element === 'admin') {
            this.router.navigate(['/user/khachhang']);
          }
        })
      }
      else if (data.result.user.Role === STATUS.ROLE.CHUXE){
        const temp = urlCurrent.split('/');
        temp.forEach((element: string) => {
          if(element === 'khachhang' || element === 'admin') {
            this.router.navigate(['/user/chuxe']);
          }
        })
      }
    }, (err) => {
      this.toastr.error(err.error.message, 'Lỗi!')
      this.router.navigate(['/auth/login']);
      localStorage.clear();
    })
  }

  getAddress(lat, lng) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBtHJaP8NyKmn0-sOaMS_WJ5lj8Hu2HrI0`;
    return this.http.get(url);
  }
}
