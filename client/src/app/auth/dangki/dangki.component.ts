import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../@http-service';
import { Router } from '@angular/router';
import { STATUS } from '../../@http-service/config/status.config';

@Component({
  selector: 'app-dangki',
  templateUrl: './dangki.component.html',
  styleUrls: ['./dangki.component.css']
})
export class DangkiComponent implements OnInit {
  loaiDangKi = [
    {
      value: 'ChuXe',
      name: 'Chủ xe'
    },
    {
      value: 'KhachHang',
      name: 'Khách hàng'
    }
  ];
  TenDangNhap: String;
  email: String;
  matKhau: String;
  nhapLaiMatKhau: String;
  dangki: String = 'ChuXe';
  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    document.body.classList.add('bg-img');
  }

  dangKiUser() {
    console.log(this.dangki, 'dangki');
    if (!this.TenDangNhap){
      this.toastr.error('Tên đăng nhập không được bỏ trống', 'Error');
    }
    if (!this.matKhau) {
      this.toastr.error('Mật khẩu không được bỏ trống', 'Error');
    }
    // so sánh mật khẩu và nhập lại mật khẩu xem có trùng khớp k
    if (((this.matKhau.toString()).localeCompare(this.nhapLaiMatKhau.toString()) !== 0)) {
      this.toastr.error('mật khẩu không khớp, vui lòng thử lại', 'Error');
    } else {
      const payload = {
        TenDangNhap: this.TenDangNhap,
        Email: this.email,
        Password: this.matKhau,
        Role: this.dangki
      };
      this.authService.dangki(payload).subscribe((data: any) => {
        this.toastr.success( 'Đăng kí thành công' + ' !', 'Thành công');
        localStorage.setItem('token', data.token);
        if (payload.Role === STATUS.ROLE.KHACHHANG) {
          this.router.navigate(['user/khachhang']);
        } else {this.router.navigate(['user/chuxe']); }
      }, (err) => {
        this.toastr.error(err.error.message, 'Lỗi!')
      });
    }
  }

  setDangKi(event) {
    if (event.target.value === this.loaiDangKi[0].name) {
      this.dangki = this.loaiDangKi[0].value;
    } else {
      this.dangki = this.loaiDangKi[1].value;
    }
  }

}
