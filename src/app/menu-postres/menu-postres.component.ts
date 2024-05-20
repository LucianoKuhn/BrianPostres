import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-menu-postres',
  templateUrl: './menu-postres.component.html',
  styleUrls: ['./menu-postres.component.css'],
})
export class MenuPostresComponent {
  postres: any = {};
  postresFiltrado: any = {};
  nombre: string = '';
  categoria: string = '';
  precio: string = '';
  porcion: string = '';
  img: string = '';
  postreSeleccionado = '';

  constructor(private readonly dataService: DataService, private cdr:ChangeDetectorRef) {
    this.getPostres();
    this.postreSeleccionado = 'aa';
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
  agregarPostre(
    nombre: string,
    precio: string,
    porcion: string,
    img: string,
    categoria: string
  ) {
    this.dataService.crerPostre(nombre, precio, porcion, img, categoria);
  }


  filtrarPostres() {
    console.log(this.postreSeleccionado);
    if (this.postreSeleccionado === 'todos' || this.postreSeleccionado === 'aa') {
      this.postresFiltrado = null; 
      setTimeout(() => this.postresFiltrado = [...this.postres], 0);

    } else {
      this.postresFiltrado = this.postres.filter(
        (postre: any) => postre.categoria === this.postreSeleccionado
      );
    
   
    }
  }
 
}
