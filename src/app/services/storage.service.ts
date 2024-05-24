import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  //storage = getStorage();
  storage: any;

  async initializeStorage() {
    try {
      this.storage = getStorage();
    } catch (error) {
      console.error('Error al inicializar Firebase Storage:', error);
    }
  }



  constructor() {}



  subirImagen(img: string) {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const storageRef = ref(this.storage, img);
        const storageImagesRef = ref(this.storage, img);
        storageRef.name === storageImagesRef.name;
        storageRef.fullPath === storageImagesRef.fullPath;

        uploadBytes(storageRef, blob)
          .then((snapshot) => {
            console.log('¡Imagen cargada con éxito!');
          })
          .catch((error) => {
            console.error('Error al cargar la imagen:', error);
          });
      })
      .catch((error) => {
        console.error('Error al obtener la imagen:', error);
      });
  }
}
