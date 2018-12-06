import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG } from './config/api.config';
import { STATUS } from './config/status.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChuxeService {
  private header = {headers: {'x-access-token': localStorage.getItem('token')}}
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  danhSachCacChuyenDiChuaCoChuXe() {
    return this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.CHUXE.DANHSACHCHUYENDICHUACOCHUXE}`, this.header);
  }

  nhanChuyenDi(idChuyenDi) {
    return this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.CHUXE.NHANCHUYENDI}${idChuyenDi}`, this.header);
  }

  thongTinCoBanChuXe() {
    return this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.CHUXE.THONGTINCOBANCHUXE}`, this.header);
  }

  capNhatThongTinChuXe(payload) {
    return this.http.put(`${APICONFIG.BASEPOINT}${APICONFIG.CHUXE.CAPNHATTHONGTINCHUXE}`, payload, this.header);
  }
}
