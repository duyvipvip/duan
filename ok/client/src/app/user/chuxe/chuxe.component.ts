import { Component, OnInit } from '@angular/core';
import { } from '@agm/core';
import { AuthService } from 'src/app/@http-service';
import { ChuxeService } from 'src/app/@http-service/chuxe.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chuxe',
  templateUrl: './chuxe.component.html',
  styleUrls: ['./chuxe.component.css']
})
export class ChuxeComponent implements OnInit {
  title: string = 'My first AGM project';
  public lat: number = 10.9957289;
  public lng: number = 106.6548287
  zoom: number;
  public icon = {
    url: 'assets/191851-200.png', 
    scaledSize: {
      height: 50,
      width: 50
    }
  };
  khachhang = [
    {
      vitri: {
        lat: '10.9957289',
        lng: '106.6548287'
      },
      name: 'Nguyễn Văn A'
    },
    {
      vitri: {
        lat: '10.98944',
        lng: '106.6742691'
      },
      name: 'Nguyễn Văn B'
    }
  ]
  trangThai =[
    {
      name: 'Rảnh',
      value: 1
    },
    {
      name: 'Bận',
      value: 2
    },
    {
      name: 'Xe bị hỏng',
      value: 3
    },
    {
      name: 'Đang chạy',
      value: 4
    }
  ]
  public trangThaiChuXe = 1;
  toggleLoaiChuyenDi: boolean = false;
  public danhSachChuyenDi =[];
  constructor(
    private authService: AuthService,
    private chuxeService: ChuxeService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCurrentLocation();
    this.chuxeService.thongTinCoBanChuXe().subscribe((res: any) => {
      this.trangThaiChuXe = res.result.TrangThai;
    }, (err) => {
      this.toastr.error(err.error.message, 'Lỗi!')
      // this.router.navigate(['/auth/login']);
      // localStorage.clear();
    })
    this.layDanhSachCacChuyenDi();
  }

  layDanhSachCacChuyenDi() {
    this.chuxeService.danhSachCacChuyenDiChuaCoChuXe().subscribe((res: any) => {
      this.danhSachChuyenDi = res.result;
      this.danhSachChuyenDi.forEach(element => {
        this.authService.getAddress(element.DiemDen[0].lat, element.DiemDen[0].lng).subscribe((data: any) => {
          element["diaDiemDen"] = data.results[0].formatted_address;
        });
        this.authService.getAddress(element.DiemDi[0].lat, element.DiemDi[0].lng).subscribe((data: any) => {
          element["diaDiemDi"] = data.results[0].formatted_address;
        });
      });
    }, (err) => {
      this.toastr.error(err.error.message, 'Lỗi!')
    })
  }

  // LẤY TỌA ĐỘ ĐANG ĐỨNG
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
       this.lat = position.coords.latitude;
       this.lng = position.coords.longitude;
     });
   }
   this.zoom = 15;
  }

  sliderChange(event){
    console.log(event.target.value, 'event');
    
  }

  // testToken(){
  //   this.authService.getInforByToken().subscribe((data)=>{
  //   })
  // }

  changeValueStatus(event) {
    console.log(event.target.selectedIndex + 1, 'event');
    this.trangThaiChuXe = Number(event.target.selectedIndex + 1);
  }

  chapNhanChuyenDi(event) {
    this.chuxeService.nhanChuyenDi(event._id).subscribe((res: any) => {
      if(res) {
        this.toastr.success('Nhận chuyến đi thành công', 'Thành công!');
        this.danhSachChuyenDi = [];
        // this.capNhatTrangThai()
      }
    }, (error) => {
      this.toastr.error(error.error.message, 'Lỗi!')
    })
  }

  capNhatTrangThai() {
    const payload = {
      TrangThai: this.trangThaiChuXe
    }
    this.chuxeService.capNhatThongTinChuXe(payload).subscribe((res: any) => {
      if(res) {
        this.toastr.success('Cập nhật thành công', 'Thành công!');
        if(this.trangThaiChuXe === 1) {
          this.layDanhSachCacChuyenDi();
        } else {
          this.danhSachChuyenDi = [];
        }
      }
    }, (err) => {
      console.log(err, 'err');
      
      this.toastr.error(err.error.message, 'Lỗi!')
    });
  }

}
