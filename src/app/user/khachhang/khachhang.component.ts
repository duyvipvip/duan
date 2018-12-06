import { Component, OnInit } from '@angular/core';
import { DatePicker } from 'angular2-datetimepicker';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/@http-service';
import { KhachhangService } from 'src/app/@http-service/khachhang.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-khachhang',
  templateUrl: './khachhang.component.html',
  styleUrls: ['./khachhang.component.css']
})
export class KhachhangComponent implements OnInit {
  public diaChiDiemDi: any;
  public latDiemDi: any;
  public lngDiemDi: any;
  public diaChiDiemDen: any;
  public latDiemDen: any;
  public lngDiemDen: any;
  public lat: any;
  public lng: any;
  public latTemp: any;
  public lngTemp: any;
  zoom: number;
  public icon = {
    url: 'assets/191851-200.png', 
    scaledSize: {
      height: 50,
      width: 50
    }
  };
  khachhang = [
    // {
    //   vitri: {
    //     lat: '10.9957289',
    //     lng: '106.6548287'
    //   },
    //   name: 'Nguyễn Văn A'
    // },
    {
      vitri: {
        lat: '10.98944',
        lng: '106.6742691'
      },
      name: 'Nguyễn Văn B'
    }
  ]
  toggleLoaiChuyenDi: boolean = false;
  public settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MM-yyyy HH:mm',
    defaultOpen: false
}
  public date: Date = new Date();
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private khachhangService: KhachhangService,
    private toastr: ToastrService
  ) { 
    DatePicker.prototype.ngOnInit = function () {
      this.settings = Object.assign(this.defaultSettings, this.settings);
      if (this.settings.defaultOpen) {
        this.popover = true;
      }
      this.date = new Date();
    };
  }

  ngOnInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    this.latDiemDi = '10.9957289';
    this.lngDiemDi = '106.6548287';
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.setDiemDi(position.coords.latitude, position.coords.longitude);
      //  this.latDiemDi = position.coords.latitude;
      //  this.lngDiemDi = position.coords.longitude;
     });
   }
   this.zoom = 15;
  }

  mapClicked(event) {
    console.log(event, 'event');
    this.latTemp = event.coords.lat;
    this.lngTemp =  event.coords.lng;
  }

  setDiemDi(lat?, lng?) {
    if(lat && lng) {
      this.latDiemDi = lat;
      this.lngDiemDi = lng;
      this.diaChiDiemDi = this.layDiaDiem(this.latDiemDi, this.lngDiemDi, 'di');
    } else {
      this.latDiemDi = this.latTemp;
      this.lngDiemDi = this.lngTemp;
      this.diaChiDiemDi = this.layDiaDiem(this.latDiemDi, this.lngDiemDi, 'di');
    }
  }

  setDiemDen() {
    this.latDiemDen = this.latTemp;
    this.lngDiemDen = this.lngTemp;
    this.diaChiDiemDen = this.layDiaDiem(this.latDiemDen, this.lngDiemDen, 'den');
  }

  layDiaDiem(lat, lng, status) {
    if (navigator.geolocation) {
      this.authService.getAddress(lat, lng).subscribe((res: any) => {
        if (status === 'di') {
          this.diaChiDiemDi = res.results[0].formatted_address;
        } else if (status === 'den') {
          this.diaChiDiemDen = res.results[0].formatted_address;
        }
      })
  }
  }

  bookLich() {
    if (this.toggleLoaiChuyenDi === false) {
      this.date = new Date(Date.now());
    } else {
      const currentTime = new Date(this.date).getTime();
      const dateNow = Date.now();
      if (currentTime < dateNow) {
        this.toastr.error('Thời gian đặt lịch phải lớn hơn thời điểm hiện tại', 'Lỗi!');
        return false;
      }
    }
    if(!this.latDiemDen) {
      this.toastr.error('Bạn chưa chọn điểm đến, vui lòng thử lại', 'Lỗi!');
      return false
    }
    const req = {
      DiemDi: {
        lat: this.latDiemDi,
        lng: this.lngDiemDi
      },
      DiemDen: {
        lat: this.latDiemDen,
        lng: this.lngDiemDen
      },
      ThoiGian: new Date(this.date).toISOString()
    }
    this.khachhangService.bookLich(req).subscribe((res: any) => {
      if(res) {
        this.toastr.success("Đặt chuyến đi thành công", "Thành công!")
      }
    }, (err) => {
      this.toastr.error(err.error.message, 'Lỗi!')
    })
  }

}
