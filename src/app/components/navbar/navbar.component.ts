import {Component, OnInit} from '@angular/core';
import {User} from '../../services/user-service/user.service';

@Component({
   selector: 'app-navbar',
   templateUrl: './navbar.component.html',
   styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

   navText: string;
   currentUser: User;

   constructor() {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.navText = this.currentUser ? 'Logout' : 'Logout';
   }

   ngOnInit() {
   }

}
