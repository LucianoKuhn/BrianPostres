import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  tipoError: string = '';
  mostrarAlert!:boolean;

  constructor(private userService: UserService, private router: Router) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {}

  irRegistro() {
    this.router.navigate(['registrar']);
  }

  // onClick() {
  //   this.userService
  //     .loginWithGoogle()
  //     .then((response) => {
  //       console.log(response);
  //       this.router.navigate(['']);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  onSubmit() {
    this.userService
      .login(this.formLogin.value)
      .then((userCredential: any) => {
        const user = userCredential.user;
        localStorage.setItem('mail', user.email);
        this.userService.emitirCambioSesion(true);
        this.router.navigate(['']);
        this.mostrarAlert=false;
      })
      .catch((error) => {
        this.mostrarAlert=true;
        this.tipoError = error.code;
        let errorCode = error.code;
       // console.log(errorCode);
        switch (errorCode) {
          case 'auth/invalid-email':
            this.tipoError = 'El correo electrónico no es válido.';
            break;
          case 'auth/invalid-credential':
            this.tipoError = 'Comprueba la contraseña o el correo electrónico.';
            break;
            case 'auth/missing-email':
              this.tipoError = 'Ingresa un correo electrónico.';
              break;
        }
      });
  }
}
