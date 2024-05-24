import { Component } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-control-postres',
  templateUrl: './control-postres.component.html',
  styleUrl: './control-postres.component.css',
})
export class ControlPostresComponent {
  constructor(private dataService: DataService) {}

  ngOnInit() {
    firebase.initializeApp(environment.firebase);
  }

  nombre: string = '';
  categoria: string = '';
  precio: string = '';
  porcion: string = '';
  img: string = '';
  storage: any;
  file2: File | null = null;

  async onFileSelected(event: any) {
    try {
      const file: File = event.target.files[0];
      this.file2 = file;
    } catch (error) {
      console.error('Error al inicializar Firebase Storage:', error);
    }
  }
  async subirFoto() {
    if (this.file2) {
      const storage = getStorage();
      const storageRef = ref(storage, 'Img/' + this.file2.name);

      try {
        const snapshot = await uploadBytes(storageRef, this.file2);
        const url = await getDownloadURL(storageRef); // Obtener la URL de descarga después de la subida
        console.log('cadena de la imagen1', url);
        this.img = url;
      } catch (error) {
        console.error('Error al subir el archivo:', error);
      }
    }
  }

  async agregarPostre(
    nombre: string,
    precio: string,
    porcion: string,
    img: string,
    categoria: string
  ) {
    try {
      const imgUrl = await this.subirFoto();
      console.log('funcion terminada, cadena de la imagen1', this.img);
      this.dataService.crerPostre(nombre, precio, porcion, this.img, categoria);
      console.log('subi todo a la db');
    } catch (error) {
      console.error('Error al agregar el postre:', error);
    }
  }
}
