import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/compat/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';


@Component({
  selector: 'app-agregar-postre',
  templateUrl: './agregar-postre.component.html',
  styleUrl: './agregar-postre.component.css'
})
export class AgregarPostreComponent {

  constructor(private dataService: DataService, private pb: FormBuilder) {}

  nombre: string = '';
  categoria: string = '';
  precio: string = '';
  porcion: string = '';
  img: string = '';
  storage: any;
  file2: File | null = null;
  errorForm: string= '';
  datosEnviados: boolean = false;

    ngOnInit() {
      firebase.initializeApp(environment.firebase);
      this.categoria = 'oculto';
    }



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
      if(this.nombre !== '' && this.precio !== null && this.categoria !== 'oculto'){
        const imgUrl = await this.subirFoto();
        this.dataService.crerPostre(nombre, precio, porcion, this.img, categoria);
        console.log('subi todo a la db');
        this.datosEnviados = true;
        this.errorForm = '';
        this.nombre= '';
        this.categoria= '';
        this.precio = '';
      } else {
        this.errorForm = 'Debes de completar todos los campos.';
      }
    } catch (error) {
      console.error('Error al agregar el postre:', error);
    }
  }
}
