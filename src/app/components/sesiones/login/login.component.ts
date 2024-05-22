import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(private userService: UserService, private router: Router){

    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  logOut(){
    this.userService.logOut();
    }

  ngOnInit(): void {
  }
  irRegistro(){
    this.router.navigate(["registrar"]);
  }

  onClick(){
    this.userService.loginWithGoogle()
    .then(response => {
      console.log(response);
      this.router.navigate([""]);

    })
    .catch(error => {console.log(error);})

  }

  onSubmit(){
    this.userService.login(this.formLogin.value)
    .then(response => {
      this.router.navigate([""])
    })
    .catch(error => {
      console.log(error);
    })
  }
}
