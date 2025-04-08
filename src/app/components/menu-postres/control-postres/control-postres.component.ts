import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';



@Component({
  selector: 'app-control-postres',
  templateUrl: './control-postres.component.html',
  styleUrl: './control-postres.component.css',
})
export class ControlPostresComponent {


  postres: any = {};
  postresID: any = {};
  epico:number =0;
  mostrarEditor: boolean = false;
 

  constructor(private dataService: DataService) {
    this.getPostres();
    this.getPostresID();
    
  }


  async getPostres() {
    this.dataService
      .getPostres()
      .then((postres: any) => {
        this.postres = postres;
      //  console.log('postres:', postres);
      })
      .catch((error: any) => console.log(error));
  }
  async getPostresID() {
    this.dataService
      .getPostresID()
      .then((postres: any) => {
        this.postresID = postres;
      })
      .catch((error: any) => console.log(error));
  }

  eliminarPostre(i:number){
   // console.log(this.postresID[i]);
    this.dataService.eliminarPostre(this.postresID[i]);
    this.getPostres();
  }

  onToggleActivo(item: any, i:any) {
    item.visible = !item.visible;
    this.dataService.cambiarVisibilidadPostre(this.postresID[i], item.visible);  
    this.getPostres(); 
    console.log("visibilidad cambiada")
  }

  editarPostre(i:number){
  this.mostrarEditor = true;
  this.epico = i;
  this.scrollToEditor();
  }

  scrollToEditor() {
    const editorElement = document.getElementById('btnEditar');
    if (editorElement) {
      editorElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  recibirInformacionDelHijo(informacion: boolean) {
    this.mostrarEditor = informacion;
    this.getPostres();
  }


}
