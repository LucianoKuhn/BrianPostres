import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-control-postres',
  standalone: true,
  imports: [],
  templateUrl: './control-postres.component.html',
  styleUrl: './control-postres.component.css'
})
export class ControlPostresComponent {

  constructor(private userService: UserService, private router: Router){}

  logOut(){
  this.userService.logOut();
  this.router.navigate([""]);
  }

}
