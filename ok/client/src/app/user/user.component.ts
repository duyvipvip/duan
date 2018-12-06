import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public statusActive: number = 1;
  public nameUser: string = 'Duong';
  token = localStorage.getItem('token') || '';
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    document.body.classList.remove('bg-img');
  }

  activeNav(check){

    this.statusActive = check;
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

}
