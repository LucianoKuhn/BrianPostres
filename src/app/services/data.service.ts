import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
} from '@angular/fire/firestore';





@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(public firestore: Firestore) {}

  async crerPostre(
    nombre: string,
    precio: string,
    porcion: string,
    img: string,
    categoria: string
  ) {
    const docRef = await addDoc(collection(this.firestore, 'postres'), {
      nombre: nombre,
      precio: precio,
      porcion: porcion,
      categoria: categoria,
      img: img,
    });
    //console.log('Document written with ID: ', docRef.id);
  }

  

  async getPostres() {
    return (
      await getDocs(query(collection(this.firestore, 'postres')))
    ).docs.map((postres) => postres.data());
  }
  async getPostresID() {
    return (
      await getDocs(query(collection(this.firestore, 'postres')))
    ).docs.map((postres) => postres.id);
  }

  async eliminarPostre (id:string){
   await deleteDoc(doc(this.firestore,'postres', id));
  }
  async editarPostre (id:string, nombre:string, categoria:string, precio:string){
    const Ref = doc(this.firestore, "postres", id);

    await updateDoc(Ref, {
        categoria: categoria,
        nombre: nombre,
        precio: precio
    });
   }




//  indiceSubject = new Subject<number>();

//   enviarIndice(indice: number) {
//     this.indiceSubject.next(indice);
//   }

//   obtenerIndice() {
//     return this.indiceSubject.asObservable();
//   }
}
