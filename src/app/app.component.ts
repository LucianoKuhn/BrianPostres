import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'BrianPostresApp';
  estado = '';
  sesionIniciada: boolean = false;
  isAuthenticated: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.sesionIniciada$.subscribe((estadoRecibido) => {
      this.sesionIniciada = estadoRecibido;
      this.ingresarOSalir();
    });
  }

  ingresarOSalirClick() {
    if (this.estado === ' Salir') {
      this.userService.logOut();
      this.sesionIniciada = false;
      this.ingresarOSalir();
    }
  }

  ingresarOSalir() {
    if (this.sesionIniciada) {
      this.estado = ' Salir';

    } else {
      this.estado = ' Ingresar';
    }
  }
}
