import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG } from './config/api.config';
import { STATUS } from './config/status.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class KhachhangService {
  private header = {headers: {'x-access-token': localStorage.getItem('token')}}
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  bookLich(payload) {
    return this.http.post(`${APICONFIG.BASEPOINT}${APICONFIG.KHACHHANG.BOOKCHUYENDI}`, payload, this.header);
  }
}
