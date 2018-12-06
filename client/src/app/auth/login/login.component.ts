import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../@http-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { STATUS } from '../../@http-service/config/status.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input()
  public username = '';
  public password = '';
  public title = 'Đăng nhập';
  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    const payload = {
      id: this.username,
      password: this.password
    };
    this.authService.login(payload).subscribe((data: any) => {
      console.log(data, 'data');
      this.authService.getResponse(data);
      if (data.checkUser.Role === STATUS.ROLE.KHACHHANG) {
        this.router.navigate(['user/khachhang']);
      }
      if (data.checkUser.Role === STATUS.ROLE.CHUXE) {
        this.router.navigate(['user/chuxe']);
      }
      this.toastr.success( 'Đăng nhập thành công' + ' !', 'Thành công');
    }, error => {
      this.toastr.error( error + '` !', 'Error');
    });
  }

}
