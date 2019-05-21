import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logoutUser() {
    this.authService.logout().subscribe(
      (yo) => { console.log('Logout success', yo); },
      (e) => { console.log('An error occured:', e); }
      );
    this.router.navigate(['/loggedout']);
  }

}
