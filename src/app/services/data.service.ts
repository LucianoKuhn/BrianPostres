import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(public firestore: Firestore) { }

  async crerPostre(nombre: string, precio: string, porcion: string, img:string, categoria:string) {
    const docRef = await addDoc(collection(this.firestore, 'postres'), {
      nombre:nombre,
      precio: precio,
      porcion: porcion,
      categoria:categoria,
      img:img
    });
    console.log("Document written with ID: ", docRef.id);
  }

  async getPostres() {
    return (
     await getDocs(query(collection(this.firestore, 'postres')))
    ).docs.map((postres) => postres.data());
   }
}

