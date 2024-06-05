import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-editar-postre',
  templateUrl: './editar-postre.component.html',
  styleUrl: './editar-postre.component.css',
})
export class EditarPostreComponent {
  @Input() indicePasado: number = 0;
  @Output() mostrarEditor = new EventEmitter<boolean>();

  constructor(private dataService: DataService) {}
  nombre: string = '';
  categoria: string = '';
  precio: string = '';
  indice: number = 0;
  errorForm: string = '';
  datosEnviados: boolean = false;
  postres: any = {};
  postresID: any = {};

  async ngOnInit() {
    await this.getPostres();
    await this.getPostresID();
   // console.log(this.indicePasado);
    this.cargarPostre();
  }

  async getPostres() {
    try {
      this.postres = await this.dataService.getPostres();
    } catch (error) {
    //  console.log(error);
    }
  }
  async getPostresID() {
    this.dataService
      .getPostresID()
      .then((postres: any) => {
        this.postresID = postres;
      })
      .catch((error: any) => console.log(error));
  }

  cargarPostre() {
    this.nombre = this.postres[this.indicePasado].nombre;
    this.precio = this.postres[this.indicePasado].precio;
    this.categoria = this.postres[this.indicePasado].categoria;
  }

  async editarPostre(nombre: string, precio: string, categoria: string) {
    try {
      if (
        this.nombre !== '' &&
        this.precio !== null &&
        this.categoria !== 'oculto'
      ) {
        this.datosEnviados = true;
        const id = this.postresID[this.indicePasado];
        this.dataService.editarPostre(id, nombre, categoria, precio);
        this.datosEnviados = true;
        setTimeout(() => {
          this.mostrarEditor.emit(false);
        }, 2000);
      } else {
        this.errorForm = 'Debes de completar todos los campos.';
      }
    } catch (error) {
    //  console.error('Error al agregar el postre:', error);
    }
  }
  cerrar(){
    setTimeout(() => {
      this.mostrarEditor.emit(false);
    }, 0);
  }
}
