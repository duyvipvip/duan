import { Component } from '@angular/core';
import { AuthService } from './@http-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  token = localStorage.getItem('token') || '';
  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }
  ngOnInit() {
    this.authService.checkLogin();
  }

}

