import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-menu-postres',
  templateUrl: './menu-postres.component.html',
  styleUrls: ['./menu-postres.component.css']
})
export class MenuPostresComponent {
  postres: any ={};
  postresFiltrado: any ={};
  nombre:string = "";
  categoria:string = "";
  precio:string = "";
  porcion:string = "";
  img:string = "";
  postreSeleccionado="salado";
  

 
  constructor(private readonly dataService: DataService) {
    this.getPostres();
  }
  async getPostres() {
    this.dataService
      .getPostres()
      .then((postres: any) => {
    
          this.postres = postres;
          console.log("postres:",postres);
    
      })
      .catch((error: any) => console.log(error));
  }
  agregarPostre(nombre: string, precio: string, porcion: string, img:string, categoria:string) {
    this.dataService.crerPostre(nombre, precio, porcion,img,categoria);
  }
  
  filtrarPostres(){
    if (this.postreSeleccionado === 'todos') {
      this.postresFiltrado = this.postres;
    } else {
      this.postresFiltrado = this.postres;
    }
  }
  

}
