import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

import { ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-menu-postres',
  templateUrl: './menu-postres.component.html',
  styleUrls: ['./menu-postres.component.css'],
})
export class MenuPostresComponent {
  postres: any = {};
  postresFiltrado: any = {};
  postreSeleccionado = '';
  administrador = false;
  mostrarCompAdmin = false;

  constructor(
    private readonly dataService: DataService,
    private userService: UserService,
    private storegeService: StorageService
  ) {
    this.getPostres();
    this.postreSeleccionado = 'aa';
    this.comprobarAdmin();
  }

  async comprobarAdmin() {
    try {
      const email = await this.userService.getCurrentUserEmail();
      console.log('Email: ', email);
      if (email === 'brianschmunk04@gmail.com') {
        this.administrador = true;
      }
    } catch (error) {
      console.error('Error obtaining email:', error);
    }
  }

  mostrarControl() {
    //this.mostrarCompAdmin = true;
   this.storegeService.subirImagen('src/assets/img/logo.png');
   console.log("se mando el mostrarcontrol")

  }

  async getPostres() {
    this.dataService
      .getPostres()
      .then((postres: any) => {
        this.postres = postres;
        console.log('postres:', postres);
        this.filtrarPostres();
      })
      .catch((error: any) => console.log(error));
  }

 

  filtrarPostres() {
    console.log(this.postreSeleccionado);
    if (
      this.postreSeleccionado === 'todos' ||
      this.postreSeleccionado === 'aa'
    ) {
      this.postresFiltrado = null;
      setTimeout(() => (this.postresFiltrado = [...this.postres]), 0);
    } else {
      this.postresFiltrado = this.postres.filter(
        (postre: any) => postre.categoria === this.postreSeleccionado
      );
    }
  }
}
