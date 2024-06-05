import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formReg: FormGroup;
  tipoError!: string;
  mostrarAlert!: boolean;
  registradoCorrectamente: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      nombre: new FormControl(),
      password: new FormControl(),
      password2: new FormControl(),
    });
  }
  ngOnInit(): void {}

  onSubmit() {
    let nombreC = this.formReg.get('nombre');
    let contra = this.formReg.get('password');
    let contra2 = this.formReg.get('password2');

    if (nombreC?.value && nombreC.value !== '') {
    //  console.log('contra1: ', contra);
     // console.log('contra2: ', contra2);

      if (contra?.value == contra2?.value) {
        this.userService
          .register(this.formReg.value)
          .then((response) => {
            if (nombreC) {
              this.userService.ponerNombre(nombreC.value);
            }

            this.mostrarAlert = false;
            this.registradoCorrectamente = true;
            setTimeout(() => {
              this.router.navigate(['ingresar']);
            }, 2000);

            
          })
          .catch((error) => {
            this.mostrarAlert = true;
            this.tipoError = error.code;
            let errorCode = error.code;
          //  console.log(errorCode);
            switch (errorCode) {
              case 'auth/invalid-email':
                this.tipoError = 'El correo electrónico no es válido.';
                break;
              case 'auth/invalid-credential':
                this.tipoError =
                  'Comprueba la contraseña o el correo electrónico.';
                break;
              case 'auth/missing-email':
                this.tipoError = 'Ingresa un correo electrónico.';
                break;
              case 'auth/weak-password':
                this.tipoError = 'Ingresa una contraseña más larga.';
                break;
              case 'auth/email-already-in-use ':
                this.tipoError = 'El correo electronico ya está registrado.';
                break;
            }
          });
      } else {
        this.tipoError = 'Las contraseñas no coinciden.';
        this.mostrarAlert = true;
      }
    } else {
      this.tipoError = 'Ingrese su nombre de usuario.';
      this.mostrarAlert = true;
    }
  }
}
